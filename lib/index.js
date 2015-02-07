"use strict";

var constValue,
	constantin;

constValue = function (config, value, name, options) {
	if (value != null && typeof value === 'object') {
		value = constantin(value, options);
	}

	Object.defineProperty(config, name, {
		enumerable: true,
		set: function () {
			if (!options.console) {
				throw new Error(options.message);
			}

			try {
				throw new Error(options.message);
			} catch (e) {
				console.error(e.message, e.stack);
			}
		},
		get: function () {
			return value;
		}
	});

	return config;
};

var isArray = Array.isArray || function (obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};

constantin = function (obj, options) {
	if (obj == null || typeof obj !== 'object') {
		throw new TypeError('value must be object');
	}

	var result, k, l;

	if (isArray(obj)) {
		result = [];

		l = obj.length;
		for (k = 0; k < l; k++) {
			constValue(result, obj[k], k, options);
		}

		return result;
	}

	result = {};
	for (k in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, k)) {
			constValue(result, obj[k], k, options);
		}
	}

	return result;
};

module.exports = function (obj, options) {
	options || (options = {});
	options.message || (options.message = 'You can\'t modify constant object');
	options.console = options.console || false;

	return constantin(obj, options);
};