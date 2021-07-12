const DEBUG = false;
const STYLES = {
	bold: ["\u001b[1m", "\u001b[22m"],
	underline: ["\u001b[4m", "\u001b[24m"],

	red: ["\u001b[31m", "\u001b[39m"],
	yellow: ["\u001b[33m", "\u001b[39m"],
	blue: ["\u001b[34m", "\u001b[39m"],
	blueBright: ["\u001b[94m", "\u001b[39m"],
	grey: ["\u001b[90m", "\u001b[39m"],
	green: ["\u001b[32m", "\u001b[39m"]
};
STYLES.gray = STYLES.grey; // aliases

function Logger(section) {
	section = section || "";

	const SEVERITY = {
		ERROR: "ERROR",
		WARN: "WARN",
		INFO: "INFO",
		DEBUG: "DEBUG",
		RESULT: "RESULT"
	};

	let style = function(style, str) {
		return str; // no-op unless we are outputting to terminal
	};

	if ("object" === typeof process && process.stdout && process.stdout.isTTY) {
		style = function(style, str) {
			return style[0] + str + style[1];
		};
	}

	function _now() {
		return new Date().toISOString();
	}

	// Format into a log message string, including adding timestamp
	function _format(msg, severity) {
		severity = severity || SEVERITY.WARN;

		const ts = style(STYLES.grey, _now());
		let sev = severity;
		switch (severity) {
			case SEVERITY.ERROR:
				sev = style(STYLES.red, severity);
				sev = style(STYLES.bold, sev);
				break;
			case SEVERITY.WARN:
				sev = style(STYLES.yellow, severity);
				break;
			case SEVERITY.INFO:
				sev = style(STYLES.blueBright, severity);
				break;
			case SEVERITY.RESULT:
				sev = style(STYLES.green, severity);
				break;
			default:
				sev = severity;
		}
		return "[" + ts + "][" + section + "][" + sev + "] " + msg;
	}

	// This bypasses formatting, for dumping object contents
	function _raw_log(msg) {
		// eslint-disable-next-line no-console
		console.log(msg);
	}
	function _raw(msg) {
		_raw_log(msg);
	}

	function error(msg) {
		_raw(_format(msg, SEVERITY.ERROR));
	}

	function warn(msg) {
		_raw(_format(msg, SEVERITY.WARN));
	}

	function info(msg) {
		_raw(_format(msg, SEVERITY.INFO));
	}

	function debug(msg) {
		if (DEBUG) {
			_raw(_format(msg, SEVERITY.DEBUG));
		}
	}

	function result(msg) {
		_raw(_format(msg, SEVERITY.RESULT));
	}

	function debug_raw(msgOrObject) {
		if (DEBUG) {
			_raw(msgOrObject);
		}
	}

	// Final object
	function log(msg) {
		info(msg);
	}
	log.error = error;
	log.warn = warn;
	log.info = info;
	log.debug = debug;
	log.debug_raw = debug_raw;
	log.result = result;
	// Aliases
	log.err = log.error;
	log.warning = log.warn;

	return log;
}

module.exports = Logger;
