import * as fs from 'fs';
import * as path from 'path';
import Logger from 'bunyan';

import * as extract from './extract';
import * as load from './load';
import * as transform from './transform';
import { getLogger } from '../logger';
import { inspect } from '../inspect';

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';
const moduleName: string = 'families/index';

export async function main(loggerIn: any = null): Promise<any> {
  const methodName: string = 'main';
  let logger = (loggerIn) ? loggerIn : getLogger(moduleName);
  logger.info({ moduleName, methodName }, `Starting...`);

  let results: any;
  
  results = await extract.families(logger);
  results = transform.families(logger, results, 'Text 1');
  const families: any[] = results.families;
  //console.log(families);
  results = await load.families(logger, families);
  //console.log(inspect(results));

  if (require.main === module) {
    setTimeout(() => { process.exit(0); }, 3000);
  }

  logger.info({ moduleName, methodName }, `Ending.`);
}

// Start the program
if (require.main === module) {
  main();
}
