```jsx
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
