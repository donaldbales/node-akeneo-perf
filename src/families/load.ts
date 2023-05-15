import * as akeneo from 'node-akeneo-api';
import * as path from 'path';
import Logger from 'bunyan';

import { Family } from '../interfaces/Family';
import { FamilyVariant } from '../interfaces/FamilyVariant';

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';
const moduleName: string = 'families/load';

export async function families(logger: Logger, data: any[]): Promise<any> {
  const methodName: string = 'families';
  logger.info({ moduleName, methodName }, 'Starting...');

  //const famliez: any[] = data;
  //const results = await akeneo.patchVndAkeneoCollection(akeneo.apiUrlFamilies(), famliez);

  const fileDesc: number = await akeneo.open(path.join(exportPath, akeneo.filenameFamilies), 'w');
  for (const datum of data) {
    await akeneo.write(fileDesc, `${JSON.stringify(datum)}\n`);
  }
  await akeneo.close(fileDesc);

  const results = await akeneo.importFamilies();
  logger.info({ moduleName, methodName, results });

  return ['OK'];
}
