# E-Commerce UI & API Automation Framework

## 1. Project Overview

This project aims to develop a scalable automation testing framework for validating essential e-commerce business workflows using Playwright, TypeScript and REST API testing.

The framework will demonstrate real-world QA practices, including functional testing, regression testing, API validation, cross-browser testing, reporting and CI/CD integration.

## 2. Application Under Test

| Component | Application | Purpose |
|---|---|---|
| UI Application | SauceDemo | E-commerce UI automation |
| API Application | DummyJSON | REST API automation |

Note: These are independent demonstration applications. UI and API testing will be maintained as separate test suites.

API note: The API suite originally targeted FakeStoreAPI. It was migrated to DummyJSON because FakeStoreAPI returned 403 responses to GitHub Actions runners. DummyJSON also returns proper 404 responses for missing resources, which makes negative testing more realistic. Write operations on DummyJSON are simulated and do not persist.

## 3. Technology Stack

- Playwright Test
- TypeScript
- Node.js
- REST API testing using Playwright APIRequestContext
- Page Object Model (POM)
- Git and GitHub
- GitHub Actions
- Docker
- Playwright HTML Reporter

## 4. Scope of Testing

### UI Testing

- Login and authentication
- Product catalogue validation
- Product sorting
- Add and remove products from cart
- Shopping cart validation
- Checkout form validation
- Order completion
- Negative and edge-case scenarios

### API Testing

- GET product details
- GET all products
- POST new product
- PUT, PATCH and DELETE operations
- Status code validation
- Response body validation
- Schema and data validation
- Negative API scenarios

## 5. Test Scenarios

| ID | Module | Test Scenario | Priority |
|---|---|---|---|
| UI-001 | Login | Login with valid credentials | High |
| UI-002 | Login | Login with invalid credentials | High |
| UI-003 | Products | Verify product catalogue | High |
| UI-004 | Products | Validate product sorting | Medium |
| UI-005 | Cart | Add product to cart | High |
| UI-006 | Checkout | Validate mandatory fields | High |
| UI-007 | Checkout | Verify order summary and price calculation | High |
| UI-008 | Checkout | Complete checkout workflow | High |
| API-001 | Products | Retrieve all products | High |
| API-002 | Products | Retrieve product by ID | High |
| API-003 | Products | Create a product | Medium |
| API-004 | Products | Update product (PUT) | Medium |
| API-005 | Products | Update product (PATCH) | Medium |
| API-006 | Products | Delete a product | Medium |
| API-007 | Negative | Validate non-existing product ID returns 404 | High |
| API-008 | Products | Validate mandatory response fields | High |

## 6. Non-Functional Testing (Planned)

- Cross-browser compatibility
- Responsive viewport validation
- Basic accessibility checks
- Test execution stability
- CI/CD execution reliability

## 7. Framework Architecture

- Tests: Test specifications and assertions (`tests/ui`, `tests/api`)
- Pages: Page Object Model classes (`pages`)
- Services: API service layer (`services`)
- Config: Environment configuration (`config`)
- Utils: Common reusable methods (`utils`)
- Test Data: External test data (`test-data`)

## 8. Reporting and CI/CD

- Playwright HTML reports
- Failure screenshots, traces and videos on failure
- GitHub Actions workflow on push and pull requests
- Report uploaded as a CI artifact

## 9. Out of Scope

- Real payment processing
- Actual financial transactions
- Production customer data
- Integration between the two independent demo applications
- Production load and stress testing

## 10. Expected Outcome

A reusable and maintainable QA automation framework demonstrating practical knowledge of UI automation, API testing, regression testing, reporting, Git workflows and CI/CD integration.