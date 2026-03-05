import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {DeleteImageRequest, ImageRequestResponse} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";
import {Dispatch, SetStateAction} from "react";
import {useAppDataContext} from "../context/AppDataContext.tsx";

export const useDeleteSlideShowImageStore= (setDeleteSlideShowImageRequest: Dispatch<SetStateAction<DeleteImageRequest>>, callBackFunction: () => void): {mutateDeleteSlideShowClient: UseMutationResult<ImageRequestResponse, Error, DeleteImageRequest, unknown>, callDeleteImage: any} => {
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const {appData, updateAppData} = useAppDataContext();
    const mutateDeleteSlideShowClient =  useMutation({
        mutationFn: (deleteImageRequest: DeleteImageRequest) => {
            setDeleteSlideShowImageRequest({...deleteImageRequest})
            return post(baseUrl, "deleteImage", deleteImageRequest)
        },
        onSuccess: async (data: ImageRequestResponse) => {
            updateAppData({...appData, slideShowImageCount: data?.imageCount, slideShowPageCount: data.numberOfPages})
            callBackFunction();
        }
    })

    const callDeleteImage = (deleteImageRequest: DeleteImageRequest) =>  mutateDeleteSlideShowClient.mutate(deleteImageRequest)

    return {
        mutateDeleteSlideShowClient,
        callDeleteImage
    }
}