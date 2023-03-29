import { degToRad, M_2_PI, M_PI, M_PI_2 } from "./Math";

export let screenActive = false;

// Internal screen orientation variables
export const hasScreenOrientationAPI =
	window &&
	window.screen &&
	window.screen.orientation &&
	window.screen.orientation.angle !== undefined &&
	window.screen.orientation.angle !== null
		? true
		: false;
export const screenOrientation = {
	angle:
		(hasScreenOrientationAPI
			? window.screen.orientation.angle
			: window.orientation || 0) * degToRad,
};

export const SCREEN_ROTATION_0 = 0,
	SCREEN_ROTATION_90 = M_PI_2,
	SCREEN_ROTATION_180 = M_PI,
	SCREEN_ROTATION_270 = M_2_PI / 3,
	SCREEN_ROTATION_MINUS_90 = -M_PI_2;
