import axios from "axios"
//


export default {
    state: {
        posts: [],
        carData: [],
        error: false
    },
    mutations: {
        error(state) { state.error = true },
        index(state, data) { state.posts = [...data] },
        carData(state, data) { state.carData.push(...data); state.error = false },
        "post/destroy"(state, payload) { state.posts = state.posts.filter((v) => { return v.id !== payload.id }) },
        "post/update"(state, payload) {
            state.posts = state.posts.map((v) => {
                if (v.id === payload.id) {
                    return payload;
                }
                else {
                    return v;
                }
            });
        }
    },
    getters: {
        posts: (state) => state.posts,
        carValue: (state) => state.carData,
        error: (state) => state.error

    },
    actions: {
        index: async (context) => {
            try {
                let data = await axios.get('https://jsonplaceholder.typicode.com/posts')
                context.commit("index", data.data);
            } catch (error) {
                alert(error.message)
            }
        },
        "post/destroy": async (context, payload) => {
            try {
                await axios.delete('https://jsonplaceholder.typicode.com/posts/1')
                context.commit("post/destroy", payload)
            } catch (error) {
                alert(error.message)
            }
        },
        scraper: async (context, payload) => {
            try {
                await axios.get(`http://localhost:5000/carFinance/:${payload}`).then(data => {
                    console.log(data.data);
                    if (!data.data) {
                        context.commit('error')

                    } else { console.log(data.data); context.commit("carData", data.data) }
                }
                );

            } catch (e) {
                context.commit('error')
            }
        },
        "post/update": async (context, payload) => {
            try {
                await axios.put('https://jsonplaceholder.typicode.com/posts/1', { ...payload }, {
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    }
                }
                )
                context.commit("post/update", payload)
            } catch (error) {
                alert(error.message)
            }
        }
    },
}