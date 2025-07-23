<picture>
  <source srcset="https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/microfrontends/mfe-banner-dark.png" media="(prefers-color-scheme: dark)">
  <source srcset="https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/microfrontends/mfe-banner-light.png" media="(prefers-color-scheme: light)">
  <img src="https://assets.vercel.com/image/upload/v1689795055/docs-assets/static/docs/microfrontends/mfe-banner-light.png" alt="hero banner">
</picture>

# Datadog RUM and @vercel/microfrontends Next.js Module Federation

This repo demonstrates how to combine Datadog RUM with Vercel's official Module Federation microfrontend application demo. This is a fork of Vercel's original repo, which you can find [here](https://github.com/vercel-labs/microfrontends-nextjs-pages-federation).

There are multiple strategies you could use to tie RUM events in Datadog to a particular microfrontend within your application. One approach is to [pass a custom name and service to startView()](https://docs.datadoghq.com/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names). Another option is to [override each event's service individually using beforeSend()](https://docs.datadoghq.com/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event). This repo demonstrates a `beforeSend()`-based approach.

You'll find the sample integration code in the `useDatadogRUM()` function in [apps/root/pages/index.tsx](./apps/root/pages/index.tsx). In the real world, your routing setup will be much more complex, but the core of the approach will remain the same: track the current service as the user switches between microfrontends, and use it to set `event.service` in your `beforeSend()` callback.

The rest of this README.md file has been preserved from Vercel's original demo repo; it contains instructions for testing the application locally. To actually send data to Datadog, in addition to following the instructions below, you'll need to set `clientToken` and `applicationId` in the `DD_RUM.init()` call in [apps/root/pages/index.tsx](./apps/root/pages/index.tsx). Try clicking on the `Log In` button or the logo in the navigation header to switch between pages in the demo app; you'll observe that the service changes on all events.

## 🚀 Deploy to Vercel

Deploy each microfrontend independently to experience the full power of distributed development:

| Application | Description                                            | Deploy                                                                                                                                                                                                                                                                                 |
| ----------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Root        | Main shell application orchestrating federated modules | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fmicrofrontends-nextjs-pages-module-federation&project-name=microfrontends-nextjs-pages-federation-root&root-directory=apps%2Froot)             |
| Content     | Content microfrontend exposing page components         | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fmicrofrontends-nextjs-pages-module-federation&project-name=microfrontends-nextjs-pages-federation-content&root-directory=apps%2Fcontent)       |
| Navigation  | Navigation microfrontend exposing header and footer    | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fmicrofrontends-nextjs-pages-module-federation&project-name=microfrontends-nextjs-pages-federation-navigation&root-directory=apps%2Fnavigation) |

## What You'll Learn

This example demonstrates real-world Module Federation patterns and best practices:

- 🔗 **Module Federation**: Share code between applications at runtime using Webpack's Module Federation
- 🏗️ **Microfrontend Architecture**: Build independent applications that compose into a unified experience
- ⚡ **Runtime Code Sharing**: Dynamically load and share components between applications
- 📦 **Federated Components**: Expose and consume React components across application boundaries
- 🚀 **Independent Deployments**: Deploy each microfrontend without affecting others
- 🎯 **Team Autonomy**: Enable teams to work independently while sharing code seamlessly

## Understanding Module Federation

Module Federation is a Webpack technology that enables multiple separate builds to form a single application. Unlike traditional microfrontends that communicate through URLs, Module Federation allows:

- **Runtime Code Sharing**: Import components from other applications at runtime
- **Shared Dependencies**: Efficiently share libraries like React between applications
- **Dynamic Imports**: Load federated modules on-demand for optimal performance
- **Version Management**: Handle different versions of shared dependencies automatically
- **Build-time Safety**: TypeScript support and compile-time checks for federated modules

## Architecture Overview

This example implements a Module Federation architecture where components are shared at runtime:

### Key Components

1. **Root Application (`apps/root/`)**

   - Acts as the shell application and Module Federation container
   - Dynamically imports components from content and navigation remotes
   - Orchestrates the overall application layout and routing
   - Configures federated remotes and manages dependencies

2. **Content Application (`apps/content/`)**

   - Exposes content-related components through Module Federation
   - Provides federated page components that can be consumed by other applications
   - Maintains its own styling and component logic

3. **Navigation Application (`apps/navigation/`)**

   - Exposes navigation components (header and footer) through Module Federation
   - Provides reusable navigation components for the entire application
   - Manages navigation state and user interactions

4. **Shared Packages (`packages/`)**
   - Common TypeScript configurations
   - Shared ESLint rules and formatting standards
   - Ensures consistency across all applications

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js 20.x or later
- pnpm 9.4.0 (recommended package manager)
- Git for version control

