import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {DeleteImageRequest, imageRequestResponse} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";

export const useDeleteSlideShowImageStore= (deleteImageRequest: DeleteImageRequest): UseQueryResult<imageRequestResponse | undefined> => {
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const identifier = localStorage.getItem("identifier");

    return useQuery<imageRequestResponse | undefined>({
        queryKey:["addSlideShowImageStore", deleteImageRequest.imageDataUrl],
        queryFn: (): imageRequestResponse | undefined => {
            return post(baseUrl, "deleteImage", deleteImageRequest)
        },
        enabled: !!(deleteImageRequest.imagePosition && deleteImageRequest.imageDataUrl && deleteImageRequest.username && deleteImageRequest.password && identifier)
    })
}