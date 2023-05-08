'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

// Math.sign polyfill
function sign(x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x))
        return x;
    return x > 0 ? 1 : -1;
}
function onlyOnce(f) {
    var evaluated = false;
    var value = undefined;
    return function () {
        if (!evaluated) {
            value = f();
            evaluated = true;
        }
        return value;
    };
}
///// Promise-based Sensor Data checker //////
// TODO: Understand what this does
function SensorCheck(sensorRootObj) {
    var promise = new Promise(function (resolve, reject) {
        var runCheck = function (tries) {
            setTimeout(function () {
                if (sensorRootObj && sensorRootObj.data) {
                    resolve();
                }
                else if (tries >= 20) {
                    reject();
                }
                else {
                    runCheck(++tries);
                }
            }, 50);
        };
        runCheck(0);
    });
    return promise;
}
function keepTrying(tester, maxTries, millis) {
    if (millis === void 0) { millis = 500; }
    // Must keep trying on an interval
    return new Promise(function (resolve, reject) {
        var h = setInterval(function () {
            maxTries -= 1;
            if (maxTries <= 0) {
                clearInterval(h);
                reject("Exceeded number of tries");
            }
            if (tester()) {
                clearInterval(h);
                resolve();
            }
        }, millis);
    });
}
function throttle(fn, threshold, scope) {
    var last;
    var deferTimer;
    var context = scope || null;
    return function () {
        var now = +new Date();
        var args = arguments;
        var remaining = last ? last + threshold - now : 0;
        var apply = function () {
            last = now;
            fn.apply(context, args);
        };
        if (remaining > 0) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(apply, remaining);
        }
        else {
            apply();
        }
    };
}
// I really wish I didn't have to resort to this
// kind of test, but screen orientation values are reversed
// in iOS, with a clockwise rotation of 90 degrees corresponding
// to the value of -90. On the other hand the android/MDN/w3c
// convention is the opposite. Feature detection would not work here
// as the feature is implemented inconsistently.
// https://developer.apple.com/documentation/webkitjs/domwindow/1632568-orientation
// https://w3c.github.io/screen-orientation/#the-current-screen-orientation-type-and-angle
var isIOS = onlyOnce(function () {
    return ([
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
    ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes("Mac") && "ontouchend" in document));
});

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SensorCheck: SensorCheck,
    isIOS: isIOS,
    keepTrying: keepTrying,
    onlyOnce: onlyOnce,
    sign: sign,
    throttle: throttle
});

var M_PI = Math.PI;
var M_PI_2 = M_PI / 2;
// Degree to Radian conversion
var degToRad = M_PI / 180;
var radToDeg = 180 / M_PI;
var atan2 = Math.atan2;
var asin = Math.asin;
var abs = Math.abs;

