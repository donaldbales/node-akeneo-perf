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
exports.attributes = void 0;
const akeneo = require("node-akeneo-api");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'attributes/extract';
function attributes(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'attributes';
        logger.info({ moduleName, methodName }, `Starting...`);
        /*
          exports.PIM_CATALOG_FILE = 'pim_catalog_file';
          exports.PIM_CATALOG_IDENTIFIER = 'pim_catalog_identifier';
          exports.PIM_CATALOG_IMAGE = 'pim_catalog_image';
        */
        const attributeMap = {};
        for (let a = 1; a < 11; a++) {
            attributeMap[`Yes/No ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_BOOLEAN };
            attributeMap[`Date ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_DATE };
            attributeMap[`Decimal ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_NUMBER, sql_data_type: 'decimal' };
            attributeMap[`Metric ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_METRIC };
            attributeMap[`Multi Select ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_MULTISELECT };
            attributeMap[`Integer ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_NUMBER, sql_data_type: 'int' };
            attributeMap[`Price ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_PRICE_COLLECTION };
            attributeMap[`Simple Select ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_SIMPLESELECT };
            attributeMap[`Text ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_TEXT };
            attributeMap[`Text Area ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_TEXTAREA };
            attributeMap[`Multi Select ${a}`]['options'] = [];
            attributeMap[`Simple Select ${a}`]['options'] = [];
            for (let o = 1; o < 101; o++) {
                attributeMap[`Multi Select ${a}`]['options'].push(`Multi Select ${a} Option ${o}`);
                attributeMap[`Simple Select ${a}`]['options'].push(`Simple Select ${a} Option ${o}`);
            }
        }
        return attributeMap;
    });
}
exports.attributes = attributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBTzFDLE1BQU0sVUFBVSxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQTZCLElBQUksR0FBRyxDQUFDO0FBQzdFLE1BQU0sVUFBVSxHQUFXLG9CQUFvQixDQUFDO0FBRWhELFNBQXNCLFVBQVUsQ0FBQyxNQUFjOztRQUM3QyxNQUFNLFVBQVUsR0FBVyxZQUFZLENBQUM7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RDs7OztVQUlFO1FBQ0EsTUFBTSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMxRSxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JFLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsQ0FBQztZQUNwRyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3pFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUNwRixZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDaEcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztZQUNsRixZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDdEYsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNyRSxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBRTlFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbEQsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNuRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QixZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbkYsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEY7U0FDRjtRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7Q0FBQTtBQS9CRCxnQ0ErQkMifQ==