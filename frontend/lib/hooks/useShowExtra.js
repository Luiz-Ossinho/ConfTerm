import useExtra from './useExtra'
import React from 'react';

export default function useShowExtra(shouldShow) {
    const { isVisible, setVisible } = useExtra();

    React.useEffect(() => {
        if (shouldShow !== isVisible) setVisible(shouldShow);
    }, [])
}