import * as akeneo from 'node-akeneo-api';
import * as fs from 'fs';
import * as path from 'path';
import Logger from 'bunyan';

import * as attributesExport from '../attributes/export';
import * as familiesExport from '../families/export';
import * as helper from '../helper';
import { inspect } from '../inspect';

const sql: any = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER as string || 'sqlms')}`);

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';
const moduleName: string = 'products/extract';

export async function products(logger: Logger) {
  const methodName: string = 'products';
  logger.info({ moduleName, methodName }, `Starting...`);

  await attributesExport.exportAttributeaAndOptionsAsMaps(logger);
  await familiesExport.exportFamiliesAsMap(logger);

  const fileDesc: number = await akeneo.open(path.join(exportPath, akeneo.filenameProducts), 'w');
  for (let identifier = 10000000; identifier < 11000000; identifier++) {
    const result: any = { identifier: identifier.toString() };

    result.family = `family_${await helper.randomInt(logger, 1, 11)}`;

    const values: any = {};

    const family: any = familiesExport.familiesMap.get(result.family);

    const attributeCodes: any[] = family.attributes;

    for (const attributeCode of attributeCodes) {
      const attribute: any = attributesExport.attributesMap.get(attributeCode);
      let data: any = null;
      let option: any = null;
      let options: any = null;
      if (attribute) {
        switch (attribute.type) {
          case akeneo.PIM_CATALOG_BOOLEAN:
            values[attributeCode] = [ { locale: null, scope: null, data: await helper.randomInt(logger, 0, 2) === 1 ? true : false } ];
            break;
          case akeneo.PIM_CATALOG_DATE:
            values[attributeCode] = [ { locale: null, scope: null, data: new Date().toISOString().slice(0, 10) } ];
            break;
          case akeneo.PIM_CATALOG_IDENTIFIER:
            break;
          case akeneo.PIM_CATALOG_NUMBER:
            data =
              attribute.decimals_allowed ?
              await helper.randomInt(logger, 1, 10000001) / 1000 :
              await helper.randomInt(logger, 1, 10000001);
            values[attributeCode] = [ { locale: null, scope: null, data } ];
            break;
          case akeneo.PIM_CATALOG_METRIC:
            data = {
              amount: 
                attribute.decimals_allowed ?
                await helper.randomInt(logger, 1, 10000001) / 1000 :
                await helper.randomInt(logger, 1, 10000001),
              unit: 'INCH'
            };
            values[attributeCode] = [ { locale: null, scope: null, data } ];
            break;
          case akeneo.PIM_CATALOG_MULTISELECT:
            options = Array.from(attributesExport.attributeOptionsMap.get(attributeCode) || new Set());
            data = [];
            for (let r = 1; r < await helper.randomInt(logger, 2, 11); r++) {
              option = options[await helper.randomInt(logger, 0, options.length)];
              if (data.indexOf(option) === -1) {
                data.push(option);
              }
            }
            values[attributeCode] = [ { locale: null, scope: null, data } ];
            break;
          case akeneo.PIM_CATALOG_PRICE_COLLECTION:
            data = [ {
              amount: 
                attribute.decimals_allowed ?
                await helper.randomInt(logger, 1, 1000001) / 100 :
                await helper.randomInt(logger, 1, 1000001),
              currency: 'USD'
            } ];
            values[attributeCode] = [ { locale: null, scope: null, data } ];
            break;
          case akeneo.PIM_CATALOG_SIMPLESELECT:
            options = Array.from(attributesExport.attributeOptionsMap.get(attributeCode) || new Set());
            data = options[await helper.randomInt(logger, 0, options.length)];
            values[attributeCode] = [ { locale: null, scope: null, data } ];
            break;
          case akeneo.PIM_CATALOG_TEXT:
            data = (await helper.randomBytes(logger, await helper.randomInt(logger, 0, 255))).replace(/  /g, ' ');
            values[attributeCode] = [ { locale: null, scope: null, data } ];
            break;
          case akeneo.PIM_CATALOG_TEXTAREA:
            data = (await helper.randomBytes(logger, await helper.randomInt(logger, 0, 2024))).replace(/  /g, ' ');
            values[attributeCode] = [ { locale: null, scope: null, data } ];
            break;
          default:
            throw new Error(`Unsupported Data Type: ${attribute.type}`)
        }
      }
    }
    result['values'] = values;
    await akeneo.write(fileDesc, `${JSON.stringify(result)}\n`);
  }
  await akeneo.close(fileDesc);

  return ['OK'];
}
