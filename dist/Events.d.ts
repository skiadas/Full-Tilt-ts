export declare const sensors: {
    orientation: {
        active: boolean;
        callbacks: any[];
        data: any;
    };
    motion: {
        active: boolean;
        callbacks: any[];
        data: any;
    };
};
export declare function registerForScreenOrientationChange(): void;
export declare function addOrientationCallback(callback?: () => void): void;
export declare function startDeviceOrientationMonitoring(): void;
export declare function stopDeviceOrientationMonitoring(): void;
export declare function handleDeviceOrientationChange(event: any): void;
export declare function handleDeviceMotionChange(event: any): void;
//# sourceMappingURL=Events.d.ts.map