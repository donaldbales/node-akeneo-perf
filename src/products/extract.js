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
exports.products = void 0;
const akeneo = require("node-akeneo-api");
const path = require("path");
const attributesExport = require("../attributes/export");
const familiesExport = require("../families/export");
const helper = require("../helper");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'products/extract';
function products(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'products';
        logger.info({ moduleName, methodName }, `Starting...`);
        yield attributesExport.exportAttributeaAndOptionsAsMaps(logger);
        yield familiesExport.exportFamiliesAsMap(logger);
        const fileDesc = yield akeneo.open(path.join(exportPath, akeneo.filenameProducts), 'w');
        for (let identifier = 10000000; identifier < 11000000; identifier++) {
            const result = { identifier: identifier.toString() };
            result.family = `family_${yield helper.randomInt(logger, 1, 11)}`;
            const values = {};
            const family = familiesExport.familiesMap.get(result.family);
            const attributeCodes = family.attributes;
            for (const attributeCode of attributeCodes) {
                const attribute = attributesExport.attributesMap.get(attributeCode);
                let data = null;
                let option = null;
                let options = null;
                if (attribute) {
                    switch (attribute.type) {
                        case akeneo.PIM_CATALOG_BOOLEAN:
                            values[attributeCode] = [{ locale: null, scope: null, data: (yield helper.randomInt(logger, 0, 2)) === 1 ? true : false }];
                            break;
                        case akeneo.PIM_CATALOG_DATE:
                            values[attributeCode] = [{ locale: null, scope: null, data: new Date().toISOString().slice(0, 10) }];
                            break;
                        case akeneo.PIM_CATALOG_IDENTIFIER:
                            break;
                        case akeneo.PIM_CATALOG_NUMBER:
                            data =
                                attribute.decimals_allowed ?
                                    (yield helper.randomInt(logger, 1, 10000001)) / 1000 :
                                    yield helper.randomInt(logger, 1, 10000001);
                            values[attributeCode] = [{ locale: null, scope: null, data }];
                            break;
                        case akeneo.PIM_CATALOG_METRIC:
                            data = {
                                amount: attribute.decimals_allowed ?
                                    (yield helper.randomInt(logger, 1, 10000001)) / 1000 :
                                    yield helper.randomInt(logger, 1, 10000001),
                                unit: 'INCH'
                            };
                            values[attributeCode] = [{ locale: null, scope: null, data }];
                            break;
                        case akeneo.PIM_CATALOG_MULTISELECT:
                            options = Array.from(attributesExport.attributeOptionsMap.get(attributeCode) || new Set());
                            data = [];
                            for (let r = 1; r < (yield helper.randomInt(logger, 2, 11)); r++) {
                                option = options[yield helper.randomInt(logger, 0, options.length)];
                                if (data.indexOf(option) === -1) {
                                    data.push(option);
                                }
                            }
                            values[attributeCode] = [{ locale: null, scope: null, data }];
                            break;
                        case akeneo.PIM_CATALOG_PRICE_COLLECTION:
                            data = [{
                                    amount: attribute.decimals_allowed ?
                                        (yield helper.randomInt(logger, 1, 1000001)) / 100 :
                                        yield helper.randomInt(logger, 1, 1000001),
                                    currency: 'USD'
                                }];
                            values[attributeCode] = [{ locale: null, scope: null, data }];
                            break;
                        case akeneo.PIM_CATALOG_SIMPLESELECT:
                            options = Array.from(attributesExport.attributeOptionsMap.get(attributeCode) || new Set());
                            data = options[yield helper.randomInt(logger, 0, options.length)];
                            values[attributeCode] = [{ locale: null, scope: null, data }];
                            break;
                        case akeneo.PIM_CATALOG_TEXT:
                            data = (yield helper.randomBytes(logger, yield helper.randomInt(logger, 0, 255))).replace(/  /g, ' ');
                            values[attributeCode] = [{ locale: null, scope: null, data }];
                            break;
                        case akeneo.PIM_CATALOG_TEXTAREA:
                            data = (yield helper.randomBytes(logger, yield helper.randomInt(logger, 0, 2024))).replace(/  /g, ' ');
                            values[attributeCode] = [{ locale: null, scope: null, data }];
                            break;
                        default:
                            throw new Error(`Unsupported Data Type: ${attribute.type}`);
                    }
                }
            }
            result['values'] = values;
            yield akeneo.write(fileDesc, `${JSON.stringify(result)}\n`);
        }
        yield akeneo.close(fileDesc);
        return ['OK'];
    });
}
exports.products = products;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBRTFDLDZCQUE2QjtBQUc3Qix5REFBeUQ7QUFDekQscURBQXFEO0FBQ3JELG9DQUFvQztBQUdwQyxNQUFNLEdBQUcsR0FBUSxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBNkIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFbkcsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFDN0UsTUFBTSxVQUFVLEdBQVcsa0JBQWtCLENBQUM7QUFFOUMsU0FBc0IsUUFBUSxDQUFDLE1BQWM7O1FBQzNDLE1BQU0sVUFBVSxHQUFXLFVBQVUsQ0FBQztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsTUFBTSxjQUFjLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakQsTUFBTSxRQUFRLEdBQVcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hHLEtBQUssSUFBSSxVQUFVLEdBQUcsUUFBUSxFQUFFLFVBQVUsR0FBRyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDbkUsTUFBTSxNQUFNLEdBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7WUFFMUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFV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