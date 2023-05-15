"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetFamilyAssets = exports.assetFamilyAttributes = void 0;
const akeneo = require("node-akeneo-api");
const helper_1 = require("./helper");
const exportPath = process.env.AKENEO_EXPORT_PATH || '.';
const moduleName = `assetFamilies/${helper_1.ASSET_FAMILY_CODE}/transform`;
function createMediaFile(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: akeneo.ASSET_FAMILY_MEDIA_FILE,
        labels: {
            en_US: property
        },
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false,
        allowed_extensions: [],
        media_type: 'image'
    };
    results.attribute = attribute;
    return results;
}
function createMediaLink(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        labels: {
            en_US: property
        },
        type: akeneo.ASSET_FAMILY_MEDIA_LINK,
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false,
        media_type: attributeMap[property].media_type ? attributeMap[property].media_type : 'other'
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
        labels: {
            en_US: property
        },
        type: akeneo.ASSET_FAMILY_NUMBER,
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false,
        decimals_allowed: false,
        min_value: '0',
        max_value: '999999999999'
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
        type: akeneo.ASSET_FAMILY_SINGLE_OPTION,
        labels: {
            en_US: property
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
function createText(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: akeneo.ASSET_FAMILY_TEXT,
        labels: {
            en_US: property
        },
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false,
        is_textarea: false,
        is_rich_text_editor: false,
        max_characters: 255
    };
    results.attribute = attribute;
    return results;
}
function createTextArea(logger, attributeMap, property) {
    const results = {
        attribute: '',
        attributeOptions: []
    };
    const attribute = {
        code: akeneo.attributeCode(property),
        type: akeneo.ASSET_FAMILY_TEXT,
        labels: {
            en_US: property
        },
        value_per_locale: false,
        value_per_channel: false,
        is_required_for_completeness: false,
        is_textarea: true,
        is_rich_text_editor: false,
        max_characters: 65535
    };
    results.attribute = attribute;
    return results;
}
function assetFamilyAttributes(logger, attributeMap) {
    const methodName = 'assetFamilyAttributes';
    logger.info({ moduleName, methodName }, `Starting...`);
    const resultMap = {
        attributes: [],
        attributeOptions: []
    };
    for (const property in attributeMap) {
        if (attributeMap.hasOwnProperty(property)) {
            if (attributeMap[property].akeneo_type === akeneo.ASSET_FAMILY_MEDIA_FILE) {
                const result = createMediaFile(logger, attributeMap, property);
                resultMap.attributes.push({
                    assetFamilyCode: helper_1.ASSET_FAMILY_CODE,
                    assetFamilyAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.ASSET_FAMILY_MEDIA_LINK) {
                const result = createMediaLink(logger, attributeMap, property);
                resultMap.attributes.push({
                    assetFamilyCode: helper_1.ASSET_FAMILY_CODE,
                    assetFamilyAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.ASSET_FAMILY_NUMBER) {
                const result = createNumber(logger, attributeMap, property);
                resultMap.attributes.push({
                    assetFamilyCode: helper_1.ASSET_FAMILY_CODE,
                    assetFamilyAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.ASSET_FAMILY_SINGLE_OPTION) {
                const result = createSingleOption(logger, attributeMap, property);
                resultMap.attributes.push({
                    assetFamilyCode: helper_1.ASSET_FAMILY_CODE,
                    assetFamilyAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
                for (const option of result.attributeOptions) {
                    const assetFamilyCode = helper_1.ASSET_FAMILY_CODE;
                    const assetFamilyAttributeCode = result.attribute.code;
                    const assetFamilyAttributeOptionCode = option.code;
                    resultMap.attributeOptions.push({
                        assetFamilyCode,
                        assetFamilyAttributeCode,
                        assetFamilyAttributeOptionCode,
                        option
                    });
                }
            }
            else if (attributeMap[property].akeneo_type === akeneo.ASSET_FAMILY_TEXT) {
                const result = createText(logger, attributeMap, property);
                resultMap.attributes.push({
                    assetFamilyCode: helper_1.ASSET_FAMILY_CODE,
                    assetFamilyAttributeCode: result.attribute.code,
                    attribute: result.attribute
                });
            }
            else if (attributeMap[property].akeneo_type === akeneo.ASSET_FAMILY_TEXTAREA) {
                const result = createTextArea(logger, attributeMap, property);
                resultMap.attributes.push({
                    assetFamilyCode: helper_1.ASSET_FAMILY_CODE,
                    assetFamilyAttributeCode: result.attribute.code,
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
exports.assetFamilyAttributes = assetFamilyAttributes;
function assetFamilyAssets(logger, extractedAssets) {
    const methodName = 'assetFamilyAssets';
    logger.info({ moduleName, methodName, rows: extractedAssets.length }, `Starting...`);
    const results = [];
    for (const extractedAsset of extractedAssets) {
        let asset = {
            code: extractedAsset.code,
            values: {
                label: [
                    {
                        locale: 'en_CA',
                        channel: null,
                        data: extractedAsset.label
                    },
                    {
                        locale: 'en_GB',
                        channel: null,
                        data: extractedAsset.label
                    },
                    {
                        locale: 'en_US',
                        channel: null,
                        data: extractedAsset.label
                    }
                ]
            }
        };
        if (extractedAsset.media) {
            asset.values.media = [{
                    locale: null,
                    channel: null,
                    data: extractedAsset.media
                }];
        }
        if (extractedAsset.Models) {
            asset.values.models = [{
                    locale: null,
                    channel: null,
                    data: extractedAsset.Models
                }];
        }
        if (extractedAsset.Name) {
            asset.values.name = [{
                    locale: null,
                    channel: null,
                    data: extractedAsset.Name
                }];
        }
        if (extractedAsset.Vendors) {
            asset.values.vendors = [{
                    locale: null,
                    channel: null,
                    data: extractedAsset.Vendors
                }];
        }
        /* these will be transformations
        if (extractedAsset.Media500x500) {
          asset.values.media500x500 = [ {
            locale: null,
            channel: null,
            data: extractedAsset.Media500x500
          } ];
        }
        if (extractedAsset.Media80x80) {
          asset.values.media80x80 = [ {
            locale: null,
            channel: null,
            data: extractedAsset.Media80x80
          } ];
        }
        */
        results.push({
            assetFamilyCode: extractedAsset.assetFamilyCode,
            assetFamilyAssetCode: extractedAsset.code,
            asset
        });
    }
    return results;
}
exports.assetFamilyAssets = assetFamilyAssets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUEwQztBQUsxQyxxQ0FBNkM7QUFPN0MsTUFBTSxVQUFVLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBNkIsSUFBSSxHQUFHLENBQUM7QUFDN0UsTUFBTSxVQUFVLEdBQVcsaUJBQWlCLDBCQUFpQixZQUFZLENBQUM7QUFFMUUsU0FBUyxlQUFlLENBQUMsTUFBVyxFQUFFLFlBQWlCLEVBQUUsUUFBZ0I7SUFDdkUsTUFBTSxPQUFPLEdBQVE7UUFDbkIsU0FBUyxFQUFFLEVBQUU7UUFDYixnQkFBZ0IsRUFBRSxFQUFFO0tBQ3JCLENBQUM7SUFDRixNQUFNLFNBQVMsR0FBeUI7UUFDdEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksRUFBRSxNQUFNLENBQUMsdUJBQXVCO1FBQ3BDLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRSxRQUFRO1NBQ2hCO1FBQ0QsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QixpQkFBaUIsRUFBRSxLQUFLO1FBQ3hCLDRCQUE0QixFQUFFLEtBQUs7UUFDbkMsa0JBQWtCLEVBQUUsRUFBRTtRQUN0QixVQUFVLEVBQUUsT0FBTztLQUNwQixDQUFDO0lBQ0YsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFFOUIsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLE1BQVcsRUFBRSxZQUFpQixFQUFFLFFBQWdCO0lBQ3ZFLE1BQU0sT0FBTyxHQUFRO1FBQ25CLFNBQVMsRUFBRSxFQUFFO1FBQ2IsZ0JBQWdCLEVBQUUsRUFBRTtLQUNyQixDQUFDO0lBQ0YsTUFBTSxTQUFTLEdBQXlCO1FBQ3RDLElBQUksRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxNQUFNLEVBQUU7WUFD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