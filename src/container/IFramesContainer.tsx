import IFrame from '../component/IFrame/IFrame';
import { useEffect, useState } from 'react';


interface IFramesContainerProps {
    iframeSrcs: string[],
    currentVisibleIframeIndex?: number
}

const generateIframes = (iframeUrls: string[], visibleIframeIndex: number): JSX.Element[] => {
    if (visibleIframeIndex >= iframeUrls.length) {
        throw new Error("Something went wrong, state and iframes urls provided do not match");
    }
    return iframeUrls.map((url, index) => {
        return <IFrame src={url} key={url} visible={index === visibleIframeIndex} />
    })

}


function IFramesContainer(props: IFramesContainerProps) {
    const [visibleIframeIndex, setVisibleIframeIndex] = useState<number>(props.currentVisibleIframeIndex ?? 0);
    useEffect(() => {
        setVisibleIframeIndex(props.currentVisibleIframeIndex || 0);
    }, [props.currentVisibleIframeIndex])
    return (
        <div style={{height: '97%', width: '97%'}}>
        {
            generateIframes(props.iframeSrcs, visibleIframeIndex)
        }
        </div>
    )
}

export default IFramesContainer;