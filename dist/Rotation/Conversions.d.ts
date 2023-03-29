import { RawEuler, RawQuaternion } from "./Types";
export declare function matrixFromEuler(euler: RawEuler): Float32Array;
export declare function eulerFromRotationMatrix(R: Float32Array): RawEuler;
export declare function eulerFromQuaternionX(x: number, y: number, z: number, w: number): RawEuler;
export declare function quatFromEuler(euler: RawEuler): RawQuaternion;
export declare function quaternionFromRotationMatrix(R: Float32Array): RawQuaternion;
export declare function fromRad(alphaRad: number, betaRad: number, gammaRad: number): RawEuler;
//# sourceMappingURL=Conversions.d.ts.map