var EPSILON = 1e-6; // rounding factor
function matrixFromEuler(euler) {
    var _z = (euler.alpha || 0) * degToRad;
    var _x = (euler.beta || 0) * degToRad;
    var _y = (euler.gamma || 0) * degToRad;
    var cX = Math.cos(_x);
    var cY = Math.cos(_y);
    var cZ = Math.cos(_z);
    var sX = Math.sin(_x);
    var sY = Math.sin(_y);
    var sZ = Math.sin(_z);
    //
    // ZXY-ordered rotation matrix construction.
    //
    var R = new Float32Array(9);
    R[0] = cZ * cY - sZ * sX * sY; // 1,1
    R[1] = -cX * sZ; // 1,2
    R[2] = cY * sZ * sX + cZ * sY; // 1,3
    R[3] = cY * sZ + cZ * sX * sY; // 2,1
    R[4] = cZ * cX; // 2,2
    R[5] = sZ * sY - cZ * cY * sX; // 2,3
    R[6] = -cX * sY; // 3,1
    R[7] = sX; // 3,2
    R[8] = cX * cY; // 3,3
    return R;
}
function eulerFromRotationMatrix(R) {
    // From Z-X-Y order
    // R[1]: -cos(beta)sin(alpha)
    // R[4]: cos(beta)cos(alpha)
    // R[6]: -cos(beta)sin(gamma)
    // R[7]: sin(beta)
    // R[8]: cos(beta)cos(gamma)
    var r8_zero = abs(R[8]) < 1e-7;
    var r6_zero = abs(R[6]) < 1e-7;
    // cos(gamma) >= 0 since gamma in [-pi/2, pi/2]
    // cos(beta) is < 0 exactly when R[8] < 0, or when R[8] = 0 and R[6] < 0
    var cos_beta_neg = (r8_zero && R[6] < 0) || R[8] < 0;
    if (r8_zero && r6_zero) {
        // gimbal lock discontinuity
        // gamma = 0 arbitrary but alpha depends on this choice
        return fromRad(atan2(R[3], R[0]), asin(R[7]), 0);
    }
    else if (cos_beta_neg) {
        return fromRad(atan2(R[1], -R[4]), -M_PI - asin(R[7]), atan2(R[6], -R[8]));
    }
    else {
        return fromRad(atan2(-R[1], R[4]), asin(R[7]), atan2(-R[6], R[8]));
    }
}
function eulerFromQuaternionX(x, y, z, w) {
    var sqw = w * w;
    var sqx = x * x;
    var sqy = y * y;
    var sqz = z * z;
    // Normalised == 1, otherwise correction divisor.
    var unitLength = sqw + sqx + sqy + sqz;
    // If normalized:
    // wxyz:  0.5*sin(beta)
    var wxyz = w * x + y * z;
    // aX: cos(alpha)cos(beta)
    var aX = sqw - sqx + sqy - sqz;
    // aY: sin(alpha)cos(beta)
    var aY = 2 * (w * z - x * y);
    // gX: cos(gamma)cos(beta)
    var gX = sqw - sqx - sqy + sqz;
    // gY: sin(gamma)cos(beta)
    var gY = 2 * (w * y - x * z);
    // cos(gamma) always non-negative
    var sin_beta_is_1 = wxyz > (0.5 - EPSILON) * unitLength;
    var sin_beta_is_minus_1 = wxyz < (-0.5 + EPSILON) * unitLength;
    var cos_beta_is_zero = sin_beta_is_1 || sin_beta_is_minus_1;
    var gX_is_zero = abs(gX) < 1e-7;
    var cos_beta_not_pos = gX_is_zero || gX < 0;
    if (cos_beta_is_zero) {
        return fromRad(sin_beta_is_1 ? 2 * atan2(y, w) : -2 * atan2(y, w), -M_PI - asin((2 * wxyz) / unitLength), 0);
    }
    else {
        return fromRad(cos_beta_not_pos ? atan2(-aY, -aX) : atan2(aY, aX), cos_beta_not_pos
            ? -M_PI - asin((2 * wxyz) / unitLength)
            : asin((2 * wxyz) / unitLength), gX_is_zero ? -M_PI_2 : gX > 0 ? atan2(gY, gX) : atan2(-gY, -gX));
    }
}
function quatFromEuler(euler) {
    var _z = ((euler === null || euler === void 0 ? void 0 : euler.alpha) || 0) * degToRad;
    var _x = ((euler === null || euler === void 0 ? void 0 : euler.beta) || 0) * degToRad;
    var _y = ((euler === null || euler === void 0 ? void 0 : euler.gamma) || 0) * degToRad;
    var cX = Math.cos(_x / 2);
    var cY = Math.cos(_y / 2);
    var cZ = Math.cos(_z / 2);
    var sX = Math.sin(_x / 2);
    var sY = Math.sin(_y / 2);
    var sZ = Math.sin(_z / 2);
    var x = sX * cY * cZ - cX * sY * sZ;
    var y = cX * sY * cZ + sX * cY * sZ;
    var z = cX * cY * sZ + sX * sY * cZ;
    var w = cX * cY * cZ - sX * sY * sZ;
    return { x: x, y: y, z: z, w: w };
}
function quaternionFromRotationMatrix(R) {
    return {
        x: 0.5 * Math.sqrt(1 + R[0] - R[4] - R[8]) * sign(R[7] - R[5]),
        y: 0.5 * Math.sqrt(1 - R[0] + R[4] - R[8]) * sign(R[2] - R[6]),
        z: 0.5 * Math.sqrt(1 - R[0] - R[4] + R[8]) * sign(R[3] - R[1]),
        w: 0.5 * Math.sqrt(1 + R[0] + R[4] + R[8]), // w
    };
}
function fromRad(alphaRad, betaRad, gammaRad) {
    return {
        alpha: alphaRad * radToDeg,
        beta: betaRad * radToDeg,
        gamma: gammaRad * radToDeg,
    };
}

