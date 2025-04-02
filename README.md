# README.md

# API Playwright CI/CD

## Overview

This project is a simple API for managing orders in an online store. It demonstrates the "Shift Left" philosophy by integrating testing early in the development process using a CI/CD pipeline with GitHub Actions. The API is built with TypeScript and utilizes Playwright for end-to-end testing.

## Project Structure

```
api-playwright-ci-cd
├── src
│   ├── app.ts                  # Entry point of the API application
│   ├── controllers
│   │   └── ordersController.ts  # Handles order-related operations
│   ├── routes
│   │   └── ordersRoutes.ts      # Sets up routes for the orders API
│   └── types
│       └── index.ts             # Defines order data structures
├── tests
│   ├── unit
│   │   └── app.test.ts          # Unit tests for the API
│   └── e2e
│       └── playwright.test.ts    # End-to-end tests using Playwright
├── .github
│   └── workflows
│       └── ci-cd.yml            # GitHub Actions workflow for CI/CD
├── playwright.config.ts          # Configuration for Playwright
├── package.json                  # npm configuration and dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/api-playwright-ci-cd.git
   ```

2. Navigate to the project directory:

   ```
   cd api-playwright-ci-cd
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the API

To start the API server, run:

```
npm start
```

The API will be available at `http://localhost:3000`.

### Running Tests

#### Unit Tests

To run the unit tests, execute:

```
npm run test:unit
```

#### End-to-End Tests

To run the end-to-end tests with Playwright, execute:

```
npm run test:e2e
```

### CI/CD Pipeline

The project includes a CI/CD pipeline defined in `.github/workflows/ci-cd.yml`. This pipeline automates the following stages:

1. **Continuous Integration (CI)**: Builds the API, runs unit tests, and checks code coverage.
2. **User Acceptance Testing (UAT)**: Deploys the API to a test environment and runs Playwright E2E tests.
3. **Production**: Manual approval step for deploying the API to the live environment.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.