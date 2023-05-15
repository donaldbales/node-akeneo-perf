import * as fs from 'fs';
import * as path from 'path';
import Logger from 'bunyan';

import * as extract from './extract';
import * as load from './load';
import * as transform from './transform';
import { getLogger } from '../logger';
import { inspect } from '../inspect';

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';
const moduleName: string = 'attributes/index';

export async function main(loggerIn: any = null): Promise<any> {
  const methodName: string = 'main';
  let logger = (loggerIn) ? loggerIn : getLogger(moduleName);
  logger.info({ moduleName, methodName }, `Starting...`);

  let results: any;
  
  results = await extract.attributes(logger);
  results = transform.attributes(logger, results);
  const attributes: any[] = results.attributes ? results.attributes : [];
  const attributeOptions: any[] = results.attributeOptions ? results.attributeOptions : [];
  results = await load.attributes(logger, attributes);
  console.log(inspect(results));
  results = await load.attributeOptions(logger, attributeOptions);

  if (require.main === module) {
    setTimeout(() => { process.exit(0); }, 3000);
  }

  logger.info({ moduleName, methodName }, `Ending.`);
}

// Start the program
if (require.main === module) {
  main();
}
