# Contributing to EnginerView Portfolio

Thank you for your interest in contributing to the EnginerView Portfolio project! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)

## 📜 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm 9.0 or later
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/engineerview-portfolio.git
   cd engineerview-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Making Changes

### Branch Naming

Use descriptive branch names that indicate the type of change:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions or updates

### Commit Messages

Follow the conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(ui): add dark mode toggle`
- `fix(api): resolve GitHub API rate limiting`
- `docs(readme): update installation instructions`

### Code Quality

Before submitting a pull request, ensure:

1. **Code passes all checks:**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

2. **Code is formatted:**
   ```bash
   npm run format
   ```

3. **Tests pass (if applicable):**
   ```bash
   npm test
   ```

## 📝 Pull Request Process

### Before Submitting

1. **Update documentation** if you've changed APIs or added features
2. **Add tests** for new functionality
3. **Update the changelog** if applicable
4. **Ensure all checks pass**

### Pull Request Template

When creating a pull request, please include:

- **Description**: What changes were made and why
- **Type**: Feature, bug fix, documentation, etc.
- **Testing**: How the changes were tested
- **Screenshots**: If applicable, include before/after screenshots
- **Breaking Changes**: List any breaking changes

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** on different environments
4. **Approval** from at least one maintainer

## 🐛 Issue Guidelines

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check if it's already fixed** in the latest version
3. **Gather information** about your environment

### Bug Reports

When reporting bugs, include:

- **Environment**: OS, Node.js version, browser
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Error messages**: Full error logs

### Feature Requests

When requesting features, include:

- **Use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Other solutions considered
- **Additional context**: Any other relevant information

## 📏 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use strict type checking

### React/Next.js

- Use functional components with hooks
- Follow Next.js 14 App Router patterns
- Use Server Components when possible
- Implement proper error boundaries

### Styling

- Use TailwindCSS for styling
- Follow mobile-first responsive design
- Use semantic HTML elements
- Ensure accessibility compliance

### File Organization

- Keep components small and focused
- Use descriptive file and folder names
- Group related files together
- Follow the existing project structure

## 🧪 Testing

### Manual Testing

- Test on different screen sizes
- Verify theme switching works
- Check all interactive elements
- Test form submissions

### Automated Testing

- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for critical user flows

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex logic
- Include usage examples
- Keep README files updated

### API Documentation

- Document all API endpoints
- Include request/response examples
- Specify error codes and messages
- Keep documentation in sync with code

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

- **UI/UX improvements**
- **Performance optimizations**
- **Accessibility enhancements**
- **Documentation improvements**
- **Test coverage**
- **Bug fixes**
- **New features**

## 📞 Getting Help

If you need help or have questions:

- **GitHub Discussions**: For general questions
- **Issues**: For bug reports and feature requests
- **Email**: contact@voxhash.dev for direct contact

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **CHANGELOG.md** for significant contributions
- **Release notes** for major features

Thank you for contributing to EnginerView Portfolio! 🎉
