# Red Bull Case Assignment

This is a web application developed as an assignment for Red Bull Media House. I hope you enjoy checking this app out as much as I enjoyed creating it :)

## Getting Started

A deployed version of this website may be found in the *Environments* section of this repository.

To run this app locally, install the node dependencies and run the development server via:

```bash
npm install && npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
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

# Bonus Features

As a fun little side-task, another branch was created to emulate the login / register flow found on RedBull.com, thus making the login / register experience into a single page, rather than two for each feature.

In addition, *Forgot Password* functionality is implemented and may be accessible on the master branch. Implementing this was quite fun and straight-forward! The [sendgrid](https://sendgrid.com) Email Delivery API is used to send password reset emails, in which a token is sent to the user to reset their password.

## Technologies

* ⏭️  Next.js - A React framework for building server-side rendered and static web applications.
* 💨 Tailwind CSS - A utility-first CSS framework for building custom designs.
* 🔐 Next-Auth - An authentication library for Next.js applications.
* 🔼 Prisma - A modern ORM for building type-safe and scalable database applications.
* 🪐 PlanetScale - A cloud-native database platform for scaling MySQL.
* 🃏 Jest - A JavaScript testing framework for unit testing, integration testing, and snapshot testing.
* 🛡️ Zod - A TypeScript-first schema validation library that provides a simple and powerful way to validate and transform data.
* 🚀 Vercel - A cloud platform for deploying serverless functions, static sites, and full-stack web applications.

## Possible Improvements

Below are improvements which would have been made but couldn't, due to certain limitations with the assignment specification, lack of time, or a combination of other reasons:

* Dark mode implementation via. next-themes
* Usage of a UI library
* Proper session data updating once profile is updated (limited due to NextAuth not providing updateSession functionality at the time of writing)
* Increased password security (i.e. using a safe password regex or similar, rather than just enforcing passwords to be >=5 characters)
