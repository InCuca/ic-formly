# ic-formly

> This component a form with validation and more using only javascript objects

## Installation

### Using yarn

`yarn add ic-formly`

### Using npm

`npm i --save ic-formly`

## Demo and Docs

`npm run serve`

## Usage

### With [vue-loader](https://github.com/vuejs/vue-loader) or [vueify](https://github.com/vuejs/vueify)

```js
import IcFormly from 'ic-formly.vue';

Vue.component('ic-formly', IcFormly);
```

### ES6 Modules / CommonJS

```js
import IcFormly from 'ic-formly/cjs/ic-formly.min.js';
import 'ic-formly/cjs/ic-formly.min.css';

Vue.component('ic-formly', IcFormly);
```

### UMD

```html
<ic-formly text="Hello World!"></ic-formly>

<script src="https://unpkg.com/vue" charset="utf-8"></script>
<script src="./umd/ic-formly.min.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="./umd/ic-formly.min.css">

<script type="text/javascript">
  Vue.component('ic-formly', window.IcFormly);
</script>
```

## Build

Build configuration is located in the `poi.config.js` file, to build just run: `npm run build`, it will build to `cjs` and `umd` directories.

## Tests

This template uses karma with chai by default, you can change test settings in poi.config.js

`npm run test`
`npm run test:watch`
`npm run test:cov`

## License

This project is licensed under [Apache 2](https://www.apache.org/licenses/LICENSE-2.0)
