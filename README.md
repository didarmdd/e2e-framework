# E2E Framework

Playwright-based QA framework with configurable environments, page objects, fixtures, and reporting.

## Project Structure

```
e2e-framework/
├── config/
│   ├── hosts.json                  # (optional) base URLs per environment
│   ├── pages.json                  # (optional) URL paths by page name
│   ├── mappings/                   # selector maps (data-driven locators)
│   │   ├── login.json
│   │   └── dashboard.json
│   └── payloads/                   # API request bodies / templates
│       ├── login.json
│       └── create-user.json
├── env/
│   ├── common.env                  # shared env vars (timeouts, baseURL, creds)
│   ├── dev.env                     # dev overrides
│   └── stg.env                     # staging overrides
├── src/
│   ├── env/
│   │   ├── parseEnv.ts             # loads env vars, throws if missing
│   │   └── index.ts                # exports env helpers/constants
│   ├── fixtures/
│   │   ├── auth.fixture.ts         # logged-in context fixture
│   │   └── data.fixture.ts         # test data setup fixture (API seeding)
│   ├── pages/
│   │   ├── base.page.ts            # shared page helpers
│   │   ├── login.page.ts           # login flow methods
│   │   └── dashboard.page.ts       # dashboard verification/actions
│   ├── support/
│   │   ├── api-client.ts           # API wrapper functions
│   │   ├── locator-helper.ts       # loads selector mappings
│   │   ├── wait.ts                 # reusable wait utilities
│   │   ├── data-builder.ts         # factories for test data objects
│   │   └── storage.ts              # local/session storage helpers
│   ├── constants/
│   │   ├── routes.ts               # centralized route paths
│   │   └── test-ids.ts             # centralized data-testid values
│   ├── utils/
│   │   └── date.ts                 # small helpers (formatting, dates)
│   └── tests/
│       ├── auth/
│       │   ├── login.test.ts
│       │   └── logout.test.ts
│       ├── dashboard/
│       │   └── dashboard-smoke.test.ts
│       └── api/
│           └── healthcheck.test.ts
├── reports/                        # Playwright HTML + Allure output
├── playwright.config.ts            # test settings + reporters
├── tsconfig.json                   # TS compiler options
├── package.json                    # scripts + dependencies
└── README.md
```

## Requirements

- Node.js 18+ recommended
- Playwright browsers (installed automatically on first run)

## Install

```
npm install
```

## Environments

Set the environment with `ENV`:

- `dev` uses `env/dev.env`
- `stg` uses `env/stg.env`
- `env/common.env` is always loaded first

Example:

```
ENV=dev npx playwright test --list
```

Quick config check (no tests run):

```
ENV=dev npx playwright test --list
ENV=stg npx playwright test --list
```

## Run Tests

All tests:

```
npm test
```

By environment:

```
npm run test:dev
npm run test:stg
```

By project (browser or API):

```
npx playwright test --project=ui-chromium
npx playwright test --project=ui-firefox
npx playwright test --project=ui-webkit
npx playwright test --project=api
```

By file or folder:

```
npx playwright test src/tests/dashboard/dashboard-smoke.test.ts
npx playwright test src/tests/auth
```

## Tagging Tests

Add tags directly in the test title:

```
test('dashboard loads @smoke @ui', async ({ page }) => {
  // ...
});
```

Run by tag:

```
npx playwright test --grep "@smoke"
ENV=stg npx playwright test --grep "@ui"
```

## Reporting

HTML report is generated automatically in `reports/html`.

Allure setup:

```
npm run allure:generate
npm run allure:open
```

Allure output folders:
- Results: `reports/allure-results`
- Report: `reports/allure-report`

## Linting and Formatting

```
npm run lint
npm run format
```

## Notes

- `config/hosts.json` and `config/pages.json` are placeholders if you want JSON-driven config later. Current source of truth is in `env/` and `src/constants/`.
- UI tests run across Chromium, Firefox, and WebKit projects.

## Author

Didar
