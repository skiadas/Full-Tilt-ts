import { AngleSpec, AngleType } from "./Types";
export declare class Angle implements AngleType {
    degrees: number;
    radians: number;
    constructor(angleSpec: AngleSpec);
    sin(): number;
    cos(): number;
    tan(): number;
    times(scale: number): Angle;
}
export declare function degrees(deg: number): Angle;
export declare function radians(rad: number): Angle;
//# sourceMappingURL=Angle.d.ts.map