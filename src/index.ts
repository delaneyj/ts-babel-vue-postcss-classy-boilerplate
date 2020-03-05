import './base.postcss'
import 'typeface-open-sans'

import Vue from 'vue'
import VueCompositionApi, { Ref, ref } from '@vue/composition-api'

import App from './App.vue'
Vue.use(VueCompositionApi)

const v = new Vue({
  // router,
  render: h =>
    h(App, {
      props: {},
    }),
}).$mount('#app')