### Local Development Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vercel-labs/microfrontends-nextjs-pages-module-federation.git
   cd microfrontends-nextjs-pages-module-federation
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development environment:**

   ```bash
   pnpm dev
   ```

   This command starts all applications simultaneously:

   - Root app: http://localhost:3024 (main application)
   - Content app: http://localhost:3025 (content microfrontend)
   - Navigation app: http://localhost:3026 (navigation microfrontend)

4. **Access the application:**
   Open http://localhost:3024 in your browser to see the federated application where components from different microfrontends are composed together.

## Project Structure Deep Dive

```
microfrontends-nextjs-pages-module-federation/
├── apps/
│   ├── root/                   # Shell application (Module Federation container)
│   │   ├── pages/             # Next.js Pages Router
│   │   │   └── index.tsx      # Composes federated components
│   │   ├── microfrontends.json # Routing configuration
│   │   ├── next.config.js     # Next.js + Module Federation config
│   │   └── global.d.ts        # TypeScript declarations for federated modules
│   │
│   ├── content/               # Content microfrontend (Module Federation remote)
│   │   ├── pages/
│   │   │   ├── _app.tsx       # Application wrapper (exposed)
│   │   │   └── _content/
│   │   │       └── index.tsx  # Content page component (exposed)
│   │   └── next.config.js     # Exposes components via Module Federation
│   │
│   └── navigation/            # Navigation microfrontend (Module Federation remote)
│       ├── pages/
│       │   ├── _app.tsx       # Application wrapper (exposed)
│       │   └── _navigation/
│       │       ├── header/
│       │       │   └── index.tsx  # Header component (exposed)
│       │       └── footer/
│       │           └── index.tsx  # Footer component (exposed)
│       └── next.config.js     # Exposes navigation components
│
├── packages/
│   ├── eslint-config-custom/  # Shared linting configuration
│   └── ts-config/            # Shared TypeScript configuration
│
├── package.json              # Root package.json with workspaces
├── pnpm-workspace.yaml       # PNPM workspace configuration
└── turbo.json               # Turborepo build pipeline
```

### Configuration Files Explained

#### `microfrontends.json`

This file defines how microfrontends are discovered and routed:

```json
{
  "applications": {
    "microfrontends-nextjs-pages-federation-root": {
      "development": {
        "fallback": "microfrontends-nextjs-pages-federation-root.vercel.app"
      }
    },
    "microfrontends-nextjs-pages-federation-content": {
      "routing": [{ "paths": ["/_content/:path*"] }]
    },
    "microfrontends-nextjs-pages-federation-navigation": {
      "routing": [{ "paths": ["/_navigation/:path*"] }]
    }
  }
}
```

#### Module Federation Configuration

Each application has its own Next.js configuration enhanced with Module Federation:

**Root Application (Container):**

```javascript
// apps/root/next.config.js
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'root',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          content: `_mf_content@http://localhost:3025/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          navigation: `_mf_navigation@http://localhost:3026/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
      }),
    );
    return config;
  },
};
```

**Remote Applications (Content & Navigation):**

```javascript
// apps/content/next.config.js
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: '_mf_content',
        filename: `static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        exposes: {
          './page': './pages/_content/index.tsx',
          './app': './pages/_app.tsx',
        },
      }),
    );
    return config;
  },
};
```

## How Module Federation Works

The magic happens through Webpack's Module Federation technology:

### 1. Federated Component Exposure

Remote applications expose their components through Module Federation:

```javascript
// Each remote defines what components to expose
exposes: {
  './page': './pages/_content/index.tsx',      // Content page
  './header': './pages/_navigation/header/index.tsx', // Header component
  './footer': './pages/_navigation/footer/index.tsx', // Footer component
  './app': './pages/_app.tsx'                  // App wrapper
}
```

### 2. Dynamic Component Import

The root application dynamically imports these components at runtime:

```tsx
// apps/root/pages/index.tsx
import NavigationApp from 'navigation/app';
import Header from 'navigation/header';
import Footer from 'navigation/footer';
import Page from 'content/page';
import ContentApp from 'content/app';

export default function Home() {
  return (
    <>
      <NavigationApp Component={Header} />
      <ContentApp Component={Page} />
      <NavigationApp Component={Footer} />
    </>
  );
}
```

### 3. Runtime Code Sharing

Module Federation enables:

- **Shared Dependencies**: React and other libraries are shared between applications
- **Dynamic Loading**: Components are loaded on-demand at runtime
- **Version Management**: Handles different dependency versions automatically
- **Type Safety**: TypeScript support with federated module declarations

### 4. Production Deployment

In production, each microfrontend is deployed independently, and Module Federation resolves the federated modules from their respective URLs.

