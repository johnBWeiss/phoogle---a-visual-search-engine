
import Vue from 'vue'
import router from 'vue-router'
import phoogleSearch from "../views/phoogleSearch.vue"

Vue.use(router)

const VueRouter = new router({
    mode: 'history',
    routes: [

        {
            path: '/',
            name: 'phoogleSearch',
            component: phoogleSearch
        },
    ]
})

export default VueRouter