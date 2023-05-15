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
exports.exportAttributeaAndOptionsAsMaps = exports.attributeOptionsMap = exports.attributesMap = void 0;
const akeneo = require("node-akeneo-api");
const path = require("path");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'attributes/export';
exports.attributesMap = new Map();
exports.attributeOptionsMap = new Map();
function exportAttributeaAndOptionsAsMaps(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportAttributeaAndOptionsAsMaps';
        yield akeneo.exportAttributes();
        yield akeneo.load(path.join(exportPath, akeneo.filenameAttributes), exports.attributesMap, 'code');
        const fileDesc = yield akeneo.open(path.join(exportPath, akeneo.filenameAttributeOptions));
        const lines = (yield akeneo.read(fileDesc)).toString().split('\n');
        yield akeneo.close(fileDesc);
        for (const line of lines) {
            if (line) {
                const attributeOption = JSON.parse(line);
                const attribute = attributeOption.attribute || '';
                const code = attributeOption.code || '';
                if (!(exports.attributeOptionsMap.has(attribute))) {
                    const optionsSet = new Set();
                    optionsSet.add(code);
                    exports.attributeOptionsMap.set(attribute, optionsSet);
                }
                else {
                    const optionsSet = exports.attributeOptionsMap.get(attribute) || new Set();
                    optionsSet.add(code);
                    exports.attributeOptionsMap.set(attribute, optionsSet);
                }
            }
        }
        return { attributesMap: exports.attributesMap, attributeOptionsMap: exports.attributeOptionsMap };
    });
}
exports.exportAttributeaAndOptionsAsMaps = exportAttributeaAndOptionsAsMaps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDBDQUEwQztBQUMxQyw2QkFBNkI7QUFHN0IsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFFN0UsTUFBTSxVQUFVLEdBQVcsbUJBQW1CLENBQUM7QUFFbEMsUUFBQSxhQUFhLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7QUFDNUMsUUFBQSxtQkFBbUIsR0FBNkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV2RSxTQUFzQixnQ0FBZ0MsQ0FBQyxNQUFjOztRQUNuRSxNQUFNLFVBQVUsR0FBVyxrQ0FBa0MsQ0FBQztRQUU5RCxNQUFNLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBRSxxQkFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNGLE1BQU0sUUFBUSxHQUFXLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1FBQ25HLE1BQU0sS0FBSyxHQUFVLENBQUMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFFLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtZQUN4QixJQUFJLElBQUksRUFBRTtnQkFDUixNQUFNLGVBQWUsR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLFNBQVMsR0FBVyxlQUFlLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztnQkFDMUQsTUFBTSxJQUFJLEdBQVcsZUFBZSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxDQUFDLDJCQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFO29CQUN6QyxNQUFNLFVBQVUsR0FBZ0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDMUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckIsMkJBQW1CLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDaEQ7cUJBQU07b0JBQ0wsTUFBTSxVQUFVLEdBQWdCLDJCQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNoRixVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNyQiwyQkFBbUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNoRDthQUNGO1NBQ0Y7UUFFRCxPQUFPLEVBQUUsYUFBYSxFQUFiLHFCQUFhLEVBQUUsbUJBQW1CLEVBQW5CLDJCQUFtQixFQUFFLENBQUM7SUFDaEQsQ0FBQztDQUFBO0FBMUJELDRFQTBCQyJ9