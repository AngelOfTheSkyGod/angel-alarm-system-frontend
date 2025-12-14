import axios from "axios";
import {useCallback} from "react";
export const usePostRequest = (
) => {
    return useCallback((baseRoute: string,
        redirectUri: string,
        postObject: any): any => {
        return axios({
        baseURL: `${baseRoute}/${redirectUri}`,
        method: "POST",
        responseType: "json",
        headers: {
            // Add any auth token here
            authorization: "your token comes here",
        },

        data: postObject,
    }).then(
        (response):any => {
            return response.data;
        },
        (error) => {
            return error;
        }
    );}, [])
};