## Development Workflow

### Working with Individual Microfrontends

You can develop microfrontends in isolation:

```bash
# Work on the root application only
cd apps/root
pnpm dev

# Work on the content application only
cd apps/content
pnpm dev

# Work on the navigation application only
cd apps/navigation
pnpm dev
```

### Building and Testing

```bash
# Build all applications
pnpm build

# Run linting across all apps
pnpm lint

# Type check all applications
pnpm typecheck

# Run all quality checks
pnpm checks
```

### Adding New Federated Components

1. **Create the component** in your remote application
2. **Expose it** through Module Federation in `next.config.js`:
   ```javascript
   exposes: {
     './newComponent': './path/to/component.tsx'
   }
   ```
3. **Add TypeScript declarations** in the container app's `global.d.ts`:
   ```typescript
   declare module 'remoteName/newComponent' {
     const Component: React.ComponentType;
     export default Component;
   }
   ```
4. **Import and use** in the container application:
   ```tsx
   import NewComponent from 'remoteName/newComponent';
   ```

## Deployment Strategy

### Independent Deployment Benefits

Each microfrontend can be deployed independently, enabling:

- **Faster deployments**: Only the changed microfrontend needs redeployment
- **Reduced risk**: Deployments are isolated and can't break other parts
- **Team autonomy**: Teams can deploy on their own schedule
- **Rollback flexibility**: Roll back individual microfrontends without affecting others

### Vercel Configuration

Each application includes optimized Vercel configuration:

- **Framework detection**: Automatic Next.js optimization
- **Build settings**: Turborepo-aware build commands with Module Federation support
- **Environment variables**: Proper environment isolation
- **Edge functions**: Optimal performance at the edge

## Best Practices Implemented

### 🎯 Consistent Development Experience

- Shared TypeScript configuration ensures type safety across all federated modules
- Common ESLint rules maintain code quality standards
- Unified prettier configuration for consistent formatting

### 🔧 Build Optimization

- Turborepo orchestrates builds efficiently with caching
- Module Federation optimizes shared dependencies automatically
- Independent builds enable faster CI/CD pipelines

### 🎨 UI Consistency

- Shared component patterns across federated modules
- Consistent design tokens and styling approach
- Federated components maintain design system compliance

### 🚀 Performance Optimization

- Code splitting at the microfrontend level with Module Federation
- Shared chunk optimization for common dependencies
- Runtime loading optimization for federated modules

## Advanced Features

### TypeScript Support for Federated Modules

The project includes comprehensive TypeScript support:

```typescript
// apps/root/global.d.ts
declare module 'navigation/header' {
  const Header: React.ComponentType;
  export default Header;
}

declare module 'navigation/footer' {
  const Footer: React.ComponentType;
  export default Footer;
}

declare module 'content/page' {
  const Page: React.ComponentType;
  export default Page;
}
```

### Vercel Toolbar Integration

Development builds include the Vercel Toolbar for enhanced debugging:

- Visual indicators of federated module boundaries
- Performance metrics for federated components
- Real-time module loading analytics

### Error Boundaries and Fallbacks

Built-in error handling for federated components:

- Graceful degradation when remote modules fail to load
- Isolated error reporting per microfrontend
- Fallback components for improved user experience

## Troubleshooting

### Common Issues and Solutions

**Module Federation loading errors:**

```bash
# Ensure all applications are running
pnpm dev

# Check that remoteEntry.js files are accessible
curl http://localhost:3025/_next/static/chunks/remoteEntry.js
```

**TypeScript errors with federated modules:**

```bash
# Verify TypeScript declarations in global.d.ts
# Ensure module names match the federation configuration
```

**Build failures:**

```bash
# Run type checking to identify issues
pnpm typecheck

# Verify all federated modules are built correctly
pnpm build
```

**Port conflicts during development:**

```bash
# Kill processes using the required ports
npx kill-port 3024 3025 3026
pnpm dev
```

## Module Federation vs Multi-Zone

This example uses **Module Federation** for runtime code sharing, which differs from multi-zone architecture:

| Feature          | Module Federation           | Multi-Zone               |
| ---------------- | --------------------------- | ------------------------ |
| **Code Sharing** | Runtime component sharing   | URL-based routing        |
| **Bundle Size**  | Shared dependencies         | Independent bundles      |
| **Integration**  | Component-level integration | Page-level integration   |
| **Complexity**   | Higher (runtime loading)    | Lower (URL routing)      |
| **Use Case**     | Shared UI components        | Independent applications |

Choose Module Federation when you need to share React components between applications. Choose multi-zone when you need independent applications with URL-based routing.

📚 [Documentation](https://vercel.com/docs/microfrontends)
