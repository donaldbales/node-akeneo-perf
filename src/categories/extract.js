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
exports.categories = void 0;
const path = require("path");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'categories/extract';
function categoriesLevel1(logger, conn) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'categoriesLevel1';
        logger.info({ moduleName, methodName }, `Starting...`);
        let results = [];
        const query = `
    SELECT 
    FROM   
    ORDER BY 
 `;
        try {
            results = yield sql.executeDML(logger, conn, query);
            logger.debug({ moduleName, methodName, results });
        }
        catch (err) {
            logger.error({ moduleName, methodName, err });
            process.exit(99);
        }
        return results;
    });
}
function categoriesLevel2(logger, conn) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'categoriesLevel2';
        logger.info({ moduleName, methodName }, `Starting...`);
        let results = [];
        const query = `
    SELECT 
    FROM   
    ORDER BY 
 `;
        try {
            results = yield sql.executeDML(logger, conn, query);
            logger.debug({ moduleName, methodName, results });
        }
        catch (err) {
            logger.error({ moduleName, methodName, err });
            process.exit(99);
        }
        return results;
    });
}
function categoriesLevel3(logger, conn) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'categoriesLevel3';
        logger.info({ moduleName, methodName }, `Starting...`);
        let results = [];
        const query = `
    SELECT 
    FROM   
    ORDER BY 
  `;
        try {
            results = yield sql.executeDML(logger, conn, query);
            logger.debug({ moduleName, methodName, results });
        }
        catch (err) {
            logger.error({ moduleName, methodName, err });
            process.exit(99);
        }
        return results;
    });
}
function categories(logger, conn) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'categories';
        logger.info({ moduleName, methodName }, `Starting...`);
        const categoryResultsLevel1 = yield categoriesLevel1(logger, conn);
        const categoryResultsLevel2 = yield categoriesLevel2(logger, conn);
        const categoryResultsLevel3 = yield categoriesLevel3(logger, conn);
        let results = [];
        for (const category of categoryResultsLevel1) {
            results.push(category);
        }
        for (const category of categoryResultsLevel2) {
            results.push(category);
        }
        for (const category of categoryResultsLevel3) {
            results.push(category);
        }
        return results;
    });
}
exports.categories = categories;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsNkJBQTZCO0FBSzdCLE1BQU0sR0FBRyxHQUFRLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUE2QixJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVuRyxNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVyxvQkFBb0IsQ0FBQztBQUVoRCxTQUFlLGdCQUFnQixDQUFDLE1BQWMsRUFBRSxJQUFTOztRQUN2RCxNQUFNLFVBQVUsR0FBVyxrQkFBa0IsQ0FBQztRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELElBQUksT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUN0QixNQUFNLEtBQUssR0FBRzs7OztFQUlkLENBQUM7UUFFRCxJQUFJO1lBQ0YsT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7U0FDbEQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7WUFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FBQTtBQUVELFNBQWUsZ0JBQWdCLENBQUMs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