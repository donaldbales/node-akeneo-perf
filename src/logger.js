"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const bunyan = require("bunyan");
const emailer = require("./emailer");
const inspect_1 = require("./inspect");
let logger;
const moduleName = 'logger';
function emailError(err = null) {
    const methodName = 'emailError';
    if (err) {
        const bound = logger.error.bind(logger);
        emailer.sendCallback(inspect_1.inspect(err), 'Error', bound);
    }
}
function getLogger(name) {
    if (!logger) {
        logger = bunyan.createLogger({ name });
    }
    // wrapper
    const result = {
        debug: logger.debug.bind(logger),
        error: logger.error.bind(logger),
        fatal: emailError,
        info: logger.info.bind(logger),
        level: logger.level.bind(logger),
        trace: logger.trace.bind(logger),
        warn: logger.warn.bind(logger)
    };
    return result;
}
exports.getLogger = getLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7OztBQUUvQixpQ0FBaUM7QUFDakMscUNBQXFDO0FBRXJDLHVDQUFvQztBQUVwQyxJQUFJLE1BQVcsQ0FBQztBQUNoQixNQUFNLFVBQVUsR0FBVyxRQUFRLENBQUM7QUFFcEMsU0FBUyxVQUFVLENBQUMsTUFBVyxJQUFJO0lBQ2pDLE1BQU0sVUFBVSxHQUFXLFlBQVksQ0FBQztJQUN4QyxJQUFJLEdBQUcsRUFBRTtRQUNQLE1BQU0sS0FBSyxHQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDcEQ7QUFDSCxDQUFDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLElBQVk7SUFDcEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNYLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN4QztJQUNELFVBQVU7SUFDVixNQUFNLE1BQU0sR0FBRztRQUNiLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxLQUFLLEVBQUUsVUFBVTtRQUNqQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQy9CLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBZkQsOEJBZUMifQ==