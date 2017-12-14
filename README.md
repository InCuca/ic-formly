# ic-formly

> This component a form with validation and more using only javascript objects


# Usage

## ES6 Modules / CommonJS

```bash
$ npm run build
```

```js
import IcFormly from 'dist/ic-formly';

Vue.component('ic-formly', IcFormly);

let duckModel = {
  duck: {
    name: 'Charlie',
    specie: 'Mountain Duck'
  }
};

let duckFields = [
  {
    key: 'duck.name',
    type: 'input',
    required: true
  }, {
    key: 'duck.specie',
    type: 'input',
    required: true
  }
];
```

```html
<ic-formly
      v-model="duckModel"
      :fields="duckFields"
      ref="formly"/>
    <b-button @click="$refs.formly.submit()">
      Submit
    </b-button>
```

## UMD

```bash
$ npm run build:umd
```

```html
<ic-formly text="Hello World!"></ic-formly>

<script src="https://unpkg.com/vue" charset="utf-8"></script>
<script src="./dist/ic-formly.min.js" charset="utf-8"></script>

<script type="text/javascript">
  Vue.component('ic-formly', window.IcFormly);
</script>
```

## Installation

### Using yarn

`yarn add ic-formly`

### Using npm

`npm i --save ic-formly`

## Demo and Docs

`npm run serve`

## Tests

This template uses karma with chai by default, you can change test settings in poi.config.js

`npm run test`
`npm run test:watch`
`npm run test:cov`

## License

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
