import axios from "axios";
import {AASData, SlideShowData} from "../types/ApplicationTypes.tsx";
import {useCallback} from "react";
export const usePostRequest = (
) => {
    return useCallback((baseRoute: string,
        redirectUri: string,
        postObject: AASData): SlideShowData => { // @ts-ignore
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
        (response):SlideShowData => {
            return response.data;
        },
        (error) => {
            return error;
        }
    );}, [])
};