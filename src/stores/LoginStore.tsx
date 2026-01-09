import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    AASData,
    SlideShowData,
    SlideShowPictureData
} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";
import {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";

export const useLoginStore= (setPassword: Dispatch<SetStateAction<string>>, setUsername: Dispatch<SetStateAction<string>>, updateAppData: (newValue: AASData) => void, appData:AASData):
    {mutateLoginClient: UseMutationResult<SlideShowData, Error, AASData, unknown>, callLogin: any} => {
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const navigate = useNavigate();
    const mutateLoginClient =  useMutation({
        mutationFn: (loginRequest: AASData) => {
            return post(baseUrl, "connect", loginRequest)
        },
        onSuccess: async (data: SlideShowData) => {
            navigate(`../alarm`, { replace: true })
            updateAppData({...appData, isLoggedIn: true, slideShowData: data?.imageList.map((entry):SlideShowPictureData=> {return {imageDataUrl: entry }}) || []})
        },
        onError: async () => {
          setPassword("");
          setUsername("");
          updateAppData({...appData, username: "", password: ""});
        }
    })

    const callLogin = (loginRequest: AASData) =>  mutateLoginClient.mutate({...loginRequest, userIdentifier: localStorage.getItem("identifier") || ""})

    return {
        mutateLoginClient,
        callLogin
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