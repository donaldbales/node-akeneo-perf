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
exports.assetFamilyAssets = exports.assetFamilyAttributes = exports.extractImages = void 0;
const akeneo = require("node-akeneo-api");
const path = require("path");
const helper_1 = require("./helper");
const executor_1 = require("../../executor");
const mapper = require("../../mapper");
const sql = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER || 'sqlms')}`);
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = `assetFamilies/${helper_1.ASSET_FAMILY_CODE}/extract`;
const imagesExtractedMap = new Map();
const imagesLoadedMap = new Map();
function head(logger, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'head';
        logger.info({ moduleName, methodName }, `HEAD ${url}`);
        const command = `curl --connect-timeout 1 --head -m 2 -s '${url}' | grep -i -e 'HTTP\/' -e 'content-type: ' -e 'location: '`;
        const fileResults = yield executor_1.exec(logger, command);
        console.log(fileResults);
        let results = { statusCode: 500, headers: { 'content-type': 'unknown' } };
        if (fileResults.code === 0) {
            const lines = fileResults.stdout[0].toString().split('\n');
            const statusCode = Number.parseInt(lines[0].split(' ')[1].trim(), 10);
            const headers = {};
            if (lines[1] &&
                lines[1].split(': ')[0] &&
                lines[1].split(': ')[0].trim() &&
                lines[1].split(': ')[1].trim()) {
                headers[lines[1].split(': ')[0].trim().toLowerCase()] = lines[1].split(': ')[1].trim();
            }
            if (lines[2] &&
                lines[2].split(': ')[0] &&
                lines[2].split(': ')[0].trim() &&
                lines[2].split(': ')[1].trim()) {
                headers[lines[2].split(': ')[0].trim().toLowerCase()] = lines[2].split(': ')[1].trim();
            }
            results = { statusCode, headers };
        }
        console.log(results);
        return results;
    });
}
function extractImages(logger, conn, startPKey = '', endPKey = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'extractImages';
        logger.info({ moduleName, methodName }, `Starting...`);
        const tableName = 'Images';
        const extractedMapPath = `${exportPath}${path.sep}${tableName}${path.sep}extractedMap.vac`;
        if (imagesExtractedMap.size === 0) {
            yield mapper.load(logger, extractedMapPath, imagesExtractedMap, 'eyedee');
        }
        return [];
    });
}
exports.extractImages = extractImages;
function assetFamilyAttributes(logger) {
    const methodName = 'assetFamilyAttributes';
    logger.info({ moduleName, methodName }, `Starting...`);
    const attributeMap = {};
    // code, label, media are standard attributes for an asset family
    // Manually add a Text attribute
    attributeMap['Text'] = { sql_data_type: 'nvarchar' };
    attributeMap['Text']['akeneo_type'] = akeneo.ASSET_FAMILY_TEXT;
    // Manually add a Textarea attribute
    attributeMap['Textarea'] = { sql_data_type: 'nvarchar' };
    attributeMap['Textarea']['akeneo_type'] = akeneo.ASSET_FAMILY_TEXTAREA;
    // Manually add a transformation attribute
    attributeMap['Media100x100'] = {};
    attributeMap['Media100x100']['akeneo_type'] = akeneo.ASSET_FAMILY_MEDIA_FILE;
    return attributeMap;
}
exports.assetFamilyAttributes = assetFamilyAttributes;
function assetFamilyAssets(logger, conn, startPKey = '', endPKey = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'assetFamilyAssets';
        logger.info({ moduleName, methodName }, `Starting...`);
        const results = [];
        const tableName = 'Images';
        const loadedMapPath = `${exportPath}${path.sep}${tableName}${path.sep}loadedMap.vac`;
        if (imagesLoadedMap.size === 0) {
            yield mapper.load(logger, loadedMapPath, imagesLoadedMap, 'eyedee');
        }
        const query = `
    SELECT eyedee,
    FROM   
    WHERE  eyedee between '${startPKey}' and '${endPKey}'
    order by 1 desc;
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
            if (imagesLoadedMap.has(row.eyedee)) {
                const code = akeneo.attributeCode(row.eyedee);
                const label = row.Text;
                const media = imagesLoadedMap.get(row.eyedee).assetFamiliesMediaFileCode;
                const Text = row.Text;
                const Textarea = row.Textarea;
                const result = {
                    assetFamilyCode: helper_1.ASSET_FAMILY_CODE,
                    code,
                    label,
                    media,
                    Text,
                    Textarea
                };
                results.push(result);
                logger.info({ moduleName, methodName, code, media }, `Added to Assets`);
            }
        }
        return results;
    });
}
exports.assetFamilyAssets = assetFamilyAssets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBRTFDLDZCQUE2QjtBQUk3QixxQ0FBNkM7QUFDN0MsNkNBQXNDO0FBR3RDLHVDQUF1QztBQUV2QyxNQUFNLEdBQUcsR0FBUSxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBNkIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFbkcsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFDN0UsTUFBTSxVQUFVLEdBQVcsaUJBQWlCLDBCQUFpQixVQUFVLENBQUM7QUFFeEUsTUFBTSxrQkFBa0IsR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN2RCxNQUFNLGVBQWUsR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVwRCxTQUFlLElBQUksQ0FBQyxNQUFjLEVBQUUsR0FBVzs7UUFDN0MsTUFBTSxVQUFVLEdBQVcsTUFBTSxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE1BQU0sT0FBTyxHQUFXLDRDQUE0QyxHQUFHLDZEQUE2RCxDQUFDO1FBQ3JJLE1BQU0sV0FBVyxHQUFRLE1BQU0sZUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXpCLElBQUksT0FBTyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQztRQUUxRSxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtB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