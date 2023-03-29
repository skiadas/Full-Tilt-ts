import { radians } from "./Rotation/Angle";
import Euler, { eulerFromAngleObject } from "./Rotation/Euler";
import {
	sensors,
	startDeviceOrientationMonitoring,
	registerForScreenOrientationChange,
	stopDeviceOrientationMonitoring,
	addOrientationCallback,
} from "./Events";
import { Quaternion } from "./Rotation/Types";
import { screenOrientation } from "./WindowConstants";

export default class DeviceOrientation {
	options: any;
	alphaOffsetScreen: number;
	alphaOffsetDevice: Euler;

	constructor(options) {
		this.options = options || {}; // by default use UA deviceorientation 'type' ("game" on iOS, "world" on Android)
		this.alphaOffsetScreen = 0;
		this.alphaOffsetDevice = undefined;

		let tries = 0;
		let successCount = 0;
		const maxTries = 200;
		const successThreshold = 10;

		// Create a game-based deviceorientation object (initial alpha === 0 degrees)
		if (this.options.type === "game") {
			const setGameAlphaOffset = function (evt) {
				if (evt.alpha !== null) {
					// do regardless of whether 'evt.absolute' is also true
					this.alphaOffsetDevice = new Euler(evt.alpha, 0, 0);
					this.alphaOffsetDevice.rotateZ(-screenOrientation.angle);

					// Discard first {successThreshold} responses while a better compass lock is found by UA
					if (++successCount >= successThreshold) {
						window.removeEventListener(
							"deviceorientation",
							setGameAlphaOffset,
							false
						);
						return;
					}
				}

				if (++tries >= maxTries) {
					window.removeEventListener(
						"deviceorientation",
						setGameAlphaOffset,
						false
					);
				}
			}.bind(this);

			window.addEventListener("deviceorientation", setGameAlphaOffset, false);

			// Create a compass-based deviceorientation object (initial alpha === compass degrees)
		} else if (this.options.type === "world") {
			const setCompassAlphaOffset = function (evt) {
				if (
					evt.absolute !== true &&
					evt.webkitCompassAccuracy !== undefined &&
					evt.webkitCompassAccuracy !== null &&
					+evt.webkitCompassAccuracy >= 0 &&
					+evt.webkitCompassAccuracy < 50
				) {
					this.alphaOffsetDevice = new Euler(evt.webkitCompassHeading, 0, 0);
					this.alphaOffsetDevice.rotateZ(screenOrientation.angle);
					this.alphaOffsetScreen = screenOrientation.angle;

					// Discard first {successThreshold} responses while a better compass lock is found by UA
					if (++successCount >= successThreshold) {
						window.removeEventListener(
							"deviceorientation",
							setCompassAlphaOffset,
							false
						);
						return;
					}
				}

				if (++tries >= maxTries) {
					window.removeEventListener(
						"deviceorientation",
						setCompassAlphaOffset,
						false
					);
				}
			}.bind(this);
			window.addEventListener(
				"deviceorientation",
				setCompassAlphaOffset,
				false
			);
		} // else... use whatever orientation system the UA provides ("game" on iOS, "world" on Android)
	}

	start(callback?: () => void) {
		addOrientationCallback(callback);

		registerForScreenOrientationChange();

		startDeviceOrientationMonitoring();
	}

	stop() {
		stopDeviceOrientationMonitoring();
	}

	listen(callback) {
		this.start(callback);
	}

	getFixedFrameQuaternion(): Quaternion {
		return this.getFixedFrameEuler().toQuaternion();
	}

	// TODO: Simplify
	getFixedFrameEuler() {
		var orientationData = sensors.orientation.data || {
			alpha: 0,
			beta: 0,
			gamma: 0,
		};

		var adjustedAlpha = orientationData.alpha;

		if (this.alphaOffsetDevice) {
			let matrix = this.alphaOffsetDevice
				.toMatrix()
				.rotateZ(radians(-this.alphaOffsetScreen));
			const tempeuler = matrix.toEuler();

			adjustedAlpha -= tempeuler.alpha;
			return new Euler(
				adjustedAlpha,
				orientationData.beta,
				orientationData.gamma
			);
		} else {
			return eulerFromAngleObject(orientationData);
		}
	}

	getScreenAdjustedQuaternion() {
		return this.getFixedFrameQuaternion().rotateZ(
			radians(-screenOrientation.angle)
		);
	}

	getFixedFrameMatrix() {
		return this.getFixedFrameEuler().toMatrix();
	}

	getScreenAdjustedMatrix() {
		return this.getFixedFrameMatrix().rotateZ(
			radians(-screenOrientation.angle)
		);
	}

	getScreenAdjustedEuler() {
		return this.getScreenAdjustedMatrix().toEuler();
	}

	isAbsolute() {
		if (
			sensors.orientation.data &&
			sensors.orientation.data.absolute === true
		) {
			return true;
		}

		return false;
	}

	getLastRawEventData() {
		return sensors.orientation.data || {};
	}
}
