import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);


export default new Vuetify({
    ltr: true,

    theme: {
        dark: false,
        themes: {
            dark: {
                primary: '#ffdb58',
                secondary: '#ffdb58',
                background: '#ffdb58'
            },
            light: {
                primary: '#ffdb58'
            }
        }
    },
});
