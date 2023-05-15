import * as akeneo from 'node-akeneo-api';
import * as bunyan from 'bunyan';
import * as fs from 'fs';
import * as path from 'path';
import Logger from 'bunyan';
import { apiUrlProducts, close, download, filenameProducts, filenameProductMediaFiles, get, load, open, stat, write } from 'node-akeneo-api';

import * as executor from '../executor';
import { Product } from '../interfaces/Product';

const moduleName: string = 'products/export';
const exportPath: string = (process.env.AKENEO_EXPORT_PATH as string) || '.';

export async function exportProducts(logger: Logger, parameters: string = ''): Promise<any> {
  const methodName: string = 'exportProducts';
  logger.info({ moduleName, methodName }, 'Starting...');

  const prefix: string = 'search={"sku":[{"operator":"STARTS WITH","value":"';
  let suffix: string = '';
  if (parameters &&
      parameters.indexOf(prefix) === 0) {
    suffix = parameters.slice(prefix.length, parameters.indexOf('"', prefix.length))
    logger.info({ moduleName, methodName, suffix });
  }

  let products: Product[];
  const fileName: string = path.join(exportPath, suffix ? `products_${suffix}.vac` : filenameProducts);
  const fileDesc: number = await open(fileName, 'w');
  let count: number = 0;

  try {
    products = await get(parameters ?
      `${apiUrlProducts()}?pagination_type=search_after&${parameters}` :
      `${apiUrlProducts()}?pagination_type=search_after`, async (results: any) => {
      let vac: string = '';
      for (const result of results) {
        vac += JSON.stringify(result) + '\n';
        ++count;
      }
      const buffer: Buffer = Buffer.from(vac);
      
      await write(fileDesc, buffer); 
    });
  } catch (err) {
    logger.info({ moduleName, methodName, err });
    return err;
  }
  logger.info({ moduleName, methodName, products: count });
  await close(fileDesc);

  return count;
}

// starts at 10000000
export async function exportWithTwoPromises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWithTwoPromises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWithFourPromises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWithFourPromises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWithFivePromises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWithFivePromises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWithEightPromises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWithEightPromises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith10Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith10Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith16Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith16Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = [
    '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
    '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
    '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
    '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
    '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
    '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
    '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
    '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
    '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
    '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith32Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith32Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = [
    '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
    '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
    '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
    '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
    '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
    '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
    '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
    '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
    '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
    '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith48Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith48Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = [
    '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
    '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
    '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
    '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
    '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
    '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
    '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
    '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
    '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
    '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith50Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith50Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = [
    '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
    '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
    '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
    '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
    '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
    '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
    '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
    '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
    '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
    '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith64Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith64Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = [
    '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
    '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
    '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
    '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
    '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
    '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
    '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
    '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
    '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
    '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith80Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith80Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = [
    '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
    '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
    '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
    '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
    '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
    '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
    '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
    '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
    '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
    '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith96Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith96Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = [
    '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
    '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
    '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
    '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
    '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
    '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
    '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
    '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
    '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
    '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith100Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith100Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = [
    '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
    '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
    '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
    '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
    '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
    '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
    '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
    '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
    '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
    '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}

export async function exportWith112Promises(logger: Logger): Promise<any> {
  const methodName: string = 'exportWith112Promises';
  logger.info({ moduleName, methodName }, 'Starting...');

  const startsWiths: any[] = [
    '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
    '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
    '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
    '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
    '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
    '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
    '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
    '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
    '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
    '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'];
  let promises: any[] = [];
  for (const startsWith of startsWiths) {
    promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
    logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
    if (promises.length%akeneo.promiseLimit === 0) {
      const getResults: any = await Promise.all(promises);
      for (const getResult of getResults) {
        logger.info({ moduleName, methodName, getResult });
      }
      promises = [];
    }
  }
  if (promises.length > 0) {
    const getResults: any = await Promise.all(promises);
    for (const getResult of getResults) {
      logger.info({ moduleName, methodName, getResult });
    }
  }

  const command: string = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`; 
  const executorResult: any = await executor.exec(logger, command);
  logger.info({ moduleName, methodName, executorResult });

  return true;
}
































