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
const moduleName = 'products/load';
function products(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'products';
        logger.info({ moduleName, methodName }, 'Starting...');
        //const productz: any[] = data;
        //const results = await akeneo.patchVndAkeneoCollection(akeneo.apiUrlProducts(), productz);
        const results = yield akeneo.importProducts();
        logger.info({ moduleName, methodName, results });
        return ['OK'];
    });
}
exports.products = products;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBUTFDLE1BQU0sVUFBVSxHQUFXLGVBQWUsQ0FBQztBQUUzQyxTQUFzQixRQUFRLENBQUMsTUFBYzs7UUFDM0MsTUFBTSxVQUFVLEdBQVcsVUFBVSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFdkQsK0JBQStCO1FBQy9CLDJGQUEyRjtRQUMzRixNQUFNLE9BQU8sR0FBUSxNQUFNLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWpELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0NBQUE7QUFWRCw0QkFVQyJ9