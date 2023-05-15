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
const akeneo = require("node-akeneo-api");
const path = require("path");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'families/load';
function families(logger, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'families';
        logger.info({ moduleName, methodName }, 'Starting...');
        //const famliez: any[] = data;
        //const results = await akeneo.patchVndAkeneoCollection(akeneo.apiUrlFamilies(), famliez);
        const fileDesc = yield akeneo.open(path.join(exportPath, akeneo.filenameFamilies), 'w');
        for (const datum of data) {
            yield akeneo.write(fileDesc, `${JSON.stringify(datum)}\n`);
        }
        yield akeneo.close(fileDesc);
        const results = yield akeneo.importFamilies();
        logger.info({ moduleName, methodName, results });
        return ['OK'];
    });
}
exports.families = families;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBQzFDLDZCQUE2QjtBQU03QixNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVyxlQUFlLENBQUM7QUFFM0MsU0FBc0IsUUFBUSxDQUFDLE1BQWMsRUFBRSxJQUFXOztRQUN4RCxNQUFNLFVBQVUsR0FBVyxVQUFVLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCw4QkFBOEI7UUFDOUIsMEZBQTBGO1FBRTFGLE1BQU0sUUFBUSxHQUFXLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRyxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksRUFBRTtZQUN4QixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVqRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQztDQUFBO0FBakJELDRCQWlCQyJ9