var QuaternionClass = /** @class */ (function () {
    function QuaternionClass(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    QuaternionClass.prototype.multipliedWith = function (quat) {
        return multiplyQuaternions(this, quat);
    };
    QuaternionClass.prototype.rotateX = function (angle) {
        return this.rotateByAxisAngle([1, 0, 0], angle);
    };
    QuaternionClass.prototype.rotateY = function (angle) {
        return this.rotateByAxisAngle([0, 1, 0], angle);
    };
    QuaternionClass.prototype.rotateZ = function (angle) {
        return this.rotateByAxisAngle([0, 0, 1], angle);
    };
    QuaternionClass.prototype.toEuler = function () {
        return eulerFromAngleObject(eulerFromQuaternionX(this.x, this.y, this.z, this.w));
    };
    QuaternionClass.prototype.normalize = function () {
        var len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize zero quaternion");
        }
        this.x /= len;
        this.y /= len;
        this.z /= len;
        this.w /= len;
        return this;
    };
    QuaternionClass.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    };
    QuaternionClass.prototype.rotateByAxisAngle = function (axis, angle) {
        return multiplyQuaternions(this, quaternionForRotation(axis, angle)).normalize();
    };
    return QuaternionClass;
}());
var multiplyQuaternions = function (a, b) {
    return quaternion(a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y, // x
    a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z, // y
    a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x, // z
    a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z // w
    );
};
function quaternionForRotation(axis, angle) {
    var _a, _b, _c;
    var halfAngle = angle.times(1 / 2);
    var sA = halfAngle.sin();
    var cA = halfAngle.cos();
    return quaternion(((_a = axis[0]) !== null && _a !== void 0 ? _a : 0) * sA, ((_b = axis[1]) !== null && _b !== void 0 ? _b : 0) * sA, ((_c = axis[2]) !== null && _c !== void 0 ? _c : 0) * sA, cA // w
    );
}
function quaternion(x, y, z, w) {
    return new QuaternionClass(x, y, z, w);
}

