import { RawEuler } from "./Rotation/Types";
export interface OrientationData {
    angle: number;
    webkitHeading: number;
    initialAngle: number;
    initial: RawEuler;
    absolute: RawEuler;
    relative: RawEuler;
    screen: RawEuler;
}
export declare let data: OrientationData;
export declare const hasScreenOrientationAPI: () => boolean;
export declare function activate(): Promise<{
    listen: typeof listen;
    data: OrientationData;
}>;
export declare function listen(callback: (data: OrientationData) => void): void;
export declare function start(): void;
export declare function stop(): void;
export declare function registerForScreenOrientationChange(): void;
declare const _default: {
    activate: typeof activate;
    data: OrientationData;
    start: typeof start;
    stop: typeof stop;
    listen: typeof listen;
    registerForScreenOrientationChange: typeof registerForScreenOrientationChange;
};
export default _default;
//# sourceMappingURL=orientation.d.ts.map