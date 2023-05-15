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
const logger_1 = require("../logger");
const load = require("./load");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'products/index';
function main(loggerIn = null, startPKey = null, endPKey = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'main';
        let logger = (loggerIn) ? loggerIn : logger_1.getLogger(moduleName);
        logger.info({ moduleName, methodName }, `Starting...`);
        let results;
        // results = await extract.productImages(logger, conn);
        // results = await load.productImages(logger, conn);
        results = yield extract.products(logger);
        results = yield load.products(logger);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQSxxQ0FBcUM7QUFDckMsc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUcvQixNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVyxnQkFBZ0IsQ0FBQztBQUU1QyxTQUFzQixJQUFJLENBQUMsV0FBZ0IsSUFBSSxFQUFFLFlBQWlCLElBQUksRUFBRSxVQUFlLElBQUk7O1FBQ3pGLE1BQU0sVUFBVSxHQUFXLE1BQU0sQ0FBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCxJQUFJLE9BQVksQ0FBQztRQUVqQix1REFBdUQ7UUFDdkQsb0RBQW9EO1FBRXBELE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQzNCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQUE7QUFsQkQsb0JBa0JDO0FBRUQsb0JBQW9CO0FBQ3BCLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7SUFDM0IsSUFBSSxFQUFFLENBQUM7Q0FDUiJ9