import axios from "axios";
import { tokenAxios } from "@/services/axiosInstance";


export default {

    state: {
        isLoggedIn: false,
        errorMsg: "login failed",
        // axiosInstance: null,
        tokenAuth: false,
        currentUser: {}
    },
    mutations: {
        tokenTest: () => { alert("token test works") },
        "login": (state) => {
            state.isLoggedIn = true
        },
        userInfo(state, data) { state.currentUser = data },
        "Token/login": (state) => {
            state.tokenAuth = true
        }
    },
    getters: {

        hasToken(state) { return state.tokenAuth },
        currentUser(state) { return state.currentUser }

    },
    actions: {
        login: async (context, payload) => {

            const res = await axios.post('https://claplablmsapi.clap.co.il/auth/login/1',
                {
                    email: payload.email,
                    password: payload.password
                }
            )
            localStorage.setItem('access_token', res.data.token)
            context.commit("login");
            context.commit("userInfo", payload);
            context.commit("Token/login");
        },



        "Token/login": async (context) => {
            await axios
                .get("https://claplablmsapi.clap.co.il/auth/checkLogin", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                })
            context.commit("Token/login");
        },

        axiosInstanceTokenTest: async (context) => {
            await tokenAxios.get('auth/checkLogin')
            context.commit("tokenTest");
        }
    }
}