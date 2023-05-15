import * as akeneo from 'node-akeneo-api';
import * as fs from 'fs';
import * as path from 'path';
import Logger from 'bunyan';

import { inspect } from '../inspect';

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';
const moduleName: string = 'attributes/extract';

export async function attributes(logger: Logger): Promise<any> {
  const methodName: string = 'attributes';
  logger.info({ moduleName, methodName }, `Starting...`);
/*
  exports.PIM_CATALOG_FILE = 'pim_catalog_file';
  exports.PIM_CATALOG_IDENTIFIER = 'pim_catalog_identifier';
  exports.PIM_CATALOG_IMAGE = 'pim_catalog_image';
*/
  const attributeMap: any = {};

  for (let a = 1; a < 11; a++) {
    attributeMap[`Yes/No ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_BOOLEAN };
    attributeMap[`Date ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_DATE };
    attributeMap[`Decimal ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_NUMBER, sql_data_type: 'decimal' };
    attributeMap[`Metric ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_METRIC };
    attributeMap[`Multi Select ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_MULTISELECT };
    attributeMap[`Integer ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_NUMBER, sql_data_type: 'int' };
    attributeMap[`Price ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_PRICE_COLLECTION };
    attributeMap[`Simple Select ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_SIMPLESELECT };
    attributeMap[`Text ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_TEXT };
    attributeMap[`Text Area ${a}`] = { akeneo_type: akeneo.PIM_CATALOG_TEXTAREA };

    attributeMap[`Multi Select ${a}`]['options'] = [];
    attributeMap[`Simple Select ${a}`]['options'] = [];
    for (let o = 1; o < 101; o++) {
      attributeMap[`Multi Select ${a}`]['options'].push(`Multi Select ${a} Option ${o}`);
      attributeMap[`Simple Select ${a}`]['options'].push(`Simple Select ${a} Option ${o}`);
    }
  }

  return attributeMap;
}
