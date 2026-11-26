# E-Commerce UI & API Automation Framework

## 1. Project Overview

This project aims to develop a scalable automation testing framework for validating essential e-commerce business workflows using Playwright, TypeScript and REST API testing.

The framework will demonstrate real-world QA practices, including functional testing, regression testing, API validation, cross-browser testing, reporting and CI/CD integration.

## 2. Application Under Test

| Component | Application | Purpose |
|---|---|---|
| UI Application | SauceDemo | E-commerce UI automation |
| API Application | FakeStoreAPI | REST API automation |

Note: These are independent demonstration applications. UI and API testing will be maintained as separate test suites.

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
- GET user details
- POST new product
- PUT and DELETE operations
- Status code validation
- Response body validation
- Schema and data validation
- Negative API scenarios

## 5. Test Scenarios

| ID | Module | Test Scenario | Priority |
|---|---|---|---|
| UI-001 | Login | Login with valid credentials | High |
| UI-002 | Login | Login with invalid credentials | High |
| UI-003 | Login | Validate locked user login | High |
| UI-004 | Products | Verify product catalogue | High |
| UI-005 | Products | Validate product sorting | Medium |
| UI-006 | Cart | Add product to cart | High |
| UI-007 | Cart | Remove product from cart | High |
| UI-008 | Cart | Verify cart item details | High |
| UI-009 | Checkout | Validate mandatory fields | High |
| UI-010 | Checkout | Complete checkout workflow | High |
| API-001 | Products | Retrieve all products | High |
| API-002 | Products | Retrieve product by ID | High |
| API-003 | Products | Validate product response fields | High |
| API-004 | Products | Create a product | Medium |
| API-005 | Products | Update product details | Medium |
| API-006 | Products | Delete a product | Medium |
| API-007 | Users | Retrieve user details | Medium |
| API-008 | Negative | Validate invalid product ID | High |

## 6. Non-Functional Testing

- Cross-browser compatibility
- Responsive viewport validation
- Basic accessibility checks
- Basic security-oriented negative testing
- Test execution stability
- CI/CD execution reliability

## 7. Framework Architecture

The framework will follow a modular architecture:

- Tests: Test specifications and assertions
- Pages: Page Object Model classes
- Fixtures: Reusable test setup
- Utils: Common reusable methods
- Test Data: External test data
- API: API service and validation methods
- Reports: Execution reports and artifacts

## 8. Reporting and CI/CD

- Playwright HTML reports
- Failure screenshots
- Execution traces
- GitHub Actions workflow
- Automated execution on code push and pull requests
- CI execution artifacts

## 9. Out of Scope

- Real payment processing
- Actual financial transactions
- Production customer data
- Integration between the two independent demo applications
- Production load and stress testing

## 10. Expected Outcome

A reusable and maintainable QA automation framework demonstrating practical knowledge of UI automation, API testing, regression testing, reporting, Git workflows and CI/CD integration.