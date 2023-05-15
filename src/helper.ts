import * as crypto from 'crypto';
import Logger from 'bunyan';

import { inspect } from './inspect';

const moduleName: string = 'helper';

const bytes: any[] = [...' 0123456789 ABCDEFGHI JKLMNOPQR STUVWXYZ. '];

export async function randomBytes(logger: Logger, size: number = 13): Promise<string> {
  const methodName: string = 'randomBytes';
/*
  return new Promise((resolve: any, reject: any) => {
    crypto.randomBytes(size, (err: any, buf: Buffer) => {
      if (err) {
        logger.error({ moduleName, methodName, error: inspect(err) });
        return reject(err);
      } else {
        return resolve(buf.toString().slice(0, size));
      }
    });
  });
*/
  let results: string = '';
  for (let i = 0; i < size; i++) {
    results += bytes[await randomInt(logger, 0, bytes.length)];
  }

  //console.log(results);

  return results;
}

export function randomInt(logger: Logger, min: number = 1, max: number = 10): Promise<number> {
  const methodName: string = 'randomInt';
  return new Promise((resolve: any, reject: any) => {
    crypto.randomInt(min, max, (err: any, value: number) => {
      if (err) {
        logger.error({ moduleName, methodName, error: inspect(err) });
        return reject(err);
      } else {
        return resolve(value);
      }
    });
  });
}
