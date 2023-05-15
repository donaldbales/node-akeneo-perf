import * as akeneo from 'node-akeneo-api';
import * as fs from 'fs';
import * as path from 'path';
import Logger from 'bunyan';

import { Product } from '../interfaces/Product';

export let defaultCurrency: string = 'USD';
export let defaultGroup: string = 'other';

const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';
const moduleName: string = 'products/transform';

// No transform needed.
