# Quick Start Guide

Get your EnginerView Portfolio up and running in minutes! This guide is perfect for experienced developers who want to get started quickly.

## ⚡ 5-Minute Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/voxhash/engineerview-portfolio.git
cd engineerview-portfolio

# Install dependencies
npm install
```

### 2. Environment Setup

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

### 3. Start Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 🎯 Essential Configuration

### Personal Information

Edit `lib/site.ts`:

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "@yourhandle",
  description: "Your professional description",
  url: "https://your-domain.com",
  email: "your-email@domain.com",
};
```

### Pinned Projects

Edit `data/pinned.json`:

```json
[
  {
    "name": "Your Project",
    "description": "Project description",
    "url": "https://project-url.com",
    "github": "https://github.com/username/project",
    "technologies": ["React", "TypeScript"],
    "featured": true
  }
]
```

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

### Option 2: GitHub Integration

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript checking
```

## 📁 Project Structure

```
engineerview-portfolio/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── data/               # Configuration data
├── lib/                # Utility functions
├── public/             # Static assets
├── docs/               # Documentation
└── .github/            # GitHub templates
```

## 🎨 Quick Customization

### Colors
Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#your-color',
  },
}
```

### Content
- **About**: `app/about/page.tsx`
- **Projects**: `app/projects/page.tsx`
- **Blog**: `app/blog/`
- **Resume**: Replace `/public/VoxHash_Resume.pdf`

## 🔍 Troubleshooting

### Common Issues

**Build fails:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Environment variables not working:**
- Check `.env.local` exists
- Restart development server
- Verify variable names match exactly

**GitHub API issues:**
- Verify `GITHUB_USERNAME` is correct
- Check `GITHUB_TOKEN` permissions
- Ensure repository is public

## 📚 Next Steps

1. **Customize content** with your information
2. **Add projects** to showcase your work
3. **Write blog posts** about your experience
4. **Deploy** to your chosen platform
5. **Share** with the world!

## 🆘 Need Help?

- **Documentation**: [Complete Guide](getting-started.md)
- **Issues**: [GitHub Issues](https://github.com/voxhash/engineerview-portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Email**: contact@voxhash.dev

---

**That's it! Your portfolio is ready to go! 🎉**
