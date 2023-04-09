export declare function sign(x: any): any;
export declare function onlyOnce<T>(f: () => T): () => T;
export declare function SensorCheck(sensorRootObj: any): Promise<void>;
export declare function keepTrying(tester: () => boolean, maxTries: number, millis?: number): Promise<void>;
export declare function throttle(fn: () => void, threshold: number, scope: any): () => void;
export declare const isIOS: () => boolean;
//# sourceMappingURL=Utils.d.ts.map