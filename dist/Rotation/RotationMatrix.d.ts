import { AngleType, Quaternion, RotationMatrix, Vector3D } from "./Types";
export declare function identityMatrix(): RotationMatrix;
export declare function matrixForRotation(axis: Vector3D, angle: AngleType): RotationMatrix;
export declare function matrixFromQuaternion(q: Quaternion): RotationMatrix;
export declare function rotationMatrix(m11: number | Float32Array | number[], m12?: number, m13?: number, m21?: number, m22?: number, m23?: number, m31?: number, m32?: number, m33?: number): RotationMatrix;
//# sourceMappingURL=RotationMatrix.d.ts.map