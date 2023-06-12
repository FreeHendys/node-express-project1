### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
    -then/catch method chaining and async/await
- What is a Promise?
    -objects that represent the eventual completion (or failure) of an asynchronous operation.
- What are the differences between an async function and a regular function?
    -async functions always return a promise
- What is the difference between Node.js and Express.js?
    -node.js is a server side version of javascript while express.js is a web framework that allows you to create web applications
- What is the error-first callback pattern?
  - a function which either returns an error object or any successful data returned by the function.
- What is middleware?
    -a request handler with access to the application's request-response cycle. for express.js they are created outside app listeners and can be daisy chained on to them.
- What does the `next` function do?
    -the next function moves your app to the next function instead of a hard stop. for example if you are using middleware in express you need to place next() at the end so it will still run your app listener
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
    -There is no jQuery dependency.
    -using await for each one after another will hinder performance.
    -there is no error handing so if one thing fails the rest will not continue. should be using try/catch.
    -hard coded usernames and url instead of a variable.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
