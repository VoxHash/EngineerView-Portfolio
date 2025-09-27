import { Calendar, MapPin, ExternalLink, Mic, Video, BookOpen } from "lucide-react";
import { format } from "date-fns";

interface SpeakingEngagement {
  id: string;
  title: string;
  event: string;
  date: string;
  location: string;
  type: 'conference' | 'podcast' | 'workshop' | 'webinar';
  description: string;
  slidesUrl?: string;
  videoUrl?: string;
  podcastUrl?: string;
  tags: string[];
}

const speakingData: SpeakingEngagement[] = [
  {
    id: '1',
    title: 'Building Scalable AI Applications with Next.js',
    event: 'React Conf 2024',
    date: '2024-03-15',
    location: 'San Francisco, CA',
    type: 'conference',
    description: 'Deep dive into integrating AI capabilities into Next.js applications, covering performance optimization, caching strategies, and real-world deployment patterns.',
    slidesUrl: 'https://slides.com/voxhash/ai-nextjs',
    videoUrl: 'https://youtube.com/watch?v=example',
    tags: ['Next.js', 'AI', 'Performance', 'Architecture']
  },
  {
    id: '2',
    title: 'The Future of Web Development',
    event: 'TechCrunch Disrupt',
    date: '2024-02-20',
    location: 'New York, NY',
    type: 'conference',
    description: 'Panel discussion on emerging trends in web development, including WebAssembly, edge computing, and the evolution of JavaScript frameworks.',
    videoUrl: 'https://youtube.com/watch?v=example2',
    tags: ['Web Development', 'Trends', 'Panel']
  },
  {
    id: '3',
    title: 'Developer Productivity with Modern Tools',
    event: 'The Changelog Podcast',
    date: '2024-01-10',
    location: 'Remote',
    type: 'podcast',
    description: 'Discussion about developer productivity, tooling, and how modern development practices can accelerate software delivery.',
    podcastUrl: 'https://changelog.com/podcast/500',
    tags: ['Productivity', 'Tools', 'Development']
  },
  {
    id: '4',
    title: 'TypeScript Masterclass',
    event: 'Frontend Masters Workshop',
    date: '2023-12-05',
    location: 'Online',
    type: 'workshop',
    description: 'Comprehensive workshop covering advanced TypeScript patterns, type safety, and best practices for large-scale applications.',
    slidesUrl: 'https://slides.com/voxhash/typescript-masterclass',
    tags: ['TypeScript', 'Workshop', 'Advanced']
  },
  {
    id: '5',
    title: 'Building Developer Communities',
    event: 'GitHub Universe',
    date: '2023-11-08',
    location: 'San Francisco, CA',
    type: 'conference',
    description: 'How to build and maintain healthy open source communities, including governance, contribution guidelines, and sustainable growth.',
    videoUrl: 'https://youtube.com/watch?v=example3',
    tags: ['Open Source', 'Community', 'Governance']
  },
  {
    id: '6',
    title: 'AI Ethics in Software Development',
    event: 'Ethics in Tech Podcast',
    date: '2023-10-15',
    location: 'Remote',
    type: 'podcast',
    description: 'Exploring the ethical implications of AI in software development, responsible AI practices, and building inclusive technology.',
    podcastUrl: 'https://ethicsintech.com/episode/ai-ethics',
    tags: ['AI Ethics', 'Responsible AI', 'Inclusion']
  }
];

const getTypeIcon = (type: SpeakingEngagement['type']) => {
  switch (type) {
    case 'conference':
      return <Mic className="h-5 w-5" />;
    case 'podcast':
      return <Video className="h-5 w-5" />;
    case 'workshop':
      return <BookOpen className="h-5 w-5" />;
    case 'webinar':
      return <Video className="h-5 w-5" />;
    default:
      return <Mic className="h-5 w-5" />;
  }
};

const getTypeColor = (type: SpeakingEngagement['type']) => {
  switch (type) {
    case 'conference':
      return 'bg-blue-500';
    case 'podcast':
      return 'bg-green-500';
    case 'workshop':
      return 'bg-purple-500';
    case 'webinar':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
};

export default function SpeakingPage() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Speaking & <span className="text-brand">Media</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Sharing knowledge through conferences, podcasts, workshops, and media appearances. 
          Passionate about educating the developer community and discussing the future of technology.
        </p>
      </div>

      <div className="space-y-8">
        {speakingData.map((engagement, index) => (
          <article
            key={engagement.id}
            className="card p-8 hover-glow hover-scale group cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Type Icon */}
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${getTypeColor(engagement.type)} flex items-center justify-center text-white`}>
                  {getTypeIcon(engagement.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-brand transition-colors duration-200">
                    {engagement.title}
                  </h3>
                  <span className="badge bg-brand/10 text-brand border-brand/20">
                    {engagement.type.charAt(0).toUpperCase() + engagement.type.slice(1)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(engagement.date), 'MMM dd, yyyy')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {engagement.location}
                  </span>
                </div>

                <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                  {engagement.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {engagement.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="badge text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {engagement.slidesUrl && (
                    <a
                      href={engagement.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Slides
                    </a>
                  )}
                  {engagement.videoUrl && (
                    <a
                      href={engagement.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link text-sm"
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Video
                    </a>
                  )}
                  {engagement.podcastUrl && (
                    <a
                      href={engagement.podcastUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link text-sm"
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Podcast
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
          <h3 className="text-2xl font-semibold mb-4">Interested in Having Me Speak?</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
            I'm always excited to share knowledge and connect with the developer community. 
            Whether it's a conference, podcast, workshop, or webinar, I'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="btn hover-glow"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
}
