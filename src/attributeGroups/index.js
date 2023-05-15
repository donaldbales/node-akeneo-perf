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
const moduleName = 'attributeGroups/index';
function main(loggerIn = null, startPKey = null, endPKey = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'main';
        let logger = (loggerIn) ? loggerIn : logger_1.getLogger(moduleName);
        logger.info({ moduleName, methodName }, `Starting...`);
        const conn = yield sql.connect(logger);
        let results;
        results = yield extract.attributeGroups(logger);
        results = transform.attributeGroups(logger, results);
        results = yield load.attributeGroups(logger, results);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSw2QkFBNkI7QUFFN0IscUNBQXFDO0FBQ3JDLHNDQUFzQztBQUN0QywrQkFBK0I7QUFDL0IseUNBQXlDO0FBRXpDLE1BQU0sR0FBRyxHQUFRLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUE2QixJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVuRyxNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVyx1QkFBdUIsQ0FBQztBQUVuRCxTQUFzQixJQUFJLENBQUMsV0FBZ0IsSUFBSSxFQUFFLFlBQWlCLElBQUksRUFBRSxVQUFlLElBQUk7O1FBQ3pGLE1BQU0sVUFBVSxHQUFXLE1BQU0sQ0FBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCxNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkMsSUFBSSxPQUFZLENBQUM7UUFFakIsT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxPQUFPLEdBQUcsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUMzQixVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5QztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUFBO0FBcEJELG9CQW9CQztBQUVELG9CQUFvQjtBQUNwQixJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO0lBQzNCLElBQUksRUFBRSxDQUFDO0NBQ1IifQ==