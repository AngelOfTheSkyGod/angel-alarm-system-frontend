import {useState} from "react";
import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {IconButton, Stack} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "80%",
    height: "80%",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));



export const SlideShowContainer = () => {
    const [selectedImageList, setSelectedImageList] = useState<(Blob | MediaSource | null)[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [configureMode, setConfigureMode] = useState<boolean>(false);

    const uploadImage = (image: Blob | MediaSource | null) => {
        const list = selectedImageList !== null && selectedImageList.length > 0 ? [...selectedImageList] : [];
        list.push(image);
        setSelectedImageList(list);
        console.log("image list: ", list);
    }
    return (
        <ApplicationPageContainer
            configuredModeResetFunction={() =>{}}
            submitAppDataFunction={() => {}}
            addNewEntryFunction={() => {}}
            configureMode={configureMode}
            setConfigureMode={setConfigureMode}
            uploadFile={true}
            uploadFileFunction={(file) => uploadImage(file)}
        >
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
                    {selectedImageList.length > 0 && <img
                        alt="not found"
                        width={"100%"}
                        height={"100%"}
                        src={URL.createObjectURL(selectedImageList[currentImageIndex] || new Blob())}
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