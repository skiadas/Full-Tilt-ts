interface p3d {
    x: number;
    y: number;
    z: number;
}
interface rotEuler {
    alpha: number;
    beta: number;
    gamma: number;
}
export declare class DeviceMotion {
    options: any;
    constructor(options: any);
    start(callback?: () => void): void;
    stop(): void;
    listen(callback: any): void;
    getScreenAdjustedAcceleration(): p3d;
    getScreenAdjustedAccelerationIncludingGravity(): p3d;
    getScreenAdjustedRotationRate(): rotEuler;
    getLastRawEventData(): any;
}
export {};
//# sourceMappingURL=DeviceMotion.d.ts.map