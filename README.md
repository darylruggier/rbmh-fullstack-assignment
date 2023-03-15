# Red Bull Case Assignment

This is a web application developed as an assignment for Red Bull Media House. I hope you enjoy checking this app out as much as I enjoyed creating it :)

## Getting Started

To run this app locally, run the development server via:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

This app includes the following features:

* User authentication with Next-Auth
* User registration
* User profile update
* Integration with Prisma ORM for database management
* Integration with PlanetScale for database hosting and scaling
* Unit Testing of the Next API endpoints via Jest
* API Endpoint Type-Safety via Zod

## Technologies

* ⏭️  Next.js - A React framework for building server-side rendered and static web applications.
* 💨 Tailwind CSS - A utility-first CSS framework for building custom designs.
* 🔐 Next-Auth - An authentication library for Next.js applications.
* 🔼 Prisma - A modern ORM for building type-safe and scalable database applications.
* 🪐 PlanetScale - A cloud-native database platform for scaling MySQL.
* 🃏 Jest - A JavaScript testing framework for unit testing, integration testing, and snapshot testing.
🛡️ Zod - A TypeScript-first schema validation library that provides a simple and powerful way to validate and transform data.

## Possible Improvements

Below are improvements which would have been made but couldn't, due to certain limitations with the assignment specification, lack of time, or a combination of other reasons:

* Dark mode implementation via. next-themes
* Usage of a UI library
* Proper session data updating once profile is updated (limited due to NextAuth not providing updateSession functionality at the time of writing)