var RotationMatrixClass = /** @class */ (function () {
    function RotationMatrixClass(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
        this.elements = new Float32Array(9);
        if (m11 instanceof Float32Array || m11 instanceof Array) {
            this.elements.set(m11);
        }
        else {
            this.elements[0] = m11;
            this.elements[1] = m12;
            this.elements[2] = m13;
            this.elements[3] = m21;
            this.elements[4] = m22;
            this.elements[5] = m23;
            this.elements[6] = m31;
            this.elements[7] = m32;
            this.elements[8] = m33;
        }
    }
    RotationMatrixClass.prototype.multipliedBy = function (m) {
        return multiplyMatrices(this, m);
    };
    RotationMatrixClass.prototype.rotateX = function (angle) {
        return this.rotateByAxisAngle([1, 0, 0], angle);
    };
    RotationMatrixClass.prototype.rotateY = function (angle) {
        return this.rotateByAxisAngle([0, 1, 0], angle);
    };
    RotationMatrixClass.prototype.rotateZ = function (angle) {
        return this.rotateByAxisAngle([0, 0, 1], angle);
    };
    RotationMatrixClass.prototype.rotateByAxisAngle = function (axis, angle) {
        return this.multipliedBy(matrixForRotation(axis, angle)).normalize();
    };
    RotationMatrixClass.prototype.normalize = function () {
        var determinant = this.determinant();
        // Normalize matrix values
        this.elements[0] /= determinant;
        this.elements[1] /= determinant;
        this.elements[2] /= determinant;
        this.elements[3] /= determinant;
        this.elements[4] /= determinant;
        this.elements[5] /= determinant;
        this.elements[6] /= determinant;
        this.elements[7] /= determinant;
        this.elements[8] /= determinant;
        return this;
    };
    RotationMatrixClass.prototype.determinant = function () {
        var R = this.elements;
        return (R[0] * R[4] * R[8] -
            R[0] * R[5] * R[7] -
            R[1] * R[3] * R[8] +
            R[1] * R[5] * R[6] +
            R[2] * R[3] * R[7] -
            R[2] * R[4] * R[6]);
    };
    RotationMatrixClass.prototype.toEuler = function () {
        return eulerFromAngleObject(eulerFromRotationMatrix(this.elements));
    };
    RotationMatrixClass.prototype.toQuaternion = function () {
        var _a = quaternionFromRotationMatrix(this.elements), x = _a.x, y = _a.y, z = _a.z, w = _a.w;
        return quaternion(x, y, z, w);
    };
    return RotationMatrixClass;
}());
function multiplyMatrices(a, b) {
    var aE = a.elements;
    var bE = b.elements;
    return new RotationMatrixClass(aE[0] * bE[0] + aE[1] * bE[3] + aE[2] * bE[6], aE[0] * bE[1] + aE[1] * bE[4] + aE[2] * bE[7], aE[0] * bE[2] + aE[1] * bE[5] + aE[2] * bE[8], aE[3] * bE[0] + aE[4] * bE[3] + aE[5] * bE[6], aE[3] * bE[1] + aE[4] * bE[4] + aE[5] * bE[7], aE[3] * bE[2] + aE[4] * bE[5] + aE[5] * bE[8], aE[6] * bE[0] + aE[7] * bE[3] + aE[8] * bE[6], aE[6] * bE[1] + aE[7] * bE[4] + aE[8] * bE[7], aE[6] * bE[2] + aE[7] * bE[5] + aE[8] * bE[8]);
}
function matrixForRotation(axis, angle) {
    var x = axis[0], y = axis[1], z = axis[2];
    var sA = angle.sin();
    var cA = angle.cos();
    return new RotationMatrixClass(cA + x * x * (1 - cA), x * y * (1 - cA) - z * sA, x * z * (1 - cA) + y * sA, x * y * (1 - cA) + z * sA, cA + y * y * (1 - cA), y * z * (1 - cA) - x * sA, x * z * (1 - cA) - y * sA, y * z * (1 - cA) + x * sA, cA + z * z * (1 - cA));
}
function rotationMatrix(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
    return new RotationMatrixClass(m11, m12, m13, m21, m22, m23, m31, m32, m33);
}

var Euler = /** @class */ (function () {
    function Euler(alpha, beta, gamma) {
        this.alpha = ensureInAlphaRange(alpha !== null && alpha !== void 0 ? alpha : 0);
        this.beta = ensureInBetaRange(beta !== null && beta !== void 0 ? beta : 0);
        this.gamma = ensureInGammaRange(gamma !== null && gamma !== void 0 ? gamma : 0);
    }
    Euler.prototype.rotateX = function (angle) {
        return this.rotateByAxisAngle([1, 0, 0], angle);
    };
    Euler.prototype.rotateY = function (angle) {
        return this.rotateByAxisAngle([0, 1, 0], angle);
    };
    Euler.prototype.rotateZ = function (angle) {
        return this.rotateByAxisAngle([0, 0, 1], angle);
    };
    Euler.prototype.rotateByAxisAngle = function (axis, angle) {
        return this.toMatrix().rotateByAxisAngle(axis, angle).toEuler();
    };
    Euler.prototype.toQuaternion = function () {
        var _a = quatFromEuler(this), x = _a.x, y = _a.y, z = _a.z, w = _a.w;
        return quaternion(x, y, z, w).normalize();
    };
    Euler.prototype.toMatrix = function () {
        return rotationMatrix(matrixFromEuler(this)).normalize();
    };
    return Euler;
}());
function eulerFromAngleObject(obj) {
    return new Euler(obj.alpha, obj.beta, obj.gamma);
}
function ensureInAlphaRange(alpha) {
    while (alpha < 0)
        alpha += 360;
    return alpha % 360;
}
function ensureInBetaRange(beta) {
    while (beta < -180)
        beta += 360;
    return beta % 360;
}
function ensureInGammaRange(gamma) {
    if (gamma < -90 || gamma > 90)
        throw new Error("Incorrect gamma range. It was ".concat(gamma, " but should be between -90 and 90."));
    return gamma;
}

