import Axios, { AxiosResponse } from "axios";
const baseUrl = "https://api.chucknorris.io/jokes/";

export const getJokesCollection = (path, data={}): Promise<any[]> => {
    const promise = new Promise<any[]>((resolve, reject) => {
        try {
            Axios.get(baseUrl+path, { params: data}).then(response => { resolve(response.data) });
        }catch(ex){
            reject(ex);
        }
    });
    return promise;
};