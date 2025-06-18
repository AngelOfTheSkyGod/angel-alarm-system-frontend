import {useState} from "react";

interface SlideSelectionProps{
    elementsArray: (string | number)[];
    currentSelection: number;
    setCurrentSelection: (newSelection: number) => void;
}
export const useSlideSelection= ({elementsArray, currentSelection, setCurrentSelection} : SlideSelectionProps) => {
    const [startY, setStartY] = useState<number | null>(null);
    const [dy, setDY] = useState<number | null>(0);
    const dragging = (e: React.MouseEvent<HTMLDivElement>) => {
        if (startY === null) return;
        setDY(startY - e.clientY)
        if (dy !== null && dy > 0) {
            setDY(0)
            setStartY(e.clientY)
            setCurrentSelection(currentSelection < elementsArray.length - 1 ? currentSelection + 1 : 0 )

        }else if (dy !== null && dy< 0){
            setDY(0)
            setStartY(e.clientY)
            setCurrentSelection(currentSelection > 0 ? currentSelection - 1 : elementsArray.length - 1);
        }
    }
    const stopDragging = () => {
        setStartY(null);
    }

    const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartY(e.clientY)
    }

    return {
        dragging,
        stopDragging,
        startDragging
    }

}