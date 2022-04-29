import Vue from "vue";
import Vuex from "vuex";
import exampleModule from "./modules/exampleModule"
import postModule from "./modules/postModule";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { exampleModule, postModule }
})


export default store;
