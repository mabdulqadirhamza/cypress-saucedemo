#  Cypress SauceDemo E2E Tests

![Cypress](https://img.shields.io/badge/Cypress-E2E-green)
![Node](https://img.shields.io/badge/Node-v14+-blue)

End-to-end test automation for [SauceDemo](https://www.saucedemo.com) built with Cypress and the Page Object Model pattern.

---

##  Tech Stack

- [Cypress](https://www.cypress.io/) — E2E Testing Framework
- Page Object Model — Clean, maintainable test architecture
- Fixtures — Centralized test data
- dotenv — Secure credential management

---

##  Prerequisites
- Node.js (v14 or higher)
- npm or yarn


##  Project Structure

```
cypress/
├── e2e/           # Test files
├── fixtures/      # Test data (testdata.json)
└── pages/         # Page Object Classes
    ├── LoginPage.js
    ├── InventoryPage.js
    ├── CartPage.js
    └── CheckoutPage.js
```

---

##  Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/mabdulqadirhamza/cypress-saucedemo.git
cd cypress-saucedemo
```

**2. Install dependencies**
```bash
npm install
```

**3. Setup environment variables**
```bash
cp .env.example .env
```
Fill in your credentials in `.env`:
```
CYPRESS_BASE_URL=https://www.saucedemo.com
CYPRESS_USERNAME=standard_user
CYPRESS_PASSWORD=secret_sauce
CYPRESS_INVALID_USERNAME=invalid_user
CYPRESS_INVALID_PASSWORD=invalid_password
```

**4. Run tests**
```bash
# Interactive mode (recommended)
npx cypress open

# Headless mode
npx cypress run
```

---

##  Test Scenarios

| # | Test | Status |
|---|------|--------|
| 1 | Login with valid credentials | ✅ |
| 2 | Add item to cart | ✅ |
| 3 | Invalid login error message | ✅ |
| 4 | Complete checkout flow | ✅ |
| 5 | Remove item from cart | ✅ |
| 6 | Sort products by price | ✅ |
| 7 | Logout redirects to login | ✅ |

---

##  Environment Variables

| Variable | Description |
|----------|-------------|
| `CYPRESS_BASE_URL` | Application base URL |
| `CYPRESS_USERNAME` | Valid login username |
| `CYPRESS_PASSWORD` | Valid login password |
| `CYPRESS_INVALID_USERNAME` | Invalid login username |
| `CYPRESS_INVALID_PASSWORD` | Invalid login password |

>  Never commit `.env` to version control!
