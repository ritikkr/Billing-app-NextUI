import axios from "axios";

// Axios Interceptor Instance
// https://sandeepbansod.medium.com/effortless-api-request-handling-in-next-js-with-axios-a-comprehensive-guide-8b424ce403c5
const AxiosInstance = axios.create({
    baseURL: "http://localhost:9090/api", // Replace with your API base URL
});

export default AxiosInstance;