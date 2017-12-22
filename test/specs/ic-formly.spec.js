import Vue from 'vue'
import Formly from '@'
import FormlyCmp from '@/ic-formly/ic-formly.vue'

Vue.use(Formly)

describe('ic-formly.vue', () => {
  let Constructor, vm;
  const propsData = {
    value: {
      duck: {
        name: 'Charlie',
        specie: 'Mountain Duck'
      }
    },
    fields: [
      {
        key: 'duck.name',
        type: 'input',
        required: true
      }, {
        key: 'duck.specie',
        type: 'input',
        required: true
      }
    ]
  }

  beforeEach(done => {
    Constructor = Vue.extend(FormlyCmp);
    vm = new Constructor({
      propsData,
      mounted: () => done(),
    });
    vm.$mount();
  })

  afterEach(() => vm.$destroy())

  it('should emit `submit` with the model values', done => {
    vm.$on('input', data => {
      expect(data.duck).to.deep.equal(propsData.value.duck);
      done();
    });

    vm.submit();
  })

  it('should emit `error` when validation errors occurs', done => {
    vm.$destroy();
    propsData.value.duck.name = ''; // Force error
    vm = new Constructor({
      propsData,
      mounted: () => {
        vm.submit();
      }
    });
    vm.$on('input', console.warn);
    vm.$on('error', () => done());
    vm.$mount();
  });

  it.skip('should validates when any input changes', () => {
    // TODO: implement test
  })
})
