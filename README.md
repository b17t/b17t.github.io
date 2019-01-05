![Blackbox Development](_assets/b17t-avatar-lbox-32.png)

## Blackbox Development's Landing Page

This is a simple repo that contains the files needed to host and deploy Blackbox Development's landing page via [Github Pages](https://pages.github.com/).

### Development

The `gulp` task runner can output two types of builds: `development` _(served via a local dev server with livereload)_ and static `production` files.

Due to the nature of Github Pages's hosting, build files have to be commited to the repository.

Also, as you have already noticed, most files and folders have a preceding underscore `_` in they're name. This is so that it will ignore those file and not publish them.

#### Javascript Transpiling

Is done via `babel`, using the `babel-env` preset.

Also, `eslint` in combination with `prettier` is used to lint files and provide some basic code style consistency.

While linting is automatically triggered on commit, you can also run it manually via either `yarn lint` or `yarn lint:fix`, the latter of which will attempt to fix errors.

#### CSS Transpiling

Is done via `postcss`, using `postcss-simple-vars` to provide basic variable functionality.

Also, `stylelint` is used to lint files and provide some basic code style consistency.

While linting is automatically triggered on commit, you can also run it manually via either `yarn stylelint` or `yarn stylelint:fix`, the latter of which will attempt to fix errors.

#### Development Server

Running `yarn dev` will start the development server, which will spawn a web server on [localhost:8080](http://localhost:8080/).

This will inject the transpiled `.css` and `.js` files into the various `.html` pages, along with a livereload websocket connection to ease development.

#### Production Build

The production files can be built by running: `yarn build`.

This will transpile, and hash the `.css` and `.js` files, move them into the `root` path and inject them into the `.html` file(s) _(these will be also moved to the `root` path, but only after everything else)_

This is done to ensure the `.css` and `.js` files have new names _(generated using the content hash)_, to provide some basic level of cache busting.

#### Deploying Landing Page

Using Github Pages is pretty strait-forward, as long as the assets are in the root folder _(and there is a `index.html` file)_, and commits into `master` are automatically pushed to the live web server.

So, as soon as you merge your PR with the new changes, they will be published.
