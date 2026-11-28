# E-Commerce UI & API Automation Framework: Test Plan

## 1. Project Overview

This project is a scalable automation framework for validating e-commerce workflows with Playwright, TypeScript and REST API testing. It demonstrates functional and regression testing, API contract validation, containerised execution, reporting and CI/CD.

## 2. Application Under Test

| Component | Application | Purpose |
|---|---|---|
| UI Application | SauceDemo | E-commerce UI automation |
| API Application | DummyJSON | REST API automation |

These are independent demonstration applications, so the UI and API suites are maintained separately.

**API migration note:** The API suite originally targeted FakeStoreAPI. It was migrated to DummyJSON because FakeStoreAPI returned 403 responses to GitHub Actions runners (confirmed with curl from CI: FakeStoreAPI 403, DummyJSON 200). DummyJSON also returns a proper 404 for missing resources, which makes negative testing more realistic. Write operations on DummyJSON are simulated and do not persist.

## 3. Technology Stack

- Playwright Test, TypeScript, Node.js
- Page Object Model (UI) and service layer (API)
- Custom fixtures and external test data
- Zod schema validation for API responses
- Docker and Docker Compose (official Playwright image)
- Git, GitHub, GitHub Actions
- Playwright HTML reporter

## 4. Scope of Testing

### UI Testing

- Login and authentication, including a locked-out user
- Product catalogue validation and sorting
- Add to cart and cart validation
- Checkout form validation and price calculation
- Order completion

### API Testing

- GET all products and GET by ID
- POST, PUT, PATCH and DELETE
- Status code and response body validation
- Schema validation of every product against a Zod contract
- Negative scenario: non-existing product ID returns 404

## 5. Test Scenarios

| ID | Module | Scenario | Priority | Tags |
|---|---|---|---|---|
| TC_UI_001 | Login | Login with valid credentials | High | smoke, regression |
| TC_UI_002 | Login | Login with invalid credentials | High | regression |
| TC_UI_009 | Login | Login with locked-out user | High | regression |
| TC_UI_003 | Products | Verify product catalogue | High | regression |
| TC_UI_004 | Products | Verify product sorting by price (low to high) | Medium | regression |
| TC_UI_005 | Cart | Add product to shopping cart | High | smoke, regression |
| TC_UI_006 | Checkout | Validate mandatory checkout information | High | regression |
| TC_UI_007 | Checkout | Verify order summary and price calculation | High | regression |
| TC_UI_008 | Checkout | Complete order successfully | High | smoke, regression |
| TC_API_001 | Products | Get all products | High | smoke, regression |
| TC_API_002 | Products | Get a product by ID | High | smoke, regression |
| TC_API_003 | Products | Create a product (POST) | Medium | regression |
| TC_API_004 | Products | Update a product (PUT) | Medium | regression |
| TC_API_005 | Products | Partially update a product (PATCH) | Medium | regression |
| TC_API_006 | Products | Delete a product (DELETE) | Medium | regression |
| TC_API_007 | Negative | Non-existing product ID returns 404 | High | regression |
| TC_API_008 | Products | Every product matches the schema | High | regression |

Total: 17 tests (9 UI, 8 API), of which 5 are smoke.

## 6. Test Suites and Execution Strategy

| Suite | Tag | Purpose |
|---|---|---|
| Smoke | `@smoke` | Fast check of critical paths (5 tests) |
| Regression | `@regression` | Full suite (17 tests) |
| UI / API | `@ui` / `@api` | Run one layer on its own |

| Trigger | What runs |
|---|---|
| Pull request to `main` | Smoke |
| Push to `main` | Full suite, plus the full suite inside Docker |
| Nightly (02:30 UTC) | Full suite, plus the full suite inside Docker |
| Manual dispatch | Full suite, plus the full suite inside Docker |

## 7. Framework Architecture

- `tests/ui`, `tests/api`: test specifications and assertions
- `pages`: Page Object Model classes
- `services`: API service layer
- `fixtures`: reusable Playwright fixtures
- `test-data`: external test data
- `schemas`: Zod API response schemas
- `config`: environment configuration
- `utils`: shared helpers

## 8. Reporting and CI/CD

- Playwright HTML reports uploaded as CI artifacts
- Traces, screenshots and videos retained on failure
- GitHub Actions with least-privilege permissions and run cancellation
- `main` is protected: changes go through pull requests with a passing `test` check

## 9. Planned Work

- Cross-browser execution (Firefox, WebKit) and mobile viewports
- Test sharding for faster runs
- Basic accessibility checks
- Performance testing as a separate project

## 10. Out of Scope

- Real payment processing and financial transactions
- Production customer data
- Integration between the two demo applications
- Production load and stress testing

## 11. Known Limitations

- DummyJSON write operations are simulated, so tests verify the response and not persisted state.
- SauceDemo and DummyJSON are third-party services. A change or outage on their side can fail tests without any code change here. The nightly run is designed to catch that early.