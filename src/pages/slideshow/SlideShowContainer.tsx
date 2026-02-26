import {useEffect, useState} from "react";
import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {Alert, CircularProgress, IconButton, Stack} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {useAppDataContext} from "../../context/AppDataContext.tsx";
import {
    DeleteImageRequest,
    LoginData,
    SlideShowPictureDataWithBlob
} from "../../types/ApplicationTypes.tsx";
import {getLoginInfo, slideShowDataToSlideShowDataWithBlob} from "../../utilities/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAddSlideShowImageStore} from "../../stores/AddSlideShowImageStore.tsx";
import {useDeleteSlideShowImageStore} from "../../stores/DeleteSlideShowImageStore.tsx";
import {useSlideShowStore} from "../../stores/SlideShowStore.tsx";

const DemoPaper = styled(Paper)(({theme}) => ({
    width: "80%",
    height: "80%",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));


export const SlideShowContainer = () => {
    const {appData, updateAppData} = useAppDataContext();
    const [updatedData, setUpdatedData] = useState<SlideShowPictureDataWithBlob[]>(slideShowDataToSlideShowDataWithBlob([...appData?.slideShowData || []]));
    const navigate = useNavigate();
    console.log(appData);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState(true);
    const [imageCount, setImageCount] = useState(updatedData.length);
    const imagesLength = updatedData?.length;
    const {callSlideShow, mutateSlideShowClient:{isPending: isSlideShowPending}} = useSlideShowStore(updateAppData, appData, setImageCount);
    const [pageNumber, setPageNumber] = useState(0);

    const loginInfo: LoginData = getLoginInfo(appData);
    const [deleteSlideShowImageRequest, setDeleteSlideShowImageRequest] = useState<DeleteImageRequest>({
        ...loginInfo,
        imagePosition: -1
    });
    const {
        callAddImage,
        mutateAddSlideShowClient: {isPending: addImagePending}
    } = useAddSlideShowImageStore(setImageCount);
    const {
        callDeleteImage,
        mutateDeleteSlideShowClient: {isPending: deleteImagePending}
    } = useDeleteSlideShowImageStore(setImageCount, setDeleteSlideShowImageRequest);


    const uploadImage = (image: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            const dataUrl = (reader.result || "").toString();
            const base64String = dataUrl.split(',')[1];
            callAddImage({...loginInfo, imageDataUrl: base64String})
        }
    }

    const setConfigureModeFunction = (value: boolean) => {
        setConfigureMode(value);
        if (!value) {
            setTimeout(() => {
                setUploadFile(true);
            }, 1000);
        } else {
            setUploadFile(false);
        }
    }

    const removePicture = () => {
        const list = updatedData !== null && updatedData.length > 0 ? [...updatedData] : [];
        list.splice(currentImageIndex, 1);
        setDeleteSlideShowImageRequest({
            ...loginInfo,
            imagePosition: currentImageIndex,
        });
        if (currentImageIndex >= list.length) {
            setCurrentImageIndex(list.length - 1);
        }
        if (list.length <= 0) {
            setCurrentImageIndex(0);
        }
        setUpdatedData(list);
    }

    const configureModeResetFunction = () => {
        setUpdatedData(slideShowDataToSlideShowDataWithBlob([...JSON.parse(JSON.stringify(appData.slideShowData))]));
    }

    const submitAppDataFunction = () => {
        updateAppData({
            ...appData, slideShowData: updatedData.map((value) => {
                return {imageDataUrl: value.imageDataUrl}
            })
        })
        setConfigureModeFunction(false);
        if (deleteSlideShowImageRequest?.imagePosition > -1) {
            callDeleteImage(deleteSlideShowImageRequest)
        }
    }

    const moveUp = () => {
        console.log("current image index:", currentImageIndex, "image count:", imageCount);
        if (currentImageIndex >= imagesLength - 1 && currentImageIndex < imageCount){
            console.log("calling for more images...", pageNumber + 1)
            callSlideShow({username: appData?.username, password: appData?.password, pageNumber: pageNumber + 1})
            setCurrentImageIndex(currentImageIndex + 1)
            setPageNumber(pageNumber + 1)
            return;
        }
        setCurrentImageIndex(0)
    }

    useEffect(() => {
        if (imageCount !== appData?.slideShowData?.length){
            setUpdatedData(slideShowDataToSlideShowDataWithBlob([...appData?.slideShowData || []]));
            setImageCount(appData?.slideShowData?.length || 0)
        }
    }, [appData])

    useEffect(() => {
        if (!appData?.username) {
            console.log("username is empty! user refreshed the page", appData?.username);
            navigate(`../login`, {replace: true})
        }
    }, [])


    if (!appData?.alarmData) {
        return null;
    }

    return (
        <ApplicationPageContainer
            configuredModeResetFunction={configureModeResetFunction}
            submitAppDataFunction={() => submitAppDataFunction()}
            addNewEntryFunction={() => {
            }}
            configureMode={configureMode}
            setConfigureMode={setConfigureModeFunction}
            uploadFile={uploadFile && !(addImagePending || deleteImagePending || !appData?.slideShowData)}
            uploadFileFunction={(file) => uploadImage(file || new Blob())}
        >
            {!(addImagePending || deleteImagePending || isSlideShowPending || !appData?.slideShowData) && <Alert variant="filled" severity="info" sx={{marginTop: "2rem"}}>
                Add a New Picture Or Delete a Current Entry
            </Alert>}
            {addImagePending || deleteImagePending || isSlideShowPending || !appData?.slideShowData ?
                <CircularProgress/>
                :
                <Stack sx={{overFlowY: "auto", padding: '2rem 0 0 0', height: "75vh"}} direction={"row"}
                       justifyContent={"center"} alignItems={"center"}>
                    {imageCount > 1 &&
                        <IconButton aria-label="backwards" onClick={() => {
                            setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : imageCount - 1)
                        }}>
                            <ArrowBack/>
                        </IconButton>
                    }
                    <DemoPaper square={false} style={{height: "600px", width: "1024px"}}>
                        {configureMode && imageCount > 0 &&
                            <IconButton sx={{position: "absolute"}} aria-label="delete" size="large" onClick={() => {
                                removePicture()
                            }}>
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        {imageCount > 0 &&
                            <img
                                alt="not found"
                                width={"100%"}
                                height={"100%"}
                                src={URL.createObjectURL(updatedData?.[currentImageIndex]?.imageBlob)}
                            />}
                    </DemoPaper>
                    {imageCount > 1 && <IconButton aria-label="forwards" onClick={() => {
                        moveUp()
                    }}>
                        <ArrowForward/>
                    </IconButton>
                    }
                </Stack>
            }
        </ApplicationPageContainer>
    )
}