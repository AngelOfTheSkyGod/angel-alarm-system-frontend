import {useState, useEffect} from "react";
import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {Alert, IconButton, Stack} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {useAppDataContext} from "../../context/AppDataContext.tsx";
import {SlideShowPictureDataWithBlob} from "../../types/ApplicationTypes.tsx";
import {slideShowDataToSlideShowDataWithBlob} from "../../utilities/utils.ts";

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "80%",
    height: "80%",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));



export const SlideShowContainer = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState(true);
    const {appData, updateAppData} = useAppDataContext();
    const [updatedData , setUpdatedData] = useState<SlideShowPictureDataWithBlob[]>(slideShowDataToSlideShowDataWithBlob([...appData.slideShowData]));
    const [selectedImageList, setSelectedImageList] = useState<(SlideShowPictureDataWithBlob | null)[]>([...updatedData]);
    const uploadImage = (image: Blob | null) => {
        image?.arrayBuffer().then((result) => {
            const imageArray = new Uint8Array(result);
            const list = selectedImageList !== null && selectedImageList.length > 0 ? [...selectedImageList] : [];
            list.push({imageArray: imageArray, imageBlob: image});
            setSelectedImageList(list);
        });
        console.log("image list: ", list);
    }
    const setConfigureModeFunction = (value: boolean) => {
        setUploadFile(!value);
        setConfigureMode(value);
    }
    return (
        <ApplicationPageContainer
            configuredModeResetFunction={() =>{}}
            submitAppDataFunction={() => {}}
            addNewEntryFunction={() => {}}
            configureMode={configureMode}
            setConfigureMode={setConfigureModeFunction}
            uploadFile={uploadFile}
            uploadFileFunction={(file) => uploadImage(file)}
        >
            <Alert variant="filled" severity="info" sx={{marginTop:"2rem"}}>
                Add a New Picture Or Delete a Current Entry
            </Alert>
            <Stack sx={{overFlowY: "auto", padding: '2rem 0 0 0', height: "75vh"}} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                {selectedImageList.length > 1 &&
                    <IconButton aria-label="backwards" onClick={() => {setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : selectedImageList.length - 1)}}>
                        <ArrowBack/>
                    </IconButton>
                }
                <DemoPaper square={false}>
                    { configureMode &&
                        <IconButton sx={{position: "absolute"}} aria-label="delete" size="large">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    }
                    {selectedImageList.length > 0 &&
                        <img
                            alt="not found"
                            width={"100%"}
                            height={"100%"}
                            src={URL.createObjectURL(selectedImageList?.[currentImageIndex]?.imageBlob)}
                        />}
                </DemoPaper>
                {selectedImageList.length > 1 &&<IconButton aria-label="forwards" onClick={() => {setCurrentImageIndex(currentImageIndex < selectedImageList.length - 1 ? currentImageIndex + 1 : 0)}}>
                    <ArrowForward />
                </IconButton>
                }
            </Stack>
        </ApplicationPageContainer>
    )
}