import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {AddImageRequest, ImageRequestResponse} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";
import {Dispatch, SetStateAction} from "react";

export const useAddSlideShowImageStore= (setImageCount: Dispatch<SetStateAction<number>>): {mutateAddSlideShowClient: UseMutationResult<ImageRequestResponse, Error, AddImageRequest, unknown>, callAddImage: any} => {
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const mutateAddSlideShowClient =  useMutation({
        mutationFn: (addImageRequest: AddImageRequest) => {
            return post(baseUrl, "addImage", addImageRequest)
        },
        onSuccess: async (data: ImageRequestResponse) => { setImageCount(data?.imageCount) }
    })

    const callAddImage = (addImageRequest: AddImageRequest) =>  mutateAddSlideShowClient.mutate(addImageRequest)

    return {
        mutateAddSlideShowClient,
        callAddImage
    }
}

// export const useAddSlideShowImageStore= (addImageRequest: AddImageRequest): UseQueryResult<imageRequestResponse | undefined> => {
//     const post = usePostRequest();
//     const {config : {baseUrl}} = useConfigContext();
//     const identifier = localStorage.getItem("identifier");
//
//     return useQuery<imageRequestResponse | undefined>({
//         queryKey:["addSlideShowImageStore", addImageRequest.imageDataUrl],
//         queryFn: (): imageRequestResponse | undefined => {
//             return post(baseUrl, "addImage", addImageRequest)
//         },
//         enabled: !!(addImageRequest.imageDataUrl && addImageRequest.username && addImageRequest.password && !identifier)
//     })
// }