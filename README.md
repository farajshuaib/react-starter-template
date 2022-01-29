<p align="center">
    <img src="/one-year-of-react-native.png"></img>
</p>

<p align="center">
    A Minimal Setup & Fast Boilerplate for <a href="https://reactjs.org/">React.js</a> with <a href="https://vitejs.dev/">Vite</a> and tailwindcss + all most used depedency
</p>


Create React apps with no build configuration.

- [Creating an App](#creating-an-app) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.


## Quick Overview

```sh
npx create-react-app my-app --template starter-kit
cd my-app
npm start
```

### Get Started Immediately

You **don’t** need to install or configure tools like webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

Create a project, and you’re good to go.

## Creating an App

**You’ll need to have Node 14.0.0 or later version on your local development machine** (but it’s not required on the server). We recommend using the latest LTS version. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

To create a new app, you may choose one of the following methods:

### npx

```sh
npx create-react-app my-app --template starter-kit
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_


_`npm init <initializer>` is available in npm 6+_

### Yarn

```sh
yarn create react-app my-app --template starter-kit
```

_[`yarn create <starter-kit-package>`](https://yarnpkg.com/lang/en/docs/cli/create/) is available in Yarn 0.25+_

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── index.html
└── src
    ├── assets/
    ├── componens/
    ├── constant/
    ├── context/
    ├── hook/
    ├── helpers/
    ├── router/
    ├── tests/
    ├── screens/
    ├── store/
    ├── styles/
    ├── types/
    ├── services/
    ├── utils/
    └── main.jsx
    └── app.jsx
```




```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

### `npm dev` or `yarn dev`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

