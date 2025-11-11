# Example 1: Basic Portfolio Setup

This example shows how to set up a basic EnginerView Portfolio with minimal configuration.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- Basic knowledge of React and Next.js

## 🚀 Quick Setup

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/voxhash/engineerview-portfolio.git
cd engineerview-portfolio

# Install dependencies
npm install
```

### Step 2: Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your information
nano .env.local
```

**Minimum required variables:**
```env
GITHUB_USERNAME=your-github-username
CONTACT_EMAIL=your-email@domain.com
SITE_URL=https://your-domain.com
```

### Step 3: Personal Information

Edit `lib/site.ts`:

```typescript
export const siteConfig = {
  name: "John Doe",
  handle: "@johndoe",
  description: "Full-stack developer passionate about creating amazing web experiences",
  url: "https://johndoe.dev",
  email: "john@johndoe.dev",
  keywords: ["developer", "portfolio", "nextjs", "typescript", "react"],
  social: {
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  author: {
    name: "John Doe",
    email: "john@johndoe.dev",
    url: "https://johndoe.dev",
  },
};
```

### Step 4: Pinned Projects

Edit `data/pinned.json`:

```json
[
  {
    "name": "E-Commerce Platform",
    "description": "A full-stack e-commerce platform built with Next.js and Stripe",
    "url": "https://ecommerce-demo.vercel.app",
    "github": "https://github.com/johndoe/ecommerce-platform",
    "technologies": ["Next.js", "TypeScript", "Stripe", "TailwindCSS"],
    "featured": true,
    "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
  },
  {
    "name": "Task Management App",
    "description": "A collaborative task management application with real-time updates",
    "url": "https://taskapp-demo.vercel.app",
    "github": "https://github.com/johndoe/task-management-app",
    "technologies": ["React", "Node.js", "Socket.io", "MongoDB"],
    "featured": true,
    "image": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop"
  }
]
```

### Step 5: Testimonials

Edit `data/testimonials.json`:

```json
[
  {
    "name": "Sarah Johnson",
    "role": "Product Manager, TechCorp",
    "content": "John delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the project a huge success.",
    "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "rating": 5,
    "company": "TechCorp",
    "website": "https://techcorp.com"
  },
  {
    "name": "Mike Chen",
    "role": "CTO, StartupXYZ",
    "content": "Working with John was a pleasure. He's a skilled developer who understands both the technical and business aspects of projects.",
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "rating": 5,
    "company": "StartupXYZ",
    "website": "https://startupxyz.com"
  }
]
```

### Step 6: Start Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 🎨 Customization

### Update About Page

Edit `app/about/page.tsx`:

```typescript
export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        
        <div className="prose prose-lg max-w-none mb-8">
          <p>
            I'm a passionate full-stack developer with 5+ years of experience 
            building web applications. I love creating user-friendly interfaces 
            and solving complex technical challenges.
          </p>
          
          <p>
            When I'm not coding, you can find me hiking in the mountains, 
            reading tech blogs, or experimenting with new technologies.
          </p>
        </div>
        
        <SkillsMatrix />
        <Timeline />
      </div>
    </div>
  );
}
```

### Update Skills Matrix

Edit `components/SkillsMatrix.tsx`:

```typescript
const skills = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "TailwindCSS", level: 85 },
      { name: "Vue.js", level: 70 },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "Redis", level: 65 },
    ]
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Figma", level: 80 },
      { name: "Linux", level: 85 },
    ]
  }
];
```

### Update Career Timeline

Edit `components/Timeline.tsx`:

```typescript
const milestones = [
  {
    year: "2025",
    title: "Senior Full-Stack Developer",
    company: "TechCorp",
    description: "Leading development of microservices architecture and mentoring junior developers",
    type: "work"
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    description: "Built scalable web applications using React, Node.js, and cloud technologies",
    type: "work"
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "WebAgency",
    description: "Developed responsive web applications and improved user experience",
    type: "work"
  },
  {
    year: "2019",
    title: "Computer Science Degree",
    company: "University of Technology",
    description: "Bachelor's degree in Computer Science with focus on software engineering",
    type: "education"
  }
];
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Environment Variables in Vercel**:
   ```
   GITHUB_USERNAME=your-github-username
   CONTACT_EMAIL=your-email@domain.com
   SITE_URL=https://your-vercel-app.vercel.app
   ```

### Deploy to Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `.next`
3. **Add environment variables** in Netlify dashboard

## 🔧 Troubleshooting

### Common Issues

1. **Build fails**:
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Environment variables not loading**:
   - Check `.env.local` exists
   - Restart development server
   - Verify variable names match exactly

3. **GitHub API issues**:
   - Verify `GITHUB_USERNAME` is correct
   - Check if repositories are public
   - Add `GITHUB_TOKEN` for higher rate limits

## 📚 Next Steps

1. **Add more content**: Blog posts, projects, speaking engagements
2. **Customize styling**: Update colors, fonts, and layout
3. **Add features**: Contact form, analytics, RSS feed
4. **Optimize performance**: Image optimization, caching
5. **Deploy**: Make your portfolio live!

## 🆘 Getting Help

- **Documentation**: [Complete Guide](../getting-started.md)
- **Issues**: [GitHub Issues](https://github.com/voxhash/engineerview-portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Email**: contact@voxhash.dev

---

**Your basic portfolio is ready! 🎉**
