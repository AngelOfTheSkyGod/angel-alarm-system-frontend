import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    AASData, SlideShowData, SlideShowPictureData, SlideShowRequest
} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";

export const useSlideShowStore = (updateAppData: (newValue: AASData) => void, appData: AASData):
    {
        mutateSlideShowClient: UseMutationResult<SlideShowData, Error, SlideShowRequest, unknown>,
        callSlideShow: any
    } => {
    const post = usePostRequest();
    const {config: {baseUrl}} = useConfigContext();
    const mutateSlideShowClient = useMutation({
        mutationFn: (slideShowRequest: SlideShowRequest) => {
            return post(baseUrl, "connectSlideShow", slideShowRequest)
        },
        onSuccess: async (data: SlideShowData) => {
            const newImages = data?.imageList.map((entry): SlideShowPictureData => {
                return {fileName: entry.fileName, imageDataUrl: entry.imageDataUrl}
            }) || [];
            updateAppData({
                ...appData,
                slideShowPageCount: data.pageNumber,
                slideShowImageCount: data.imageCount,
                slideShowData: newImages
            })
        }
    })

    const callSlideShow = (slideShowRequest: SlideShowRequest) => mutateSlideShowClient.mutate({
        ...slideShowRequest,
        userIdentifier: localStorage.getItem("identifier") || ""
    })

    return {
        mutateSlideShowClient,
        callSlideShow
    }
}