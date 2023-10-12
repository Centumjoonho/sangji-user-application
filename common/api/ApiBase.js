import { config } from "../config";

const url = (path) => {
    return `${config.HOST}${path}`
}
const ExerciseInfoAPI = {
    get : (data, headers) => {
        return fetch(url('/api/external/log'), {
            method : 'GET',
            headers : headers
        })
    },
    post : (data, headers) => {
        return fetch(url('/api/external/log'), {
            method : 'POST',
            body : data,
            headers : headers
        });
    }
}
export {
    ExerciseInfoAPI
}