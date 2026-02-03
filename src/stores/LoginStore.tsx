import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    AASData, LoginConnectResponse
} from "../types/ApplicationTypes.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";
import {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import {useSlideShowStore} from "./SlideShowStore.tsx";

export const useLoginStore= (setPassword: Dispatch<SetStateAction<string>>, setUsername: Dispatch<SetStateAction<string>>, updateAppData: (newValue: AASData) => void, appData:AASData):
    {mutateLoginClient: UseMutationResult<LoginConnectResponse, Error, AASData, unknown>, callLogin: any} => {
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const navigate = useNavigate();
    const {callSlideShow} = useSlideShowStore(updateAppData, appData);
    const mutateLoginClient =  useMutation({
        mutationFn: (loginRequest: AASData) => {
            return post(baseUrl, "connect", loginRequest)
        },
        onSuccess: async (data: LoginConnectResponse) => {
            updateAppData({...data})
            navigate(`../alarm`, { replace: true })
            callSlideShow()
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