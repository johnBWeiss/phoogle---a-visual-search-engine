import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);


export default new Vuetify({
    ltr: true,

    theme: {
        dark: false,
        themes: {
            dark: {
                primary: '#grey',
                secondary: '#grey',
                background: 'green'
            },
            light: {
                primary: '#ffdb58'
            }
        }
    },
});
