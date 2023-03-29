import Euler from "./Rotation/Euler";
import { Quaternion } from "./Rotation/Types";
export default class DeviceOrientation {
    options: any;
    alphaOffsetScreen: number;
    alphaOffsetDevice: Euler;
    constructor(options: any);
    start(callback?: () => void): void;
    stop(): void;
    listen(callback: any): void;
    getFixedFrameQuaternion(): Quaternion;
    getFixedFrameEuler(): Euler;
    getScreenAdjustedQuaternion(): Quaternion;
    getFixedFrameMatrix(): import("./Rotation/Types").RotationMatrix;
    getScreenAdjustedMatrix(): import("./Rotation/Types").RotationMatrix;
    getScreenAdjustedEuler(): import("./Rotation/Types").EulerType;
    isAbsolute(): boolean;
    getLastRawEventData(): any;
}
//# sourceMappingURL=DeviceOrientation.d.ts.map