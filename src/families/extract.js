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
exports.families = void 0;
const path = require("path");
const helper = require("../helper");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'families/extract';
function families(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'families';
        logger.info({ moduleName, methodName }, `Starting...`);
        const familyMap = {};
        for (let f = 1; f < 11; f++) {
            familyMap[`Family ${f}`] = [];
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Yes/No ${a}`] = {};
            }
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Date ${a}`] = {};
            }
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Decimal ${a}`] = {};
            }
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Metric ${a}`] = {};
            }
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Multi Select ${a}`] = {};
            }
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Integer ${a}`] = {};
            }
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Price ${a}`] = {};
            }
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Simple Select ${a}`] = {};
            }
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Text ${a}`] = {};
            }
            for (let a = 1; a < (yield helper.randomInt(logger, 4, 11)); a++) {
                familyMap[`Family ${f}`][`Text Area ${a}`] = {};
            }
        }
        return familyMap;
    });
}
exports.families = families;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsNkJBQTZCO0FBRzdCLG9DQUFvQztBQUdwQyxNQUFNLEdBQUcsR0FBUSxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBNkIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFbkcsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFDN0UsTUFBTSxVQUFVLEdBQVcsa0JBQWtCLENBQUM7QUFFOUMsU0FBc0IsUUFBUSxDQUFDLE1BQWM7O1FBQzNDLE1BQU0sVUFBVSxHQUFXLFVBQVUsQ0FBQztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sU0FBUyxHQUFRLEVBQUUsQ0FBQztRQUUxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNCLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5RCxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDOUM7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUEsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUQsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQzVDO1lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlELFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUMvQztZQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5RCxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDOUM7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUEsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUQsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDcEQ7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUEsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUQsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQy9DO1lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlELFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUM3QztZQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5RCxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNyRDtZQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5RCxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDNUM7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUEsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUQsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2pEO1NBQ0Y7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQUE7QUF6Q0QsNEJBeUNDIn0=