import { ExtraProvider } from "./ExtraContext";
import CleanThemeProvider from "./ThemeContext";
import { ToastContainer } from 'react-toastify';
import NoSSR from "react-no-ssr";
import 'react-toastify/dist/ReactToastify.css';

export default function ContextProvider({ children }) {
    return (
        <NoSSR>
            <CleanThemeProvider>
                <ExtraProvider>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            limit={2}
                        />
                        {children}
                </ExtraProvider>
            </CleanThemeProvider>
        </NoSSR>
    );
}