# Workflow CA

## Description

This project is focused on improving the quality of an existing application by implementing workflows and testing strategies. The main features include:

- Front-end login form connected to an API JWT endpoint.
- Front-end logout button connected to browser storage.
- Front-end CRUD functionality for at least one object type.
- A front-end profile page.

The project has been configured with ESLint, Prettier, GitHub Actions, Jest, and Cypress to ensure code quality and provide automated testing.


## Testing

This project is configured with Jest for unit testing and Cypress for end-to-end testing. The following badges indicate the current status of the project's workflows:

[![Deploy static content to Pages](https://github.com/Bakek-lang/workflow-CA/actions/workflows/pages.yml/badge.svg?branch=master)](https://github.com/Bakek-lang/workflow-CA/actions/workflows/pages.yml) 

[![Automated Unit Testing](https://github.com/Bakek-lang/workflow-CA/actions/workflows/unit-test.yml/badge.svg)](https://github.com/Bakek-lang/workflow-CA/actions/workflows/unit-test.yml)

[![Automated E2E Testing](https://github.com/Bakek-lang/workflow-CA/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/Bakek-lang/workflow-CA/actions/workflows/e2e-test.yml)


### Deployment to GitHub Pages

**Note:** The "Deploy static content to Pages" badge does not currently reflect a successful deployment. This is because the deployment to GitHub Pages requires changes to be made directly on the master branch. Since this project follows a workflow that avoids direct changes on the master branch, the deployment process has not been finalized in this setup. Contributions to improve this workflow or alternative deployment strategies are welcome.


## Getting Started

To get started with this project, follow these steps: 

### Installation 

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/Bakek-lang/workflow-CA.git
   ```
2. **Install the dependencies:**
   ```bash
   npm install
   ```

### Running tests

- Run Unit Tests:
  ```bash
  npm run test-unit
  ```
- Run E2E Tests:
  ```bash
  npm run test-e2e
  ```
