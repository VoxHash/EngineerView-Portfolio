# EnginerView Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)

A modern, feature-rich portfolio website showcasing professional work with advanced UI/UX enhancements, theme support, and comprehensive content management.

## ✨ Features

- 🎨 **Theme Toggle**: Dark/light/system theme support with localStorage persistence
- 🚀 **Animated Hero**: Motion-powered background with gradient mesh and particle effects
- 📱 **Mobile Navigation**: Slide-in drawer menu for improved mobile experience
- 💼 **Career Timeline**: Vertical stepper design showcasing professional milestones
- 📚 **Blog System**: MDX support with styled prose for case studies and tutorials
- 🔧 **Uses Page**: Comprehensive dev setup showcase with hardware, software, and tools
- 📊 **Analytics**: Plausible analytics integration with privacy-first tracking
- 🎯 **SEO Optimized**: Complete meta tags, Open Graph, and Twitter Card support
- ⚡ **Performance**: Built with Next.js 14 App Router and Server Components

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/voxhash/engineerview-portfolio.git
   cd engineerview-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Installation

### Prerequisites

- Node.js 18.0 or later
- npm 9.0 or later

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# GitHub Integration
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token

# Contact Information
CONTACT_EMAIL=contact@voxhash.dev
SITE_URL=https://voxhash.dev

# Analytics
PLAUSIBLE_DOMAIN=voxhash.dev
PLAUSIBLE_API_KEY=your-plausible-api-key

# Email Service (Optional)
RESEND_API_KEY=your-resend-api-key
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

## 🛠️ Usage

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Customization

1. **Personal Information**: Edit `lib/site.ts`
2. **Styling**: Modify `tailwind.config.ts` and `app/globals.css`
3. **Content**: Update pages in the `app/` directory
4. **Components**: Customize components in the `components/` directory

## ⚙️ Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GITHUB_USERNAME` | Your GitHub username | No | `voxhash` |
| `GITHUB_TOKEN` | GitHub personal access token | No | - |
| `CONTACT_EMAIL` | Your contact email | Yes | `contact@voxhash.dev` |
| `SITE_URL` | Your site URL | Yes | `https://voxhash.dev` |
| `PLAUSIBLE_DOMAIN` | Plausible analytics domain | No | - |
| `PLAUSIBLE_API_KEY` | Plausible API key | No | - |
| `RESEND_API_KEY` | Resend API key for email | No | - |

## 📚 Examples

### Basic Portfolio Setup

```typescript
// lib/site.ts
export const siteConfig = {
  name: "VoxHash",
  handle: "@voxhash",
  description: "Full-stack developer and tech enthusiast",
  url: "https://voxhash.dev",
  email: "contact@voxhash.dev",
  keywords: ["developer", "portfolio", "nextjs", "typescript"],
};
```

### Custom Theme Configuration

```typescript
// tailwind.config.ts
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
      },
    },
  },
};
```

## 🗺️ Roadmap

- [ ] **v2.1.0**: Enhanced blog system with comments
- [ ] **v2.2.0**: Multi-language support
- [ ] **v2.3.0**: Advanced project filtering
- [ ] **v2.4.0**: Integration with more platforms
- [ ] **v3.0.0**: Complete UI redesign

See [ROADMAP.md](ROADMAP.md) for detailed roadmap information.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security vulnerabilities, please see [SECURITY.md](SECURITY.md).

## 📞 Support

Need help? Check out our [Support Guide](SUPPORT.md) or contact us at contact@voxhash.dev.

---

**Made with ❤️ by VoxHash**
