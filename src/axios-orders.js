import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burgerbuilder-1af56-default-rtdb.firebaseio.com/',
})

export default instance;
