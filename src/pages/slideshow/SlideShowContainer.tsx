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
    const [currentPage, setCurrentPage] = useState(0);
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState(true);
    const numberOfPages = appData?.slideShowPageCount || 0;
    const {callSlideShow, mutateSlideShowClient:{isPending: isSlideShowPending}} = useSlideShowStore(updateAppData, appData);
    const [deletedImages, setDeletedImages] = useState<number[]>([]);
    const imageCount = appData?.slideShowImageCount || 0;
    useMemo(() => {
        setUpdatedData([...appData?.slideShowData || []])
        console.log("app data updated: ", appData?.slideShowData)
        }, [appData?.slideShowData]
    )
    const loginInfo: LoginData = getLoginInfo(appData);
    const [deleteSlideShowImageRequest, setDeleteSlideShowImageRequest] = useState<DeleteImageRequest>({
        ...loginInfo,
        imagesDeleted: deletedImages,
        pageNumber: -1
    });
    const moveUp = () => {
        console.log("current page: ", currentPage);
        if (currentPage >= numberOfPages){
            setCurrentPage(0)
            slideShowImageHandler(0);
            return;
        }
        setCurrentPage((prev) => prev + 1)
        slideShowImageHandler(currentPage + 1);
        console.log("increasing: ", currentPage);
    }

    const slideShowImageHandler = (pageNumber: number) => {
        callSlideShow({username: appData?.username, password: appData?.password, pageNumber: pageNumber})
    }
    const {
        callAddImage,
        mutateAddSlideShowClient: {isPending: addImagePending}
    } = useAddSlideShowImageStore(() => slideShowImageHandler(currentPage));
    const {
        callDeleteImage,
        mutateDeleteSlideShowClient: {isPending: deleteImagePending}
    } = useDeleteSlideShowImageStore(setDeleteSlideShowImageRequest, () => slideShowImageHandler(currentPage));


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

    const removePicture = (currentImageIndex: number) => {
        const list = updatedData !== null && updatedData.length > 0 ? [...updatedData] : [];
        list.splice(currentImageIndex, 1);
        deletedImages.push(currentImageIndex);
        setDeletedImages([...deletedImages]);
        setDeleteSlideShowImageRequest({
            ...loginInfo,
            imagesDeleted: deletedImages,
            pageNumber: currentPage
        });
        setUpdatedData(list);
    }

    const configureModeResetFunction = () => {
        setUpdatedData(JSON.parse(JSON.stringify(appData.slideShowData)));
        setDeletedImages([]);
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
        if (deletedImages.length > 0) {
            callDeleteImage(deleteSlideShowImageRequest)
        }
        setDeletedImages([]);
    }

    useEffect(() => {
        if (!appData?.username) {
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
                            setCurrentPage(currentPage > 0 ? currentPage - 1 : numberOfPages)
                            slideShowImageHandler(currentPage)
                        }}>
                            <ArrowBack/>
                        </IconButton>
                    }
                    <DemoPaper square={false}>
                        {updatedData?.length > 0 &&
                            <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
                                {updatedData.map((item, index) => (
                                    <ImageListItem key={item.imageDataUrl}>
                                        {configureMode && updatedData?.length > 0 && imageCount > 0 &&
                                            <IconButton sx={{position: "absolute"}} aria-label="delete" size="large" onClick={() => {
                                                removePicture(index)
                                            }}>
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        }
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
                    { numberOfPages > 0 && <IconButton aria-label="forwards" onClick={() => {
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