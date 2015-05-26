# Crashpad Site

> Landing page for the Crashpad Collective

![](https://cloud.githubusercontent.com/assets/90316/7809315/8af76382-0399-11e5-8429-3446d1633afe.gif)

This repository does the following:

1. compiles Stylus files into CSS and minifies it
2. concatenates and minifies JavaScript files
3. builds templates based on [assemble](http://assemble.io) layout templates
4. spins up static web server for development

## Prerequisites

- [node.js](http://nodejs.org/) & [npm](https://npmjs.org/)
- [Bower](http://bower.io/)


To get all dependencies run:
```bash
npm install
```

This will install all required npm packages and bower components in one go.


## Development

This compiles and builds everything into the `dist/` folder and starts up a watching & live-reloading web server:

```bash
grunt server
```

The site will open [localhost:1337](http://localhost:1337) automatically in your default browser.

Note: The easiest way to get livereload to work is to install the [browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).


## Build

This will put everything together and output it in the `dist/` folder:

```bash
grunt build
```
