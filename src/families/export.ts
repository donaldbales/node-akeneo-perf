import * as akeneo from 'node-akeneo-api';
import * as path from 'path';
import Logger from 'bunyan';

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';

const moduleName: string = 'families/export';

export const familiesMap: Map<string, any> = new Map();

export async function exportFamiliesAsMap(logger: Logger): Promise<any> {
  const methodName: string = 'exportFamiliesAsMap';

  await akeneo.exportFamilies();
  await akeneo.load(path.join(exportPath, akeneo.filenameFamilies), familiesMap, 'code');

  return { familiesMap };
}
