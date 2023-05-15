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
exports.referenceEntityRecords = exports.referenceEntityAttributes = exports.referenceEntity = exports.loadImages = void 0;
const akeneo = require("node-akeneo-api");
const fs = require("fs");
const path = require("path");
const helper_1 = require("./helper");
const inspect_1 = require("../../inspect");
const mapper = require("../../mapper");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = `referenceEntities/${helper_1.REFERENCE_ENTITY_CODE}/load`;
const extractedImagesMap = new Map();
const loadedImagesMap = new Map();
function loadImages(logger, conn) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'loadImages';
        logger.info({ moduleName, methodName }, `Starting...`);
        const tableName = helper_1.REFERENCE_ENTITY_CODE;
        const extractedImagesMapPath = `${exportPath}${path.sep}${tableName}${path.sep}extractedImagesMap.vac`;
        const loadedImagesMapPath = `${exportPath}${path.sep}${tableName}${path.sep}loadedImagesMap.vac`;
        akeneo.mkdirs([tableName]);
        if (extractedImagesMap.size === 0) {
            yield mapper.load(logger, extractedImagesMapPath, extractedImagesMap, 'PKey');
        }
        if (loadedImagesMap.size === 0) {
            yield mapper.load(logger, loadedImagesMapPath, loadedImagesMap, 'PKey');
        }
        const results = {};
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
        const referenceEntityCode = helper_1.REFERENCE_ENTITY_CODE;
        let code = '';
        let imagePath = '';
        let key = '';
        let referenceEntitiesMediaFileCode = '';
        for (const row of rows) {
            key = row.PKey;
            if (extractedImagesMap.has(key)) {
                const data = extractedImagesMap.get(key);
                code = data.code;
                imagePath = data.imagePath;
                if (!(loadedImagesMap.has(key))) {
                    let stream = null;
                    try {
                        stream = fs.createReadStream(imagePath);
                    }
                    catch (err) {
                        const error = err.message ? err.message : inspect_1.inspect(err);
                        logger.error({ moduleName, methodName, error }, `opening ${imagePath}.`);
                        continue;
                    }
                    if (stream) {
                        try {
                            referenceEntitiesMediaFileCode = yield akeneo.postMultipartFormData(akeneo.apiUrlReferenceEntityMediaFiles(), stream);
                            stream.close();
                        }
                        catch (err) {
                            const error = err.message ? err.message : inspect_1.inspect(err);
                            logger.error({ moduleName, methodName, imagePath, referenceEntitiesMediaFileCode, error }, `loading ${imagePath}.`);
                            process.exit(99);
                        }
                        delete row.Image;
                        row['code'] = code;
                        row['imagePath'] = imagePath;
                        row['referenceEntitiesMediaFileCode'] = referenceEntitiesMediaFileCode;
                        try {
                            const file = fs.openSync(loadedImagesMapPath, 'a');
                            fs.writeSync(file, `${JSON.stringify(row)}\n`);
                            fs.closeSync(file);
                            logger.info({ moduleName, methodName }, `loaded ${imagePath}.`);
                        }
                        catch (err) {
                            const error = err.message ? err.message : inspect_1.inspect(err);
                            logger.error({ moduleName, methodName, loadedImagesMapPath, error }, `writing ${loadedImagesMapPath}.`);
                            process.exit(99);
                        }
                    }
                }
                else {
                    logger.info({ moduleName, methodName, key }, `${imagePath} already loaded.`);
                }
            }
            else {
                logger.warn({ moduleName, methodName, key }, `Warning: image for ${key} not extracted.`);
            }
        }
        return ['OK'];
    });
}
exports.loadImages = loadImages;
function referenceEntity(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'loadReferenceEntity';
        logger.info({ moduleName, methodName }, `Starting...`);
        const referenceEntity_ = {
            code: helper_1.REFERENCE_ENTITY_CODE,
            labels: {
                en_US: 'References',
            }
        };
        const results = yield akeneo.patch(akeneo.apiUrlReferenceEntities(referenceEntity_.code), referenceEntity_);
        return results;
    });
}
exports.referenceEntity = referenceEntity;
function referenceEntityAttributes(logger, transformed) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'referenceEntityAttributes';
        logger.info({ moduleName, methodName }, `Starting...`);
        for (const transformedAttribute of transformed.attributes) {
            try {
                const results = yield akeneo.patch(akeneo.apiUrlReferenceEntityAttributes(transformedAttribute.referenceEntityCode, transformedAttribute.referenceEntityAttributeCode), transformedAttribute.attribute);
                logger.info({ moduleName, methodName, results });
            }
            catch (err) {
                logger.error({ moduleName, methodName, error: err });
                process.exit(99);
            }
        }
        for (const transformedOption of transformed.attributeOptions) {
            try {
                const results = yield akeneo.patch(akeneo.apiUrlReferenceEntityAttributeOptions(transformedOption.referenceEntityCode, transformedOption.referenceEntityAttributeCode, transformedOption.referenceEntityAttributeOptionCode), transformedOption.option);
                logger.info({ moduleName, methodName, results });
            }
            catch (err) {
                logger.error({ moduleName, methodName, error: err });
                process.exit(99);
            }
        }
        return ['OK'];
    });
}
exports.referenceEntityAttributes = referenceEntityAttributes;
function referenceEntityRecords(logger, transformedRecords) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'referenceEntityRecords';
        logger.info({ moduleName, methodName }, `Starting...`);
        const referenceEntityRecords = transformedRecords;
        console.log(transformedRecords.length);
        if (referenceEntityRecords.length > 0) {
            let referenceEntityData = [];
            let referenceEntityCode = referenceEntityRecords[0].referenceEntityCode || '';
            let count = 0;
            for (let i = 0; i <= referenceEntityRecords.length; i++) {
                if (i === referenceEntityRecords.length ||
                    (count > 0 && count % akeneo.patchLimit === 0) ||
                    referenceEntityCode !== referenceEntityRecords[i].referenceEntityCode) {
                    const results = yield akeneo.patch(`${akeneo.apiUrlReferenceEntityRecords(referenceEntityCode)}`, referenceEntityData);
                    if (i < referenceEntityRecords.length) {
                        referenceEntityCode = referenceEntityRecords[i].referenceEntityCode || '';
                        referenceEntityData = [];
                        count = 0;
                    }
                }
                if (i < referenceEntityRecords.length) {
                    referenceEntityData.push(referenceEntityRecords[i].record);
                    count++;
                }
            }
        }
        return ['OK'];
    });
}
exports.referenceEntityRecords = referenceEntityRecords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBQzFDLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFHN0IscUNBQWlEO0FBQ2pELDJDQUF3QztBQUV4Qyx1Q0FBdUM7QUFJdkMsTUFBTSxHQUFHLEdBQVEsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQTZCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRW5HLE1BQU0sVUFBVSxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQTZCLElBQUksR0FBRyxDQUFDO0FBQzdFLE1BQU0sVUFBVSxHQUFXLHFCQUFxQiw4QkFBcUIsT0FBTyxDQUFDO0FBRTdFLE1BQU0sa0JBQWtCLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdkQsTUFBTSxlQUFlLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7QUFFcEQsU0FBc0IsVUFBVSxDQUFDLE1BQWMsRUFBRSxJQUFTOztRQUN4RCxNQUFNLFVBQVUsR0FBVyxZQUFZLENBQUM7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCxNQUFNLFNBQVMsR0FBVyw4QkFBcUIsQ0FBQztRQUNoRCxNQUFNLHNCQUFzQixHQUFXLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLHdCQUF3QixDQUFDO1FBQy9HLE1BQU0sbUJBQW1CLEdBQVcsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcscUJBQXFCLENBQUM7UUFDekcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFFLFNBQVMsQ0FBRSxDQUFD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