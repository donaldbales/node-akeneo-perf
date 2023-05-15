"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportWith112Promises = exports.exportWith100Promises = exports.exportWith96Promises = exports.exportWith80Promises = exports.exportWith64Promises = exports.exportWith50Promises = exports.exportWith48Promises = exports.exportWith32Promises = exports.exportWith16Promises = exports.exportWith10Promises = exports.exportWithEightPromises = exports.exportWithFivePromises = exports.exportWithFourPromises = exports.exportWithTwoPromises = exports.exportProducts = void 0;
const akeneo = require("node-akeneo-api");
const path = require("path");
const node_akeneo_api_1 = require("node-akeneo-api");
const executor = require("../executor");
const moduleName = 'products/export';
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
function exportProducts(logger, parameters = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportProducts';
        logger.info({ moduleName, methodName }, 'Starting...');
        const prefix = 'search={"sku":[{"operator":"STARTS WITH","value":"';
        let suffix = '';
        if (parameters &&
            parameters.indexOf(prefix) === 0) {
            suffix = parameters.slice(prefix.length, parameters.indexOf('"', prefix.length));
            logger.info({ moduleName, methodName, suffix });
        }
        let products;
        const fileName = path.join(exportPath, suffix ? `products_${suffix}.vac` : node_akeneo_api_1.filenameProducts);
        const fileDesc = yield node_akeneo_api_1.open(fileName, 'w');
        let count = 0;
        try {
            products = yield node_akeneo_api_1.get(parameters ?
                `${node_akeneo_api_1.apiUrlProducts()}?pagination_type=search_after&${parameters}` :
                `${node_akeneo_api_1.apiUrlProducts()}?pagination_type=search_after`, (results) => __awaiter(this, void 0, void 0, function* () {
                let vac = '';
                for (const result of results) {
                    vac += JSON.stringify(result) + '\n';
                    ++count;
                }
                const buffer = Buffer.from(vac);
                yield node_akeneo_api_1.write(fileDesc, buffer);
            }));
        }
        catch (err) {
            logger.info({ moduleName, methodName, err });
            return err;
        }
        logger.info({ moduleName, methodName, products: count });
        yield node_akeneo_api_1.close(fileDesc);
        return count;
    });
}
exports.exportProducts = exportProducts;
// starts at 10000000
function exportWithTwoPromises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWithTwoPromises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWithTwoPromises = exportWithTwoPromises;
function exportWithFourPromises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWithFourPromises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWithFourPromises = exportWithFourPromises;
function exportWithFivePromises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWithFivePromises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWithFivePromises = exportWithFivePromises;
function exportWithEightPromises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWithEightPromises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWithEightPromises = exportWithEightPromises;
function exportWith10Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith10Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith10Promises = exportWith10Promises;
function exportWith16Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith16Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = [
            '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
            '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
            '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
            '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
            '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
            '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
            '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
            '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
            '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
            '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'
        ];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith16Promises = exportWith16Promises;
function exportWith32Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith32Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = [
            '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
            '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
            '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
            '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
            '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
            '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
            '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
            '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
            '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
            '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'
        ];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith32Promises = exportWith32Promises;
function exportWith48Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith48Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = [
            '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
            '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
            '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
            '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
            '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
            '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
            '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
            '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
            '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
            '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'
        ];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith48Promises = exportWith48Promises;
function exportWith50Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith50Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = [
            '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
            '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
            '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
            '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
            '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
            '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
            '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
            '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
            '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
            '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'
        ];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith50Promises = exportWith50Promises;
function exportWith64Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith64Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = [
            '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
            '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
            '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
            '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
            '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
            '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
            '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
            '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
            '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
            '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'
        ];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith64Promises = exportWith64Promises;
function exportWith80Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith80Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = [
            '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
            '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
            '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
            '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
            '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
            '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
            '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
            '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
            '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
            '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'
        ];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith80Promises = exportWith80Promises;
function exportWith96Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith96Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = [
            '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
            '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
            '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
            '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
            '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
            '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
            '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
            '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
            '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
            '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'
        ];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith96Promises = exportWith96Promises;
function exportWith100Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith100Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = [
            '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
            '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
            '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
            '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
            '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
            '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
            '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
            '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
            '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
            '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'
        ];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith100Promises = exportWith100Promises;
