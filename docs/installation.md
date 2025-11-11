# Installation Guide

This guide provides detailed installation instructions for EnginerView Portfolio on various platforms and environments.

## 📋 Table of Contents

- [System Requirements](#system-requirements)
- [Installation Methods](#installation-methods)
- [Environment Setup](#environment-setup)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## 🔧 System Requirements

### Minimum Requirements

- **Node.js**: 18.0.0 or later
- **npm**: 9.0.0 or later
- **Git**: 2.0.0 or later
- **RAM**: 4GB minimum
- **Storage**: 1GB free space

### Recommended Requirements

- **Node.js**: 20.0.0 or later
- **npm**: 10.0.0 or later
- **Git**: 2.40.0 or later
- **RAM**: 8GB or more
- **Storage**: 2GB free space

### Supported Operating Systems

- **Windows**: 10, 11
- **macOS**: 12.0 (Monterey) or later
- **Linux**: Ubuntu 20.04+, CentOS 8+, Debian 11+

## 🚀 Installation Methods

### Method 1: Git Clone (Recommended)

#### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/voxhash/engineerview-portfolio.git

# Navigate to project directory
cd engineerview-portfolio

# Verify clone was successful
ls -la
```

#### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

#### Step 3: Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit environment file
nano .env.local
# or
code .env.local
```

### Method 2: Download ZIP

#### Step 1: Download

1. Visit [GitHub Repository](https://github.com/voxhash/engineerview-portfolio)
2. Click "Code" → "Download ZIP"
3. Extract to your desired location

#### Step 2: Install Dependencies

```bash
# Navigate to extracted folder
cd engineerview-portfolio

# Install dependencies
npm install
```

#### Step 3: Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit environment file
nano .env.local
```

### Method 3: Fork and Clone

#### Step 1: Fork Repository

1. Visit [GitHub Repository](https://github.com/voxhash/engineerview-portfolio)
2. Click "Fork" button
3. Select your GitHub account

#### Step 2: Clone Your Fork

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/engineerview-portfolio.git

# Navigate to project directory
cd engineerview-portfolio

# Add upstream remote
git remote add upstream https://github.com/voxhash/engineerview-portfolio.git
```

#### Step 3: Install Dependencies

```bash
# Install dependencies
npm install
```

## ⚙️ Environment Setup

### Required Environment Variables

Create `.env.local` file with the following variables:

```env
# GitHub Integration
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token

# Contact Information
CONTACT_EMAIL=your-email@domain.com
SITE_URL=https://your-domain.com

# Social Media (Optional)
SOCIAL_HANDLE=your-social-handle
```

### Optional Environment Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Service
RESEND_API_KEY=your-resend-api-key
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password

# Medium Integration
MEDIUM_USERNAME=your-medium-username

# Reddit Integration (for Feed page)
REDDIT_USERNAME=your-reddit-username
REDDIT_SUBREDDIT=programming
```

### Environment Variable Details

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `GITHUB_USERNAME` | Yes | Your GitHub username | - |
| `GITHUB_TOKEN` | No | GitHub personal access token | - |
| `CONTACT_EMAIL` | Yes | Your contact email | - |
| `SITE_URL` | Yes | Your site URL | `http://localhost:3000` |
| `SOCIAL_HANDLE` | No | Your social media handle | - |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 Measurement ID | - |
| `RESEND_API_KEY` | No | Resend API key | - |
| `SMTP_HOST` | No | SMTP server host | - |
| `SMTP_PORT` | No | SMTP server port | 587 |
| `SMTP_USER` | No | SMTP username | - |
| `SMTP_PASS` | No | SMTP password | - |
| `MEDIUM_USERNAME` | No | Medium username | - |
| `REDDIT_USERNAME` | No | Reddit username (for feed page) | - |
| `REDDIT_SUBREDDIT` | No | Fallback subreddit if user posts fail | `programming` |

## 🔍 Verification

### Step 1: Check Installation

```bash
# Check Node.js version
node --version
# Should be 18.0.0 or later

# Check npm version
npm --version
# Should be 9.0.0 or later

# Check Git version
git --version
# Should be 2.0.0 or later
```

### Step 2: Verify Dependencies

```bash
# Check installed packages
npm list --depth=0

# Check for vulnerabilities
npm audit

# Fix vulnerabilities (if any)
npm audit fix
```

### Step 3: Test Build

```bash
# Test TypeScript compilation
npm run type-check

# Test linting
npm run lint

# Test build
npm run build

# Test production start
npm run start
```

### Step 4: Test Development Server

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
# Verify the site loads correctly
```

## 🐛 Troubleshooting

### Common Installation Issues

#### Node.js Version Issues

**Problem**: "Node.js version not supported"

**Solution**:
```bash
# Check current version
node --version

# Update Node.js
# Visit https://nodejs.org/ and download latest LTS version
# Or use nvm (Node Version Manager)

# Install nvm (Linux/macOS)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install nvm (Windows)
# Download from https://github.com/coreybutler/nvm-windows

# Install latest LTS Node.js
nvm install --lts
nvm use --lts
```

#### npm Installation Issues

**Problem**: "npm install fails"

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Permission Issues

**Problem**: "EACCES permission denied"

**Solution**:
```bash
# Fix npm permissions (Linux/macOS)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use nvm to avoid permission issues
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

#### Build Issues

**Problem**: "Build fails with errors"

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Try build again
npm run build
```

### Environment Issues

#### Environment Variables Not Loading

**Problem**: "Environment variables not working"

**Solution**:
```bash
# Check .env.local exists
ls -la .env.local

# Verify file format (no spaces around =)
cat .env.local

# Restart development server
npm run dev
```

#### GitHub API Issues

**Problem**: "GitHub API rate limit exceeded"

**Solution**:
```bash
# Add GitHub token to .env.local
echo "GITHUB_TOKEN=your-github-token" >> .env.local

# Restart development server
npm run dev
```

### Platform-Specific Issues

#### Windows Issues

**Problem**: "Scripts not running"

**Solution**:
```bash
# Use PowerShell or Command Prompt as Administrator
# Or use Git Bash

# Check execution policy
Get-ExecutionPolicy

# Set execution policy (if needed)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### macOS Issues

**Problem**: "Command not found"

**Solution**:
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js via Homebrew
brew install node
```

#### Linux Issues

**Problem**: "Permission denied"

**Solution**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

## 📚 Next Steps

After successful installation:

1. **Configure your portfolio**: See [Configuration Guide](configuration.md)
2. **Customize content**: See [Getting Started Guide](getting-started.md)
3. **Deploy your portfolio**: See [Deployment Guide](deployment.md)
4. **Explore examples**: See [Examples](examples/)

## 🆘 Getting Help

If you're still having issues:

- **Check documentation**: [Complete Guide](getting-started.md)
- **Search issues**: [GitHub Issues](https://github.com/voxhash/engineerview-portfolio/issues)
- **Ask community**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Contact support**: contact@voxhash.dev

---

**Installation complete! 🎉**
