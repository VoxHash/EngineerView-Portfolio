# Frequently Asked Questions

This FAQ addresses the most common questions about EnginerView Portfolio.

## 📋 Table of Contents

- [General Questions](#general-questions)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Customization](#customization)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ❓ General Questions

### What is EnginerView Portfolio?

EnginerView Portfolio is a modern, feature-rich portfolio website template built with Next.js 14, TypeScript, and TailwindCSS. It's designed for developers, designers, and professionals who want to showcase their work with a professional, customizable website.

### Who is this for?

This portfolio template is perfect for:
- **Developers** showcasing their projects and skills
- **Designers** displaying their creative work
- **Students** building their first portfolio
- **Professionals** updating their online presence
- **Freelancers** attracting clients
- **Anyone** wanting a modern, professional website

### What makes this different from other portfolio templates?

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and TailwindCSS
- **Performance Focused**: Optimized for Core Web Vitals and SEO
- **Fully Customizable**: Easy to modify colors, content, and layout
- **GitHub Integration**: Automatically fetches and displays your repositories
- **Analytics Ready**: Built-in support for Google Analytics 4
- **Mobile First**: Responsive design that works on all devices
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO Optimized**: Complete meta tags and structured data

### Is this free to use?

Yes! EnginerView Portfolio is open source and free to use under the MIT License. You can use it for personal or commercial projects.

### Do I need to know how to code?

While some coding knowledge is helpful, the template is designed to be beginner-friendly. You can customize most content through configuration files without touching code.

## 🚀 Installation & Setup

### What are the requirements?

- **Node.js**: 18.0 or later
- **npm**: 9.0 or later
- **Git**: For version control
- **Basic knowledge**: HTML, CSS, and JavaScript (helpful but not required)

### How do I install it?

1. **Clone the repository**:
   ```bash
   git clone https://github.com/voxhash/engineerview-portfolio.git
   cd engineerview-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your information
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

### Do I need a GitHub account?

A GitHub account is recommended but not required. The portfolio can automatically fetch and display your repositories, but you can also manually add projects.

### What if I don't have a GitHub token?

You can use the portfolio without a GitHub token, but you'll have lower API rate limits. For the best experience, create a GitHub personal access token with `public_repo` scope.

## ⚙️ Configuration

### How do I change my personal information?

Edit `lib/site.ts` to update your personal information:

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "@yourhandle",
  description: "Your professional description",
  email: "your-email@domain.com",
  // ... other settings
};
```

### How do I add my projects?

You can add projects in two ways:

1. **Automatic (GitHub integration)**:
   - Set `GITHUB_USERNAME` in `.env.local`
   - Projects will be fetched automatically

2. **Manual (pinned projects)**:
   - Edit `data/pinned.json`
   - Add your best projects manually

### How do I customize the theme?

Edit `tailwind.config.ts` to customize colors, fonts, and other design elements:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#your-color',
        },
      },
    },
  },
};
```

### How do I add blog posts?

1. **Create a new blog post**:
   ```bash
   mkdir app/blog/your-post-slug
   touch app/blog/your-post-slug/page.tsx
   ```

2. **Add content**:
   ```typescript
   export default function BlogPost() {
     return (
       <div className="container mx-auto px-4 py-8">
         <article className="prose prose-lg max-w-none">
           <h1>Your Blog Post Title</h1>
           <p>Your content...</p>
         </article>
       </div>
     );
   }
   ```

3. **Update blog index** in `app/blog/page.tsx`

## 🎨 Customization

### How do I change the colors?

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    500: '#your-primary-color',
  },
  secondary: {
    500: '#your-secondary-color',
  },
}
```

### How do I add new pages?

1. **Create page directory**:
   ```bash
   mkdir app/your-page
   touch app/your-page/page.tsx
   ```

2. **Add page content**:
   ```typescript
   export default function YourPage() {
     return (
       <div className="container mx-auto px-4 py-8">
         <h1>Your Page Title</h1>
         <p>Your content...</p>
       </div>
     );
   }
   ```

3. **Add to navigation** in `components/Header.tsx`

### How do I add custom components?

1. **Create component file**:
   ```bash
   touch components/YourComponent.tsx
   ```

