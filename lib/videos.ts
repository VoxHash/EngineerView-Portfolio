import { getFetchCacheOptions } from './cache';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  platform: 'youtube' | 'twitch' | 'kick' | 'vimeo';
  duration?: string;
  viewCount?: number;
}

export interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      high: { url: string };
      medium: { url: string };
      default: { url: string };
    };
  };
  contentDetails?: {
    duration: string;
  };
  statistics?: {
    viewCount: string;
  };
}

export interface TwitchVideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  url: string;
  published_at: string;
  duration: string;
  view_count: number;
}

// Extract video ID from YouTube URL
function extractYouTubeVideoId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return '';
}

// Convert ISO 8601 duration to readable format
function formatDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Fetch YouTube videos using RSS feed (no API key required)
export async function fetchYouTubeVideosRSS(channelId: string, limit: number = 10): Promise<Video[]> {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio Bot/1.0)',
      },
      ...getFetchCacheOptions('DYNAMIC')
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch YouTube RSS: ${response.status}`);
    }

    const xmlText = await response.text();
    
    // Parse XML manually
    const videos: Video[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    let count = 0;

    while ((match = entryRegex.exec(xmlText)) !== null && count < limit) {
      const entryXml = match[1];
      
      const titleMatch = entryXml.match(/<title>(.*?)<\/title>/);
      const linkMatch = entryXml.match(/<link[^>]*href=["']([^"']+)["']/);
      const publishedMatch = entryXml.match(/<published>(.*?)<\/published>/);
      const descriptionMatch = entryXml.match(/<media:description>(.*?)<\/media:description>/);
      const thumbnailMatch = entryXml.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/);
      const videoIdMatch = entryXml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      
      if (titleMatch && linkMatch && publishedMatch) {
        const videoId = videoIdMatch ? videoIdMatch[1] : extractYouTubeVideoId(linkMatch[1]);
        const thumbnail = thumbnailMatch 
          ? thumbnailMatch[1] 
          : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        
        videos.push({
          id: videoId,
          title: titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1'),
          description: descriptionMatch 
            ? descriptionMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1').substring(0, 200)
            : '',
          thumbnail,
          url: linkMatch[1],
          publishedAt: publishedMatch[1],
          platform: 'youtube'
        });
        count++;
      }
    }

    return videos;

  } catch (error) {
    console.error('Error fetching YouTube videos from RSS:', error);
    return [];
  }
}

// Fetch YouTube videos using Data API v3 (requires API key)
export async function fetchYouTubeVideosAPI(
  channelId: string, 
  apiKey: string, 
  limit: number = 10
): Promise<Video[]> {
  try {
    // First, get uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      getFetchCacheOptions('DYNAMIC')
    );

    if (!channelResponse.ok) {
      throw new Error(`Failed to fetch YouTube channel: ${channelResponse.status}`);
    }

    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error('Uploads playlist not found');
    }

    // Get videos from uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${limit}&key=${apiKey}`,
      getFetchCacheOptions('DYNAMIC')
    );

    if (!videosResponse.ok) {
      throw new Error(`Failed to fetch YouTube videos: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();
    const videoIds = videosData.items
      .map((item: { contentDetails: { videoId: string } }) => item.contentDetails.videoId)
      .join(',');

    // Get video details (duration, view count)
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
      getFetchCacheOptions('DYNAMIC')
    );

    if (!detailsResponse.ok) {
      throw new Error(`Failed to fetch YouTube video details: ${detailsResponse.status}`);
    }

    const detailsData = await detailsResponse.json();

    return detailsData.items.map((item: YouTubeVideoItem) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description.substring(0, 200),
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      publishedAt: item.snippet.publishedAt,
      platform: 'youtube' as const,
      duration: item.contentDetails?.duration ? formatDuration(item.contentDetails.duration) : undefined,
      viewCount: item.statistics?.viewCount ? parseInt(item.statistics.viewCount, 10) : undefined
    }));

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching YouTube videos from API:', errorMessage);
    
    // Log more details for debugging
    if (errorMessage.includes('403')) {
      console.warn('YouTube API 403: Check API key validity, restrictions, or channel ID');
    } else if (errorMessage.includes('401')) {
      console.warn('YouTube API 401: API key may be invalid or expired');
    }
    
    // Return empty array to gracefully handle errors
    return [];
  }
}

// Fetch Twitch videos (requires Client ID)
export async function fetchTwitchVideos(
  channelName: string,
  clientId: string,
  limit: number = 10
): Promise<Video[]> {
  try {
    // First, get user ID from username
    const userResponse = await fetch(
      `https://api.twitch.tv/helix/users?login=${channelName}`,
      {
        headers: {
          'Client-ID': clientId,
        },
        ...getFetchCacheOptions('DYNAMIC')
      }
    );

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch Twitch user: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    const userId = userData.data?.[0]?.id;

    if (!userId) {
      throw new Error('Twitch user not found');
    }

    // Get videos
    const videosResponse = await fetch(
      `https://api.twitch.tv/helix/videos?user_id=${userId}&first=${limit}&sort=time`,
      {
        headers: {
          'Client-ID': clientId,
        },
        ...getFetchCacheOptions('DYNAMIC')
      }
    );

    if (!videosResponse.ok) {
      throw new Error(`Failed to fetch Twitch videos: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();

    return videosData.data.map((item: TwitchVideoItem) => ({
      id: item.id,
      title: item.title,
      description: item.description.substring(0, 200),
      thumbnail: item.thumbnail_url.replace('%{width}', '640').replace('%{height}', '360'),
      url: item.url,
      publishedAt: item.published_at,
      platform: 'twitch' as const,
      duration: item.duration,
      viewCount: item.view_count
    }));

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching Twitch videos:', errorMessage);
    
    // Log more details for debugging
    if (errorMessage.includes('401')) {
      console.warn('Twitch API 401: Client ID may be invalid. Twitch API may require OAuth authentication.');
    } else if (errorMessage.includes('404')) {
      console.warn('Twitch API 404: Channel name may be incorrect or user not found');
    }
    
    // Return empty array to gracefully handle errors
    return [];
  }
}

// Main function to fetch all videos
export async function fetchAllVideos(limit: number = 20): Promise<Video[]> {
  const allVideos: Video[] = [];

  // Fetch YouTube videos
  const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  
  if (youtubeChannelId) {
    let youtubeVideos: Video[] = [];
    
    if (youtubeApiKey) {
      // Use API if key is available (more data)
      console.log(`Fetching YouTube videos via API for channel: ${youtubeChannelId}`);
      youtubeVideos = await fetchYouTubeVideosAPI(youtubeChannelId, youtubeApiKey, limit);
      console.log(`Fetched ${youtubeVideos.length} YouTube videos via API`);
    } else {
      // Fallback to RSS feed (no API key needed)
      console.log(`Fetching YouTube videos via RSS for channel: ${youtubeChannelId}`);
      youtubeVideos = await fetchYouTubeVideosRSS(youtubeChannelId, limit);
      console.log(`Fetched ${youtubeVideos.length} YouTube videos via RSS`);
    }
    
    allVideos.push(...youtubeVideos);
  } else {
    console.log('YOUTUBE_CHANNEL_ID not configured, skipping YouTube videos');
  }

  // Fetch Twitch videos
  const twitchChannelName = process.env.TWITCH_CHANNEL_NAME;
  const twitchClientId = process.env.TWITCH_CLIENT_ID;
  
  if (twitchChannelName && twitchClientId) {
    console.log(`Fetching Twitch videos for channel: ${twitchChannelName}`);
    const twitchVideos = await fetchTwitchVideos(twitchChannelName, twitchClientId, limit);
    console.log(`Fetched ${twitchVideos.length} Twitch videos`);
    allVideos.push(...twitchVideos);
  } else {
    if (twitchChannelName && !twitchClientId) {
      console.warn('TWITCH_CHANNEL_NAME is set but TWITCH_CLIENT_ID is missing');
    } else if (!twitchChannelName && twitchClientId) {
      console.warn('TWITCH_CLIENT_ID is set but TWITCH_CHANNEL_NAME is missing');
    } else {
      console.log('Twitch not configured, skipping Twitch videos');
    }
  }

  // Sort by published date (newest first)
  const sortedVideos = allVideos.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, limit);
  
  console.log(`Total videos fetched: ${sortedVideos.length}`);
  return sortedVideos;
}

