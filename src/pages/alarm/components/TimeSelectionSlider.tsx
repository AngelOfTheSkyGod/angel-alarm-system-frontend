import {IconButton, Stack, Typography} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useSlideSelection} from "../../../hooks/useSlideSelection.ts";
import {getElementTiles} from "../../../utilities/utils.ts";

interface TimeSelectionSliderProps {
    elementsArray: (string | number)[];
    currentSelection: number;
    setCurrentSelection: (newSelection: number) => void;
}

export const TimeSelectionSlider = ({
                                        elementsArray,
                                        currentSelection,
                                        setCurrentSelection
                                    }: TimeSelectionSliderProps) => {
    const {dragging, stopDragging, startDragging } = useSlideSelection({elementsArray, currentSelection, setCurrentSelection})
    const elements = getElementTiles(elementsArray, currentSelection);
    const increaseSelection = () => {
        setCurrentSelection(currentSelection < elementsArray.length - 1 ? currentSelection + 1 : 0)
    }
    const decreaseSelection = () => {
        setCurrentSelection(currentSelection > 0 ? currentSelection - 1 : elementsArray.length - 1 )
    }
    return (
        <Stack
            margin={elementsArray.length < 3 ? "0 0 2rem 0" : "0"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{userSelect:"none"}}
            onMouseDown={(e) => {startDragging(e)}}
            onMouseMove={(e) => {dragging(e)}}
            onMouseUp={() =>stopDragging()}
            onMouseLeave={() =>stopDragging()}

        >
            <IconButton aria-label="increase selection" onClick={() => {decreaseSelection()}}>
                <ArrowUpwardIcon />
            </IconButton>
            <Stack  >
                {
                    elements.map((element, key) =>
                        <Typography
                            draggable="false"
                            key={key} component="h1"
                            zIndex={3}
                            variant="h5"
                            sx={{userSelect:"none", transform:`rotateX(${-60 + (30 * key)}deg)`}}
                        >
                            {(String(element).length < 2 && elementsArray.length > 12) ? `0${element}` : element}
                        </Typography>
                    )
                }
            </Stack>
            <IconButton aria-label="decrease selection" onClick={() => {increaseSelection()}}>
                <ArrowDownwardIcon/>
            </IconButton>
        </Stack>
    )
}