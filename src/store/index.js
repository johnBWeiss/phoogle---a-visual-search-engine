import Vue from "vue";
import Vuex from "vuex";
import phoogleModule from "./modules/phoogleModule";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { phoogleModule }
})

export default store;
