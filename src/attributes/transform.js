"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributes = exports.createYesNo = exports.createTextarea = exports.createText = exports.createSimpleselect = exports.createReferenceEntityCollection = exports.createReferenceEntity = exports.createPriceCollection = exports.createNumberInt = exports.createNumberDecimal = exports.createMultiselect = exports.createMetric = exports.createDate = exports.createBoolean = exports.createAssetCollection = exports.defaultGroup = void 0;
const akeneo = require("node-akeneo-api");
const fs = require("fs");
const path = require("path");
exports.defaultGroup = 'other';
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = 'attributes/transform';
function createAssetCollection(logger, attributeMap, property) {
    const methodName = 'createAssetCollection';
    logger.debug({ moduleName, methodName }, `Starting...`);
    if (!(attributeMap[property]['reference_data_name'])) {
        logger.error({ moduleName, methodName, data: attributeMap[property] }, `missing reference_data_name`);
        process.exit(99);
    }
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const results = {
        attribute: {}
    };
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_ASSET_COLLECTION,
        group,
        unique,
        useable_as_grid_filter,
        reference_data_name: attributeMap[property]['reference_data_name'],
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
        // is_read_only: false
    };
    results.attribute = attribute;
    return results;
}
exports.createAssetCollection = createAssetCollection;
// A.K.A. Yes/No
function createBoolean(logger, attributeMap, property) {
    const methodName = 'createBoolean';
    logger.debug({ moduleName, methodName }, `Starting...`);
    return createYesNo(logger, attributeMap, property);
}
exports.createBoolean = createBoolean;
function createDate(logger, attributeMap, property) {
    const methodName = 'createDate';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {}
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_DATE,
        group,
        unique,
        useable_as_grid_filter,
        available_locales,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
    };
    if (attributeMap[property]['date_min']) {
        attribute.date_min = attributeMap[property]['date_min'];
    }
    if (attributeMap[property]['date_max']) {
        attribute.date_max = attributeMap[property]['date_max'];
    }
    results.attribute = attribute;
    return results;
}
exports.createDate = createDate;
// TODO: createFile()
/*
{"code":"file_attribute_code",
 "type":"pim_catalog_file",
 "group":"other",
 "unique":false,
 "useable_as_grid_filter":false,
 "allowed_extensions":["csv",
 "txt"],
 "available_locales":["en_US"],
 "max_file_size":"9999.99",
 "sort_order":0,
 "localizable":true,
 "scopable":true,
 "labels":{"en_US":"File"}
}
*/
// TODO: createImage()
/*
{"code":"image_attribute_code",
 "type":"pim_catalog_image",
 "group":"other",
 "unique":false,
 "useable_as_grid_filter":false,
 "allowed_extensions":["jpeg",
 "png"],
 "available_locales":["en_US"],
 "max_file_size":"9999.99",
 "sort_order":0,
 "localizable":true,
 "scopable":true,
 "labels":{"en_US":"Image"}
}
*/
// TODO: createMeasurement()
/*
{"code":"measurement_attribute_code",
 "type":"pim_catalog_metric",
 "group":"other",
 "unique":false,
 "useable_as_grid_filter":false,
 "allowed_extensions":[],
 "metric_family":"Length",
 "default_metric_unit":"INCH",
 "available_locales":["en_US"],
 "number_min":"-9999999999.0000",
 "number_max":"9999999999.0000",
 "decimals_allowed":true,
 "negative_allowed":true,
 "sort_order":0,
 "localizable":true,
 "scopable":true,
 "labels":{"en_US":"Measurement"}
}
*/
function createMetric(logger, attributeMap, property) {
    const methodName = 'createMetric';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : ['en_US'];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const metric_family = attributeMap[property]['metric_family'] ? attributeMap[property]['metric_family'] : 'Length';
    const default_metric_unit = attributeMap[property]['default_metric_unit'] ? attributeMap[property]['default_metric_unit'] : 'INCH';
    const results = {
        attribute: {}
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_METRIC,
        group,
        unique,
        useable_as_grid_filter,
        metric_family,
        default_metric_unit,
        available_locales,
        decimals_allowed: true,
        negative_allowed: false,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
    };
    if (attributeMap[property]['number_min'] !== null) {
        attribute.number_min = attributeMap[property]['number_min'];
    }
    if (attributeMap[property]['number_max'] !== null) {
        attribute.number_max = attributeMap[property]['number_max'];
    }
    results.attribute = attribute;
    return results;
}
exports.createMetric = createMetric;
function createMultiselect(logger, attributeMap, property) {
    const methodName = 'createMultiselect';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {},
        attributeOptions: []
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_MULTISELECT,
        group,
        unique,
        useable_as_grid_filter,
        minimum_input_length: 3,
        sort_order,
        localizable,
        scopable,
        available_locales,
        labels: { en_US: label },
        auto_option_sorting: true
    };
    results.attribute = attribute;
    for (const option of attributeMap[property].options) {
        const attributeOption = {
            code: akeneo.attributeCode(option),
            attribute: akeneo.attributeCode(property),
            sort_order: 0,
            labels: { en_US: option }
        };
        results.attributeOptions.push(attributeOption);
    }
    return results;
}
exports.createMultiselect = createMultiselect;
function createNumberDecimal(logger, attributeMap, property) {
    const methodName = 'createNumberDecimal';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {}
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_NUMBER,
        group,
        unique,
        useable_as_grid_filter,
        available_locales,
        decimals_allowed: true,
        negative_allowed: true,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
    };
    if (attributeMap[property]['number_min'] !== null) {
        attribute.number_min = attributeMap[property]['number_min'];
    }
    if (attributeMap[property]['number_max'] !== null) {
        attribute.number_max = attributeMap[property]['number_max'];
    }
    results.attribute = attribute;
    return results;
}
exports.createNumberDecimal = createNumberDecimal;
function createNumberInt(logger, attributeMap, property) {
    const methodName = 'createNumberInt';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {}
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_NUMBER,
        group,
        unique,
        useable_as_grid_filter,
        available_locales,
        decimals_allowed: false,
        negative_allowed: true,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
    };
    if (attributeMap[property]['number_min'] !== null) {
        attribute.number_min = attributeMap[property]['number_min'];
    }
    if (attributeMap[property]['number_max'] !== null) {
        attribute.number_max = attributeMap[property]['number_max'];
    }
    results.attribute = attribute;
    return results;
}
exports.createNumberInt = createNumberInt;
function createPriceCollection(logger, attributeMap, property) {
    const methodName = 'createPriceCollection';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {}
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_PRICE_COLLECTION,
        group,
        unique,
        useable_as_grid_filter,
        available_locales,
        decimals_allowed: true,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
    };
    if (attributeMap[property]['number_min'] !== null) {
        attribute.number_min = attributeMap[property]['number_min'];
    }
    if (attributeMap[property]['number_max'] !== null) {
        attribute.number_max = attributeMap[property]['number_max'];
    }
    results.attribute = attribute;
    return results;
}
exports.createPriceCollection = createPriceCollection;
function createReferenceEntity(logger, attributeMap, property) {
    const methodName = 'createReferenceEntity';
    logger.debug({ moduleName, methodName }, `Starting...`);
    if (!(attributeMap[property]['reference_data_name'])) {
        logger.error({ moduleName, methodName, data: attributeMap[property] }, `missing reference_data_name`);
        process.exit(99);
    }
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {},
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.AKENEO_REFERENCE_ENTITY,
        group,
        unique,
        useable_as_grid_filter,
        reference_data_name: attributeMap[property]['reference_data_name'],
        available_locales,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
    };
    results.attribute = attribute;
    return results;
}
exports.createReferenceEntity = createReferenceEntity;
function createReferenceEntityCollection(logger, attributeMap, property) {
    const methodName = 'createReferenceEntityCollection';
    logger.debug({ moduleName, methodName }, `Starting...`);
    if (!(attributeMap[property]['reference_data_name'])) {
        logger.error({ moduleName, methodName, data: attributeMap[property] }, `missing reference_data_name`);
        process.exit(99);
    }
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {}
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.AKENEO_REFERENCE_ENTITY_COLLECTION,
        group,
        unique,
        useable_as_grid_filter,
        reference_data_name: attributeMap[property]['reference_data_name'],
        available_locales,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
    };
    results.attribute = attribute;
    return results;
}
exports.createReferenceEntityCollection = createReferenceEntityCollection;
function createSimpleselect(logger, attributeMap, property) {
    const methodName = 'createSimpleSelect';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {},
        attributeOptions: []
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_SIMPLESELECT,
        group,
        unique,
        useable_as_grid_filter,
        available_locales,
        minimum_input_length: 3,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label },
        auto_option_sorting: true
    };
    results.attribute = attribute;
    for (const option of attributeMap[property].options) {
        const attributeOption = {
            code: akeneo.attributeCode(option),
            // tslint:disable-next-line: object-literal-sort-keys
            attribute: akeneo.attributeCode(property),
            sort_order: 0,
            labels: {
                en_US: option
            }
        };
        results.attributeOptions.push(attributeOption);
    }
    return results;
}
exports.createSimpleselect = createSimpleselect;
function createText(logger, attributeMap, property) {
    const methodName = 'createText';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {}
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_TEXT,
        group,
        unique,
        useable_as_grid_filter: true,
        available_locales,
        max_characters: 255,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
    };
    if (attributeMap[property]['validation_regexp'] !== null) {
        attribute.validation_regexp = attributeMap[property]['validation_regexp'];
    }
    if (attributeMap[property]['validation_rule'] !== null) {
        attribute.validation_rule = attributeMap[property]['validation_rule'];
    }
    results.attribute = attribute;
    return results;
}
exports.createText = createText;
function createTextarea(logger, attributeMap, property) {
    const methodName = 'createTextArea';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {}
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_TEXTAREA,
        labels: { en_US: label },
        group,
        unique,
        useable_as_grid_filter,
        available_locales,
        max_characters: 65535,
        sort_order,
        localizable,
        scopable,
        wysiwyg_enabled: attributeMap[property]['wysiwyg_enabled'] ? true : false
    };
    results.attribute = attribute;
    return results;
}
exports.createTextarea = createTextarea;
function createYesNo(logger, attributeMap, property) {
    const methodName = 'createYesNo';
    logger.debug({ moduleName, methodName }, `Starting...`);
    const available_locales = attributeMap[property]['available_locales'] ? attributeMap[property]['available_locales'] : [];
    const code = akeneo.deQuote(property) === property ? akeneo.attributeCode(property) : akeneo.attributeCode(akeneo.deQuote(property));
    const group = attributeMap[property]['group'] ? attributeMap[property]['group'] : exports.defaultGroup;
    const label = akeneo.deQuote(property) === property ? akeneo.attributeLabel(property) : akeneo.deQuote(property);
    const localizable = attributeMap[property]['localizable'] ? true : false;
    const results = {
        attribute: {}
    };
    const scopable = attributeMap[property]['scopable'] ? true : false;
    const sort_order = attributeMap[property]['sort_order'] ? attributeMap[property]['sort_order'] : 0;
    const unique = attributeMap[property]['unique'] ? true : false;
    const useable_as_grid_filter = attributeMap[property]['useable_as_grid_filter'] ? true : false;
    const attribute = {
        code,
        type: akeneo.PIM_CATALOG_BOOLEAN,
        group,
        unique,
        useable_as_grid_filter,
        available_locales,
        sort_order,
        localizable,
        scopable,
        labels: { en_US: label }
    };
    if (attributeMap[property]['default_value'] !== null) {
        attribute.default_value = attributeMap[property]['default_value'];
    }
    results.attribute = attribute;
    return results;
}
exports.createYesNo = createYesNo;
function attributes(logger, attributeMap) {
    const methodName = 'attributes';
    logger.info({ moduleName, methodName }, `Starting...`);
    const results = {
        attributes: [],
        attributeOptions: []
    };
    for (const property in attributeMap) {
        let sqlDataType = 'varchar';
        if (attributeMap[property].sql_data_type &&
            attributeMap[property].sql_data_type.toLowerCase) {
            sqlDataType = attributeMap[property].sql_data_type.toLowerCase();
        }
        if (attributeMap.hasOwnProperty(property)) {
            if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_ASSET_COLLECTION) {
                const result = createAssetCollection(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_BOOLEAN) {
                const result = createBoolean(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_DATE) {
                const result = createDate(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_METRIC) {
                const result = createMetric(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_MULTISELECT) {
                const result = createMultiselect(logger, attributeMap, property);
                results.attributes.push(result.attribute);
                for (const attributeOption of result.attributeOptions) {
                    results.attributeOptions.push(attributeOption);
                }
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_NUMBER &&
                sqlDataType === 'decimal') {
                const result = createNumberDecimal(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_NUMBER &&
                (sqlDataType === 'int' ||
                    sqlDataType === 'smallint' ||
                    sqlDataType === 'bigint')) {
                const result = createNumberInt(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_PRICE_COLLECTION) {
                const result = createPriceCollection(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.AKENEO_REFERENCE_ENTITY) {
                const result = createReferenceEntity(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.AKENEO_REFERENCE_ENTITY_COLLECTION) {
                const result = createReferenceEntityCollection(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_SIMPLESELECT) {
                const result = createSimpleselect(logger, attributeMap, property);
                results.attributes.push(result.attribute);
                for (const attributeOption of result.attributeOptions) {
                    results.attributeOptions.push(attributeOption);
                }
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_TEXT) {
                const result = createText(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_TEXTAREA) {
                const result = createTextarea(logger, attributeMap, property);
                results.attributes.push(result.attribute);
            }
            else {
                console.error(`Add a akeneo mapping for ${attributeMap[property].akeneo_type}` + ` for ${property}`);
                logger.error({ moduleName, methodName }, `Add a akeneo mapping for ${attributeMap[property].akeneo_type}` + ` for ${property}`);
                process.exit(99);
            }
        }
    }
    // Save the map so it can be used later from products/transform.ts
    fs.writeFileSync(`${exportPath}${path.sep}transformedAttributes.json`, JSON.stringify(results, null, '  '));
    return results;
}
exports.attributes = attributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUEwQztBQUMxQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBZWxCLFFBQUEsWUFBWSxHQUFXLE9BQU8sQ0FBQztBQUUxQyxNQUFNLFVBQVUsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUE2QixJQUFJLEdBQUcsQ0FBQztBQUM3RSxNQUFNLFVBQVUsR0FBVyxzQkFBc0IsQ0FBQztBQUVsRCxTQUFnQixxQkFBcUIsQ0FBQyxNQUFjLEVBQUUsWUFBaUIsRUFBRSxRQUFnQjtJQUN2RixNQUFNLFVBQVUsR0FBVyx1QkFBdUIsQ0FBQztJQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRXhELElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUU7UUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLDZCQUE2QixDQUFDLENBQUM7UUFDdEcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNsQjtJQUVELE1BQU0saUJBQWlCLEdBQVUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEksTUFBTSxJQUFJLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxD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