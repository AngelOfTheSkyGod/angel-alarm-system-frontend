import {Container, CssBaseline} from "@mui/material";
import React from "react";
import ApplicationTabNavbar from "./ApplicationTabNavbar.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ApplicationContainer = ({children}) => {
    return (<React.Fragment>
        <CssBaseline/>
        <Container sx={{height: "100%", minHeight:"94vh", width: "75vw", padding: "0"}}  maxWidth="md">
            <ApplicationTabNavbar/>
            {children}
        </Container>
    </React.Fragment>)
}