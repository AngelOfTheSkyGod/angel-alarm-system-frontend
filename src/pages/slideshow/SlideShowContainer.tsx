import {useEffect, useState} from "react";
import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {Alert, IconButton, Stack} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {useAppDataContext} from "../../context/AppDataContext.tsx";
import {SlideShowPictureDataWithBlob} from "../../types/ApplicationTypes.tsx";
import {slideShowDataToSlideShowDataWithBlob} from "../../utilities/utils.ts";
import {useLoginStore} from "../../stores/LoginStore.tsx";
import {useNavigate} from "react-router-dom";

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "80%",
    height: "80%",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));



export const SlideShowContainer = () => {
    const {appData, updateAppData} = useAppDataContext();
    const [updatedData , setUpdatedData] = useState<SlideShowPictureDataWithBlob[]>(slideShowDataToSlideShowDataWithBlob([...JSON.parse(JSON.stringify(appData.slideShowData))]));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState(true);
    const {data: loginData} = useLoginStore();
    const navigate = useNavigate();
    const uploadImage = (image: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = () => {
            const dataUrl = (reader.result || "").toString();
            const base64String = dataUrl.split(',')[1];
            const list = updatedData !== null && updatedData.length > 0 ? [...updatedData] : [];
            list.push({imageDataUrl: base64String, imageBlob: image});
            updateAppData({...appData, slideShowData: list.map((value) => {return {imageDataUrl: base64String,  imageBlob:value.imageBlob}})})
            setUpdatedData(list)
        }
    }
    const setConfigureModeFunction = (value: boolean) => {
        setConfigureMode(value);
        if (!value){
            setTimeout(() => {
                setUploadFile(true);
            }, 1000);
        }else{
            setUploadFile(false);
        }
    }
    const removePicture = () => {
        const list = updatedData !== null && updatedData.length > 0 ? [...updatedData] : [];
        list.splice(currentImageIndex, 1);
        if (currentImageIndex >= list.length) {
            setCurrentImageIndex(list.length - 1);
        }
        if (list.length <= 0){
            setCurrentImageIndex(0);
        }
        setUpdatedData(list);
    }

    const configureModeResetFunction = () => {
        setUpdatedData(slideShowDataToSlideShowDataWithBlob([...JSON.parse(JSON.stringify(appData.slideShowData))]));
    }
    const submitAppDataFunction = () => {
        updateAppData({...appData, slideShowData: updatedData.map((value) => {return {imageDataUrl: value.imageDataUrl}})})
        setConfigureModeFunction(false);
    }
    useEffect(() => {
        if (!loginData?.imageList) {
            navigate(`../login`, { replace: true })
        }
    }, [])
    if (!loginData?.imageList) {
        return null;
    }
    return (
        <ApplicationPageContainer
            configuredModeResetFunction={configureModeResetFunction}
            submitAppDataFunction={() => submitAppDataFunction()}
            addNewEntryFunction={() => {}}
            configureMode={configureMode}
            setConfigureMode={setConfigureModeFunction}
            uploadFile={uploadFile}
            uploadFileFunction={(file) => uploadImage(file || new Blob())}
        >
            <Alert variant="filled" severity="info" sx={{marginTop:"2rem"}}>
                Add a New Picture Or Delete a Current Entry
            </Alert>
            <Stack sx={{overFlowY: "auto", padding: '2rem 0 0 0', height: "75vh"}} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                {updatedData.length > 1 &&
                    <IconButton aria-label="backwards" onClick={() => {setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : updatedData.length - 1)}}>
                        <ArrowBack/>
                    </IconButton>
                }
                <DemoPaper square={false}>
                    { configureMode && updatedData?.length > 0 &&
                        <IconButton sx={{position: "absolute"}} aria-label="delete" size="large" onClick ={() => {removePicture()}}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    }
                    {updatedData.length > 0 &&
                        <img
                            alt="not found"
                            width={"100%"}
                            height={"100%"}
                            src={URL.createObjectURL(updatedData?.[currentImageIndex]?.imageBlob)}
                        />}
                </DemoPaper>
                {updatedData.length > 1 &&<IconButton aria-label="forwards" onClick={() => {setCurrentImageIndex(currentImageIndex < updatedData.length - 1 ? currentImageIndex + 1 : 0)}}>
                    <ArrowForward />
                </IconButton>
                }
            </Stack>
        </ApplicationPageContainer>
    )
}