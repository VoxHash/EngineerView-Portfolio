# API Reference

This guide provides comprehensive API documentation for EnginerView Portfolio, including all available endpoints, data structures, and integration methods.

## 📋 Table of Contents

- [API Overview](#api-overview)
- [GitHub API Integration](#github-api-integration)
- [Analytics API](#analytics-api)
- [Email API](#email-api)
- [Content API](#content-api)
- [Image API](#image-api)
- [RSS/Atom API](#rssatom-api)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Authentication](#authentication)

## 🔌 API Overview

### Base URL

```
Development: http://localhost:3000
Production: https://your-domain.com
```

### Content Types

- **JSON**: `application/json`
- **XML**: `application/xml`
- **Images**: `image/png`, `image/jpeg`
- **PDF**: `application/pdf`

### Response Format

All API responses follow this format:

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}
```

## 🐙 GitHub API Integration

### Get User Repositories

**Endpoint**: `GET /api/github/repos`

**Description**: Fetches user repositories from GitHub API

**Query Parameters**:
- `username` (string, required): GitHub username
- `sort` (string, optional): Sort by `created`, `updated`, `pushed`, `full_name` (default: `updated`)
- `direction` (string, optional): Sort direction `asc` or `desc` (default: `desc`)
- `per_page` (number, optional): Number of repos per page (default: 30)
- `page` (number, optional): Page number (default: 1)

**Response**:
```typescript
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch: string;
  archived: boolean;
  disabled: boolean;
  private: boolean;
  fork: boolean;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  } | null;
}

interface GitHubReposResponse {
  repositories: GitHubRepo[];
  total_count: number;
  page: number;
  per_page: number;
  has_more: boolean;
}
```

**Example Request**:
```bash
curl "http://localhost:3000/api/github/repos?username=voxhash&sort=updated&per_page=10"
```

**Example Response**:
```json
{
  "success": true,
  "data": {
    "repositories": [
      {
        "id": 123456789,
        "name": "engineerview-portfolio",
        "full_name": "voxhash/engineerview-portfolio",
        "description": "Modern portfolio website",
        "html_url": "https://github.com/voxhash/engineerview-portfolio",
        "stargazers_count": 42,
        "forks_count": 8,
        "language": "TypeScript",
        "topics": ["portfolio", "nextjs", "typescript"],
        "created_at": "2025-01-01T00:00:00Z",
        "updated_at": "2025-01-15T12:00:00Z",
        "pushed_at": "2025-01-15T12:00:00Z"
      }
    ],
    "total_count": 1,
    "page": 1,
    "per_page": 10,
    "has_more": false
  },
  "timestamp": "2025-01-15T12:00:00Z"
}
```

### Get Repository Details

**Endpoint**: `GET /api/github/repos/{owner}/{repo}`

**Description**: Fetches detailed information about a specific repository

**Path Parameters**:
- `owner` (string, required): Repository owner
- `repo` (string, required): Repository name

**Response**:
```typescript
interface GitHubRepoDetails extends GitHubRepo {
  readme: string | null;
  contributors: {
    login: string;
    id: number;
    avatar_url: string;
    contributions: number;
  }[];
  releases: {
    tag_name: string;
    name: string;
    published_at: string;
    html_url: string;
  }[];
  languages: {
    [language: string]: number;
  };
}
```

### Get User Profile

**Endpoint**: `GET /api/github/user/{username}`

**Description**: Fetches GitHub user profile information

**Response**:
```typescript
interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string | null;
  bio: string | null;
  blog: string | null;
  location: string | null;
  company: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  created_at: string;
  updated_at: string;
}
```

## 📧 Email API

### Send Contact Form

**Endpoint**: `POST /api/contact`

**Description**: Sends contact form email

**Request Body**:
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  company?: string;
  phone?: string;
}
```

**Response**:
```typescript
interface ContactResponse {
  success: boolean;
  message: string;
  messageId?: string;
}
```

**Example Request**:
```bash
curl -X POST "http://localhost:3000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a project with you."
  }'
```

**Example Response**:
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon.",
  "messageId": "msg_123456789",
  "timestamp": "2025-01-15T12:00:00Z"
}
```

### Send Newsletter

**Endpoint**: `POST /api/newsletter`

**Description**: Subscribes user to newsletter

**Request Body**:
```typescript
interface NewsletterData {
  email: string;
  name?: string;
  source?: string;
}
```

## 📝 Content API

### Get Blog Posts

**Endpoint**: `GET /api/blog`

**Description**: Fetches blog posts from Medium or local content

**Query Parameters**:
- `source` (string, optional): `medium` or `local` (default: `medium`)
- `limit` (number, optional): Number of posts to fetch (default: 10)
- `offset` (number, optional): Number of posts to skip (default: 0)

**Response**:
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  updated_at: string;
  url: string;
  image_url?: string;
  tags: string[];
  reading_time: number;
  word_count: number;
}

interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  has_more: boolean;
}
```

### Get Speaking Engagements

**Endpoint**: `GET /api/speaking`

**Description**: Fetches speaking engagements and media features

**Response**:
```typescript
interface SpeakingEngagement {
  id: string;
  title: string;
  description: string;
  event: string;
  date: string;
  location: string;
  type: 'conference' | 'podcast' | 'webinar' | 'interview';
  url?: string;
  slides_url?: string;
  video_url?: string;
  tags: string[];
}

interface SpeakingResponse {
  engagements: SpeakingEngagement[];
  total: number;
}
```

## 🖼️ Image API

### Generate OG Image

**Endpoint**: `GET /api/og`

**Description**: Generates dynamic Open Graph images

**Query Parameters**:
- `title` (string, required): Image title
- `description` (string, optional): Image description
- `type` (string, optional): Image type `default`, `blog`, `project` (default: `default`)
- `theme` (string, optional): `light` or `dark` (default: `light`)

**Response**: PNG image (1200x630)

**Example Request**:
```bash
curl "http://localhost:3000/api/og?title=My%20Blog%20Post&description=This%20is%20a%20great%20post&type=blog"
```

### Optimize Image

**Endpoint**: `POST /api/images/optimize`

**Description**: Optimizes uploaded images

**Request Body**:
```typescript
interface ImageOptimizeRequest {
  image: File;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}
```

**Response**:
```typescript
interface ImageOptimizeResponse {
  optimized_url: string;
  original_size: number;
  optimized_size: number;
  compression_ratio: number;
}
```

## 📰 RSS/Atom API

### Get RSS Feed

**Endpoint**: `GET /rss.xml`

**Description**: Generates RSS feed for blog posts

**Response**: XML RSS feed

**Example Request**:
```bash
curl "http://localhost:3000/rss.xml"
```

### Get Atom Feed

**Endpoint**: `GET /atom.xml`

**Description**: Generates Atom feed for blog posts

**Response**: XML Atom feed

## ❌ Error Handling

### Error Response Format

```typescript
interface APIError {
  success: false;
  error: string;
  message: string;
  code: string;
  timestamp: string;
  details?: any;
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Access denied |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `SERVER_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

### Example Error Response

```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Invalid email format",
  "code": "INVALID_EMAIL",
  "timestamp": "2025-01-15T12:00:00Z",
  "details": {
    "field": "email",
    "value": "invalid-email"
  }
}
```

## 🚦 Rate Limiting

### Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/contact` | 5 requests | 1 hour |
| `/api/github/*` | 60 requests | 1 hour |
| `/api/analytics/*` | 100 requests | 1 hour |
| `/api/og` | 1000 requests | 1 hour |

### Rate Limit Headers

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1642248000
```

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": "RATE_LIMITED",
  "message": "Rate limit exceeded. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED",
  "timestamp": "2025-01-15T12:00:00Z",
  "retry_after": 3600
}
```

## 🔐 Authentication

### API Key Authentication

Some endpoints require API key authentication:

```bash
curl -H "X-API-Key: your-api-key" "http://localhost:3000/api/protected"
```

### GitHub Token Authentication

For GitHub API endpoints:

```bash
curl -H "Authorization: Bearer your-github-token" "http://localhost:3000/api/github/repos"
```

## 📚 SDK Examples

### JavaScript/TypeScript

```typescript
// GitHub API client
class GitHubAPI {
  private baseUrl: string;
  
  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }
  
  async getRepos(username: string, options?: {
    sort?: string;
    per_page?: number;
    page?: number;
  }) {
    const params = new URLSearchParams({
      username,
      ...options
    });
    
    const response = await fetch(`${this.baseUrl}/api/github/repos?${params}`);
    return response.json();
  }
  
  async getRepo(owner: string, repo: string) {
    const response = await fetch(`${this.baseUrl}/api/github/repos/${owner}/${repo}`);
    return response.json();
  }
}

// Usage
const github = new GitHubAPI();
const repos = await github.getRepos('voxhash', { sort: 'updated', per_page: 10 });
```

### Python

```python
import requests
from typing import Dict, List, Optional

class GitHubAPI:
    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url
    
    def get_repos(self, username: str, **kwargs) -> Dict:
        params = {"username": username, **kwargs}
        response = requests.get(f"{self.base_url}/api/github/repos", params=params)
        return response.json()
    
    def get_repo(self, owner: str, repo: str) -> Dict:
        response = requests.get(f"{self.base_url}/api/github/repos/{owner}/{repo}")
        return response.json()

# Usage
github = GitHubAPI()
repos = github.get_repos("voxhash", sort="updated", per_page=10)
```

## 📚 Next Steps

1. **Explore examples**: Check [Examples](examples/) for API usage
2. **Read configuration**: See [Configuration Guide](configuration.md) for setup
3. **Test endpoints**: Use the provided examples to test API endpoints
4. **Integrate**: Use the SDK examples to integrate with your applications

## 🆘 Getting Help

- **API Documentation**: This guide
- **Issues**: [GitHub Issues](https://github.com/voxhash/engineerview-portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Email**: contact@voxhash.dev

---

**Happy coding! 🚀**
