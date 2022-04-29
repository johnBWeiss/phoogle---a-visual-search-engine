import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);


export default new Vuetify({
    ltr: true,

    theme: {
        dark: false,
        themes: {
            dark: {
                primary: '#808080',
                secondary: '#ffdb58',
                background: 'green'
            },
            light: {
                primary: '#ffdb58'
            }
        }
    },
});
