import {useEffect, useMemo, useState} from "react";
import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {Alert, CircularProgress, IconButton, ImageList, ImageListItem, Stack, useMediaQuery} from "@mui/material";
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
import loadImage from "blueimp-load-image";

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
    const loginInfo: LoginData = getLoginInfo(appData);
    const isMobile = !useMediaQuery('(min-width:600px)');
    const [deleteSlideShowImageRequest, setDeleteSlideShowImageRequest] = useState<DeleteImageRequest>({
        ...loginInfo,
        imagesDeleted: deletedImages,
        pageNumber: -1
    });
    const slideShowImageHandler = (pageNumber: number) => {
        callSlideShow({username: appData?.username, password: appData?.password, pageNumber: pageNumber})
    }
    const moveUp = () => {
        if (currentPage >= numberOfPages){
            setCurrentPage(0)
            slideShowImageHandler(0);
            return;
        }
        setCurrentPage((prev) => prev + 1)
        slideShowImageHandler(currentPage + 1);
    }
    const moveDown = () => {
        setCurrentPage(currentPage > 0 ? currentPage - 1 : numberOfPages)
        slideShowImageHandler(currentPage > 0 ? currentPage - 1 : numberOfPages)
    }
    useMemo(() => {
            setUpdatedData([...appData?.slideShowData || []])
            console.log("number of elements on page:", appData?.slideShowData?.length, "pages:", appData?.slideShowPageCount)
            if (appData?.slideShowData?.length === 0 && (appData?.slideShowPageCount || 0) > 0){
                console.log("moving down...");
                moveDown();
            }
        }, [appData?.slideShowData]
    )
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
        loadImage(
            image,
            (canvas: any) => {

                const MAX_WIDTH = 480;
                const MAX_HEIGHT = 320;

                const width = canvas.width;
                const height = canvas.height;

                const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);

                const resizedCanvas = document.createElement("canvas");
                const ctx = resizedCanvas.getContext("2d");

                resizedCanvas.width = width * scale;
                resizedCanvas.height = height * scale;

                ctx?.drawImage(canvas, 0, 0, resizedCanvas.width, resizedCanvas.height);

                const dataUrl = resizedCanvas.toDataURL("image/png", 0.9);
                const base64String = dataUrl.split(",")[1];

                callAddImage({
                    ...loginInfo,
                    imageDataUrl: base64String,
                    fileName: image.name.replace(/\.[^/.]+$/, "")
                });
            },
            {
                orientation: true,
                canvas: true,
                meta: true
            }
        );
    };
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

    const removePicture = (item:SlideShowPictureData) => {
        const currentImageIndex = updatedData?.findIndex((element) => item.imageDataUrl == element.imageDataUrl && item.fileName == element.fileName)
        const correctImageIndex = appData?.slideShowData?.findIndex((element) => item.imageDataUrl == element.imageDataUrl && item.fileName == element.fileName)
        console.log("item: ", item, "updated data:", updatedData, "app data:", appData?.slideShowData)
        if (deletedImages.find((index) => index === correctImageIndex) || correctImageIndex === -1 || correctImageIndex === undefined){
            console.log("cant find element, ", item, "correct images: ", correctImageIndex);
            return;
        }
        const list = updatedData !== null && updatedData.length > 0 ? [...updatedData] : [];
        list.splice(currentImageIndex, 1);
        deletedImages.push(correctImageIndex);
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
                    {imageCount > 1 && numberOfPages > 0 && !configureMode &&
                        <IconButton aria-label="backwards" onClick={() => {
                            moveDown();
                        }}>
                            <ArrowBack/>
                        </IconButton>
                    }
                    <DemoPaper square={false}>
                        {updatedData?.length > 0 &&
                            <ImageList sx={{ width: "100%", height: "100%" }} cols={isMobile ? 1 : 3} rowHeight={"auto"}>
                                {updatedData.map((item) => (
                                    <ImageListItem key={item.imageDataUrl}>
                                        {configureMode &&
                                            <IconButton sx={{position: "absolute"}} aria-label="delete" size="large" onClick={() => {
                                                removePicture(item)
                                            }}>
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        }
                                        <img
                                            src={new URL(item.imageDataUrl, import.meta.url).href}
                                            alt={item.fileName}
                                            loading="lazy"
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                           }
                    </DemoPaper>
                    { numberOfPages > 0 && !configureMode && <IconButton aria-label="forwards" onClick={() => {
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