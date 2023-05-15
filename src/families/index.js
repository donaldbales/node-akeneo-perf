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
const extract = require("./extract");
const load = require("./load");
const transform = require("./transform");
const logger_1 = require("../logger");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'families/index';
function main(loggerIn = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'main';
        let logger = (loggerIn) ? loggerIn : logger_1.getLogger(moduleName);
        logger.info({ moduleName, methodName }, `Starting...`);
        let results;
        results = yield extract.families(logger);
        results = transform.families(logger, results, 'Text 1');
        const families = results.families;
        //console.log(families);
        results = yield load.families(logger, families);
        //console.log(inspect(results));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQSxxQ0FBcUM7QUFDckMsK0JBQStCO0FBQy9CLHlDQUF5QztBQUN6QyxzQ0FBc0M7QUFHdEMsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFDN0UsTUFBTSxVQUFVLEdBQVcsZ0JBQWdCLENBQUM7QUFFNUMsU0FBc0IsSUFBSSxDQUFDLFdBQWdCLElBQUk7O1FBQzdDLE1BQU0sVUFBVSxHQUFXLE1BQU0sQ0FBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCxJQUFJLE9BQVksQ0FBQztRQUVqQixPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEQsTUFBTSxRQUFRLEdBQVUsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUN6Qyx3QkFBd0I7UUFDeEIsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEQsZ0NBQWdDO1FBRWhDLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FBQTtBQW5CRCxvQkFtQkM7QUFFRCxvQkFBb0I7QUFDcEIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtJQUMzQixJQUFJLEVBQUUsQ0FBQztDQUNSIn0=