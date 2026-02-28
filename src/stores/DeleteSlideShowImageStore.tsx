import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {DeleteImageRequest, ImageRequestResponse} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";
import {Dispatch, SetStateAction} from "react";
import {useAppDataContext} from "../context/AppDataContext.tsx";

export const useDeleteSlideShowImageStore= (setDeleteSlideShowImageRequest: Dispatch<SetStateAction<DeleteImageRequest>>, setCurrentIndex: Dispatch<SetStateAction<number>>): {mutateDeleteSlideShowClient: UseMutationResult<ImageRequestResponse, Error, DeleteImageRequest, unknown>, callDeleteImage: any} => {
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const {appData, updateAppData} = useAppDataContext();
    const mutateDeleteSlideShowClient =  useMutation({
        mutationFn: (deleteImageRequest: DeleteImageRequest) => {
            setDeleteSlideShowImageRequest({...deleteImageRequest, imagePosition: -1})
            return post(baseUrl, "deleteImage", deleteImageRequest)
        },
        onSuccess: async (data: ImageRequestResponse) => {
            setCurrentIndex((prev) => prev - 1 < 0 ? 0 : prev - 1);
            updateAppData({...appData, slideShowImageCount: data?.imageCount})
        }
    })

    const callDeleteImage = (deleteImageRequest: DeleteImageRequest) =>  mutateDeleteSlideShowClient.mutate(deleteImageRequest)

    return {
        mutateDeleteSlideShowClient,
        callDeleteImage
    }
}