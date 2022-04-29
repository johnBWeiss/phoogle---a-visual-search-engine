import axios from "axios";


const tokenAxios = axios.create({

    baseURL: 'https://claplablmsapi.clap.co.il',
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
})

const instance = axios.create({
    baseURL: 'https://www.find-car.co.il'
});

export { tokenAxios, instance }