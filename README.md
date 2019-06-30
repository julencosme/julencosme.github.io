# Julen D. Cosme: Personal Website

## Introduction

- This repository leverages the `build-boilerplate-static-es6-sass` repo, of which full documentation can be referenced [here.](https://github.com/mdziedzic/build-boilerplate-static-es6-sass)
- The aforementioned repository enables us to build a production-quality static website using ES6 and SASS.

## Features

- The development server aids development by automatically refreshing the browser whenever an edit is made to any of the source files.
- Furthermore, we leverage a build script that:
  - Converts all ES6 to browser friendly ES5.
  - Converts all SASS/SCSS to CSS, adding vendor prefixes to relevant CSS rules.
  - Minifies, concatenates, and bundles all JavaScript and CSS files.
  - Compresses images.

## Development

Sample files are included in `source`. These files are meant to be replaced. The only constraint is that there must be a `source/index.js` file. Place all other files inside `source` (nested sub-directories allowed).

To initiate development:

```bash
$ cd ~/Github/julencosme.github.io
$ npm run start
```

Which will initialize your development server.

- You can view the site at: `http://localhost:8080`.
- As files are edited in `source`, the browser will update, so as to reflect your changes.

## Styling

- The entry point for all styles happens in the `source/style` directory.
- You can add as many stylesheets here as you like.
- To "import" these stylesheets for use by your project, see `source/index.js`.
- Styling rules will be loaded in the order in which you `import` them.

## Assets (e.g., images, PDFs)

- Assets such as images, PDFs, &c. should be stored in the `source/images` directory.

## Development workflow

To reiterate, here's an overview of your typical workflow:

- Navigate to your project's root directory:

```bash
$ cd ~/Github/julencosme.github.io
```

- Pull from `develop`, as with:

```bash
$ git pull origin develop
```

- Branch from `develop`, as with:

```bash
$ git checkout -b my-new-branch
```

- Make changes; commit when you see fit, as with:

```bash
$ git add .
$ git commit -m "My commit message regarding changes I made"
```

And then push:

```bash
$ git push -u origin my-new-branch
```

- Open a pull request via GitHub, requesting merge into `develop`
- Merge pull request via GitHub
- In your local environment, switch back to `develop` and pull, as with:

```bash
$ git checkout develop
$ git pull origin develop
```

- Our goal, now, is to create a bundled, optimized version of your site.
- Accordingly, we'll generate a production build of the site in the `build` directory of the project's root. This is a static build; in theory, it could be opened directly in the browser.

```bash
$ npm run build
```

As it stands, our objective is to occasion a deployment. The deployment of our site will propagate the latest build as a live version on GitHub Pages.

A few notes:

- GitHub Pages for personal websites requires that our site exist on the `master` branch
- Because we are developing in a `source` directory, and because we have built to a `build` directory, and because GitHub Pages require that `index.html` reside in the project's root directory, our deployment procedure requires an extra step.
- Our source of truth is the `develop` branch. This is the branch from which we will work.
- We are reserving the `master` branch for deployment of our live site (i.e., we'll never work from `master`).

To start, let's stage our files and specify a commit message:

```bash
$ git add build && git commit -m "Add your commit message"
```

- Finally, propagate changes up to `master`:

```bash
$ git subtree push --prefix build origin master
```

Your changes should now appear on https://julencosme.github.io/. Rejoice!

## Notes

### JavaScript, SASS/SCSS, CSS files

This project uses Webpack which relies on a dependency graph. What this means as far as this project is concerned is that all JavaScript, SASS, and CSS files must be imported in `index.js` (or in files that can be accessed via `index.js`). See the sample included with the project at `source/index.js` for an example of how to do this.

### HTML and images

Nothing special needs to be done to HTML and image files apart from placing them somewhere in `source`.

### Image Compression

The build script losslessly compresses the images. To disable image compression when running `npm run build`, simply remove the `--compress` flag in the `postbuild` script in `package.json`.

### Fonts

To use a font from a CDN (like Google Fonts), place the `<link>` in the `<header>` of each HTML page that requires the font. Local fonts that are included in `source` but are not referenced by a SCSS/CSS/JavaScript file will not be included in the build.

### Supported Browsers

Use the `browserslist` file to list supported browsers. This affects what vendor prefixes get applied to the CSS, among other things. (See [https://github.com/ai/browserslist](https://github.com/ai/browserslist) for more information on how to use this file).
