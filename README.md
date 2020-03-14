# BICE LABS CHALLENGE

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Structure](#2-project-structure)
3. [Used Libraries](#3-used-libraries)
4. [Run the project](#4-run-the-project)

## 1. Introduction

This project is my apply for Globant, to the client BICE Vida.

The challenge consists in consume a BICE Vida REST service, calculate the policy for a company, and the amount to pay for every worker in the company (The service return an array with the list of the workers, with their age and their children, the company copayment percentage and a boolean with information on whether the policy has dental insurance) and return this information in a REST service.

The technical requirement for develop this service is use [NodeJS](https://nodejs.org/), with the [Serverless Framework](https://serverless.com).

[Link to the service](https://8iubcq49tk.execute-api.us-east-1.amazonaws.com/dev), running in an AWS Lambda (λ)

## 2. Project Structure

The folder structure with their definitions is the next:

```markdown
├── **tests**
│ └── src/utils/policy.test.ts (This file contains the unit tests for the policy utils functions)
├── src
│ ├── controllers (This folder contains the logic to process the service requests)
│ │ └── policy.ts
│ ├── routes (This folder contains the project routes)
│ ├── utils (This folder contains the files for process the business rules)
│ │ └── policy.ts
│ └── index.ts (This file is the attendant of set up the Express REST service)
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── handler.ts (This file contains the entry point for the service function)
├── package.json
├── README.md
├── serverless.yml (This file contains configurations values, and the env values for the project)
├── tsconfig.json
└── yarn.lock
```

## 3. Used Libraries

The used libraries are separated in two, dependencies and development dependencies:

### Dependencies

- [aws-lambda](https://www.npmjs.com/package/aws-lambda) In this case, only used for get the types of the handler arguments and response
- [body-parser](https://www.npmjs.com/package/body-parser) Node.js body parsing middleware
- [cors](https://www.npmjs.com/package/cors) A node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
- [express](https://www.npmjs.com/package/express) Node.js web application framework that provides a robust set of features for web
- [got](https://www.npmjs.com/package/got) Human-friendly and powerful HTTP request library for Node.js
- [serverless-http](https://www.npmjs.com/package/serverless-http) This module allows you to 'wrap' your API for serverless use. No HTTP server, no ports or sockets

### Development Dependencies

- [@types/aws-lambda](https://www.npmjs.com/package/@types/aws-lambda) TypeScript definitions for aws-lambda
- [@types/cors](https://www.npmjs.com/package/@types/cors) TypeScript definitions for CORS
- [@types/express](https://www.npmjs.com/package/@types/express) TypeScript definitions for Express
- [@types/got](https://www.npmjs.com/package/@types/got) TypeScript definitions for GOT
- [@types/jest](https://www.npmjs.com/package/@types/jest) TypeScript definitions for Jest
- [jest](https://www.npmjs.com/package/jest) A JavaScript Testing Framework
- [poetic](https://www.npmjs.com/package/poetic) Automatic code styling for JavaScript, TypeScript and React
- [serverless-offline](https://www.npmjs.com/package/serverless-offline) Emulate AWS λ and API Gateway locally when developing your Serverless project
- [serverless-plugin-typescript](https://www.npmjs.com/package/serverless-plugin-typescript) Serverless plugin for zero-config Typescript support
- [ts-jest](https://www.npmjs.com/package/ts-jest) A preprocessor with source maps support to help use TypeScript with Jest
- [typescript](https://www.npmjs.com/package/typescript) A language for application scale JavaScript development

## 4. Run the project

### 4.1 Requisites

- [NodeJS](https://nodejs.org/).
- [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/)
- [Serverless CLI](https://serverless.com/cli/)
- [Git](https://git-scm.com/)

### 4.2 Installation guide

#### 4.2.1

Clone this project using the next command, run this command in your favorite terminal.

```bash
  git clone https://gitlab.com/RodrigoBustamante/bice-challenge.git
```

#### 4.2.2

Run the next command on your terminal, located on the root of the repository.

```bash
  yarn install
```

or

```bash
  npm install
```

#### 4.2.3

Run the next command on your terminal, located on the root of the repository.

```bash
  serverless offline
```

This command expose a PORT with the service, all the instructions are available in the terminal after run this command.

The endpoint to get the policy information is the root (/).

### 4.2.4 (Optional step)

If you want to exec the project unit test, just run the next command on your terminal, located on the root of the repository.

```bash
  yarn test
```

or

```bash
  npm test
```

And if you want to see the test coverage, pass the next flag to the previus command.

```bash
  yarn test --coverage
```

or

```bash
  npm test --coverage
```

Enjoy!
