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

    <ic-formly
      v-model="duckModel"
      :fields="duckFields"
      ref="formly"/>
    <b-button @click="$refs.formly.submit()">
      Submit
    </b-button>
```
