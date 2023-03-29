////// Internal Event Handlers //////

import { degToRad } from "./Math";

import {
	hasScreenOrientationAPI,
	screenActive,
	screenOrientation,
} from "./WindowConstants";

// Internal device orientation + motion variables
export const sensors = {
	orientation: {
		active: false,
		callbacks: [],
		data: undefined,
	},
	motion: {
		active: false,
		callbacks: [],
		data: undefined,
	},
};

export function registerForScreenOrientationChange() {
	if (screenActive) return;
	if (hasScreenOrientationAPI) {
		window.screen.orientation.addEventListener(
			"change",
			() =>
				(screenOrientation.angle =
					(window.screen.orientation.angle || 0) * degToRad),
			false
		);
	} else {
		window.addEventListener(
			"orientationchange",
			() => (screenOrientation.angle = (window.orientation || 0) * degToRad),
			false
		);
	}
}

export function addOrientationCallback(callback?: () => void) {
	if (
		callback &&
		Object.prototype.toString.call(callback) == "[object Function]"
	) {
		sensors.orientation.callbacks.push(callback);
	}
}

export function startDeviceOrientationMonitoring() {
	if (!sensors.orientation.active) {
		window.addEventListener(
			"deviceorientation",
			handleDeviceOrientationChange,
			false
		);

		sensors.orientation.active = true;
	}
}

export function stopDeviceOrientationMonitoring() {
	if (sensors.orientation.active) {
		window.removeEventListener(
			"deviceorientation",
			handleDeviceOrientationChange,
			false
		);

		sensors.orientation.active = false;
	}
}

export function handleDeviceOrientationChange(event) {
	sensors.orientation.data = event;
	// Fire every callback function each time deviceorientation is updated
	for (var i in sensors.orientation.callbacks) {
		sensors.orientation.callbacks[i].call(this);
	}
}

export function handleDeviceMotionChange(event) {
	sensors.motion.data = event;
	// Fire every callback function each time devicemotion is updated
	for (var i in sensors.motion.callbacks) {
		sensors.motion.callbacks[i].call(this);
	}
}