function exportWith112Promises(logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'exportWith112Promises';
        logger.info({ moduleName, methodName }, 'Starting...');
        const startsWiths = [
            '1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
            '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019',
            '1020', '1021', '1022', '1023', '1024', '1025', '1026', '1027', '1028', '1029',
            '1030', '1031', '1032', '1033', '1034', '1035', '1036', '1037', '1038', '1039',
            '1040', '1041', '1042', '1043', '1044', '1045', '1046', '1047', '1048', '1049',
            '1050', '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058', '1059',
            '1060', '1061', '1062', '1063', '1064', '1065', '1066', '1067', '1068', '1069',
            '1070', '1071', '1072', '1073', '1074', '1075', '1076', '1077', '1078', '1079',
            '1080', '1081', '1082', '1083', '1084', '1085', '1086', '1087', '1088', '1089',
            '1090', '1091', '1092', '1093', '1094', '1095', '1096', '1097', '1098', '1099'
        ];
        let promises = [];
        for (const startsWith of startsWiths) {
            promises.push(exportProducts(logger, `search={"sku":[{"operator":"STARTS WITH","value":"${startsWith}"}]}`));
            logger.info({ moduleName, methodName, promises: promises.length, promiseLimit: akeneo.promiseLimit });
            if (promises.length % akeneo.promiseLimit === 0) {
                const getResults = yield Promise.all(promises);
                for (const getResult of getResults) {
                    logger.info({ moduleName, methodName, getResult });
                }
                promises = [];
            }
        }
        if (promises.length > 0) {
            const getResults = yield Promise.all(promises);
            for (const getResult of getResults) {
                logger.info({ moduleName, methodName, getResult });
            }
        }
        const command = `cat ${exportPath}${path.sep}products_*.vac > ${exportPath}${path.sep}products.vac`;
        const executorResult = yield executor.exec(logger, command);
        logger.info({ moduleName, methodName, executorResult });
        return true;
    });
}
exports.exportWith112Promises = exportWith112Promises;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDBDQUEwQztBQUcxQyw2QkFBNkI7QUFFN0IscURBQTZJO0FBRTdJLHdDQUF3QztBQUd4QyxNQUFNLFVBQVUsR0FBVyxpQkFBaUIsQ0FBQztBQUM3QyxNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUU3RSxTQUFzQixjQUFjLENBQUMsTUFBYyxFQUFFLGFBQXFCLEVBQUU7O1FBQzFFLE1BQU0sVUFBVSxHQUFXLGdCQUFnQixDQUFDO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFdkQsTUFBTSxNQUFNLEdBQVcsb0RBQW9ELENBQUM7UUFDNUUsSUFBSSxNQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLElBQUksVUFBVTtZQUNWLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7WUFDaEYsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksUUFBbUIsQ0FBQztRQUN4QixNQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksTUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLGtDQUFnQixDQUFDLENBQUM7UUFDckcsTUFBTSxRQUFRLEdBQVcsTUFBTSxzQkFBSSxDQUFD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TSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtTQUFDLENBQUM7UUFDbEYsSUFBSSxRQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3pCLEtBQUssTUFBTSxVQUFVLElBQUksV0FB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QUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1NBQUMsQ0FBQztRQUNsRixJQUFJLFFBQVEsR0FBVSxFQUFFLENBQUM7UUFDekIsS0FBSyxNQUFNLFVBQVUsSUFBSSxXQUFXLEVBQUU7WUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLHFEQUFxRCxVQUFV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LE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07U0FBQyxDQUFDO1FBQ2xGLElBQUksUUFBUSxHQUFVLEVBQUUsQ0FBQztRQUN6QixLQUFLLE1BQU0sVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUscURBQXFELFVBQVUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3RyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDdEcsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO2dCQUM3QyxNQUFNLFVBQVUsR0FBUSxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BELEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2lCQUNwRDtnQkFDRCxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ2Y7U0FDRjtRQUNELElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsTUFBTSxVQUFVLEdBQVEsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO2dCQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQ3BEO1NBQ0Y7UUFFRCxNQUFNLE9BQU8sR0FBVyxPQUFPLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQztRQUM1RyxNQUFNLGNBQWMsR0FBUSxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFFeEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQUE7QUF2Q0Qsb0RBdUNDO0FBRUQsU0FBc0Isb0JBQW9CLENBQUMsTUFBYzs7UUFDdkQsTUFBTSxVQUFVLEdBQVcsc0JBQXNCLENBQUM7UUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCxNQUFNLFdBQVcsR0FBVTtZQUN6QixNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVB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TSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtTQUFDLENBQUM7UUFDbEYsSUFBSSxRQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3pCLEtBQUssTUFBTSxVQUFVLElBQUksV0FBVyxFQUFFO1lBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxxREFBcUQsVUFBVSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzdHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUN0RyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLFlBQVksS0FBSyxDQUFDLEVBQUU7Z0JBQzdDLE1BQU0sVUFBVSxHQUFRLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEQsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUU7b0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7aUJBQ3BEO2dCQUNELFFBQVEsR0FBRyxFQUFFLENBQUM7YUFDZjtTQUNGO1FBQ0QsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixNQUFNLFVBQVUsR0FBUSxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDcEQ7U0FDRjtRQUVELE1BQU0sT0FBTyxHQUFXLE9BQU8sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLG9CQUFvQixVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDO1FBQzVHLE1BQU0sY0FBYyxHQUFRLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUV4RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FBQTtBQXZDRCxzREF1Q0M7QUFFRCxTQUFzQixxQkFBcUIsQ0FBQyxNQUFjOztRQUN4RCxNQUFNLFVBQVUsR0FBVyx1QkFBdUIsQ0FBQztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELE1BQU0sV0FBVyxHQUFVO1lBQ3pCLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDOUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtZQUM5RSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07U0FBQyxDQUFDO1FBQ2xGLElBQUksUUFBUSxHQUFVLEVBQUUsQ0FBQztRQUN6QixLQUFLLE1BQU0sVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUscURBQXFELFVBQVUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3RyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDdEcsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO2dCQUM3QyxNQUFNLFVBQVUsR0FBUSxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BELEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2lCQUNwRDtnQkFDRCxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ2Y7U0FDRjtRQUNELElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsTUFBTSxVQUFVLEdBQVEsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO2dCQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQ3BEO1NBQ0Y7UUFFRCxNQUFNLE9BQU8sR0FBVyxPQUFPLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQztRQUM1RyxNQUFNLGNBQWMsR0FBUSxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFFeEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQUE7QUF2Q0Qsc0RBdUNDIn0=