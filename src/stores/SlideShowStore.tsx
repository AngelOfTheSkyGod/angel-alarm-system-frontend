import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    AASData, SlideShowData, SlideShowPictureData, SlideShowRequest
} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";

export const useSlideShowStore= (updateAppData: (newValue: AASData) => void, appData:AASData, setImageCount?: (imageCount: number) => void):
    {mutateSlideShowClient: UseMutationResult<SlideShowData, Error, SlideShowRequest, unknown>, callSlideShow: any} => {
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const mutateSlideShowClient =  useMutation({
        mutationFn: (slideShowRequest: SlideShowRequest) => {
            return post(baseUrl, "connectSlideShow", slideShowRequest)
        },
        onSuccess: async (data: SlideShowData) => {
            if (setImageCount){
                setImageCount(data.imageCount ?? 0)
            }
            updateAppData({
            ...appData,
            slideShowData: appData?.slideShowData?.concat(data?.imageList.map((entry): SlideShowPictureData => {
                return {imageDataUrl: entry}
            }) || [])
        }) }
    })

    const callSlideShow = (slideShowRequest: SlideShowRequest) =>  mutateSlideShowClient.mutate({...slideShowRequest, userIdentifier: localStorage.getItem("identifier") || ""})

    return {
        mutateSlideShowClient,
        callSlideShow
    }
}
// export const useLoginStore= (): UseQueryResult<SlideShowData | undefined> => {
//     const { appData:{username, password, slideShowData, alarmData, calendarData} } = useAppDataContext();
//     const post = usePostRequest();
//     const {config : {baseUrl}} = useConfigContext();
//     const identifier = localStorage.getItem("identifier");
//     const postObject: AASData= {
//         alarmData: alarmData, calendarData: calendarData, password, slideShowData: slideShowData, username, userIdentifier: identifier || ""
//     }
//     return useQuery<SlideShowData | undefined>({
//         queryKey:["loginStore", username, password, identifier],
//         queryFn: (): SlideShowData | undefined => {
//             return post(baseUrl, "connect", postObject)
//         },
//         enabled: !!(postObject.username && postObject.password && identifier)
//     })
// }