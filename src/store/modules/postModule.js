import axios from "axios"
//


export default {
    state: {
        posts: [],
        carData: [],
        error: false,
        info: [],
        imgs: [],
        phootle: {}

    },
    mutations: {
        phootle(state, data) { state.phootle = data },
        images(state, data) { state.imgs.push(data) },
        info(state, data) { state.info.push(...data) },
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
        error: (state) => state.error,
        imageArray: (state) => state.phootle,
        imageStore: (state) => state.imgs

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
        infoScraper: async () => {

            let a = await axios.get(`http://localhost:5000/carFinance/info`)
            if (a.data.length > 0) {
                console.log(a.data.length);
            }





        },
        scraper: async (context, payload) => {
            try {
                await axios.get(`http://localhost:5000/carFinance/:${payload}`).then(data => {
                    console.log("data data", data.data);
                    if (!data.data) {
                        console.log("error");
                        context.commit('error')

                    } else { console.log("no error", data.data); context.commit("carData", data.data) }
                }
                );

            } catch (e) {
                context.commit('error')
            }
        },

        screenShotCapture: async () => {

            try {
                let results = await axios.post(`http://localhost:5000/screenshots/screenShot`, { link: 'https://www.google.com/' }
                )
                console.log(results);

            }
            catch (error) {
                console.log(error.message);
            }
        },



        screenShotCaptureFetch: async () => {
            fetch(`http://localhost:5000/screenshots/screenShot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({ link: 'https://www.google.com/' })
            }).then((response) => (response).json()).then((data) =>
                console.log("saved?", data))

        },








        fetcher: async (context, payload) => {
            try {
                console.log('in fetcher');
                await axios.get(`http://localhost:5000/screenshots/google/${payload}
                    `).then(data => {
                    context.commit('phootle', data.data)
                    console.log(data.data);
                    if (!data.data) {
                        console.log("error");
                        context.commit('error')

                    } else {

                        // let result = axios.post(`http://localhost:5000/screenshots/screenShot`, { link: data.data[0].link }
                        // )
                        // console.log(result);
                        for (let a = 0; a < 3; a++) {
                            axios.post(`http://localhost:5000/screenshots/screenShot`, { link: data.data[a].link }
                            ).then(data => { console.log(data.data); })
                        }
                        //         data.data.forEach(async (v) => {



                        //             axios.post(`http://localhost:5000/screenshots/screenShot`, { v }
                        //             ).then(data => { context.commit('phootle', data.data) })
                        //         })
                        //         console.log(this.state.phootle);
                    }
                }
                );

            } catch (e) {
                context.commit('error', e)
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