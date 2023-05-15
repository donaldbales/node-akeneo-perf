"use strict";
/*
  sql.ts
  by Don Bales
  on 2018-12-21
  A library to connect, execute DLL and DML against SQL Server
*/
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
exports.executeDML = exports.executeDDL = exports.connect = void 0;
const tedious_1 = require("tedious");
const tds = require("tedious");
const util = require("util");
const logger_1 = require("./logger");
const moduleName = 'sqlms';
// I create this function to make it easy to develop and debug
function inspect(obj, depth = 5) {
    return util.inspect(obj, true, depth, false);
}
function connect(logger) {
    const methodName = 'connect';
    return new Promise((resolve, reject) => {
        logger.info(`${moduleName}#${methodName}: started.`);
        const config = process.env.DOCTOSQL_RDBMS ? JSON.parse(process.env.DOCTOSQL_RDBMS) : {};
        const database = config.database;
        const password = config.password;
        const server = config.server;
        const userName = config.userName;
        const connectTimeout = (config.connectTimeout !== undefined) ?
            Number.parseInt(config.connectTimeout, 10) : 500000; // five minutes
        const requestTimeout = (config.requestTimeout !== undefined) ?
            Number.parseInt(config.requestTimeout, 10) : 86399997; // almost 24 hours
        const port = (config.port !== undefined) ?
            Number.parseInt(config.port, 10) : 1433;
        // The default value for `config.options.trustServerCertificate` will change from `true` to `false` in the next major 
        // version of `tedious`. Set the value to `true` or `false` explicitly to silence this message. src/sql.js:68:28
        const connectionConfig = {
            authentication: {
                options: {
                    password,
                    userName
                },
                type: 'default'
            },
            options: {
                connectTimeout,
                database,
                // If you're on Windows Azure, you will need this:
                encrypt: true,
                port,
                trustServerCertificate: true,
                //        validateBulkLoadParameters: false,
                requestTimeout
            },
            server
        };
        const connection = new tedious_1.Connection(connectionConfig);
        //    connection.connect();
        connection.on('error', (err) => {
            const error = err;
            console.error(`${moduleName}#${methodName}: ${inspect(error)}`);
            setTimeout(() => {
                process.exit(99);
            }, 5000);
        });
        connection.on('connect', (err) => {
            if (err) {
                const error = err;
                console.error(`${moduleName}#${methodName}: ${inspect(error)}`);
                return reject({ error });
            }
            else {
                return resolve(connection);
            }
        });
    });
}
exports.connect = connect;
function executeDDL(logger, conn, sql) {
    const methodName = 'executeDDL';
    return new Promise((resolve, reject) => {
        logger.info(`${moduleName}, ${methodName}: start`);
        const results = [];
        if (sql) {
            const sqlRequest = new tds.Request(sql, (sqlerr, rowCount) => {
                if (sqlerr) {
                    logger.error(`${moduleName}, ${methodName} \n${inspect(sqlerr)}`);
                    return reject({ error: sqlerr });
                }
                else {
                    logger.info(`${moduleName}, ${methodName}: ${rowCount} rows`);
                }
            });
            logger.info(`${moduleName}, ${methodName}: sql=\n${sql}`);
            sqlRequest.on('row', (columns) => {
                logger.debug(`${moduleName}, ${methodName}: on row, columns=${inspect(columns)}`);
                results.push({ value: columns[0].value });
            });
            sqlRequest.on('requestCompleted', () => {
                logger.debug(`${moduleName}, ${methodName} on requestCompleted`);
                return resolve(results);
            });
            conn.execSql(sqlRequest);
        }
        else {
            resolve(results);
        }
    });
}
exports.executeDDL = executeDDL;
function executeDML(logger, conn, sql, params = []) {
    const methodName = 'executeDML';
    logger.info(`${moduleName}, ${methodName}: start`);
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const results = [];
        let rowsAffected = 0;
        if (sql) {
            const sqlRequest = new tds.Request(sql, (sqlerr, rowCount) => {
                if (sqlerr) {
                    // logger.error(`${moduleName}, ${methodName} error: \n${inspect(sqlerr)}`);
                    return reject({ error: sqlerr });
                }
                else {
                    const stopTime = Date.now();
                    const elapsedTimeInSeconds = (stopTime - startTime) / 1000.;
                    rowsAffected = rowCount;
                    logger.info(`${moduleName}, ${methodName}: ${rowCount} rows, ${elapsedTimeInSeconds} seconds`);
                }
            });
            logger.debug(`${moduleName}, ${methodName}: sql=\n${sql}`);
            if (params &&
                params.length > 0) {
                for (const param of params) {
                    sqlRequest.addParameter(param[0], tds.TYPES.VarChar, param[1]);
                }
            }
            sqlRequest.on('row', (columns) => {
                // logger.debug(`${moduleName}, ${methodName}: on row`);
                const result = {};
                for (const column of columns) {
                    // logger.info(`${moduleName}, ${methodName}: column_name=${column.metadata.colName}`);
                    // logger.info(`${moduleName}, ${methodName}: value=${inspect(column.value)}`);
                    // logger.info(`${moduleName}, ${methodName}: javascript type=${typeof column.value}`);
                    // logger.info(`${moduleName}, ${methodName}: tds type=${column.metadata.type.name}`);
                    let value;
                    switch (column.metadata.type.name) {
                        case 'BigInt':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        case 'Bit':
                            value = column.value !== null ? column.value : null;
                            break;
                        case 'BitN':
                            value = column.value !== null ? column.value : null;
                            break;
                        case 'Char':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        case 'Date':
                            value = column.value !== null ? new Date(column.value.toString()) : null;
                            break;
                        case 'DateTime':
                            value = column.value !== null ? new Date(column.value.toString()) : null;
                            break;
                        case 'DateTime2':
                            value = column.value !== null ? new Date(column.value.toString()) : null;
                            break;
                        case 'DateTimeN':
                            value = column.value !== null ? new Date(column.value.toString()) : null;
                            break;
                        case 'DateTimeOffset':
                            value = column.value !== null ? new Date(column.value.toString()) : null;
                            break;
                        case 'DecimalN':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        case 'FloatN':
                            value = column.value !== null ? column.value : null;
                            break;
                        case 'Int':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        case 'IntN':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        case 'NumericN':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        case 'SmallInt':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        case 'VarBinary':
                            value = column.value !== null ? column.value : null;
                            break;
                        case 'NVarChar':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        case 'UniqueIdentifier':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        case 'VarChar':
                            value = column.value !== null ? column.value.toString() : null;
                            break;
                        default:
                            value = column.value !== null ? column.value.toString() : null;
                            logger.error(`${moduleName}, ${methodName}: ` +
                                `Unsupported data type: ` +
                                `column name=${column.metadata.colName}, ` +
                                `tds type=${column.metadata.type.name}`);
                    }
                    result[column.metadata.colName] = value;
                }
                results.push(result);
            });
            sqlRequest.on('requestCompleted', () => {
                logger.debug(`${moduleName}, ${methodName} on requestCompleted`);
                if (results.length === 0 &&
                    sql.trim().toLowerCase().indexOf('select') !== 0) {
                    results.push({ rowsAffected });
                }
                return resolve(results);
            });
            conn.execSql(sqlRequest);
        }
        else {
            resolve(results);
        }
    });
}
exports.executeDML = executeDML;
// A main method with no command line parameter management
function main(loggerIn = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'main';
        let logger = (loggerIn) ? loggerIn : logger_1.getLogger(moduleName);
        logger.info(`${moduleName}, ${methodName}, Starting...`);
        const conn = yield connect(logger);
        if (require.main === module) {
            setTimeout(() => { process.exit(0); }, 3000);
        }
        logger.info(`${moduleName}, ${methodName}, Ending.`);
        conn.end();
    });
}
// Start the program
if (require.main === module) {
    main();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcWxtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0VBS0U7Ozs7Ozs7Ozs7OztBQUtGLHFDQUF3RTtBQUV4RSwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBRTdCLHFDQUFxQztBQUVyQyxNQUFNLFVBQVUsR0FBVyxPQUFPLENBQUM7QUFFbkMsOERBQThEO0FBQzlELFNBQVMsT0FBTyxDQUFDLEdBQVEsRUFBRSxRQUFnQixDQUFDO0lBQzFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLE1BQWM7SUFDcEMsTUFBTSxVQUFVLEdBQVcsU0FBUyxDQUFDO0lBRXJDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFFckMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsSUFBSSxVQUFVLFlBQVksQ0FBQyxDQUFDO1FBRXJELE1BQU0sTUFBTSxHQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM3RixNQUFNLFFBQVEsR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3pDLE1BQU0sUUFBUSxHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDekMsTUFBTSxNQUFNLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3pDLE1BQU0sY0FBYyxHQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZTtRQUN0RSxNQUFNLGNBQWMsR0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFrQjtRQUMzRSxNQUFNLElBQUksR0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUU5QyxzSEFBc0g7UUFDdEgsZ0hBQWdIO1FBRTVHLE1BQU0sZ0JBQWdCLEdBQXlCO1lBQzdDLGNBQWMsRUFBRTtnQkFDZCxPQUFPLEVBQUU7b0JBQ1AsUUFBUTtvQkFDUixRQUFRO2lCQUNUO2dCQUNELElBQUksRUFBRSxTQUFTO2FBQ2hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGNBQWM7Z0JBQ2QsUUFBUTtnQkFDUixrREFBa0Q7Z0JBQ2xELE9BQU8sRUFBRSxJQUFJO2dCQUNiLElBQUk7Z0JBQ0osc0JBQXNCLEVBQUUsSUFBSTtnQkFDcEMsNENBQTRDO2dCQUNwQyxjQUFjO2FBQ2Y7WUFDRCxNQUFNO1NBQ1AsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFlLElBQUksb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BFLDJCQUEyQjtRQUV2QixVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sS0FBSyxHQUFRLEdBQUcsQ0FBQztZQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxJQUFJLFVBQVUsS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDcEMsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsTUFBTSxLQUFLLEdBQVEsR0FBRyxDQUFDO2dCQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxJQUFJLFVBQVUsS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0wsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhFRCwwQkFnRUM7QUFFRCxTQUFnQixVQUFVLENBQUMsTUFBYyxFQUFFLElBQVMsRUFBRSxHQUFXO0lBQy9ELE1BQU0sVUFBVSxHQUFXLFlBQVksQ0FBQztJQUV4QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLEtBQUssVUFBVSxTQUFTLENBQUMsQ0FBQztRQUVuRCxNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7UUFFMUIsSUFBSSxHQUFHLEVBQUU7WUFDUCxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQ2hDLEdBQUcsRUFDSCxDQUFDLE1BQVcsRUFBRSxRQUFhLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsS0FBSyxVQUFVLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbEUsT0FBTyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsS0FBSyxVQUFVLEtBQUssUUFBUSxPQUFPLENBQUMsQ0FBQztpQkFDL0Q7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVMLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLEtBQUssVUFBVSxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFMUQsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRTtnQkFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsS0FBSyxVQUFVLHFCQUFxQixPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1lBRUgsVUFBVSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNqRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNsQjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXJDRCxnQ0FxQ0M7QUFFRCxTQUFnQixVQUFVLENBQUMsTUFBYyxFQUFFLElBQVMsRUFBRSxHQUFXLEVBQUUsU0FBZ0IsRUFBRTtJQUNuRixNQUFNLFVBQVUsR0FBVyxZQUFZLENBQUM7SUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsS0FBSyxVQUFVLFNBQVMsQ0FBQyxDQUFDO0lBRW5ELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsTUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQztRQUMxQixJQUFJLFlBQVksR0FBVyxDQUFDLENBQUM7UUFFN0IsSUFBSSxHQUFHLEVBQUU7WUFDUCxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQ2hDLEdBQUcsRUFDSCxDQUFDLE1BQVcsRUFBRSxRQUFhLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsNEVBQTRFO29CQUM1RSxPQUFPLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDTCxNQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3BDLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFBO29CQUMzRCxZQUFZLEdBQUcsUUFBUSxDQUFDO29CQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxLQUFLLFVBQVUsS0FBSyxRQUFRLFVBQVUsb0JBQW9CLFVBQVUsQ0FBQyxDQUFDO2lCQUNoRztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUwsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsS0FBSyxVQUFVLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUUzRCxJQUFJLE1BQU07Z0JBQ04sTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO29CQUMxQixVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEU7YUFDRjtZQUVELFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBWSxFQUFFLEVBQUU7Z0JBQ3BDLHdEQUF3RDtnQkFFeEQsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO2dCQUN2QixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtvQkFDNUIsdUZBQXVGO29CQUN2RiwrRUFBK0U7b0JBQy9FLHVGQUF1RjtvQkFDdkYsc0ZBQXNGO29CQUN0RixJQUFJLEtBQVUsQ0FBQztvQkFFZixRQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTt3QkFDbkMsS0FBSyxRQUFROzRCQUNYLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUMvRCxNQUFNO3dCQUNSLEtBQUssS0FBSzs0QkFDUixLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDcEQsTUFBTTt3QkFDUixLQUFLLE1BQU07NEJBQ1QsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ3BELE1BQU07d0JBQ1IsS0FBSyxNQUFNOzRCQUNULEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUMvRCxNQUFNO3dCQUNSLEtBQUssTUFBTTs0QkFDVCxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUN6RSxNQUFNO3dCQUNSLEtBQUssVUFBVTs0QkFDYixLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUN6RSxNQUFNO3dCQUNSLEtBQUssV0FBVzs0QkFDZCxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUN6RSxNQUFNO3dCQUNSLEtBQUssV0FBVzs0QkFDZCxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUN6RSxNQUFNO3dCQUNSLEtBQUssZ0JBQWdCOzRCQUNuQixLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUN6RSxNQUFNO3dCQUNSLEtBQUssVUFBVTs0QkFDYixLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDL0QsTUFBTTt3QkFDUixLQUFLLFFBQVE7NEJBQ1gsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ3BELE1BQU07d0JBQ1IsS0FBSyxLQUFLOzRCQUNSLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUMvRCxNQUFNO3dCQUNSLEtBQUssTUFBTTs0QkFDVCxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDL0QsTUFBTTt3QkFDUixLQUFLLFVBQVU7NEJBQ2IsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQy9ELE1BQU07d0JBQ1IsS0FBSyxVQUFVOzRCQUNiLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUMvRCxNQUFNO3dCQUNSLEtBQUssV0FBVzs0QkFDZCxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDcEQsTUFBTTt3QkFDUixLQUFLLFVBQVU7NEJBQ2IsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FB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