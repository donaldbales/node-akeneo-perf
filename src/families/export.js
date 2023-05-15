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
exports.exportFamiliesAsMap = exports.familiesMap = void 0;
const akeneo = require("node-akeneo-api");
const path = require("path");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'families/export';
exports.familiesMap = new Map();
function exportFamiliesAsMap(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportFamiliesAsMap';
        yield akeneo.exportFamilies();
        yield akeneo.load(path.join(exportPath, akeneo.filenameFamilies), exports.familiesMap, 'code');
        return { familiesMap: exports.familiesMap };
    });
}
exports.exportFamiliesAsMap = exportFamiliesAsMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDBDQUEwQztBQUMxQyw2QkFBNkI7QUFHN0IsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFFN0UsTUFBTSxVQUFVLEdBQVcsaUJBQWlCLENBQUM7QUFFaEMsUUFBQSxXQUFXLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7QUFFdkQsU0FBc0IsbUJBQW1CLENBQUMsTUFBYzs7UUFDdEQsTUFBTSxVQUFVLEdBQVcscUJBQXFCLENBQUM7UUFFakQsTUFBTSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDOUIsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLG1CQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdkYsT0FBTyxFQUFFLFdBQVcsRUFBWCxtQkFBVyxFQUFFLENBQUM7SUFDekIsQ0FBQztDQUFBO0FBUEQsa0RBT0MifQ==