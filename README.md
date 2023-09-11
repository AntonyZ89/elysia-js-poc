# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
git clone https://github.com/AntonyZ89/elysia-js-poc
```

## Development
To start the development server run:
```bash
bun install
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
Open http://localhost:3000/docs to see the API documentation. **WARN:** not working 100% yet.

## What you will find here:

- User Signin and Signup with JWT
- A simple Product CRUD
- Swagger API documentation
- Routes splitted into multiple files for better readability
- Authentication middleware to protect routes
- Product middleware to validate if the user is owner of the product

It's important to know that my intention here is make some tests on ElysiaJS and Bun with the minimum of dependencies, so I'm not trying to create a complete API.

Some features are incompleted or not implemented.
