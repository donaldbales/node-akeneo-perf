import * as akeneo from 'node-akeneo-api';
import * as path from 'path';
import Logger from 'bunyan';

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';

const moduleName: string = 'attributes/export';

export const attributesMap: Map<string, any> = new Map();
export const attributeOptionsMap: Map<string, Set<string>> = new Map();

export async function exportAttributeaAndOptionsAsMaps(logger: Logger): Promise<any> {
  const methodName: string = 'exportAttributeaAndOptionsAsMaps';

  await akeneo.exportAttributes();
  await akeneo.load(path.join(exportPath, akeneo.filenameAttributes), attributesMap, 'code');
  const fileDesc: number = await akeneo.open(path.join(exportPath, akeneo.filenameAttributeOptions));
  const lines: any[] = (await akeneo.read(fileDesc)).toString().split('\n');
  await akeneo.close(fileDesc);
  for (const line of lines) {
    if (line) {
      const attributeOption: any = JSON.parse(line);
      const attribute: string = attributeOption.attribute || '';
      const code: string = attributeOption.code || '';
      if (!(attributeOptionsMap.has(attribute))) {
        const optionsSet: Set<string> = new Set();
        optionsSet.add(code);
        attributeOptionsMap.set(attribute, optionsSet);
      } else {
        const optionsSet: Set<string> = attributeOptionsMap.get(attribute) || new Set();
        optionsSet.add(code);
        attributeOptionsMap.set(attribute, optionsSet);
      }
    }
  }

  return { attributesMap, attributeOptionsMap };
}