var Angle = /** @class */ (function () {
    function Angle(angleSpec) {
        if ("degrees" in angleSpec) {
            this.degrees = angleSpec.degrees;
            this.radians = angleSpec.degrees * degToRad;
        }
        else {
            this.degrees = angleSpec.radians * radToDeg;
            this.radians = angleSpec.radians;
        }
    }
    Angle.prototype.sin = function () {
        return Math.sin(this.radians);
    };
    Angle.prototype.cos = function () {
        return Math.cos(this.radians);
    };
    Angle.prototype.tan = function () {
        return Math.tan(this.radians);
    };
    Angle.prototype.times = function (scale) {
        return new Angle({ radians: this.radians * (scale !== null && scale !== void 0 ? scale : 1) });
    };
    return Angle;
}());
function radians(rad) {
    return new Angle({ radians: rad });
}

var Status;
(function (Status) {
    Status[Status["Inactive"] = 0] = "Inactive";
    Status[Status["Pending"] = 1] = "Pending";
    Status[Status["Active"] = 2] = "Active";
})(Status || (Status = {}));
var status = Status.Inactive;
var initialTries = 10;
// - webkitHeading is the true direction (clockwise from true north) that the
// device is facing (in whatever its main orientation is)
// - initialAngle is the angle in a clockwise direction that
// the device has been rotated from its main orientation
// - relative.alpha is the relative change in the direction of the main orientation
// compared to what it was when the device started reporting
// - angle is the angle in a clockwise direction that the current device's current
// orientation differs from its normal orientation
//
// We want "screen" to correspond to the true direction that
// the screen "points to". This may or may not agree with the
// "device" direction, depending on whether the device has been turned
// sideways
// Rotation needed to account for device offset
// relative to real world
function getAlphaOffsetDevice() {
    return new Euler(data.webkitHeading, 0, 0);
}
var data = {
    angle: undefined,
    webkitHeading: undefined,
    initialAngle: undefined,
    initial: { alpha: undefined, beta: undefined, gamma: undefined },
    absolute: { alpha: undefined, beta: undefined, gamma: undefined },
    relative: { alpha: undefined, beta: undefined, gamma: undefined },
    get screen() {
        return getScreenEuler();
    },
};
function getScreenEuler() {
    var _a = data.relative, alpha = _a.alpha, beta = _a.beta, gamma = _a.gamma;
    var adjustedAlpha = alpha - getAlphaOffsetDevice().rotateZ(radians(-data.angle)).alpha;
    return eulerFromAngleObject({ alpha: adjustedAlpha, beta: beta, gamma: gamma });
}
// Internal screen orientation variables
var callbacks = [];
var hasScreenOrientationAPI = function () {
    return window &&
        window.screen &&
        window.screen.orientation &&
        window.screen.orientation.angle !== undefined &&
        window.screen.orientation.angle !== null
        ? true
        : false;
};
// Must be attached to an action triggered by user action
// e.g. button
// Returns a promise that will be fulfilled when the system
// is ready for use
function activate() {
    return __awaiter(this, void 0, void 0, function () {
        var permission;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.DeviceOrientationEvent)
                        throw new Error("Cannot use device orientation");
                    if (!("requestPermission" in window.DeviceOrientationEvent)) return [3 /*break*/, 2];
                    return [4 /*yield*/, window.DeviceOrientationEvent.requestPermission()];
                case 1:
                    permission = _a.sent();
                    if (permission != "granted")
                        throw new Error("No permission granted");
                    _a.label = 2;
                case 2:
                    start();
                    return [4 /*yield*/, keepTrying(function () { return status == Status.Active; }, 20)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, { listen: listen, data: data }];
            }
        });
    });
}
function listen(callback) {
    callbacks.push(callback);
}
function stopListening(callback) {
    var i = callbacks.indexOf(callback);
    if (i > -1) {
        callbacks.splice(i, 1);
    }
}
function start() {
    if (status == Status.Inactive) {
        console.log("starting");
        window.addEventListener("deviceorientation", handleChange, false);
        window.addEventListener("deviceorientationabsolute", handleChange, false);
        registerForScreenOrientationChange();
        status = Status.Pending;
    }
}
function stop() {
    if (status != Status.Inactive) {
        window.removeEventListener("deviceorientation", handleChange, false);
        window.removeEventListener("deviceorientationabsolute", handleChange, false);
        status = Status.Inactive;
    }
}
var callCallbacks = throttle(function () {
    var dataCopy = cloneData(data);
    for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
        var c = callbacks_1[_i];
        c.call(null, dataCopy);
    }
}, 250, null);
function handleChange(event) {
    var absolute = event.absolute, alpha = event.alpha, beta = event.beta, gamma = event.gamma;
    if (absolute) {
        data.absolute = { alpha: alpha, beta: beta, gamma: gamma };
    }
    else {
        data.relative = { alpha: alpha, beta: beta, gamma: gamma };
        if (initialTries > 0) {
            data.initial = { alpha: alpha, beta: beta, gamma: gamma };
            initialTries -= 1;
            var webkitCompassAccuracy = event.webkitCompassAccuracy, webkitCompassHeading = event.webkitCompassHeading;
            if (webkitCompassAccuracy != null &&
                webkitCompassAccuracy > 0 &&
                webkitCompassAccuracy < 50) {
                data.webkitHeading = webkitCompassHeading;
            }
            data.initialAngle = getScreenOrientationAngle();
            data.angle = data.initialAngle;
        }
        else {
            status = Status.Active;
        }
    }
    // Fire every callback function each time deviceorientation is updated
    // TODO: Should throttle
    callCallbacks();
}
function getScreenOrientationAngle() {
    var angle = hasScreenOrientationAPI()
        ? window.screen.orientation.angle
        : window.orientation;
    var iOSAdjust = isIOS() ? -1 : 1;
    return (angle || 0) * iOSAdjust * degToRad;
}
function registerForScreenOrientationChange() {
    if (hasScreenOrientationAPI()) {
        console.log("Using screen orientation API");
        window.screen.orientation.addEventListener("change", function () {
            data.angle = getScreenOrientationAngle();
        }, false);
    }
    else {
        console.log("Using old screen orientation API");
        window.addEventListener("orientationchange", function () {
            data.angle = getScreenOrientationAngle();
        }, false);
    }
}
var orientation = {
    activate: activate,
    data: data,
    start: start,
    stop: stop,
    listen: listen,
    stopListening: stopListening,
    registerForScreenOrientationChange: registerForScreenOrientationChange,
};
function cloneData(data) {
    var angle = data.angle, webkitHeading = data.webkitHeading, initialAngle = data.initialAngle, initial = data.initial, absolute = data.absolute, relative = data.relative;
    return {
        angle: angle,
        webkitHeading: webkitHeading,
        initialAngle: initialAngle,
        initial: cloneAngle(initial),
        absolute: cloneAngle(absolute),
        relative: cloneAngle(relative),
        get screen() {
            return getScreenEuler();
        },
    };
}
function cloneAngle(_a) {
    var alpha = _a.alpha, beta = _a.beta, gamma = _a.gamma;
    return { alpha: alpha, beta: beta, gamma: gamma };
}

