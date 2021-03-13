import { createContext } from 'react';

interface originDict {
    [key: string]: HTMLIFrameElement
}
const MESSAGES = {
    GAME_STATE: "getGameState",
    USERNAME: "getUserProfile"
}


export default class PlatformIntegration {
    originDict: originDict;

    constructor() {
        this.originDict = {};
    }

    initialize() {
        window.addEventListener('message', this.handleMessage.bind(this), false);
    }

    handleMessage(event: MessageEvent) {
        const originIframe = this.originDict[event.origin];
        if (originIframe) {
            const state = PlatformIntegration.generateState(event.origin, event.data)
            originIframe.contentWindow?.postMessage(JSON.stringify(state), "*");
        }
    }

    static generateState = (originUrl:string, eventData: Object): Object => {
        let state = {};
        switch (eventData) {
            case MESSAGES.GAME_STATE:
                state = {
                    type: MESSAGES.GAME_STATE, state: { title: "testing testing" }
                };
                break;
            case MESSAGES.USERNAME:
                state = {
                    type: MESSAGES.USERNAME, state: { username: "wow" }
                };
                break;
            default:
                break;
        }
        return state;
    }

    unregisterIframe(originUrl: string|undefined) {
        if (!!originUrl && originUrl in this.originDict) {
            delete this.originDict[originUrl];
        }
    }

    registerIframe(originUrl: string, iframe: HTMLIFrameElement) {
        this.originDict[originUrl] = iframe;
        console.log(this.originDict);
    }
}

const PlatformIntegrationSingleton = createContext(new PlatformIntegration());

export { PlatformIntegrationSingleton };
