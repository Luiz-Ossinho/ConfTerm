import { ExtraContext, ExtraDispatchContext } from "../contexts/ExtraContext";
import React from "react";

export default function useExtra() {
    const { visible: isVisible, element: extra } = React.useContext(ExtraContext);
    const setExtra = React.useContext(ExtraDispatchContext);

    const setVisible = (visibility) => setExtra(previous => { return { ...previous, visible: visibility } });
    const setExtraElement = (element) => setExtra(previous => { return { ...previous, element: element } });
    const toggleVisible = () => setExtra(previous => { return { ...previous, visible: !previous.visible } });

    return { extra, isVisible, setExtra: setExtraElement, setVisible, toggleVisible };
};