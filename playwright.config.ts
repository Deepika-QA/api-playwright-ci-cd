module.exports = {
  testDir: 'tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [['list'], ['html', { output: 'test-results/report.html' }]],
  use: {
    headless: true,
    actionTimeout: 0,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'API Tests',
      use: {
        baseURL: 'http://localhost:3000',
      },
    },
  ],
};