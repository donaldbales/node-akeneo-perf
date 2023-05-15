"use strict";
// src/setter.ts
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
exports.main = exports.load = void 0;
const fs = require("fs");
const path = require("path");
const logger_1 = require("./logger");
const moduleName = 'setter';
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
function load(logger, filename, set, key) {
    const methodName = 'load';
    logger.info({ moduleName, methodName, filename, set, key }, `Starting`);
    return new Promise((resolve, reject) => {
        let stream = null;
        if (filename) {
            let stat = null;
            try {
                stat = fs.statSync(filename);
            }
            catch (err) {
                const error = err.message ? err.message : err;
                logger.error({ moduleName, methodName, error }, `Error!`);
                return resolve(set);
            }
            if (stat &&
                stat.size > 0) {
                stream = fs.createReadStream(filename);
            }
        }
        const timer = setTimeout(() => {
            const error = 'timed out.';
            logger.error({ moduleName, methodName, error }, `Error!`);
            reject(error);
        }, 3000);
        let data = '';
        if (stream) {
            logger.debug({ moduleName, methodName, stream }, `reading stream`);
            stream.setEncoding('utf8');
            stream.on('data', (chunk) => {
                clearTimeout(timer);
                // console.log('stream.on data');
                // console.log(chunk);
                data += chunk;
                let linefeed = 0;
                while ((linefeed = data.indexOf('\n')) > -1) {
                    // console.log(linefeed);
                    const json = data.slice(0, linefeed).trim();
                    // console.log(json);
                    if (json) {
                        const doc = JSON.parse(json);
                        // console.log(doc);
                        set.add(doc[key]);
                    }
                    data = data.slice(linefeed + 1, data.length);
                }
            });
            stream.on('end', () => {
                clearTimeout(timer);
                // console.log('stream.on end');
                if (data) {
                    const json = data.trim();
                    // console.log(json);
                    if (json) {
                        const doc = JSON.parse(json);
                        // console.log(doc);
                        set.add(doc[key]);
                    }
                }
                // console.log(set);
                logger.info({ moduleName, methodName, filename, size: set.size }, `Set Size`);
                resolve(set);
            });
            stream.on('error', (err) => {
                clearTimeout(timer);
                const error = err.message ? err.message : err;
                logger.error({ moduleName, methodName, error }, `stream.on error: ${err.message}`);
                reject(error);
            });
        }
    });
}
exports.load = load;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'main';
        const logger = logger_1.getLogger(moduleName);
        logger.info({ moduleName, methodName }, `Starting...`);
        const tableName = 'CutSheetThumbnails';
        const extractedSetPath = `${exportPath}${path.sep}${tableName}${path.sep}extractedMap.vac`;
        const extractedSet = new Set();
        const results = yield load(logger, extractedSetPath, extractedSet, 'BlobLink');
        console.log(results);
        console.log(results.size);
        if (require.main === module) {
            setTimeout(() => { process.exit(0); }, 3000);
        }
        logger.info({ moduleName, methodName }, `Ending.`);
    });
}
exports.main = main;
// Start the program
if (require.main === module) {
    main();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQkFBZ0I7Ozs7Ozs7Ozs7OztBQUdoQix5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLHFDQUFxQztBQUVyQyxNQUFNLFVBQVUsR0FBVyxRQUFRLENBQUM7QUFDcEMsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFFN0UsU0FBZ0IsSUFBSSxDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEdBQWdCLEVBQUUsR0FBVztJQUNsRixNQUFNLFVBQVUsR0FBVyxNQUFNLENBQUM7SUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUV4RSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLElBQUksTUFBTSxHQUFRLElBQUksQ0FBQztRQUV2QixJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksSUFBSSxHQUFRLElBQUksQ0FBQztZQUNyQixJQUFJO2dCQUNGLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCO1lBQUMsT0FBTSxHQUFHLEVBQUU7Z0JBQ1gsTUFBTSxLQUFLLEdBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckI7WUFDRCxJQUFJLElBQUk7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