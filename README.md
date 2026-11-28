# Playwright TypeScript QA Automation Framework

[![Playwright Tests](https://github.com/rajatautomationlab/playwright-typescript-qa-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/rajatautomationlab/playwright-typescript-qa-portfolio/actions/workflows/playwright.yml)

End-to-end UI and API test automation framework built with Playwright and TypeScript. It uses the Page Object Model, custom fixtures, external test data, a service layer for API testing, and Zod schema validation for API contracts. CI runs smoke tests on pull requests and the full regression suite on merges, nightly, and on demand.

## Applications Under Test

| Layer | Application | Notes |
|---|---|---|
| UI | [SauceDemo](https://www.saucedemo.com) | E-commerce demo app |
| API | [DummyJSON](https://dummyjson.com) | REST API with simulated writes |

The API suite was migrated from FakeStoreAPI to DummyJSON after FakeStoreAPI began returning 403 responses to GitHub Actions runners. Details are in `docs/TEST-PLAN.md`.

## Tech Stack

- Playwright Test, TypeScript, Node.js
- Page Object Model (UI) and service layer (API)
- Custom Playwright fixtures and external test data
- Zod schema validation for API responses
- Test tagging (`@smoke`, `@regression`, `@ui`, `@api`)
- Environment-based configuration with dotenv
- GitHub Actions CI with scheduled runs and HTML report artifact

## Project Structure

```
├── .github/workflows/   CI pipeline
├── config/              Environment configuration
├── docs/                Test plan
├── fixtures/            Custom Playwright fixtures
├── pages/               Page Object Model classes
├── schemas/             Zod API response schemas
├── services/            API service layer
├── test-data/           External test data
├── tests/
│   ├── api/             API tests
│   └── ui/              UI tests
├── utils/               Shared helpers
├── playwright.config.ts
└── package.json
```

## Test Coverage

**UI (9 tests):** login (valid, invalid, locked user), product catalogue, sorting, add to cart, checkout validation, price calculation, order completion.

**API (8 tests):** GET all and by ID, POST, PUT, PATCH, DELETE, non-existing ID (404), and schema validation of every product.

Smoke tests (5) cover the critical paths. The regression suite covers all 17 tests.

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
npm test                # all tests
npm run test:smoke      # smoke tests only
npm run test:regression # regression tests only
npm run test:ui         # UI tests only
npm run test:api        # API tests only
npm run test:headed     # visible browser
npm run test:debug      # Playwright inspector
npm run report          # open the HTML report
```

## Configuration

Base URLs come from environment variables, with defaults in `config/env.ts`:

| Variable | Default |
|---|---|
| `UI_BASE_URL` | https://www.saucedemo.com |
| `API_BASE_URL` | https://dummyjson.com |

## CI/CD

| Trigger | What runs |
|---|---|
| Pull request to `main` | Smoke tests (`@smoke`) |
| Push to `main` | Full suite |
| Nightly schedule (02:30 UTC) | Full suite |
| Manual (`workflow_dispatch`) | Full suite |

The pipeline uploads the Playwright HTML report as an artifact (retained for 30 days). On CI, failed tests retry twice, and traces, screenshots and videos are kept on failure. The workflow uses least-privilege permissions and cancels superseded runs.

## Author

Rajat Patil, QA Automation Engineer
GitHub: [rajatautomationlab](https://github.com/rajatautomationlab)