"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const path = require("path");
const extract = require("./extract");
const logger_1 = require("../logger");
const load = require("./load");
const transform = require("./transform");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'categories/index';
function main(loggerIn = null, startPKey = null, endPKey = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'main';
        let logger = (loggerIn) ? loggerIn : logger_1.getLogger(moduleName);
        logger.info({ moduleName, methodName }, `Starting...`);
        const conn = yield sql.connect(logger);
        let results;
        results = yield extract.categories(logger, conn);
        results = transform.categories(logger, results);
        results = yield load.categories(logger, results);
        conn.close();
        if (require.main === module) {
            setTimeout(() => { process.exit(0); }, 3000);
        }
        logger.info({ moduleName, methodName }, `Ending.`);
    });
}
exports.main = main;
// Start the program
if (require.main === module) {
    main();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSw2QkFBNkI7QUFFN0IscUNBQXFDO0FBQ3JDLHNDQUFzQztBQUN0QywrQkFBK0I7QUFDL0IseUNBQXlDO0FBRXpDLE1BQU0sR0FBRyxHQUFRLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUE2QixJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVuRyxNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVyxrQkFBa0IsQ0FBQztBQUU5QyxTQUFzQixJQUFJLENBQUMsV0FBZ0IsSUFBSSxFQUFFLFlBQWlCLElBQUksRUFBRSxVQUFlLElBQUk7O1FBQ3pGLE1BQU0sVUFBVSxHQUFXLE1BQU0sQ0FBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCxNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkMsSUFBSSxPQUFZLENBQUM7UUFFakIsT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsT0FBTyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FBQTtBQXBCRCxvQkFvQkM7QUFFRCxvQkFBb0I7QUFDcEIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtJQUMzQixJQUFJLEVBQUUsQ0FBQztDQUNSIn0=