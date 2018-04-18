import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.store({
  state: {
    user: {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      password1: '',
      email: ''
    }
  }
})
