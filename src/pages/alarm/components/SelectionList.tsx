import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export default function SelectionList({handleToggle, listElements, checkedElements, subtext}){
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {listElements.map((value) => {
                const labelId = `${value}`;
                return (
                    <ListItem
                        key={value}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checkedElements(value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${subtext ?? ""} ${value}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    )
}