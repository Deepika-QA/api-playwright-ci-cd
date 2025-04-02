module.exports = {
  testDir: 'tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [['list'], ['html', { output: 'test-results/report.html', open: 'never' }]],
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    output: (output) => {
      if (output.includes('Server started')) {
        console.log('Server started');
      } else if (output.includes('Error')) {
        console.error('Error starting server');
      }
    }
  },
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
