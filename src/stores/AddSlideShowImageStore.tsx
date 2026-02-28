import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {AddImageRequest, ImageRequestResponse} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";
import {useAppDataContext} from "../context/AppDataContext.tsx";

export const useAddSlideShowImageStore= (): {mutateAddSlideShowClient: UseMutationResult<ImageRequestResponse, Error, AddImageRequest, unknown>, callAddImage: any} => {
    const post = usePostRequest();
    const {appData, updateAppData} = useAppDataContext();
    const {config : {baseUrl}} = useConfigContext();
    const mutateAddSlideShowClient =  useMutation({
        mutationFn: (addImageRequest: AddImageRequest) => {
            return post(baseUrl, "addImage", addImageRequest)
        },
        onSuccess: async (data: ImageRequestResponse) => {
            updateAppData({...appData, slideShowImageCount: data?.imageCount})
        }
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