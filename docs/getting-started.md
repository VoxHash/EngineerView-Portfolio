# Getting Started with EnginerView Portfolio

This comprehensive guide will walk you through setting up and customizing your EnginerView Portfolio from scratch.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Customization](#customization)
- [Deployment](#deployment)
- [Next Steps](#next-steps)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** 18.0 or later
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** 9.0 or later
  - Usually comes with Node.js
  - Verify installation: `npm --version`

- **Git** for version control
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Recommended Tools

- **VS Code** with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Prettier - Code formatter

- **Browser** with developer tools
  - Chrome, Firefox, Safari, or Edge

## 🚀 Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/voxhash/engineerview-portfolio.git

# Navigate to the project directory
cd engineerview-portfolio
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

### Step 3: Environment Setup

```bash
# Copy the environment template
cp .env.example .env.local

# Edit the environment file
# Use your preferred editor (VS Code, nano, vim, etc.)
code .env.local
```

### Step 4: Configure Environment Variables

Edit `.env.local` with your information:

```env
# GitHub Integration
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token

# Contact Information
CONTACT_EMAIL=your-email@domain.com
SITE_URL=https://your-domain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Service (Optional)
RESEND_API_KEY=your-resend-api-key
```

### Step 5: Start Development Server

```bash
# Start the development server
npm run dev

# Open your browser to http://localhost:3000
```

## ⚙️ Configuration

### Basic Configuration

Edit `lib/site.ts` to update your personal information:

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "@yourhandle",
  description: "Your professional description",
  url: "https://your-domain.com",
  email: "your-email@domain.com",
  keywords: ["developer", "portfolio", "nextjs", "typescript"],
  social: {
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
};
```

### Theme Configuration

Customize your theme in `tailwind.config.ts`:

```typescript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fdf4ff',
          500: '#a855f7',
          900: '#581c87',
        },
      },
    },
  },
};
```

### Content Configuration

#### Pinned Projects

Edit `data/pinned.json` to showcase your best work:

```json
[
  {
    "name": "Project Name",
    "description": "Project description",
    "url": "https://project-url.com",
    "github": "https://github.com/username/project",
    "technologies": ["React", "TypeScript", "TailwindCSS"],
    "featured": true
  }
]
```

#### Testimonials

Edit `data/testimonials.json` to add client feedback:

```json
[
  {
    "name": "Client Name",
    "role": "CEO, Company Name",
    "content": "Great work on our project!",
    "avatar": "https://example.com/avatar.jpg",
    "rating": 5
  }
]
```

## 🎨 Customization

### Personal Information

1. **Update `lib/site.ts`** with your details
2. **Replace `/public/VoxHash_Resume.pdf`** with your resume
3. **Update social links** in `components/SocialRow.tsx`
4. **Modify contact information** in `app/contact/page.tsx`

### Styling

1. **Colors**: Modify `tailwind.config.ts`
2. **Global styles**: Update `app/globals.css`
3. **Component styles**: Edit individual components
4. **Theme customization**: Update theme colors and variables

### Content

1. **About page**: Update `app/about/page.tsx`
2. **Projects**: Modify `app/projects/page.tsx`
3. **Blog posts**: Add new posts in `app/blog/`
4. **Speaking**: Update `app/speaking/page.tsx`
5. **Uses**: Modify `app/uses/page.tsx`

### Components

1. **Timeline**: Update career milestones in `components/Timeline.tsx`
2. **Skills Matrix**: Modify skills in `components/SkillsMatrix.tsx`
3. **Hero Section**: Customize `components/SimpleAnimatedHero.tsx`
4. **Footer**: Update `components/Footer.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on every push

### Other Platforms

#### Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `.next`
3. **Add environment variables**

#### Railway

1. **Connect repository**
2. **Add environment variables**
3. **Deploy automatically**

#### Docker

```dockerfile
FROM node:20-alpine as deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

FROM node:20-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Next Steps

### Immediate Actions

1. **Test your setup** by running `npm run dev`
2. **Customize your content** with your information
3. **Test all pages** to ensure everything works
4. **Deploy to your chosen platform**

### Advanced Customization

1. **Add new pages** following the existing structure
2. **Create custom components** for unique features
3. **Integrate additional APIs** for dynamic content
4. **Optimize performance** using Next.js features

### Content Creation

1. **Write blog posts** about your projects
2. **Add project details** with screenshots
3. **Update your resume** regularly
4. **Keep testimonials current**

## 🔍 Troubleshooting

### Common Issues

1. **Build errors**: Check Node.js version and dependencies
2. **Environment variables**: Verify `.env.local` configuration
3. **GitHub API**: Ensure token has correct permissions
4. **Styling issues**: Check TailwindCSS configuration

### Getting Help

- **Documentation**: Check [troubleshooting guide](troubleshooting.md)
- **GitHub Issues**: [Create an issue](https://github.com/voxhash/engineerview-portfolio/issues)
- **Community**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Email**: contact@voxhash.dev

## 📖 Additional Resources

- [Quick Start Guide](quick-start.md) - For experienced developers
- [Configuration Guide](configuration.md) - Detailed configuration options
- [API Reference](api.md) - API documentation
- [Examples](examples/) - Code examples and tutorials
- [FAQ](faq.md) - Frequently asked questions

## 🎉 Congratulations!

You've successfully set up your EnginerView Portfolio! 

**What's next?**
- Customize it with your content
- Deploy it to your chosen platform
- Share it with the world
- Contribute to the project

**Need help?** Check our [Support Guide](../SUPPORT.md) or join our [community discussions](https://github.com/voxhash/engineerview-portfolio/discussions).

---

**Happy coding! 🚀**
