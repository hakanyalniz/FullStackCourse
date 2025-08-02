# FullStackOpen Course Submissions

<img src="./assets/Introduction.jpg">

### Exercises and submissions for the FullStackOpen Course.

### FullStackOpen Project Content

#### Part 0 - Fundamentals of Web apps

In this part, we will familiarize ourselves with the practicalities of taking the course. After that, we will have an overview of the basics of web development and also talk about the advances in web application development during the last few decades.

#### Part 1 - Introduction to React

In this part, we will familiarize ourselves with the React-library, which we will be using to write the code that runs in the browser. We will also look at some features of JavaScript that are important for understanding React.

#### Part 2 - Communicating with server

Let's continue our introduction to React. First, we will take a look at how to render a data collection, like a list of names, to the screen. After this, we will inspect how a user can submit data to a React application using HTML forms. Next, our focus shifts towards looking at how JavaScript code in the browser can fetch and handle data stored in a remote backend server. Lastly, we will take a quick look at a few simple ways of adding CSS styles to our React applications.

#### Part 3 - Programming a server with NodeJS and Express

In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.

#### Part 4 - Testing Express servers, user administration

In this part, we will continue our work on the backend. Our first major theme will be writing unit and integration tests for the backend. After we have covered testing, we will take a look at implementing user authentication and authorization.

#### Part 5 - Testing React apps

In this part we return to the frontend, first looking at different possibilities for testing the React code. We will also implement token based authentication which will enable users to log in to our application.

#### Part 6 - Advanced state management

So far, we have placed the application's state and state logic directly inside React components. When applications grow larger, state management should be moved outside React components. In this part, we will introduce the Redux library, which is currently the most popular solution for managing the state of React applications.

We'll learn about the lightweight version of Redux directly supported by React, namely the React context and useReducer hook, as well as the React Query library that simplifies the server state management.

#### Part 7 - React router, custom hooks, styling app with CSS and webpack

The seventh part of the course touches on several different themes. First, we'll get familiar with React Router. React Router helps us divide the application into different views that are shown based on the URL in the browser's address bar. After this, we'll look at a few more ways to add CSS styles to React applications. During the entire course, we've used Vite to build all of our applications. It is also possible to configure the whole toolchain yourself, and in this part we will see how this can be done with a tool called Webpack. We shall also have a look at hook functions and how to define a custom hook.

#### Part 8 - GraphQL

This part of the course is about GraphQL, Facebook's alternative to REST for communication between browser and server.

#### Part 9 - TypeScript

This part is all about TypeScript: an open-source typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript.

In this part, we will be using the tools previously introduced to build end-to-end features to an existing ecosystem, with predefined linters and an existing codebase, while writing TypeScript. After doing this part, you should be able to understand, develop and configure projects using TypeScript.

### Additional Information

Deployed frontend + backend for exercise 3.10 and 3.11 Phonebook step 10: https://fullstackcourse-mpoh.onrender.com/

This repo has a few different branches. The "production" branch is the one that is published into internet. The link is above. Meanwhile "playground" branch contains random code to poke around and play with the available technology. It is also used to follow along the FullStackOpen chapters.

The ideal node express project structure is:

```
├── controllers
│ └── notes.js
├── dist
│ └── ...
├── models
│ └── note.js
├── utils
│ ├── config.js
│ ├── logger.js
│ └── middleware.js
├── app.js
├── index.js
├── package-lock.json
├── package.json
```

Resources:

https://react-typescript-cheatsheet.netlify.app/

https://www.typescriptlang.org/docs/handbook/intro.html

https://overreacted.io/why-do-hooks-rely-on-call-order/

https://github.com/rehooks/awesome-react-hooks

https://redux.js.org/tutorials/essentials/part-1-overview-concepts

https://validator.w3.org/
