import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {AddImageRequest, imageRequestResponse} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";

export const useAddSlideShowImageStore= (addImageRequest: AddImageRequest): UseQueryResult<imageRequestResponse | undefined> => {
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const identifier = localStorage.getItem("identifier");

    return useQuery<imageRequestResponse | undefined>({
        queryKey:["addSlideShowImageStore", addImageRequest.imageDataUrl],
        queryFn: (): imageRequestResponse | undefined => {
            return post(baseUrl, "addImage", addImageRequest)
        },
        enabled: !!(addImageRequest.imageDataUrl && addImageRequest.username && addImageRequest.password && !identifier)
    })
}