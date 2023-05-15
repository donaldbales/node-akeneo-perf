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
exports.attributeGroups = void 0;
const akeneo = require("node-akeneo-api");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'attributeGroups/transform';
function attributeGroups(logger, groups) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'attributeGroups';
        logger.info({ moduleName, methodName }, `Starting...`);
        const results = [];
        let sort_order = 0;
        for (const group of groups) {
            sort_order += 10;
            const result = {
                code: akeneo.attributeCode(group),
                sort_order,
                labels: { en_US: group }
            };
            results.push(result);
        }
        return results;
    });
}
exports.attributeGroups = attributeGroups;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDBDQUEwQztBQU8xQyxNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVywyQkFBMkIsQ0FBQztBQUV2RCxTQUFzQixlQUFlLENBQUMsTUFBYyxFQUFFLE1BQWE7O1FBQ2pFLE1BQU0sVUFBVSxHQUFXLGlCQUFpQixDQUFDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFdkQsTUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDO1FBQzFCLElBQUksVUFBVSxHQUFXLENBQUMsQ0FBQztRQUMzQixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixVQUFVLElBQUksRUFBRSxDQUFDO1lBQ2pCLE1BQU0sTUFBTSxHQUFtQjtnQkFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxVQUFVO2dCQUNWLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUM7YUFDdkIsQ0FBQztZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEI7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQUE7QUFqQkQsMENBaUJDIn0=