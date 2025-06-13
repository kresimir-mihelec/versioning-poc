// release.config.js
const branch = process.env.GITHUB_REF_NAME

/*
  ─ Branch policy ─
  • main     – final releases   (vX.Y.Z)
  • staging  – RCs / QA builds (vX.Y.Z-stage.N)
  • dev      – lint-only        (no tags, no commits)
*/
module.exports = {
  branches: ['main', { name: 'staging', channel: 'staging', prerelease: 'stage' }],

  plugins: [
    '@semantic-release/commit-analyzer',

    // keep every -stage.N heading on staging
    ['@semantic-release/release-notes-generator', { presetConfig: { prerelease: true } }],

    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],

    ['@semantic-release/npm', { npmPublish: false }],

    [
      '@semantic-release/git',
      branch === 'main'
        ? {
            // production: bump versions + changelog
            assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
            message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
          }
        : {
            // staging: changelog only
            assets: ['CHANGELOG.md'],
            message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
          },
    ],

    '@semantic-release/github',
  ],

  // dev branch = lint run only
  dryRun: branch === 'development',
}
