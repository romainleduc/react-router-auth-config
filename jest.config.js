module.exports = {
    moduleDirectories: [
      'node_modules',
      'utils',
    __dirname,
    ],
    verbose: true,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js']
  }