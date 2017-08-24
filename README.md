# Webpack Installation [personal setup, ongoing, non-componentized]

## Introduction
This setup sidesteps the usual webpack default setup and instead outputs css and js into one file each (like gulp). It is meant to be used for projects that aren't javascript heavy or aren't set up to be fully made of components, or if you just want to practice some webpack stuff.

## Init

`npm install`

For full list of packages, see `package.json` in root.


## Webpack

This project is compiled using webpack. Configuration is in `webpack.config.js` in the root. 


### Available command line options:

`webpack` or `npm run dev` -  default command. runs babel, js bundler and sass compiler.

`npm run watch` - runs the above and watches for changes.

`npm run build` - for production. runs babel, js bundler, js uglify, sass compiler, and sass minification.

(see `scripts` in `package.json` for details)


## Folder structure

```
root
|-- ProjectFolder
|   |-- build 
|   |   |-- scripts.js //compiled js
|   |   `-- style.css //compiled css
|   |-- src
|   |   |-- js
|   |   |   |-- components
|   |   |   |   |-- component1.js
|   |   |   |   |-- component2.js
|   |   |   |   `-- etc.
|   |   |   `--scripts.js //js entry point
|   |   |-- sass
|   |   |   |-- partials
|   |   |   |   |-- _variables.scss
|   |   |   |   |-- _globals.scss
|   |   |   |   `-- etc.
|   |   |   `--style.scss //css/sass entry point
```


## Notes

* `node-sass` (in the form of loader `sass-loader`) is run on dev as it is fairly quick.
* PostCSS (`postcss-loader`) is run on production builds. it is slower but has more compression options.


## TODO

* JS linter
* Tree shaking
* commonschunkplugin
* image minification
* SVG minification & spritesheets
* FED performance testing