2. **Add component code**:
   ```typescript
   interface YourComponentProps {
     // Define props
   }
   
   export default function YourComponent({ ...props }: YourComponentProps) {
     return (
       <div>
         {/* Your component JSX */}
       </div>
     );
   }
   ```

3. **Import and use** in your pages

### How do I customize the hero section?

Edit `components/SimpleAnimatedHero.tsx` or create your own hero component:

```typescript
export default function CustomHero() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6">Your Name</h1>
        <p className="text-xl text-gray-600">Your Title</p>
      </div>
    </div>
  );
}
```

## 🚀 Deployment

### How do I deploy to Vercel?

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

### How do I deploy to Netlify?

1. **Build command**: `npm run build`
2. **Publish directory**: `.next`
3. **Add environment variables** in Netlify dashboard

### How do I deploy to other platforms?

The portfolio can be deployed to any platform that supports Node.js:
- **Railway**: Connect GitHub repository
- **DigitalOcean**: Use App Platform
- **AWS**: Use Amplify or EC2
- **Google Cloud**: Use Cloud Run
- **Docker**: Use the provided Dockerfile

### Do I need a custom domain?

A custom domain is not required but recommended for a professional appearance. You can use the default Vercel/Netlify domain or connect your own domain.

## 🐛 Troubleshooting

### Why is my build failing?

Common build issues and solutions:

1. **TypeScript errors**: Run `npm run type-check` to identify issues
2. **Missing dependencies**: Run `npm install` to install all packages
3. **Environment variables**: Check `.env.local` file
4. **Node.js version**: Ensure you're using Node.js 18+

### Why aren't my GitHub repositories showing?

1. **Check username**: Verify `GITHUB_USERNAME` in `.env.local`
2. **Check token**: Add `GITHUB_TOKEN` for higher rate limits
3. **Check repositories**: Ensure repositories are public
4. **Check API limits**: GitHub has rate limits for API calls

### Why is the theme not working?

1. **Check TailwindCSS config**: Ensure `darkMode: 'class'` is set
2. **Check ThemeProvider**: Ensure it wraps your app
3. **Check hydration**: Use `suppressHydrationWarning` for theme elements

### Why are images not loading?

1. **Check paths**: Use absolute paths starting with `/`
2. **Check domains**: Add external domains to `next.config.mjs`
3. **Check Image component**: Use Next.js `Image` component

### How do I debug issues?

1. **Check console**: Open browser DevTools for errors
2. **Check build logs**: Look for errors during build
3. **Check environment**: Verify all environment variables
4. **Check documentation**: Refer to troubleshooting guide

## 🤝 Contributing

### How can I contribute?

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Submit a pull request**

### What can I contribute?

- **Bug fixes**: Fix issues and improve stability
- **Features**: Add new functionality
- **Documentation**: Improve guides and examples
- **Design**: Enhance UI/UX
- **Performance**: Optimize speed and efficiency

### How do I report bugs?

1. **Check existing issues**: Search for similar problems
2. **Create new issue**: Use the bug report template
3. **Provide details**: Include environment, steps to reproduce, and error messages

### How do I request features?

1. **Check roadmap**: See if it's already planned
2. **Create issue**: Use the feature request template
3. **Describe use case**: Explain why the feature is needed

## 📚 Additional Resources

### Where can I learn more?

- **Documentation**: [Complete Guide](getting-started.md)
- **Examples**: [Code Examples](examples/)
- **API Reference**: [API Documentation](api.md)
- **Configuration**: [Configuration Guide](configuration.md)

### Where can I get help?

- **GitHub Issues**: [Create an issue](https://github.com/voxhash/engineerview-portfolio/issues)
- **GitHub Discussions**: [Ask a question](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Email**: contact@voxhash.dev
- **Community**: Join our Discord server

### What's the best way to stay updated?

- **Watch the repository**: Get notified of new releases
- **Follow on Twitter**: @voxhash for updates
- **Join discussions**: Participate in GitHub Discussions
- **Check changelog**: Review [CHANGELOG.md](../CHANGELOG.md)

---

**Still have questions? [Ask us!](https://github.com/voxhash/engineerview-portfolio/discussions) 🚀**
