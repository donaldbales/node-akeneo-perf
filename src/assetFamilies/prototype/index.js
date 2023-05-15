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
const fs = require("fs");
const path = require("path");
const helper_1 = require("./helper");
const extract = require("./extract");
const load = require("./load");
const transform = require("./transform");
const logger_1 = require("../../logger");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = `assetFamilies/${helper_1.ASSET_FAMILY_CODE}/index`;
function main(loggerIn = null, startPKey = '', endPKey = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'main';
        let logger = (loggerIn) ? loggerIn : logger_1.getLogger(moduleName);
        logger.info({ moduleName, methodName }, `Starting...`);
        const conn = yield sql.connect(logger);
        let results = null;
        if (!(startPKey)) {
            results = yield load.assetFamily(logger);
            results = extract.assetFamilyAttributes(logger);
            results = transform.assetFamilyAttributes(logger, results);
            results = yield load.assetFamilyAttributes(logger, results);
        }
        else {
            results = yield extract.assetFamilyAssets(logger, conn, startPKey, endPKey);
            fs.writeFileSync(`${exportPath}${path.sep}extractedImageAssets.json`, JSON.stringify(results).toString().replace(/},{/g, `},\n{`));
            results = transform.assetFamilyAssets(logger, results);
            fs.writeFileSync(`${exportPath}${path.sep}transformedImageAssets.json`, JSON.stringify(results).toString().replace(/},{/g, `},\n{`));
            results = yield load.assetFamilyAssets(logger, results);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRzdCLHFDQUE2QztBQUM3QyxxQ0FBcUM7QUFDckMsK0JBQStCO0FBQy9CLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFFekMsTUFBTSxHQUFHLEdBQVEsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQTZCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRW5HLE1BQU0sVUFBVSxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQTZCLElBQUksR0FBRyxDQUFDO0FBQzdFLE1BQU0sVUFBVSxHQUFXLGlCQUFpQiwwQkFBaUIsUUFBUSxDQUFDO0FBRXRFLFNBQXNCLElBQUksQ0FBQyxXQUFnQixJQUFJLEVBQUUsWUFBb0IsRUFBRSxFQUFFLFVBQWtCLEVBQUU7O1FBQzNGLE1BQU0sVUFBVSxHQUFXLE1BQU0sQ0FBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN2RCxNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkMsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2hCLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFekMsT0FBTyxHQUFTLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxPQUFPLEdBQVMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNqRSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDNUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRywyQkFBMkIsRUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFL0QsT0FBTyxHQUFTLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0QsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyw2QkFBNkIsRUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFL0QsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN6RDtRQUVELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDM0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FBQTtBQS9CRCxvQkErQkM7QUFFRCxvQkFBb0I7QUFDcEIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtJQUMzQixJQUFJLEVBQUUsQ0FBQztDQUNSIn0=