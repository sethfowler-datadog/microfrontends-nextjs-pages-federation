import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: '_mf_login',
        filename: `static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        exposes: {
          './page': './pages/_login/index.tsx',
          './app': './pages/_app.tsx',
        },
      }),
    );

    return config;
  },
};

export default withVercelToolbar()(
  withMicrofrontends(nextConfig, { supportPagesRouter: true }),
);
