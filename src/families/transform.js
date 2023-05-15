"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.families = exports.defaultAttributeAsLabel = void 0;
const akeneo = require("node-akeneo-api");
// import { FamilyVariant } from '../interfaces/FamilyVariant';
exports.defaultAttributeAsLabel = 'Model';
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'families/transform';
function families(logger, familyMap, defaultAttributeAsLabel = '') {
    const methodName = 'families';
    logger.info({ moduleName, methodName }, `Starting...`);
    const results = {
        families: [],
    };
    for (const family in familyMap) {
        logger.info({ moduleName, methodName, family });
        if (familyMap.hasOwnProperty(family)) {
            const attributes = [];
            let defaultAttributeAsLabelFound = false;
            for (const attribute in familyMap[family]) {
                if (attribute === defaultAttributeAsLabel) {
                    defaultAttributeAsLabelFound = true;
                }
                attributes.push(akeneo.attributeCode(attribute));
            }
            if (!(defaultAttributeAsLabelFound)) {
                logger.info({ moduleName, methodName, family }, `Attribute ${defaultAttributeAsLabel} is missing in this family`);
            }
            else {
                const familyJSON = {
                    attribute_as_label: akeneo.attributeCode(defaultAttributeAsLabel),
                    attributes,
                    code: akeneo.attributeCode(family),
                    labels: { en_US: family }
                };
                results.families.push(familyJSON);
            }
        }
        else {
            logger.error({ moduleName, methodName }, `Add a mapping for ${familyMap[family]}`);
            process.exit(99);
        }
    }
    return results;
}
exports.families = families;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUEwQztBQVExQywrREFBK0Q7QUFFbEQsUUFBQSx1QkFBdUIsR0FBVyxPQUFPLENBQUM7QUFDdkQsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFDN0UsTUFBTSxVQUFVLEdBQVcsb0JBQW9CLENBQUM7QUFFaEQsU0FBZ0IsUUFBUSxDQUFDLE1BQWMsRUFBRSxTQUFjLEVBQUUsMEJBQWtDLEVBQUU7SUFDM0YsTUFBTSxVQUFVLEdBQVcsVUFBVSxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFdkQsTUFBTSxPQUFPLEdBQVE7UUFDbkIsUUFBUSxFQUFFLEVBQUU7S0FDYixDQUFDO0lBRUYsS0FBSyxNQUFNLE1BQU0sSUFBSSxTQUFTLEVBQUU7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNoRCxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsTUFBTSxVQUFVLEdBQVUsRUFBRSxDQUFDO1lBQzdCLElBQUksNEJBQTRCLEdBQVksS0FBSyxDQUFDO1lBQ2xELEtBQUssTUFBTSxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLFNBQVMsS0FBSyx1QkFBdUIsRUFBRTtvQkFDekMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO2lCQUNyQztnQkFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7Z0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLGFBQWEsdUJBQXVCLDRCQUE0QixDQUFDLENBQUM7YUFDbkg7aUJBQU07Z0JBQ0wsTUFBTSxVQUFVLEdBQVc7b0JBQ3pCLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7b0JBQ2pFLFVBQVU7b0JBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO29CQUNsQyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDO2lCQUN4QixDQUFDO2dCQUVGLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ25DO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUscUJBQXFCLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkYsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQjtLQUNGO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQXRDRCw0QkFzQ0MifQ==