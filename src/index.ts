/* tslint:disable:no-console */
import * as akeneo from 'node-akeneo-api';
import * as fs from 'fs';
import * as minimist from 'minimist';
import Logger from 'bunyan';

import * as attributesIndex from './attributes/index';
import * as familiesIndex from './families/index';
import * as productsExport from './products/export';
import * as productsIndex from './products/index';
import { getLogger } from './logger';

const moduleName: string = 'index';

const possibleTasks: string[] = [
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

function argz(args: any = null): any {
  const methodName: string = 'argz';

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
  const pkg: any  = JSON.parse(fs.readFileSync('package.json').toString());
  const name: string = pkg.name ? pkg.name : '';
  const version: string = pkg.version ? pkg.version : '';
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
  const parameter: string = localArgs.parameter ? localArgs.parameter.toString() : '';
  const result: any = { tasks: {}, parameter };
  const tasks: any[] = localArgs.tasks.split(',');
  // console.error(tasks);
  for (const task of tasks) {
    let found: boolean = false;
    for (const possibleTask of possibleTasks) {
      if (possibleTask === task) {
        found = true;
        break;
      }
    }
    if (found) {
      result.tasks[task] = true;
    } else {
      console.error(`Task: ${task}, is not in the list of supported tasks: ${possibleTasks.join(', ')}.`);
      setTimeout(() => { process.exit(1); }, 10000);
    }
  }
  return result;
}

async function exportProducts(logger: Logger): Promise<any> {
  let results: any = null;
  switch (process.env.AKENEO_PROMISE_LIMIT as string) {
    case '1':
      results = await akeneo.exportProducts();
      break;
    case '2':
      results = await productsExport.exportWithTwoPromises(logger);
      break;
    case '4':
      results = await productsExport.exportWithFourPromises(logger);
      break;
    case '5':
      results = await productsExport.exportWithFivePromises(logger);
      break;
    case '8':
      results = await productsExport.exportWithEightPromises(logger);
      break;
    case '10':
      results = await productsExport.exportWith10Promises(logger);
      break;
    case '16':
      results = await productsExport.exportWith16Promises(logger);
      break;
    case '32':
      results = await productsExport.exportWith32Promises(logger);
      break;
    case '48':
      results = await productsExport.exportWith48Promises(logger);
      break;
    case '50':
      results = await productsExport.exportWith50Promises(logger);
      break;
    case '64':
      results = await productsExport.exportWith64Promises(logger);
      break;
    case '80':
      results = await productsExport.exportWith80Promises(logger);
      break;
    case '96':
      results = await productsExport.exportWith96Promises(logger);
      break;
    case '100':
      results = await productsExport.exportWith100Promises(logger);
      break;
    case '112':
      results = await productsExport.exportWith112Promises(logger);
      break;
    default:
      throw new Error('Unsupposed AKENEO_PROMISE_LIMIT');
  }

  return results;
} 

export default async function main(...args: any[]): Promise<any> {
  const methodName: string = 'main';
  const logger: any = getLogger(moduleName);
  const loggerLevel: string = (process.env.LOG_LEVEL as string) || 'info';
  logger.level(loggerLevel);
  const started: Date = new Date(); 
  logger.info({ moduleName, methodName, started },` Starting...`);

  const cla: any = argz(args);
  const tasks: any = cla.tasks;

  let results: any = [];
  results = (tasks.createAttributes) ? await attributesIndex.main(logger) : [];
  results = (tasks.createFamilies) ? await familiesIndex.main(logger) : [];
  results = (tasks.createProducts) ? await productsIndex.main(logger) : [];

  results = (tasks.importAssociationTypes) ? await akeneo.importAssociationTypes() : [];
  results = (tasks.importAttributes) ? await akeneo.importAttributes() : [];
  results = (tasks.importAttributeGroups) ? await akeneo.importAttributeGroups() : [];
  results = (tasks.importAttributeOptions) ? await akeneo.importAttributeOptions() : [];
  results = (tasks.importCategories) ? await akeneo.importCategories() : [];
  results = (tasks.importChannels) ? await akeneo.importChannels() : [];
  // TODO: results = (tasks.importCurrencies) ? await akeneo.importCurrencies() : [];
  results = (tasks.importFamilies) ? await akeneo.importFamilies() : [];
  results = (tasks.importFamilyVariants) ? await akeneo.importFamilyVariants() : [];
  // TODO: results = (tasks.importLocales) ? await akeneo.importLocales() : [];
  // TODO: results = (tasks.importMeasureFamilies) ? await akeneo.importMeasureFamilies() : [];
  results = (tasks.importProducts) ? await akeneo.importProducts() : [];
  results = (tasks.importProductModels) ? await akeneo.importProductModels() : [];
  results = (tasks.importReferenceEntities) ? await akeneo.importReferenceEntities() : [];
  results = (tasks.importReferenceEntityAttributes) ? await akeneo.importReferenceEntityAttributes() : [];
  results = (tasks.importReferenceEntityAttributeOptions) ? await akeneo.importReferenceEntityAttributeOptions() : [];
  results = (tasks.importReferenceEntityRecords) ? await akeneo.importReferenceEntityRecords() : [];
  // TODO: results = (tasks.importAssets) ? await akeneo.importAssets() : [];
  // TODO: results = (tasks.importAssetCategories) ? await akeneo.importAssetCategories() : [];
  // TODO: results = (tasks.importAssetReferenceFiles) ? await akeneo.importAssetReferenceFiles() : [];
  // TODO: results = (tasks.importAssetTags) ? await akeneo.importAssetTags() : [];
  // TODO: results = (tasks.importAssetVariationFiles) ? await akeneo.importAssetVariationFiles() : [];
  results = (tasks.exportAssociationTypes) ? await akeneo.exportAssociationTypes() : [];
  results = (tasks.exportAttributes) ? await akeneo.exportAttributes() : [];
  results = (tasks.exportAttributeGroups) ? await akeneo.exportAttributeGroups() : [];
  results = (tasks.exportAttributeOptions) ? await akeneo.exportAttributeOptions(cla.parameter) : [];
  results = (tasks.exportCategories) ? await akeneo.exportCategories() : [];
  results = (tasks.exportChannels) ? await akeneo.exportChannels() : [];
  results = (tasks.exportCurrencies) ? await akeneo.exportCurrencies() : [];
  results = (tasks.exportFamilies) ? await akeneo.exportFamilies() : [];
  results = (tasks.exportFamilyVariants) ? await akeneo.exportFamilyVariants(cla.parameter) : [];
  results = (tasks.exportLocales) ? await akeneo.exportLocales() : [];
  results = (tasks.exportMeasureFamilies) ? await akeneo.exportMeasureFamilies() : [];
  results = (tasks.exportProducts) ? await exportProducts(logger) : [];
  results = (tasks.exportProductModels) ? await akeneo.exportProductModels() : [];
  // TODO: results = (tasks.exportPublishedProduct) ? await akeneo.exportPublishedProduct() : [];
  // TODO: results = (tasks.exportProductMediaFile) ? await akeneo.exportProductMediaFile() : [];
  results = (tasks.exportReferenceEntities) ? await akeneo.exportReferenceEntities() : [];
  results = (tasks.exportReferenceEntityAttributes) ? await akeneo.exportReferenceEntityAttributes(cla.parameter) : [];
  // this requires more than one parameter
  // results = (tasks.exportReferenceEntityAttributeOptions) ? await akeneo.exportReferenceEntityAttributeOptions(cla.parameter) : [];
  results = (tasks.exportReferenceEntityRecords) ? await akeneo.exportReferenceEntityRecords(cla.parameter) : [];
  // TODO: results = (tasks.exportReferenceEntityMediaFile) ? await akeneo.exportReferenceEntityMediaFile() : [];
  results = (tasks.exportAssets) ? await akeneo.exportAssets() : [];
  results = (tasks.exportAssetCategories) ? await akeneo.exportAssetCategories() : [];
  // TODO: results = (tasks.exportAssetReferenceFiles) ? await akeneo.exportAssetReferenceFiles() : [];
  results = (tasks.exportAssetTags) ? await akeneo.exportAssetTags() : [];
  // TODO: results = (tasks.exportAssetVariationFiles) ? await akeneo.exportAssetVariationFiles() : [];
  results = (tasks.exportAssetFamilies) ? await akeneo.exportAssetFamilies() : [];

  const stopped: Date = new Date();
  const duration: string = ((stopped.getTime() - started.getTime()) / 1000).toLocaleString('en-US');
  const heapUsed: string = process.memoryUsage().heapUsed.toLocaleString('en-US');
  logger.info({ moduleName, methodName, heapUsed, started, stopped, duration },`in seconds`);
}

// Start the program
if (require.main === module) {
  main();
}
