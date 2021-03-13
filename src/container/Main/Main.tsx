import IFramesContainer from '../IFramesContainer';
import styles from './Main.module.css';
import { useEffect, useState } from 'react';
import PlatformIntegration, { PlatformIntegrationSingleton } from '../../services/PlatformIntegration';

const srcUrls = ['http://localhost:3000', 'https://facebook.com'];

const generateNavButtons = (srcUrls: string[], setIframeCallback: Function) => {
    return srcUrls.map((url, index) => <button className={styles.navStripButton} key={url} onClick={() => setIframeCallback(index)}> {index} </button>)
}

const platformIntegration: PlatformIntegration = new PlatformIntegration();
export function Main() {
    const [iframeUrls, setIframeUrls] = useState<string[]>(srcUrls);
    const [visibleIframeIndex, setVisibleIframeIndex] = useState<number>(0);
    const updateIframeUrls = (newUrl: string, replaceIndex: number) => {
        if(iframeUrls.includes(newUrl)) { // We already have the new Url, so we don't want to update any frames
            return;
        }
        const newIframeUrls = [...iframeUrls];
        newIframeUrls[replaceIndex] = newUrl;
        setIframeUrls(newIframeUrls);
    }

    useEffect(() => {
        platformIntegration.initialize();
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.navStrip}>
                {
                    generateNavButtons(iframeUrls, setVisibleIframeIndex)
                }
                <button onClick={() => updateIframeUrls('https://example.com', 1)}>Click here </button>
            </div>
            <div className={styles.mainContent}>
                <PlatformIntegrationSingleton.Provider value={platformIntegration}>
                    <IFramesContainer iframeSrcs={iframeUrls} currentVisibleIframeIndex={visibleIframeIndex} />
                </PlatformIntegrationSingleton.Provider>
            </div>

        </div>
    )
}
