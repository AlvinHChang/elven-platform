import { useContext, useMemo, useRef } from 'react';
import { PlatformIntegrationSingleton } from '../../services/PlatformIntegration';
import { usePrevious } from '../../utilities/customHooks';

interface IFrameProps {
    title?: string,
    visible: boolean,
    src: string

}

function IFrame(props: IFrameProps) {

    const iframeEl = useRef<HTMLIFrameElement>(document.createElement("iframe"));
    const platformIntegration = useContext(PlatformIntegrationSingleton);
    const previousSrc = usePrevious(props.src);

    useMemo(() => {
        platformIntegration.unregisterIframe(previousSrc);
        platformIntegration.registerIframe(props.src, iframeEl.current);
        return () => {
            platformIntegration.unregisterIframe(previousSrc);
        }
    }, [previousSrc, props.src, iframeEl, platformIntegration]);
    let title: string = props.title ?? '';

    return (
        <iframe ref={iframeEl} title={title} src={props.src} style={{display: props.visible ? 'block' : 'none', height: '100%', width: '100%', border: '0'}} />
    )
}

IFrame.defaultProps = {
    visible: false
};

export default IFrame;