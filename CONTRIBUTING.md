# 🤝 Contributing Guide

First off, thank you for considering contributing to badhope's Starbase! It's people like you that make this project better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## How Can I Contribute?

### Report Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots or animated GIFs if possible**
- **Include your browser and OS information**

### Suggest Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain the expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Follow the coding standards
- Include screenshots and animated GIFs in your pull request whenever possible
- Follow the commit guidelines

---

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 or yarn >= 1.22.0
- Git

### Setup Steps

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/badhope.github.io.git
cd badhope.github.io

# Install dependencies
npm install

# Create a branch for your changes
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── 3d/          # 3D components
│   ├── animations/  # Animation components
│   ├── effects/     # Effect components
│   ├── sections/    # Page sections
│   ├── ui/          # UI components
│   └── settings/    # Settings panel
├── config/          # Configuration files
├── lib/             # Utility libraries
├── hooks/           # Custom React hooks
├── styles/          # Global styles
└── types/           # TypeScript types
```

---

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Follow the [React Hooks rules](https://reactjs.org/docs/hooks-rules.html)
- Keep components small and focused
- Use CSS Modules for styling

### CSS

- Use CSS Modules for component styles
- Follow the existing naming conventions
- Use CSS variables for theming
- Ensure responsive design

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add trailing commas in multiline objects/arrays

### Linting

Run ESLint before submitting:

```bash
npm run lint
```

Fix any issues before committing.

---

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that do not affect the code meaning |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf` | A code change that improves performance |
| `test` | Adding missing tests or correcting existing tests |
| `chore` | Changes to the build process or auxiliary tools |

### Examples

```bash
feat(ai): add support for Claude AI model
fix(navigation): resolve mobile menu close issue
docs(readme): update installation instructions
style(hero): improve animation timing
refactor(components): extract common button styles
```

---

## Pull Request Process

1. **Fork** the repository and create your branch from `main`
2. **Make** your changes following the coding standards
3. **Test** your changes thoroughly
4. **Commit** your changes with a clear commit message
5. **Push** to your fork and submit a pull request
6. **Wait** for review and address any feedback

### PR Checklist

- [ ] Code follows the project's coding standards
- [ ] All tests pass
- [ ] No linting errors
- [ ] Documentation updated if necessary
- [ ] Commit messages follow the guidelines
- [ ] PR description is clear and complete

---

## Getting Help

- Open a [Discussion](https://github.com/badhope/badhope.github.io/discussions) for questions
- Join our community for updates and discussions

---

Thank you for contributing! 🎉