///// FULLTILT API Root Object /////
var FULLTILT = {
    version: "0.5.3",
    // getDeviceOrientation: function (options) {
    // 	const promise = new Promise(function (resolve, reject) {
    // 		const control = new DeviceOrientation(options);
    // 		control.start();
    // 		const orientationSensorCheck = SensorCheck(sensors.orientation);
    // 		orientationSensorCheck
    // 			.then(function () {
    // 				resolve(control);
    // 			})
    // 			.catch(function () {
    // 				control.stop();
    // 				reject("DeviceOrientation is not supported");
    // 			});
    // 	});
    // 	return promise;
    // },
    // getDeviceMotion: function (options) {
    // 	const promise = new Promise(function (resolve, reject) {
    // 		const control = new DeviceMotion(options);
    // 		control.start();
    // 		const motionSensorCheck = SensorCheck(sensors.motion);
    // 		motionSensorCheck
    // 			.then(function () {
    // 				resolve(control);
    // 			})
    // 			.catch(function () {
    // 				control.stop();
    // 				reject("DeviceMotion is not supported");
    // 			});
    // 	});
    // 	return promise;
    // },
    orientation: orientation,
    utils: utils
};

module.exports = FULLTILT;
//# sourceMappingURL=fulltilt.cjs.js.map
