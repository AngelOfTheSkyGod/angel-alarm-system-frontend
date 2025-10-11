import axios from "axios";
import {AASData} from "../types/ApplicationTypes.tsx";

export const postCall = (
    baseRoute: string,
    redirectUri: string,
    postObject: AASData
) => {
    axios({
        baseURL: `${baseRoute}/${redirectUri}`,
        method: "POST",
        responseType: "json",
        headers: {
            // Add any auth token here
            authorization: "your token comes here",
        },

        data: postObject,
    }).then(
        (response) => {
            const result = response.data;
            console.log(result);
        },
        (error) => {
            console.log(error);
        }
    );
};