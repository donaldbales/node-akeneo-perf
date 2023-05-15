import * as fs from 'fs';
import * as path from 'path';
import Logger from 'bunyan';

import * as helper from '../helper';
import { getLogger } from '../logger';

const sql: any = require(`..${path.sep}${(process.env.AKENEO_RDBMS_DRIVER as string || 'sqlms')}`);

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';
const moduleName: string = 'families/extract';

export async function families(logger: Logger): Promise<any> {
  const methodName: string = 'families';
  logger.info({ moduleName, methodName }, `Starting...`);

  const familyMap: any = {};

  for (let f = 1; f < 11; f++) {
    familyMap[`Family ${f}`] = [];
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Yes/No ${a}`] = {};
    }
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Date ${a}`] = {};
    }
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Decimal ${a}`] = {};
    }
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Metric ${a}`] = {};
    }
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Multi Select ${a}`] = {};
    }
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Integer ${a}`] = {};
    }
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Price ${a}`] = {};
    }
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Simple Select ${a}`] = {};
    }
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Text ${a}`] = {};
    }
    for (let a = 1; a < await helper.randomInt(logger, 4, 11); a++) {
      familyMap[`Family ${f}`][`Text Area ${a}`] = {};
    }
  }

  return familyMap;
}