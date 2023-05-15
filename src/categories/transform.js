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
const akeneo = require("node-akeneo-api");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'catgories/transform';
function categories(logger, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'categories';
        logger.info({ moduleName, methodName }, `Starting...`);
        const results = [];
        for (const datum of data) {
            const code = akeneo.attributeCode(datum.code);
            const label = datum.label;
            const parent = akeneo.attributeCode(datum.parent);
            logger.debug({ moduleName, methodName }, `${parent},${code},${label}`);
            const category = {
                code,
                labels: { en_US: label },
                parent
            };
            results.push(category);
        }
        return results;
    });
}
exports.categories = categories;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDBDQUEwQztBQVExQyxNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVyxxQkFBcUIsQ0FBQztBQUVqRCxTQUFzQixVQUFVLENBQUMsTUFBYyxFQUFFLElBQVM7O1FBQ3hELE1BQU0sVUFBVSxHQUFXLFlBQVksQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUV4QixLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksRUFBRTtZQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzFCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRyxNQUFNLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDdkUsTUFBTSxRQUFRLEdBQWE7Z0JBQ3pCLElBQUk7Z0JBQ0osTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQztnQkFDdEIsTUFBTTthQUNQLENBQUM7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUFBO0FBcEJELGdDQW9CQyJ9