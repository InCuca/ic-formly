# ic-formly

> This component is a form with validation and more using only javascript objects

## Installation

### Using yarn

`yarn add ic-formly`

### Using npm

`npm i --save ic-formly`

## Docs

`npm run serve`

## Usage

[Demo](https://jsfiddle.net/ppsgftLg/)

```jsx
import IcFormly from 'ic-formly';

Vue.use(IcFormly);

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

<div>
  <pre><code>{{JSON.stringify(duckModel)}}</code></pre>
  <ic-formly
    ref="formly"
    v-model="duckModel"
    :fields="duckFields"/>
  <button @click="$refs.formly.submit()">
    Submit
  </button>
</div>
```


### UMD

```html
<script src="https://unpkg.com/vue" charset="utf-8"></script>
<script src="./umd/ic-formly.min.js" charset="utf-8"></script>
```

## Build

Build configuration is located in the `poi.config.js` file, to build just run: `npm run build`, it will build to `dist` directory.

## Tests

This template uses karma with chai by default, you can change test settings in poi.config.js

`npm run test`
`npm run test:watch`
`npm run test:cov`

## License

This project is licensed under [Apache 2](https://www.apache.org/licenses/LICENSE-2.0)
