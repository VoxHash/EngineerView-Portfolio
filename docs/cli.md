# CLI Commands

This guide covers all available command-line interface commands for EnginerView Portfolio.

## 📋 Table of Contents

- [Available Commands](#available-commands)
- [Development Commands](#development-commands)
- [Build Commands](#build-commands)
- [Code Quality Commands](#code-quality-commands)
- [Testing Commands](#testing-commands)
- [Deployment Commands](#deployment-commands)
- [Custom Scripts](#custom-scripts)

## 🚀 Available Commands

### View All Commands

```bash
# Show all available commands
npm run

# Show help for specific command
npm run <command> --help
```

## 🔧 Development Commands

### Start Development Server

```bash
# Start development server
npm run dev

# Start with specific port
PORT=3001 npm run dev

# Start with custom host
HOST=0.0.0.0 npm run dev

# Start with debug mode
DEBUG=* npm run dev
```

**Options:**
- `--port`: Specify port number (default: 3000)
- `--hostname`: Specify hostname (default: localhost)
- `--turbo`: Enable Turbopack (experimental)

### Development with Custom Configuration

```bash
# Start with custom environment
NODE_ENV=development npm run dev

# Start with specific config
npm run dev -- --config custom.config.js

# Start with verbose logging
npm run dev -- --verbose
```

## 🏗️ Build Commands

### Build for Production

```bash
# Build the application
npm run build

# Build with specific environment
NODE_ENV=production npm run build

# Build with custom output directory
npm run build -- --outdir dist

# Build with source maps
npm run build -- --sourcemap
```

### Build Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Generate build report
npm run build -- --report

# Build with performance profiling
npm run build -- --profile
```

### Start Production Server

```bash
# Start production server
npm run start

# Start with specific port
PORT=3000 npm run start

# Start with custom host
HOST=0.0.0.0 npm run start
```

## 🔍 Code Quality Commands

### Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Lint specific files
npm run lint -- src/components/Header.tsx

# Lint with custom config
npm run lint -- --config .eslintrc.custom.js
```

### Code Formatting

```bash
# Format code with Prettier
npm run format

# Check formatting without fixing
npm run format:check

# Format specific files
npm run format -- src/components/Header.tsx

# Format with custom config
npm run format -- --config .prettierrc.custom.js
```

### Type Checking

```bash
# Run TypeScript type checking
npm run type-check

# Type check with watch mode
npm run type-check -- --watch

# Type check specific files
npm run type-check -- src/components/Header.tsx

# Type check with strict mode
npm run type-check -- --strict
```

## 🧪 Testing Commands

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- src/components/Header.test.tsx

# Run tests with custom config
npm test -- --config jest.config.custom.js
```

### Test Coverage

```bash
# Generate coverage report
npm run test:coverage

# Coverage with HTML report
npm run test:coverage -- --coverageReporters=html

# Coverage with specific threshold
npm run test:coverage -- --coverageThreshold=80
```

## 🚀 Deployment Commands

### Vercel Deployment

```bash
# Deploy to Vercel
npx vercel

# Deploy to production
npx vercel --prod

# Deploy with custom environment
npx vercel --env production

# Deploy with custom build command
npx vercel --build-env NODE_ENV=production
```

### Docker Deployment

```bash
# Build Docker image
docker build -t engineerview-portfolio .

# Run Docker container
docker run -p 3000:3000 engineerview-portfolio

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production engineerview-portfolio
```

### Static Export

```bash
# Export static site
npm run export

# Export with custom output directory
npm run export -- --outdir dist

# Export with custom base path
npm run export -- --basepath /portfolio
```

## 🛠️ Custom Scripts

### Database Commands

```bash
# Run database migrations
npm run db:migrate

# Seed database
npm run db:seed

# Reset database
npm run db:reset

# Generate database schema
npm run db:generate
```

### Content Management

```bash
# Generate sitemap
npm run sitemap:generate

# Generate RSS feed
npm run rss:generate

# Generate OG images
npm run og:generate

# Optimize images
npm run images:optimize
```

### Analytics

```bash
# Generate analytics report
npm run analytics:report

# Export analytics data
npm run analytics:export

# Clear analytics cache
npm run analytics:clear
```

## 📊 Performance Commands

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Analyze with webpack-bundle-analyzer
npm run analyze:bundle

# Analyze with source-map-explorer
npm run analyze:source
```

### Performance Testing

```bash
# Run Lighthouse CI
npm run lighthouse

# Run performance tests
npm run test:performance

# Generate performance report
npm run performance:report
```

## 🔧 Utility Commands

### Clean Commands

```bash
# Clean build artifacts
npm run clean

# Clean node_modules
npm run clean:deps

# Clean all generated files
npm run clean:all
```

### Update Commands

```bash
# Update dependencies
npm run update

# Update to latest versions
npm run update:latest

# Check for outdated packages
npm run outdated
```

### Validation Commands

```bash
# Validate configuration
npm run validate

# Validate environment variables
npm run validate:env

# Validate build
npm run validate:build
```

## 🐛 Debug Commands

### Debug Mode

```bash
# Start with debug mode
npm run dev:debug

# Debug with specific port
npm run dev:debug -- --port 9229

# Debug with inspector
npm run dev:debug -- --inspect
```

### Logging

```bash
# Start with verbose logging
npm run dev -- --verbose

# Start with debug logging
DEBUG=* npm run dev

# Start with specific log level
LOG_LEVEL=debug npm run dev
```

## 📝 Script Configuration

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "analyze": "cross-env ANALYZE=true npm run build",
    "lighthouse": "lighthouse-ci",
    "clean": "rimraf .next",
    "clean:deps": "rimraf node_modules",
    "clean:all": "npm run clean && npm run clean:deps"
  }
}
```

### Custom Scripts

Create custom scripts in `scripts/` directory:

```bash
# Create scripts directory
mkdir scripts

# Create custom script
touch scripts/deploy.sh
```

Example custom script:

```bash
#!/bin/bash
# scripts/deploy.sh

echo "Building application..."
npm run build

echo "Running tests..."
npm test

echo "Deploying to production..."
npx vercel --prod

echo "Deployment complete!"
```

## 🔍 Troubleshooting

### Common Issues

1. **Command not found**:
   ```bash
   # Check if command exists
   npm run <command> --help
   
   # Check package.json scripts
   cat package.json | grep scripts -A 20
   ```

2. **Permission denied**:
   ```bash
   # Fix permissions
   chmod +x scripts/deploy.sh
   
   # Run with sudo (if needed)
   sudo npm run <command>
   ```

3. **Port already in use**:
   ```bash
   # Kill process on port
   lsof -ti:3000 | xargs kill -9
   
   # Use different port
   PORT=3001 npm run dev
   ```

### Debug Commands

```bash
# Show environment variables
npm run env

# Show Node.js version
node --version

# Show npm version
npm --version

# Show installed packages
npm list --depth=0
```

## 📚 Next Steps

1. **Explore examples**: Check [Examples](examples/) for command usage
2. **Read API docs**: See [API Reference](api.md) for detailed API information
3. **Customize scripts**: Create your own custom commands
4. **Deploy**: Use deployment commands to deploy your portfolio

## 🆘 Getting Help

- **Command help**: `npm run <command> --help`
- **Documentation**: [Complete Guide](getting-started.md)
- **Issues**: [GitHub Issues](https://github.com/voxhash/engineerview-portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Email**: contact@voxhash.dev

---

**Happy coding! 🚀**
