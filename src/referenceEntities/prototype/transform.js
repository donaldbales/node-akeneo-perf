"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceEntityRecords = exports.referenceEntityAttributes = void 0;
const akeneo = require("node-akeneo-api");
const helper_1 = require("./helper");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = `referenceEntities/${helper_1.REFERENCE_ENTITY_CODE}/transform`;
function createImage(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: akeneo.REFERENCE_ENTITY_IMAGE,
        labels: {
            en_US: akeneo.attributeLabel(property)
        },
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false,
        allowed_extensions: []
    };
    results.attribute = attribute;
    return results;
}
function createNumber(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: akeneo.REFERENCE_ENTITY_NUMBER,
        labels: {
            en_US: akeneo.attributeLabel(property)
        },
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false,
        decimals_allowed: true,
        min_value: '0',
        max_value: '99999999999999999999999'
    };
    results.attribute = attribute;
    return results;
}
function createMultiLink(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: akeneo.REFERENCE_ENTITY_MULTIPLE_LINKS,
        labels: {
            en_US: akeneo.attributeLabel(property)
        },
        value_per_channel: false,
        value_per_locale: false,
        is_required_for_completeness: false,
        reference_entity_code: attributeMap[property].reference_entity_code
    };
    results.attribute = attribute;
    return results;
}
function createMultipleOptions(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: akeneo.REFERENCE_ENTITY_MULTIPLE_OPTIONS,
        labels: {
            en_US: akeneo.attributeLabel(property)
        },
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false
    };
    results.attribute = attribute;
    for (const option of attributeMap[property].options) {
        const attributeOption = {
            code: akeneo.attributeCode(option),
            labels: {
                en_US: option
            }
        };
        results.attributeOptions.push(attributeOption);
    }
    return results;
}
function createSingleLink(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: 'singlelink',
        labels: {
            en_US: akeneo.attributeLabel(property)
        },
        value_per_channel: false,
        value_per_locale: false,
        reference_entity_code: helper_1.REFERENCE_ENTITY_CODE,
        is_required_for_completeness: false
    };
    results.attribute = attribute;
    return results;
}
function createSingleOption(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: 'single_option',
        labels: {
            en_US: akeneo.attributeLabel(property)
        },
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false
    };
    results.attribute = attribute;
    for (const option of attributeMap[property].options) {
        const attributeOption = {
            code: akeneo.attributeCode(option),
            labels: {
                en_US: akeneo.attributeLabel(option)
            }
        };
        results.attributeOptions.push(attributeOption);
    }
    return results;
}
function createText(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: akeneo.REFERENCE_ENTITY_TEXT,
        labels: {
            en_US: akeneo.attributeLabel(property)
        },
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false,
        is_textarea: false,
        is_rich_text_editor: false,
        validation_rule: 'none',
        max_characters: 255
    };
    results.attribute = attribute;
    return results;
}
function createTextarea(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: 'text',
        labels: {
            en_US: akeneo.attributeLabel(property)
        },
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false,
        is_textarea: true,
        is_rich_text_editor: false,
        max_characters: 65535,
        validation_rule: 'none'
    };
    results.attribute = attribute;
    return results;
}
function referenceEntityAttributes(logger, attributeMap) {
    const methodName = 'referenceEntityAttributes';
    logger.info({ moduleName, methodName }, `Starting...`);
    const resultMap = {
        attributes: [],
        attributeOptions: []
    };
    for (const property in attributeMap) {
        if (attributeMap.hasOwnProperty(property)) {
            if (attributeMap[property].akeneo_type === akeneo.PIM_CATALOG_DATE) {
                const result = createText(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.REFERENCE_ENTITY_MULTIPLE_LINKS) {
                const result = createMultiLink(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.REFERENCE_ENTITY_MULTIPLE_OPTIONS) {
                const result = createMultipleOptions(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
                for (const option of result.attributeOptions) {
                    const referenceEntityCode = helper_1.REFERENCE_ENTITY_CODE;
                    const referenceEntityAttributeCode = result.attribute.code;
                    const referenceEntityAttributeOptionCode = option.code;
                    resultMap.attributeOptions.push({
                        referenceEntityCode,
                        referenceEntityAttributeCode,
                        referenceEntityAttributeOptionCode,
                        option
                    });
                }
            }
            else if (attributeMap[property].akeneo_type === akeneo.REFERENCE_ENTITY_NUMBER &&
                attributeMap[property].sql_data_type === 'bit') {
                const result = createText(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.REFERENCE_ENTITY_NUMBER &&
                attributeMap[property].sql_data_type === 'decimal') {
                const result = createNumber(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.REFERENCE_ENTITY_NUMBER &&
                (attributeMap[property].sql_data_type === 'int' ||
                    attributeMap[property].sql_data_type === 'smallint' ||
                    attributeMap[property].sql_data_type === 'bigint')) {
                const result = createNumber(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.REFERENCE_ENTITY_SINGLE_LINK) {
                const result = createSingleLink(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.REFERENCE_ENTITY_SINGLE_OPTION) {
                const result = createSingleOption(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
                for (const option of result.attributeOptions) {
                    const referenceEntityCode = helper_1.REFERENCE_ENTITY_CODE;
                    const referenceEntityAttributeCode = result.attribute.code;
                    const referenceEntityAttributeOptionCode = option.code;
                    resultMap.attributeOptions.push({
                        referenceEntityCode,
                        referenceEntityAttributeCode,
                        referenceEntityAttributeOptionCode,
                        option
                    });
                }
            }
            else if (attributeMap[property].akeneo_type === akeneo.REFERENCE_ENTITY_TEXT) {
                const result = createText(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.REFERENCE_ENTITY_TEXTAREA) {
                const result = createTextarea(logger, attributeMap, property);
                resultMap.attributes.push({
                    referenceEntityCode: helper_1.REFERENCE_ENTITY_CODE,
                    referenceEntityAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else {
                const msg = `add a akeneo mapping for: ` +
                    `${attributeMap[property].sql_data_type}` +
                    `and ${attributeMap[property].akeneo_type}`;
                logger.error({ moduleName, methodName }, `${msg}`);
                process.exit(99);
            }
        }
    }
    return resultMap;
}
exports.referenceEntityAttributes = referenceEntityAttributes;
function referenceEntityRecords(logger, extractedRecords) {
    const methodName = 'referenceEntityRecords';
    logger.info({ moduleName, methodName }, `Starting...`);
    const results = [];
    let record;
    for (const extractedRecord of extractedRecords) {
        record = {
            code: extractedRecord.code,
            values: {
                label: [
                    {
                        locale: 'en_US',
                        channel: null,
                        data: extractedRecord.label
                    }
                ],
                image: [
                    { locale: null,
                        channel: null,
                        data: extractedRecord.image
                    }
                ]
            }
        };
        if (extractedRecord.Text) {
            record.values.text = [{
                    locale: null,
                    channel: null,
                    data: extractedRecord.Text
                }];
        }
        if (extractedRecord.Textarea) {
            record.values.textarea = [{
                    locale: null,
                    channel: null,
                    data: extractedRecord.Textarea
                }];
        }
        if (extractedRecord._Number) {
            record.values._number = [{
                    locale: null,
                    channel: null,
                    data: extractedRecord._Number
                }];
        }
        results.push({
            referenceEntityCode: extractedRecord.referenceEntityCode,
            referenceEntityRecordCode: extractedRecord.code,
            record
        });
    }
    return results;
}
exports.referenceEntityRecords = referenceEntityRecords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUEwQztBQUkxQyxxQ0FBaUQ7QUFPakQsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFDN0UsTUFBTSxVQUFVLEdBQVcscUJBQXFCLDhCQUFxQixZQUFZLENBQUM7QUFFbEYsU0FBUyxXQUFXLENBQUMsTUFBVyxFQUFFLFlBQWlCLEVBQUUsUUFBZ0I7SUFDbkUsTUFBTSxPQUFPLEdBQVE7UUFDbkIsU0FBUyxFQUFFLEVBQUU7UUFDYixnQkFBZ0IsRUFBRSxFQUFFO0tBQ3JCLENBQUM7SUFDRixNQUFNLFNBQVMsR0FBNkI7UUFDMUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksRUFBRSxNQUFNLENBQUMsc0JBQXNCO1FBQ25DLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztTQUN2QztRQUNELGdCQUFnQixFQUFFLEtBQUs7UUFDdkIsaUJBQWlCLEVBQUUsS0FBSztRQUN4Qiw0QkFBNEIsRUFBRSxLQUFLO1FBQ25DLGtCQUFrQixFQUFFLEVBQUU7S0FDdkIsQ0FBQztJQUNGLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzlCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxNQUFXLEVBQUUsWUFBaUIsRUFBRSxRQUFnQjtJQUNwRSxNQUFNLE9BQU8sR0FBUTtRQUNuQixTQUFTLEVBQUUsRUFBRTtRQUNiLGdCQUFnQixFQUFFLEVBQUU7S0FDckIsQ0FBQztJQUNGLE1BQU0sU0FBUyxHQUE2QjtRQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxFQUFF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