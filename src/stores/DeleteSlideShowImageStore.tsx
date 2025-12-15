import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {DeleteImageRequest, ImageRequestResponse} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";
import {Dispatch, SetStateAction} from "react";

export const useDeleteSlideShowImageStore= (setImageCount: Dispatch<SetStateAction<number>>, setDeleteSlideShowImageRequest: Dispatch<SetStateAction<DeleteImageRequest>>): {mutateDeleteSlideShowClient: UseMutationResult<ImageRequestResponse, Error, DeleteImageRequest, unknown>, callDeleteImage: any} => {
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const mutateDeleteSlideShowClient =  useMutation({
        mutationFn: (deleteImageRequest: DeleteImageRequest) => {
            setDeleteSlideShowImageRequest({...deleteImageRequest, imagePosition: -1})
            return post(baseUrl, "deleteImage", deleteImageRequest)
        },
        onSuccess: async (data: ImageRequestResponse) => { setImageCount(data?.imageCount) }
    })

    const callDeleteImage = (deleteImageRequest: DeleteImageRequest) =>  mutateDeleteSlideShowClient.mutate(deleteImageRequest)

    return {
        mutateDeleteSlideShowClient,
        callDeleteImage
    }
}