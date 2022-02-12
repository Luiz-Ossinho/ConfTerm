import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function CleanThemeProvider({ children }) {
    const cleanTheme = createTheme({
        palette: {
            primary: {
                main: '#07C1DB'
            },
            background:{
                default: '#FFFFFF',
                paper: '#EBEBEB'
            }
        },
        shape: {
            borderRadius: 16
        }
    });
   
    return (
        <ThemeProvider theme={cleanTheme}>
            {children}
        </ThemeProvider>
    );
}