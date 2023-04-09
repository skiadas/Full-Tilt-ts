declare const FULLTILT: {
    version: string;
    orientation: {
        activate: typeof import("./orientation").activate;
        data: import("./orientation").OrientationData;
        start: typeof import("./orientation").start;
        stop: typeof import("./orientation").stop;
        listen: typeof import("./orientation").listen;
        registerForScreenOrientationChange: typeof import("./orientation").registerForScreenOrientationChange;
    };
};
export default FULLTILT;
//# sourceMappingURL=Core.d.ts.map