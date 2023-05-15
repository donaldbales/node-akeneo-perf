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
/* tslint:disable:no-console */
const akeneo = require("node-akeneo-api");
const fs = require("fs");
const minimist = require("minimist");
const attributesIndex = require("./attributes/index");
const familiesIndex = require("./families/index");
const productsExport = require("./products/export");
const productsIndex = require("./products/index");
const logger_1 = require("./logger");
const moduleName = 'index';
const possibleTasks = [
    'createAttributes',
    'createFamilies',
    'createProducts',
    'exportAssetCategories',
    'exportAssetTags',
    'exportAssets',
    'exportAssetFamilies',
    'exportAssociationTypes',
    'exportAttributeGroups',
    'exportAttributes',
    'exportCategories',
    'exportChannels',
    'exportCurrencies',
    'exportFamilies',
    'exportFamilyVariants',
    'exportLocales',
    'exportMeasureFamilies',
    'exportProductModels',
    'exportProducts',
    'exportReferenceEntities',
    'importAssociationTypes',
    'importAttributeGroups',
    'importAttributeOptions',
    'importAttributes',
    'importCategories',
    'importChannels',
    'importFamilies',
    'importFamilyVariants',
    'importProductModels',
    'importProducts',
    'importReferenceEntities',
    'importReferenceEntityAttributeOptions',
    'importReferenceEntityAttributes',
    'importReferenceEntityRecords'
];
function argz(args = null) {
    const methodName = 'argz';
    // console.error(`${moduleName}#${methodName}: Starting...`);
    // console.error(inspect(args)); 
    // console.error(inspect(process.argv.slice(2)));
    const localArgs = minimist(args && args.length > 0 ? args : process.argv.slice(2), {
        alias: {
            h: 'help',
            p: 'parameter',
            t: 'tasks',
            v: 'version'
        },
        default: {
            t: 'exportProducts'
        }
    });
    const pkg = JSON.parse(fs.readFileSync('package.json').toString());
    const name = pkg.name ? pkg.name : '';
    const version = pkg.version ? pkg.version : '';
    if (localArgs.version) {
        console.log(`${version}`);
        process.exit(0);
    }
    if (localArgs.help) {
        console.log(`Usage: node src/index [options]\n`);
        console.log(`Options:`);
        console.log(`  -h, --help     print ${name} command line options`);
        console.log(`  -t, --tasks    specify task(s) to run: ${possibleTasks.join(', ')}.`);
        console.log(`  -v, --version  print ${name} version`);
        process.exit(0);
    }
    const parameter = localArgs.parameter ? localArgs.parameter.toString() : '';
    const result = { tasks: {}, parameter };
    const tasks = localArgs.tasks.split(',');
    // console.error(tasks);
    for (const task of tasks) {
        let found = false;
        for (const possibleTask of possibleTasks) {
            if (possibleTask === task) {
                found = true;
                break;
            }
        }
        if (found) {
            result.tasks[task] = true;
        }
        else {
            console.error(`Task: ${task}, is not in the list of supported tasks: ${possibleTasks.join(', ')}.`);
            setTimeout(() => { process.exit(1); }, 10000);
        }
    }
    return result;
}
function exportProducts(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = null;
        switch (process.env.AKENEO_PROMISE_LIMIT) {
            case '1':
                results = yield akeneo.exportProducts();
                break;
            case '2':
                results = yield productsExport.exportWithTwoPromises(logger);
                break;
            case '4':
                results = yield productsExport.exportWithFourPromises(logger);
                break;
            case '5':
                results = yield productsExport.exportWithFivePromises(logger);
                break;
            case '8':
                results = yield productsExport.exportWithEightPromises(logger);
                break;
            case '10':
                results = yield productsExport.exportWith10Promises(logger);
                break;
            case '16':
                results = yield productsExport.exportWith16Promises(logger);
                break;
            case '32':
                results = yield productsExport.exportWith32Promises(logger);
                break;
            case '48':
                results = yield productsExport.exportWith48Promises(logger);
                break;
            case '50':
                results = yield productsExport.exportWith50Promises(logger);
                break;
            case '64':
                results = yield productsExport.exportWith64Promises(logger);
                break;
            case '80':
                results = yield productsExport.exportWith80Promises(logger);
                break;
            case '96':
                results = yield productsExport.exportWith96Promises(logger);
                break;
            case '100':
                results = yield productsExport.exportWith100Promises(logger);
                break;
            case '112':
                results = yield productsExport.exportWith112Promises(logger);
                break;
            default:
                throw new Error('Unsupposed AKENEO_PROMISE_LIMIT');
        }
        return results;
    });
}
function main(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'main';
        const logger = logger_1.getLogger(moduleName);
        const loggerLevel = process.env.LOG_LEVEL || 'info';
        logger.level(loggerLevel);
        const started = new Date();
        logger.info({ moduleName, methodName, started }, ` Starting...`);
        const cla = argz(args);
        const tasks = cla.tasks;
        let results = [];
        results = (tasks.createAttributes) ? yield attributesIndex.main(logger) : [];
        results = (tasks.createFamilies) ? yield familiesIndex.main(logger) : [];
        results = (tasks.createProducts) ? yield productsIndex.main(logger) : [];
        results = (tasks.importAssociationTypes) ? yield akeneo.importAssociationTypes() : [];
        results = (tasks.importAttributes) ? yield akeneo.importAttributes() : [];
        results = (tasks.importAttributeGroups) ? yield akeneo.importAttributeGroups() : [];
        results = (tasks.importAttributeOptions) ? yield akeneo.importAttributeOptions() : [];
        results = (tasks.importCategories) ? yield akeneo.importCategories() : [];
        results = (tasks.importChannels) ? yield akeneo.importChannels() : [];
        // TODO: results = (tasks.importCurrencies) ? await akeneo.importCurrencies() : [];
        results = (tasks.importFamilies) ? yield akeneo.importFamilies() : [];
        results = (tasks.importFamilyVariants) ? yield akeneo.importFamilyVariants() : [];
        // TODO: results = (tasks.importLocales) ? await akeneo.importLocales() : [];
        // TODO: results = (tasks.importMeasureFamilies) ? await akeneo.importMeasureFamilies() : [];
        results = (tasks.importProducts) ? yield akeneo.importProducts() : [];
        results = (tasks.importProductModels) ? yield akeneo.importProductModels() : [];
        results = (tasks.importReferenceEntities) ? yield akeneo.importReferenceEntities() : [];
        results = (tasks.importReferenceEntityAttributes) ? yield akeneo.importReferenceEntityAttributes() : [];
        results = (tasks.importReferenceEntityAttributeOptions) ? yield akeneo.importReferenceEntityAttributeOptions() : [];
        results = (tasks.importReferenceEntityRecords) ? yield akeneo.importReferenceEntityRecords() : [];
        // TODO: results = (tasks.importAssets) ? await akeneo.importAssets() : [];
        // TODO: results = (tasks.importAssetCategories) ? await akeneo.importAssetCategories() : [];
        // TODO: results = (tasks.importAssetReferenceFiles) ? await akeneo.importAssetReferenceFiles() : [];
        // TODO: results = (tasks.importAssetTags) ? await akeneo.importAssetTags() : [];
        // TODO: results = (tasks.importAssetVariationFiles) ? await akeneo.importAssetVariationFiles() : [];
        results = (tasks.exportAssociationTypes) ? yield akeneo.exportAssociationTypes() : [];
        results = (tasks.exportAttributes) ? yield akeneo.exportAttributes() : [];
        results = (tasks.exportAttributeGroups) ? yield akeneo.exportAttributeGroups() : [];
        results = (tasks.exportAttributeOptions) ? yield akeneo.exportAttributeOptions(cla.parameter) : [];
        results = (tasks.exportCategories) ? yield akeneo.exportCategories() : [];
        results = (tasks.exportChannels) ? yield akeneo.exportChannels() : [];
        results = (tasks.exportCurrencies) ? yield akeneo.exportCurrencies() : [];
        results = (tasks.exportFamilies) ? yield akeneo.exportFamilies() : [];
        results = (tasks.exportFamilyVariants) ? yield akeneo.exportFamilyVariants(cla.parameter) : [];
        results = (tasks.exportLocales) ? yield akeneo.exportLocales() : [];
        results = (tasks.exportMeasureFamilies) ? yield akeneo.exportMeasureFamilies() : [];
        results = (tasks.exportProducts) ? yield exportProducts(logger) : [];
        results = (tasks.exportProductModels) ? yield akeneo.exportProductModels() : [];
        // TODO: results = (tasks.exportPublishedProduct) ? await akeneo.exportPublishedProduct() : [];
        // TODO: results = (tasks.exportProductMediaFile) ? await akeneo.exportProductMediaFile() : [];
        results = (tasks.exportReferenceEntities) ? yield akeneo.exportReferenceEntities() : [];
        results = (tasks.exportReferenceEntityAttributes) ? yield akeneo.exportReferenceEntityAttributes(cla.parameter) : [];
        // this requires more than one parameter
        // results = (tasks.exportReferenceEntityAttributeOptions) ? await akeneo.exportReferenceEntityAttributeOptions(cla.parameter) : [];
        results = (tasks.exportReferenceEntityRecords) ? yield akeneo.exportReferenceEntityRecords(cla.parameter) : [];
        // TODO: results = (tasks.exportReferenceEntityMediaFile) ? await akeneo.exportReferenceEntityMediaFile() : [];
        results = (tasks.exportAssets) ? yield akeneo.exportAssets() : [];
        results = (tasks.exportAssetCategories) ? yield akeneo.exportAssetCategories() : [];
        // TODO: results = (tasks.exportAssetReferenceFiles) ? await akeneo.exportAssetReferenceFiles() : [];
        results = (tasks.exportAssetTags) ? yield akeneo.exportAssetTags() : [];
        // TODO: results = (tasks.exportAssetVariationFiles) ? await akeneo.exportAssetVariationFiles() : [];
        results = (tasks.exportAssetFamilies) ? yield akeneo.exportAssetFamilies() : [];
        const stopped = new Date();
        const duration = ((stopped.getTime() - started.getTime()) / 1000).toLocaleString('en-US');
        const heapUsed = process.memoryUsage().heapUsed.toLocaleString('en-US');
        logger.info({ moduleName, methodName, heapUsed, started, stopped, duration }, `in seconds`);
    });
}
exports.default = main;
// Start the program
if (require.main === module) {
    main();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQiwwQ0FBMEM7QUFDMUMseUJBQXlCO0FBQ3pCLHFDQUFxQztBQUdyQyxzREFBc0Q7QUFDdEQsa0RBQWtEO0FBQ2xELG9EQUFvRDtBQUNwRCxrREFBa0Q7QUFDbEQscUNBQXFDO0FBRXJDLE1BQU0sVUFBVSxHQUFXLE9BQU8sQ0FBQztBQUVuQyxNQUFNLGFBQWEsR0FBYTtJQUM5QixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2YsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQixnQkFBZ0I7SUFDaEIseUJBQXlCO0lBQ3pCLHdCQUF3QjtJQUN4Qix1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLGdCQUFnQjtJQUNoQix5QkFBeUI7SUFDekIsdUNBQXVDO0lBQ3ZDLGlDQUFpQztJQUNqQyw4QkFBOEI7Q0FDL0IsQ0FBQztBQUVGLFNBQVMsSUFBSSxDQUFDLE9BQVksSUFBSTtJQUM1QixNQUFNLFVBQVUsR0FBVyxNQUFNLENBQUM7SUFFbEMsNkRBQTZEO0lBQzdELGlDQUFpQztJQUNqQyxpREFBaUQ7SUFFakQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMs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