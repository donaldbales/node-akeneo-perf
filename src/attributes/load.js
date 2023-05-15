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
exports.attributeOptions = exports.attributes = void 0;
const akeneo = require("node-akeneo-api");
const path = require("path");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'attributes/load';
function attributes(logger, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'attributes';
        logger.info({ moduleName, methodName }, 'Starting...');
        //  const attributez: any[] = data;
        //  const results = await akeneo.patchVndAkeneoCollection(akeneo.apiUrlAttributes(), attributez);
        const fileDesc = yield akeneo.open(path.join(exportPath, akeneo.filenameAttributes), 'w');
        for (const datum of data) {
            yield akeneo.write(fileDesc, `${JSON.stringify(datum)}\n`);
        }
        yield akeneo.close(fileDesc);
        const results = yield akeneo.importAttributes();
        logger.info({ moduleName, methodName, results });
        return ['OK'];
    });
}
exports.attributes = attributes;
function attributeOptions(logger, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'importAttributeOptions';
        logger.info({ moduleName, methodName }, 'Starting...');
        /*
          const attributeOptionz: any[] = data;
          if (attributeOptionz.length > 0) {
            let attributeCode: string = '';
            let attributeCodeAttributeOptions: any[] = [];
            for (const attributeOption of attributeOptionz) {
              if (!(attributeCode)) {
                attributeCode = attributeOption.attribute;
              }
              if (attributeCode !== attributeOption.attribute) {
                const results = await akeneo.patchVndAkeneoCollection(
                  akeneo.apiUrlAttributeOptions(attributeCode), attributeCodeAttributeOptions);
                logger.info({ moduleName, methodName, results });
                attributeCode = attributeOption.attribute;
                attributeCodeAttributeOptions = [];
              }
              attributeCodeAttributeOptions.push(attributeOption);
            }
            if (attributeCode &&
                attributeCodeAttributeOptions.length > 0) {
              const results = await akeneo.patchVndAkeneoCollection(
                akeneo.apiUrlAttributeOptions(attributeCode), attributeCodeAttributeOptions);
              logger.info({ moduleName, methodName, results });
            }
          }
        */
        const fileDesc = yield akeneo.open(path.join(exportPath, akeneo.filenameAttributeOptions), 'w');
        for (const datum of data) {
            yield akeneo.write(fileDesc, `${JSON.stringify(datum)}\n`);
        }
        yield akeneo.close(fileDesc);
        const results = yield akeneo.importAttributeOptions();
        logger.info({ moduleName, methodName, results });
        return ['OK'];
    });
}
exports.attributeOptions = attributeOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBQzFDLDZCQUE2QjtBQU83QixNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVyxpQkFBaUIsQ0FBQztBQUU3QyxTQUFzQixVQUFVLENBQUMsTUFBYyxFQUFFLElBQVc7O1FBQzFELE1BQU0sVUFBVSxHQUFXLFlBQVksQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXpELG1DQUFtQztRQUNuQyxpR0FBaUc7UUFDL0YsTUFBTSxRQUFRLEdBQVcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xHLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3hCLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1RDtRQUNELE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QixNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFakQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7Q0FBQTtBQWhCRCxnQ0FnQkM7QUFFRCxTQUFzQixnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsSUFBVzs7UUFDaEUsTUFBTSxVQUFVLEdBQVcsd0JBQXdCLENBQUM7UUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXlCRTtRQUVBLE1BQU0sUUFBUSxHQUFXLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4RyxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksRUFBRTtZQUN4QixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWpELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0NBQUE7QUF4Q0QsNENBd0NDIn0=