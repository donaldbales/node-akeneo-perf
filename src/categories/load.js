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
const moduleName = 'categories/load';
function categories(logger, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'categories';
        logger.info({ moduleName, methodName }, 'Starting...');
        const categoriez = data;
        const results = yield akeneo.patchVndAkeneoCollection(akeneo.apiUrlCategories(), categoriez);
        logger.info({ moduleName, methodName, results });
        return ['OK'];
    });
}
exports.categories = categories;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBRzFDLE1BQU0sVUFBVSxHQUFXLGlCQUFpQixDQUFDO0FBRTdDLFNBQXNCLFVBQVUsQ0FBQyxNQUFjLEVBQUUsSUFBVzs7UUFDMUQsTUFBTSxVQUFVLEdBQVcsWUFBWSxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFdkQsTUFBTSxVQUFVLEdBQVUsSUFBSSxDQUFDO1FBQy9CLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzdGLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFakQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7Q0FBQTtBQVRELGdDQVNDIn0=