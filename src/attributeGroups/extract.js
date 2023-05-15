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
exports.attributeGroups = exports.AG_UNIVERSAL = exports.AG_OTHER = void 0;
const path = require("path");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'attributeGroups/extract';
exports.AG_OTHER = 'Other';
exports.AG_UNIVERSAL = 'Universal';
// export const AG_: string = '';
function attributeGroups(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'attributeGroups';
        logger.info({ moduleName, methodName }, `Starting...`);
        const results = [
            exports.AG_OTHER,
            exports.AG_UNIVERSAL
        ];
        return results;
    });
}
exports.attributeGroups = attributeGroups;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsNkJBQTZCO0FBRTdCLE1BQU0sR0FBRyxHQUFRLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUE2QixJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVuRyxNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVyx5QkFBeUIsQ0FBQztBQUV4QyxRQUFBLFFBQVEsR0FBVyxPQUFPLENBQUM7QUFDM0IsUUFBQSxZQUFZLEdBQVcsV0FBVyxDQUFDO0FBQ2hELGlDQUFpQztBQUVqQyxTQUFzQixlQUFlLENBQUMsTUFBYzs7UUFDbEQsTUFBTSxVQUFVLEdBQVcsaUJBQWlCLENBQUM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCxNQUFNLE9BQU8sR0FBVTtZQUNyQixnQkFBUTtZQUNSLG9CQUFZO1NBQ2IsQ0FBQztRQUVGLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FBQTtBQVZELDBDQVVDIn0=