import { AngleType, RawEuler, EulerType, Quaternion, RotationMatrix, Vector3D } from "./Types";
export default class Euler implements EulerType {
    [key: string]: any;
    alpha: number;
    beta: number;
    gamma: number;
    constructor(alpha: number, beta: number, gamma: number);
    rotateX(angle: AngleType): EulerType;
    rotateY(angle: AngleType): EulerType;
    rotateZ(angle: AngleType): EulerType;
    rotateByAxisAngle(axis: Vector3D, angle: AngleType): EulerType;
    toQuaternion(): Quaternion;
    toMatrix(): RotationMatrix;
}
export declare function eulerFromAngleObject(obj: RawEuler): Euler;
//# sourceMappingURL=Euler.d.ts.map