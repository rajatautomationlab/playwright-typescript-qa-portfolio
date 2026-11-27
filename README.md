# Playwright TypeScript QA Automation Framework

[![Playwright Tests](https://github.com/rajatautomationlab/playwright-typescript-qa-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/rajatautomationlab/playwright-typescript-qa-portfolio/actions/workflows/playwright.yml)

End-to-end UI and API test automation framework built with Playwright and TypeScript, using the Page Object Model and a service layer for API testing. Tests run automatically on every push and pull request through GitHub Actions.

## Applications Under Test

| Layer | Application | Notes |
|---|---|---|
| UI | [SauceDemo](https://www.saucedemo.com) | E-commerce demo app |
| API | [DummyJSON](https://dummyjson.com) | REST API with simulated writes |

The API suite was migrated from FakeStoreAPI to DummyJSON after FakeStoreAPI began returning 403 responses to GitHub Actions runners. Details are in `docs/TEST-PLAN.md`.

## Tech Stack

- Playwright Test, TypeScript, Node.js
- Page Object Model (UI) and service layer (API)
- Environment-based configuration with dotenv
- GitHub Actions CI with HTML report artifact

## Project Structure

```
├── .github/workflows/   CI pipeline
├── config/              Environment configuration
├── docs/                Test plan
├── pages/               Page Object Model classes
├── services/            API service layer
├── tests/
│   ├── api/             API tests
│   └── ui/              UI tests
├── test-data/
├── utils/
├── playwright.config.ts
└── package.json
```

## Test Coverage

**UI (8 tests):** login (valid and invalid), product catalogue, sorting, add to cart, checkout validation, price calculation, order completion.

**API (8 tests):** GET all and by ID, POST, PUT, PATCH, DELETE, non-existing ID (404), mandatory response fields.

## Getting Started

```bash
git clone https://github.com/rajatautomationlab/playwright-typescript-qa-portfolio.git
cd playwright-typescript-qa-portfolio
npm ci
npx playwright install
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

## Running Tests

```bash
npm test              # all tests
npm run test:ui       # UI tests only
npm run test:api      # API tests only
npm run test:headed   # visible browser
npm run test:debug    # Playwright inspector
npm run report        # open the HTML report
```

## Configuration

Base URLs come from environment variables, with defaults in `config/env.ts`:

| Variable | Default |
|---|---|
| `UI_BASE_URL` | https://www.saucedemo.com |
| `API_BASE_URL` | https://dummyjson.com |

## CI/CD

The GitHub Actions workflow installs dependencies and browsers, runs the full suite, and uploads the Playwright HTML report as an artifact (retained for 30 days). On CI, failed tests retry twice, and traces, screenshots and videos are kept on failure.

## Author

Rajat Patil, QA Automation Engineer
GitHub: [rajatautomationlab](https://github.com/rajatautomationlab)