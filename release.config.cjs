// release.config.js
const currentBranch = process.env.GITHUB_REF_NAME // GitHub Actions environment variable for branch name

let changelogFile = 'CHANGELOG.md' // Default for main
let assetsToCommit = ['CHANGELOG.md', 'package.json', 'package-lock.json'] // Default for main

if (currentBranch === 'development') {
  changelogFile = 'CHANGELOG-dev.md'
  assetsToCommit = ['CHANGELOG-dev.md'] // Only commit dev changelog, not package.json
} else if (currentBranch === 'staging') {
  changelogFile = 'CHANGELOG-staging.md'
  assetsToCommit = ['CHANGELOG-staging.md'] // Only commit staging changelog, not package.json
}

module.exports = {
  branches: [
    'main',
    {
      name: 'staging',
      prerelease: 'stage',
      channel: 'staging',
    },
    {
      name: 'development',
      prerelease: 'dev',
      channel: 'dev',
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer', // Must be first
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: changelogFile,
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: assetsToCommit,
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
}
