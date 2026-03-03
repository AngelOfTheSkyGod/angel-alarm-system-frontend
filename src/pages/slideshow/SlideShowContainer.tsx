import {useEffect, useMemo, useState} from "react";
import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {Alert, CircularProgress, IconButton, ImageList, ImageListItem, Stack} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {useAppDataContext} from "../../context/AppDataContext.tsx";
import {
    DeleteImageRequest,
    LoginData, SlideShowPictureData,
} from "../../types/ApplicationTypes.tsx";
import {getLoginInfo} from "../../utilities/utils.ts";
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
    const [updatedData, setUpdatedData] = useState<SlideShowPictureData[]>([...appData?.slideShowData || []]);
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState(true);
    const imagesLength = updatedData?.length;
    const {callSlideShow, mutateSlideShowClient:{isPending: isSlideShowPending}} = useSlideShowStore(updateAppData, appData);
    const imageCount = appData?.slideShowImageCount || 0;
    useMemo(() => {
        setUpdatedData([...appData?.slideShowData || []])
        console.log("app data updated: ", appData?.slideShowData)
        }, [appData?.slideShowData]
    )
    const loginInfo: LoginData = getLoginInfo(appData);
    const [deleteSlideShowImageRequest, setDeleteSlideShowImageRequest] = useState<DeleteImageRequest>({
        ...loginInfo,
        imagePosition: -1
    });
    const moveUp = (imageCount: number) => {
        if (currentImageIndex >= imagesLength - 1 && currentImageIndex < imageCount - 1){
            setCurrentImageIndex(currentImageIndex + 1)
            callSlideShow({username: appData?.username, password: appData?.password, pageNumber: Math.floor((currentImageIndex + 1) / 3), startNumber: currentImageIndex + 1})
            return;
        }else if (currentImageIndex >= imageCount - 1){
            console.log("resetting back to 0... image count:", imageCount, "current image index:", currentImageIndex)
            setCurrentImageIndex(0)
            return;
        }
        setCurrentImageIndex(currentImageIndex + 1)
    }

    const addSlideShowImageHandler = () => {
        callSlideShow({username: appData?.username, password: appData?.password, pageNumber: Math.floor((imagesLength) / 3), startNumber: (imagesLength)})
    }
    const {
        callAddImage,
        mutateAddSlideShowClient: {isPending: addImagePending}
    } = useAddSlideShowImageStore(() =>addSlideShowImageHandler());
    const {
        callDeleteImage,
        mutateDeleteSlideShowClient: {isPending: deleteImagePending}
    } = useDeleteSlideShowImageStore(setDeleteSlideShowImageRequest, );


    const uploadImage = (image: File | undefined) => {
        if (isSlideShowPending || !image) return;
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            const dataUrl = (reader.result || "").toString();
            const base64String = dataUrl.split(',')[1];
            callAddImage({...loginInfo, imageDataUrl: base64String, fileName: image.name.replace(/\.[^/.]+$/, "")});
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
        setUpdatedData(JSON.parse(JSON.stringify(appData.slideShowData)));
    }

    const submitAppDataFunction = () => {
        updateAppData({
            ...appData, slideShowData: updatedData.map((value) => {
                return {
                    imageDataUrl: value.imageDataUrl,
                    fileName: value.fileName,
                }
            })
        })
        setConfigureModeFunction(false);
        if (deleteSlideShowImageRequest?.imagePosition > -1) {
            callDeleteImage(deleteSlideShowImageRequest)
        }
    }

    useEffect(() => {
        if (!appData?.username) {
            navigate(`../login`, {replace: true})
        }
    }, [])


    if (!appData?.alarmData) {
        return null;
    }
    console.log("current image index:", currentImageIndex, "image count:", imageCount, "pageNumber: ", Math.floor((currentImageIndex) / 3), updatedData);
    return (
        <ApplicationPageContainer
            configuredModeResetFunction={configureModeResetFunction}
            submitAppDataFunction={() => submitAppDataFunction()}
            addNewEntryFunction={() => {
            }}
            configureMode={configureMode}
            setConfigureMode={setConfigureModeFunction}
            uploadFile={uploadFile && !(addImagePending || deleteImagePending || !appData?.slideShowData)}
            uploadFileFunction={(file) => uploadImage(file)}
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
                            setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : imagesLength - 1)
                        }}>
                            <ArrowBack/>
                        </IconButton>
                    }
                    <DemoPaper square={false}>
                        {configureMode && updatedData?.length > 0 && imageCount > 0 &&
                            <IconButton sx={{position: "absolute"}} aria-label="delete" size="large" onClick={() => {
                                removePicture()
                            }}>
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        {imageCount > 0 && updatedData?.length > currentImageIndex && updatedData?.length > 0 &&
                            <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
                                {updatedData.map((item) => (
                                    <ImageListItem key={item.imageDataUrl}>
                                        <img
                                            srcSet={`${item.imageDataUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${item.imageDataUrl}?w=164&h=164&fit=crop&auto=format`}
                                            alt={item.fileName}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                           }
                    </DemoPaper>
                    {imageCount > 1 && updatedData?.length > 1 && <IconButton aria-label="forwards" onClick={() => {
                        moveUp(imageCount)
                    }}>
                        <ArrowForward/>
                    </IconButton>
                    }
                </Stack>
            }
        </ApplicationPageContainer>
    )
}