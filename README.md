# VoxHash Portfolio

A modern, feature-rich portfolio website showcasing professional work with advanced UI/UX enhancements, theme support, and comprehensive content management.

## ✨ Features

### 🎨 UI/UX Enhancements
- **Theme Toggle**: Dark/light/system theme support with localStorage persistence
- **Animated Hero**: Motion-powered background with gradient mesh and particle effects
- **Career Timeline**: Vertical stepper design showcasing professional milestones
- **Mobile Navigation**: Slide-in drawer menu for improved mobile experience
- **Micro-interactions**: Hover effects with scale and glow animations on project cards

### 📚 Content & Features
- **Blog System**: MDX support with styled prose for case studies and tutorials
- **Pinned Projects**: Curated project showcase reading from local JSON configuration
- **Speaking Page**: Professional speaking engagements, podcasts, and media features
- **Uses Page**: Comprehensive dev setup showcase with hardware, software, and tools
- **Skills Matrix**: Interactive skills visualization across frontend, backend, AI/ML, and infrastructure

### ⚙️ Development & Infrastructure
- **Analytics Ready**: Plausible analytics integration with privacy-first tracking
- **RSS Feed**: Automatic RSS/Atom feed generation for blog content
- **OG Images**: Dynamic Open Graph image generation using @vercel/og
- **Performance**: Lighthouse CI workflow for automated performance/SEO testing
- **Code Quality**: Prettier + ESLint configuration with Husky pre-commit hooks

### 💼 Career & Showcase
- **Resume Integration**: Inline PDF viewer with download and print options
- **Testimonials**: Client and peer feedback showcase system
- **Call-to-Action**: Professional availability banners and contact prompts
- **GitHub Integration**: Auto-pulled repository data with metrics and activity
- **Social Integration**: Comprehensive social media and professional network links

### 🚀 Technical Features
- **Auto-GitHub Integration**: Automatically fetches and displays GitHub repositories
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **SEO Optimized**: Complete meta tags, Open Graph, and Twitter Card support
- **Performance**: Built with Next.js 14 App Router and Server Components
- **TypeScript**: Full type safety throughout the application
- **Theme System**: Advanced theme management with system preference detection

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom animations and theme system
- **Animations**: CSS animations and transitions (Framer Motion ready)
- **Icons**: Lucide React icon library
- **Content**: MDX support for blog posts and documentation
- **Analytics**: Plausible analytics integration
- **Deployment**: Vercel-ready (or any Node.js hosting)

## 🛠️ Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/voxhash/website.git
   cd website
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Configure your environment variables:**
   ```env
   GITHUB_USERNAME=your-github-username
   GITHUB_TOKEN=your-github-token  # Optional but recommended for higher rate limits
   CONTACT_EMAIL=your-email@domain.com
   SITE_URL=https://your-domain.com
   SOCIAL_HANDLE=your-social-handle
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
voxhash.dev/
├── app/                           # Next.js App Router pages
│   ├── about/                    # About page with skills matrix
│   ├── blog/                     # Blog system with MDX support
│   │   └── building-scalable-nextjs-apps/
│   ├── contact/                  # Contact page
│   ├── projects/                 # Projects showcase
│   ├── speaking/                 # Speaking engagements
│   ├── uses/                     # Dev setup and tools
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   ├── globals.css               # Global styles with theme support
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Home page with animated hero
├── components/                   # Reusable UI components
│   ├── Footer.tsx                # Site footer
│   ├── Header.tsx                # Navigation with mobile drawer
│   ├── ProjectGrid.tsx           # GitHub repos grid
│   ├── RepoCard.tsx              # Individual repo card with animations
│   ├── SocialRow.tsx             # Social media links
│   ├── ThemeProvider.tsx         # Theme context provider
│   ├── ThemeToggle.tsx           # Theme switcher component
│   ├── Timeline.tsx              # Career timeline component
│   ├── SkillsMatrix.tsx          # Skills visualization
│   ├── PinnedProjects.tsx        # Curated projects showcase
│   ├── SimpleAnimatedHero.tsx    # Animated hero section
│   └── SimplePinnedProjects.tsx  # Static projects component
├── data/                         # Data configuration
│   └── pinned.json              # Pinned projects configuration
├── lib/                          # Utility functions
│   ├── github.ts                 # GitHub API integration
│   └── site.ts                   # Site configuration
├── public/                       # Static assets
│   ├── favicon.ico
│   ├── og.png                   # Open Graph image
│   └── VoxHash_Resume.pdf       # Resume PDF
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts            # Tailwind configuration with themes
├── next.config.mjs               # Next.js configuration
└── README.md
```

## 🎨 Customization

### Personal Information
Edit `lib/site.ts` to update:
- Your name and handle
- Bio and description
- Contact email
- Site URL
- Keywords for SEO

### Styling
- **Colors**: Modify `tailwind.config.ts` to change the brand colors
- **Global Styles**: Update `app/globals.css` for custom CSS
- **Components**: Customize individual components in the `components/` directory
- **Themes**: Customize light/dark mode colors in `globals.css`

### Content
- **Resume**: Replace `/public/VoxHash_Resume.pdf` with your resume
- **Pinned Projects**: Edit `data/pinned.json` to showcase your best work
- **Timeline**: Update career milestones in `components/Timeline.tsx`
- **Skills**: Modify skills matrix in `components/SkillsMatrix.tsx`
- **Blog Posts**: Add new posts in `app/blog/` directory
- **Speaking**: Update speaking engagements in `app/speaking/page.tsx`
- **Uses**: Update your dev setup in `app/uses/page.tsx`
- **Social Links**: Update social media URLs in `components/SocialRow.tsx`
- **Pages**: Customize individual pages in the `app/` directory

## 🚀 Deployment

### Vercel (Recommended)
1. Import your repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Docker
```dockerfile
FROM node:20-alpine as deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm i --silent

FROM node:20-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms
This is a standard Next.js application and can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Google Cloud Run

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Quality
- **ESLint**: Configured with Next.js and Prettier rules
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks for code quality
- **TypeScript**: Full type safety

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GITHUB_USERNAME` | Your GitHub username | No | `exampleUser` |
| `GITHUB_TOKEN` | GitHub personal access token | No | - |
| `CONTACT_EMAIL` | Your contact email | No | `example@example.dev` |
| `SITE_URL` | Your site URL | No | `http://localhost:3000` |
| `SOCIAL_HANDLE` | Your social media handle | No | `socialUser` |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/)
- Theme management by [next-themes](https://github.com/pacocoursey/next-themes)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons and design inspired by modern portfolio trends

---

**Made with ❤️ by VoxHash**
