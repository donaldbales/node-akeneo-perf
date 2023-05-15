import Logger from 'bunyan';
import * as fs from 'fs';
import * as path from 'path';

import * as extract from './extract';
import { getLogger } from '../logger';
import * as load from './load';
import * as transform from './transform';

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';
const moduleName: string = 'products/index';

export async function main(loggerIn: any = null, startPKey: any = null, endPKey: any = null): Promise<any> {
  const methodName: string = 'main';
  let logger = (loggerIn) ? loggerIn : getLogger(moduleName);
  logger.info({ moduleName, methodName }, `Starting...`);

  let results: any;
  
  // results = await extract.productImages(logger, conn);
  // results = await load.productImages(logger, conn);

  results = await extract.products(logger);
  results = await load.products(logger);

  if (require.main === module) {
    setTimeout(() => { process.exit(0); }, 3000);
  }

  logger.info({ moduleName, methodName }, `Ending.`);
}

// Start the program
if (require.main === module) {
  main();
}
