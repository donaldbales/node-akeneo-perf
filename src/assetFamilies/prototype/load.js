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
exports.assetFamilyAssets = exports.assetFamilyAttributes = exports.assetFamily = exports.loadImages = void 0;
const akeneo = require("node-akeneo-api");
const fs = require("fs");
const path = require("path");
const helper_1 = require("./helper");
const inspect_1 = require("../../inspect");
const mapper = require("../../mapper");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = `assetFamilies/${helper_1.ASSET_FAMILY_CODE}/load`;
const imagesExtractedMap = new Map();
const imagesLoadedMap = new Map();
function loadImages(logger, conn, startPKey = '', endPKey = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'loadImages';
        logger.info({ moduleName, methodName }, `Starting...`);
        const tableName = 'Images';
        const extractedMapPath = `${exportPath}${path.sep}${tableName}${path.sep}extractedMap.vac`;
        const loadedMapPath = `${exportPath}${path.sep}${tableName}${path.sep}loadedMap.vac`;
        if (imagesExtractedMap.size === 0) {
            yield mapper.load(logger, extractedMapPath, imagesExtractedMap, 'eyedee');
        }
        if (imagesLoadedMap.size === 0) {
            yield mapper.load(logger, loadedMapPath, imagesLoadedMap, 'eyedee');
        }
        const query = `
    SELECT i.eyedee
    FROM   Images i
    where  i.eyedee between '${startPKey}' and '${endPKey}'
    order by 1
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
        let assetFamiliesMediaFileCode = '';
        let imagePath = '';
        for (const row of rows) {
            const key = row.eyedee;
            if (imagesExtractedMap.has(key)) {
                const data = imagesExtractedMap.get(key);
                imagePath = data.imagePath;
                const updated_at = imagesLoadedMap.get(key) &&
                    imagesLoadedMap.get(key).updated_at ?
                    imagesLoadedMap.get(key).updated_at :
                    '1900-01-01T00:00:00.000Z';
                if (!(imagesLoadedMap.has(key)) ||
                    updated_at < data.updated_at) {
                    const eyedee = data.eyedee;
                    const updated_at = data.updated_at;
                    let stream = null;
                    try {
                        stream = fs.createReadStream(imagePath);
                    }
                    catch (err) {
                        const error = err.message ? err.message : inspect_1.inspect(err);
                        logger.error({ moduleName, methodName, error }, `opening ${imagePath}.`);
                        stream = '';
                    }
                    if (stream) {
                        try {
                            assetFamiliesMediaFileCode = '';
                            assetFamiliesMediaFileCode = yield akeneo.postMultipartFormData(akeneo.apiUrlAssetFamilyMediaFiles(), stream);
                            logger.info({ moduleName, methodName, imagePath, assetFamiliesMediaFileCode });
                        }
                        catch (err) {
                            const error = err.message ? err.message : inspect_1.inspect(err);
                            logger.error({ moduleName, methodName, imagePath, assetFamiliesMediaFileCode, error }, `loading ${imagePath}.`);
                            assetFamiliesMediaFileCode = '';
                        }
                        if (stream.close) {
                            stream.close();
                        }
                        if (assetFamiliesMediaFileCode) {
                            const row = {
                                eyedee,
                                updated_at,
                                assetFamiliesMediaFileCode
                            };
                            try {
                                const file = fs.openSync(loadedMapPath, 'a');
                                fs.writeSync(file, `${JSON.stringify(row)}\n`);
                                fs.closeSync(file);
                                logger.info({ moduleName, methodName }, `loaded ${imagePath}.`);
                            }
                            catch (err) {
                                const error = err.message ? err.message : inspect_1.inspect(err);
                                logger.error({ moduleName, methodName, loadedMapPath, error }, `writing ${loadedMapPath}.`);
                                process.exit(99);
                            }
                        }
                    }
                }
                else {
                    logger.info({ moduleName, methodName }, `${imagePath} already loaded.`);
                }
            }
            else {
                logger.warn({ moduleName, methodName }, `Warning: image for ${key} NOT extracted.`);
            }
        }
        return ['OK'];
    });
}
exports.loadImages = loadImages;
function assetFamily(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'assetFamily';
        logger.info({ moduleName, methodName }, `Starting...`);
        const assetFamily_ = {
            code: helper_1.ASSET_FAMILY_CODE,
            labels: {
                en_US: 'Images'
            }
        };
        const results = yield akeneo.patch(akeneo.apiUrlAssetFamilies(assetFamily_.code), assetFamily_);
        return results;
    });
}
exports.assetFamily = assetFamily;
function assetFamilyAttributes(logger, transformed) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'assetFamilyAttributes';
        logger.info({ moduleName, methodName }, `Starting...`);
        for (const transformedAttribute of transformed.attributes) {
            try {
                const results = yield akeneo.patch(akeneo.apiUrlAssetFamilyAttributes(transformedAttribute.assetFamilyCode, transformedAttribute.assetFamilyAttributeCode), transformedAttribute.attribute);
                logger.info({ moduleName, methodName, results });
            }
            catch (err) {
                logger.error({ moduleName, methodName, error: err });
                process.exit(99);
            }
        }
        for (const transformedOption of transformed.attributeOptions) {
            try {
                const results = yield akeneo.patch(akeneo.apiUrlAssetFamilyAttributeOptions(transformedOption.assetFamilyCode, transformedOption.assetFamilyAttributeCode, transformedOption.assetFamilyAttributeOptionCode), transformedOption.option);
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
exports.assetFamilyAttributes = assetFamilyAttributes;
function assetFamilyAssets(logger, transformedAssets) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'assetFamilyAssets';
        logger.info({ moduleName, methodName }, `Starting...`);
        const assetFamilyAssets = transformedAssets;
        console.log(transformedAssets.length);
        if (assetFamilyAssets.length > 0) {
            let assetFamilyData = [];
            let assetFamilyCode = assetFamilyAssets[0].assetFamilyCode || '';
            let count = 0;
            for (let i = 0; i <= assetFamilyAssets.length; i++) {
                if (i === assetFamilyAssets.length ||
                    (count > 0 && count % akeneo.patchLimit === 0) ||
                    assetFamilyCode !== assetFamilyAssets[i].assetFamilyCode) {
                    const results = yield akeneo.patch(`${akeneo.apiUrlAssetFamilyAssets(assetFamilyCode)}`, assetFamilyData);
                    if (i < assetFamilyAssets.length) {
                        assetFamilyCode = assetFamilyAssets[i].assetFamilyCode || '';
                        assetFamilyData = [];
                        count = 0;
                    }
                }
                if (i < assetFamilyAssets.length) {
                    assetFamilyData.push(assetFamilyAssets[i].asset);
                    count++;
                }
            }
        }
        return ['OK'];
    });
}
exports.assetFamilyAssets = assetFamilyAssets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBQzFDLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFHN0IscUNBQTZDO0FBRzdDLDJDQUF3QztBQUV4Qyx1Q0FBdUM7QUFFdkMsTUFBTSxHQUFHLEdBQVEsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQTZCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRW5HLE1BQU0sVUFBVSxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQTZCLElBQUksR0FBRyxDQUFDO0FBQzdFLE1BQU0sVUFBVSxHQUFXLGlCQUFpQiwwQkFBaUIsT0FBTyxDQUFDO0FBRXJFLE1BQU0sa0JBQWtCLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdkQsTUFBTSxlQUFlLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7QUFFcEQsU0FBc0IsVUFBVSxDQUFDLE1BQWMsRUFBRSxJQUFTLEVBQUUsWUFBb0IsRUFBRSxFQUFFLFVBQWtCLEVBQUU7O1FBQ3RHLE1BQU0sVUFBVSxHQUFXLFlBQVksQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sU0FBUyxHQUFXLFFBQVEsQ0FBQztRQUNuQyxNQUFNLGdCQUFnQixHQUFXLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLGtCQUFrQixDQUFDO1FBQ25HLE1BQU0sYUFBYSxHQUFXLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQztRQUU3RixJQUFJLGtCQUFrQixD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