import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {AASData, SlideShowData} from "../types/ApplicationTypes.tsx";
import {useAppDataContext} from "../context/AppDataContext.tsx";
import {useConfigContext} from "../hooks/useConfigContext.tsx";
import {usePostRequest} from "../utilities/usePostRequest.tsx";

export const useLoginStore= (): UseQueryResult<SlideShowData | undefined> => {
    const { appData:{username, password, slideShowData, alarmData, calendarData} } = useAppDataContext();
    const post = usePostRequest();
    const {config : {baseUrl}} = useConfigContext();
    const identifier = localStorage.getItem("identifier");
    const postObject: AASData= {
        alarmData: alarmData, calendarData: calendarData, password, slideShowData: slideShowData, username, userIdentifier: identifier || ""
    }
    return useQuery<SlideShowData | undefined>({
        queryKey:["loginStore", username, password, postObject],
        queryFn: (): SlideShowData | undefined => {
            if (!postObject.username || !postObject.password || !identifier){
                return undefined;
            }
            return post(baseUrl, "connect", postObject)
        }
    })
}