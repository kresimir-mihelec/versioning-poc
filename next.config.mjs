import { withPayload } from '@payloadcms/next/withPayload'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { version: appVersion } = require('./package.json')
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  // 2. Make the version available as an environment variable
  env: {
    // This makes APP_VERSION available to your server-side code (Node.js environment)
    // during build time and runtime.
    // It's NOT automatically available in the client-side browser bundle.
    APP_VERSION: appVersion,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
