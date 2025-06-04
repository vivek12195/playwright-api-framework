# 🧪 Playwright API Testing Framework (with Cucumber & TypeScript)

This repository contains a robust API automation framework built using **Playwright**, **Cucumber (Gherkin)**, and **TypeScript**. It is designed for behavior-driven development (BDD) and easy integration into CI/CD pipelines.

---

## 🚀 Features

- ✅ API test automation using Playwright's `APIRequestContext`
- ✅ Gherkin-style scenarios using Cucumber.js
- ✅ Modular test data management
- ✅ Custom world for context sharing across steps
- ✅ Assertion using built-in `expect` or Node's `assert`

---

## 🛠️ Installation

> ⚠️ Assumes you have Node.js >= 18 installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vivek12195/playwright-api-framework.git
   cd playwright-api-framework

## 🛠️ Install Dependencies:
    npm install

## 🛠️ Install Playwright Browsers (if needed):
    npx playwright install

## 🛠️ To run the test:
    npm run cucumber

## 🛠️ Assumptions Made:

Tests are written assuming the API under test is publicly accessible or mockable.

The API endpoints used (like https://reqres.in) are for demo purposes.

Test data and credentials are stored locally inside testData.ts.

Authentication tokens (if needed) are stored in memory during test runtime, not persisted.