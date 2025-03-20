# Cypress-TypeScript Framework

This repository contains a **customized Cypress automation framework** built with **TypeScript** for efficient end-to-end (E2E) and API testing.

## Table of Contents
- [Framework Structure](#framework-structure)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Custom Commands](#custom-commands)
- [Generating Reports](#generating-reports)
- [Helper Classes](#helper-classes)

## Framework Structure
```
src/
│── e2e/              # BDD and Cy tests
│── fixtures/         # Test Data Management
│── reports/          # Test reports
│── resources/        # Environment and dynamic data management
│── support/          # Page Objects and helper classes
```                  


## Setup Instructions
1️⃣ Clone the Repository
```sh
git clone https://github.com/DarshanS4444/Cypress-Typescript.git
cd Cypress-Typescript
```

2️⃣ Install Dependencies
```sh
npm install
```

3️⃣ Open Cypress Dashboard

```sh
npx cypress open
```

## Running Tests

### 1️⃣ Setting Environment Variables 
To set Cypress Environment Variables:
```sh
CYPRESS_{name-of-the-variable}={value}
```
Example : CYPRESS_env=prod

### 2️⃣ Run Tests in Dashboard
To launch Dashboard:
```sh
npx cypress open
```
or  
```sh
npm run cy:open
```

### 3️⃣ Run Tests in Headless Mode
Execute tests without opening the GUI:
```sh
npx cypress run
```
or  
```sh
npm run cy:run
```

### 4️⃣ Run a Specific Feature File / Spec File
```sh
npx cypress run --spec {path to test file} --headed --browser chrome
```

### 5️⃣ Run Tests with Tags
```sh
npx cypress run -e TAGS="@tagName"
```

### 6️⃣ Run Tests with Multiple Tags:
- **AND:** Both `@tag1` and `@tag2` must be present.
```sh
npx cypress run -e TAGS="@tag1 and @tag2"
```
- **OR:** Either `@tag1` or `@tag2` must be present.
```sh
npx cypress run -e TAGS="@tag1 or @tag2"
```
- **NOT:** The `@tag3` must not be present.
```sh
npx cypress run -e TAGS="not @tag3"
```
- **Complex Expression:** Combining multiple operators.
```sh
npx cypress run -e TAGS="(@tag1 or @tag2) and not @tag3"
```

## Custom Commands
Your custom commands are defined in `src/support/commands.ts`. These commands extend the Cypress Chainable interface to include custom methods. Use them as follows:
```sh
cy.customCommandName()
```

## Generating Reports

### Generate Cucumber HTML Report
```sh
node cucumber-html-report.js
```

## Helper Classes

### **Data Context**
Stores and manages dynamic data within a test run, enabling data reuse across multiple steps.

#### **Core Utils**
Contains application-specific helper methods, such as formatting utilities, data transformations, and common functions used across tests.

#### **Date Picker**
Provides a utility for interacting with React Date Pickers, handling date selection and related actions in tests.

### **Tagged Tests**
Enables running specific Cypress tests using tagged it and describe blocks, allowing for efficient test filtering.

### **Evironment Json**
Manages environment-specific test data using environment.json, making it easier to switch between different environments.

---

