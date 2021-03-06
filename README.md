# Crashpad Site

> Landing page for the Crashpad Collective

[ ![Codeship Status for crashpad/site](https://www.codeship.io/projects/fdda2d50-e5b7-0132-fa1c-266c7b4e6c8b/status?branch=master)](https://www.codeship.io/projects/82082)

![](https://cloud.githubusercontent.com/assets/90316/7809315/8af76382-0399-11e5-8429-3446d1633afe.gif)

This repository does the following:

1. compiles Stylus files into CSS and minifies it
2. concatenates and minifies JavaScript files
3. builds templates based on [assemble](http://assemble.io) layout templates
4. spins up static web server for development

## Prerequisites

- [node.js](http://nodejs.org/)
- [npm](https://npmjs.org/)
- [ImageMagick](http://www.imagemagick.org)

To install all of the above in one go, use [Homebrew](http://brew.sh):

```bash
brew install node imagemagick
```

Then, to get all dependencies run:

```bash
npm install
```

This will install all required dependencies in one go.


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

# License

The MIT License (MIT)
Copyright © 2015 Crashpad Collective, http://crashpad.io

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
