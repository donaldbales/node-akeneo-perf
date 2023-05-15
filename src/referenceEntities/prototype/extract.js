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
exports.referenceEntityRecords = exports.referenceEntityAttributes = exports.extractImages = void 0;
const akeneo = require("node-akeneo-api");
const fs = require("fs");
const path = require("path");
const helper_1 = require("./helper");
const mapper = require("../../mapper");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = `referenceEntities/${helper_1.REFERENCE_ENTITY_CODE}/extract`;
const extractedImagesMap = new Map();
const loadedImagesMap = new Map();
function extractImages(logger, conn) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'extractImages';
        logger.info({ moduleName, methodName }, `Starting...`);
        const tableName = helper_1.REFERENCE_ENTITY_CODE;
        const mapPath = `${exportPath}${path.sep}${tableName}${path.sep}extractedImagesMap.vac`;
        akeneo.mkdirs([tableName]);
        if (extractedImagesMap.size === 0) {
            yield mapper.load(logger, mapPath, extractedImagesMap, 'PKey');
        }
        const query = `
    SELECT distinct 
           
    FROM   
    WHERE  
    ORDER BY 
  `;
        let rows = [];
        try {
            rows = yield sql.executeDML(logger, conn, query);
            logger.info({ moduleName, methodName, rows: rows.length });
        }
        catch (err) {
            logger.error({ moduleName, methodName, err });
            process.exit(99);
        }
        for (const row of rows) {
            const code = akeneo.attributeCode(row.Text);
            const imagePath = `${exportPath}${path.sep}${code}.png`;
            if (!(extractedImagesMap.has(row.PKey))) {
                const image = row.Image;
                fs.writeFileSync(imagePath, image);
                delete row.Image;
                row.code = code;
                row.imagePath = imagePath;
                const file = fs.openSync(mapPath, 'a');
                fs.writeSync(file, `${JSON.stringify(row)}\n`);
                fs.closeSync(file);
                logger.info({ moduleName, methodName, code }, `${row.DataLength} bytes written to ${imagePath}.`);
            }
            else {
                logger.info({ moduleName, methodName, code }, `${imagePath} already exists.`);
            }
        }
        return ['OK'];
    });
}
exports.extractImages = extractImages;
function referenceEntityAttributes(logger) {
    const methodName = 'referenceEntityAttributes';
    logger.info({ moduleName, methodName }, `Starting...`);
    const attributeMap = {};
    // Manually add an Text attribute
    attributeMap['Text'] = { sql_data_type: 'nvarchar' };
    attributeMap['Text']['akeneo_type'] = akeneo.REFERENCE_ENTITY_TEXT;
    // Manually add an Textarea attribute
    attributeMap['Textarea'] = { sql_data_type: 'nvarchar' };
    attributeMap['Textarea']['akeneo_type'] = akeneo.REFERENCE_ENTITY_TEXTAREA;
    // Manually add an _Number attribute
    attributeMap['_Number'] = { sql_data_type: 'int' };
    attributeMap['_Number']['akeneo_type'] = akeneo.REFERENCE_ENTITY_NUMBER;
    return attributeMap;
}
exports.referenceEntityAttributes = referenceEntityAttributes;
function referenceEntityRecords(logger, conn) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'referenceEntityRecords';
        logger.info({ moduleName, methodName }, `Starting...`);
        const tableName = helper_1.REFERENCE_ENTITY_CODE;
        const loadedImagesMapPath = `${exportPath}${path.sep}${tableName}${path.sep}loadedImagesMap.vac`;
        akeneo.mkdirs([tableName]);
        if (loadedImagesMap.size === 0) {
            yield mapper.load(logger, loadedImagesMapPath, loadedImagesMap, 'Text');
        }
        const results = [];
        const query = `
    SELECT distinct

    FROM   
    ORDER BY 
  `;
        let rows = [];
        try {
            rows = yield sql.executeDML(logger, conn, query);
            logger.info({ moduleName, methodName, rows: rows.length });
        }
        catch (err) {
            logger.error({ moduleName, methodName, err });
            process.exit(99);
        }
        for (const row of rows) {
            const code = `${akeneo.attributeCode(row.Text)}_${row._Number}`;
            const label = row.Text;
            const image = loadedImagesMap.has(row.Text) ? loadedImagesMap.get(row.Text).referenceEntitiesMediaFileCode : '';
            const Textarea = row.Textarea;
            const Text = row.Text;
            const _Number = row._Number;
            const result = {
                referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                code,
                label,
                image,
                Textarea,
                Text,
                _Number
            };
            results.push(result);
        }
        return results;
    });
}
exports.referenceEntityRecords = referenceEntityRecords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBQzFDLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFHN0IscUNBQWlEO0FBRWpELHVDQUF1QztBQUV2QyxNQUFNLEdBQUcsR0FBUSxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBNkIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFbkcsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFDN0UsTUFBTSxVQUFVLEdBQVcscUJBQXFCLDhCQUFxQixVQUFVLENBQUM7QUFFaEYsTUFBTSxrQkFBa0IsR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN2RCxNQUFNLGVBQWUsR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVwRCxTQUFzQixhQUFhLENBQUMsTUFBYyxFQUFFLElBQVM7O1FBQzNELE1BQU0sVUFBVSxHQUFXLGVBQWUsQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sU0FBUyxHQUFXLDhCQUFxQixDQUFDO1FBQ2hELE1BQU0sT0FBTyxHQUFXLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLHdCQUF3QixDQUFDO1FBQ2hHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBRSxTQUFTLENBQUUsQ0FBQyxDQUFDO1FBRTdCLElBQUksa0JBQWtCLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNqQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNoRTtRQUVELE1BQU0sS0FBSyxHQUFXOzs7Ozs7R0FNckIsQ0FBQztRQUVGLElBQUksSUFBSSxHQUFVLEVBQUUsQ0FBQztRQUNyQixJQUFJO1lBQ0YsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEdBQVcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsTUFBTSxTQUFTLEdBQVcsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUNoRSxJQUFJLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZDLE1BQU0sS0FBSyxHQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDMUIsTUFBTSxJQUFJLEdBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRW5CLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUMxQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLHFCQUFxQixTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUMxQyxHQUFHLFNBQVMsa0JBQWtCLENBQUMsQ0FBQzthQUNuQztTQUNGO1FBRUQsT0FBTyxDQUFFLElBQUksQ0FBRSxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQW5ERCxzQ0FtREM7QUFFRCxTQUFnQix5QkFBeUIsQ0FBQyxNQUFjO0lBQ3RELE1BQU0sVUFBVSxHQUFXLDJCQUEyQixDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFdkQsTUFBTSxZQUFZLEdBQVEsRUFBRSxDQUFDO0lBRTdCLGlDQUFpQztJQUNqQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDckQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztJQUVuRSxxQ0FBcUM7SUFDckMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQ3pELFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUMseUJBQXlCLENBQUM7SUFFekUsb0NBQW9DO0lBQ3RDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNuRCxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixDQUFDO0lBRXhFLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFuQkQsOERBbUJDO0FBRUQsU0FBc0Isc0JBQXNCLENBQUMsTUFBYyxFQUFFLElBQVM7O1FBQ3BFLE1BQU0sVUFBVSxHQUFXLHdCQUF3QixDQUFDO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFdkQsTUFBTSxTQUFTLEdBQVcsOEJBQXFCLENBQUM7UUFDaEQsTUFBTSxtQkFBbUIsR0FBVyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxxQkFBcUIsQ0FBQztRQUN6RyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUUsU0FBUyxDQUFFLENBQUMsQ0FBQztRQUU3QixJQUFJLGVBQWUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsTUFBTSxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBRXhCLE1BQU0sS0FBSyxHQUFXOzs7OztHQUtyQixDQUFDO1FBRUYsSUFBSSxJQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLElBQUk7WUFDRixJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbEI7UUFFRCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtZQUN0QixNQUFNLElBQUksR0FBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4RSxNQUFNLEtBQUssR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQy9CLE1BQU0sS0FBSyxHQUFXLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3hILE1BQU0sUUFBUSxHQUFXLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUM5QixNQUFNLE9BQU8sR0FBVyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ3BDLE1BQU0sTUFBTSxHQUFRO2dCQUNsQixtQkFBbUIsRUFBRSw4QkFBcUI7Z0JBQzFDLElBQUk7Z0JBQ0osS0FBSztnQkFDTCxLQUFLO2dCQUNMLFFBQVE7Z0JBQ1IsSUFBSTtnQkFDSixPQUFPO2FBQ1IsQ0FBQztZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEI7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQUE7QUFsREQsd0RBa0RDIn0=