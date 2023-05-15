"use strict";
/*
  sql.ts
  by Don Bales
  on 2018-12-21
  A library to connect, execute DLL and DML against MySQL
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
const mysql = require("mysql");
const logger_1 = require("./logger");
const moduleName = 'sqlmy';
function connect(logger) {
    const methodName = 'connect';
    return new Promise((resolve, reject) => {
        logger.info(`${moduleName}#${methodName}: started.`);
        const user = process.env.MYSQL_USER || '';
        const password = process.env.MYSQL_PASSWORD || '';
        const database = process.env.MYSQL_DATABASE || '';
        const charset = process.env.MYSQL_CHARSET || 'UTF8_GENERAL_CI';
        const timeout = Number.parseInt(process.env.MYSQL_TIMEOUT || '60000');
        const host = process.env.MYSQL_HOST || 'localhost';
        const port = Number.parseInt(process.env.MYSQL_PORT || '3306');
        const timezone = process.env.MYSQL_TIMEZONE || 'local';
        const connectTimeout = Number.parseInt(process.env.MYSQL_CONNECT_TIMEOUT || '10000');
        const sslCa = process.env.MYSQL_SSL_CA || '';
        const sslRejectUnauthorized = process.env.MYSQL_SSL_VERIFY_SERVER_CERT || '';
        const config = {
            charset,
            timeout,
            host,
            port,
            timezone,
            connectTimeout,
            supportBigNumbers: true,
            bigNumberStrings: true
        };
        if (user) {
            config.user = user;
        }
        if (password) {
            config.password = password;
        }
        if (database) {
            config.database = database;
        }
        if (sslCa) {
            const ca = sslCa;
            const rejectUnauthorized = (sslRejectUnauthorized === '1') ? true : false;
            config.ssl = {
                ca,
                rejectUnauthorized
            };
        }
        const connection = mysql.createConnection(config);
        connection.connect((err) => {
            const error = err;
            if (error) {
                reject(error);
            }
            else {
                resolve(connection);
            }
        });
    });
}
exports.connect = connect;
function executeDDL(logger, conn, sql) {
    const methodName = 'executeDDL';
    return new Promise((resolve, reject) => {
        logger.info(`${moduleName}, ${methodName}: start`);
        let rowsAffected = 0;
        if (sql) {
            conn.query(sql, (error, results, fields) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        }
    });
}
exports.executeDDL = executeDDL;
function executeDML(logger, conn, sql, values = []) {
    const methodName = 'executeDML';
    return new Promise((resolve, reject) => {
        logger.info(`${moduleName}, ${methodName}: start`);
        let rowsAffected = 0;
        if (sql) {
            conn.query({ sql, values }, (error, results, fields) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                else {
                    if (results) {
                        resolve(results);
                    }
                    else if (fields) {
                        resolve(fields);
                    }
                    else {
                        resolve([]);
                    }
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsbXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcWxteS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0VBS0U7Ozs7Ozs7Ozs7OztBQU9GLCtCQUErQjtBQUcvQixxQ0FBcUM7QUFFckMsTUFBTSxVQUFVLEdBQVcsT0FBTyxDQUFDO0FBRW5DLFNBQWdCLE9BQU8sQ0FBQyxNQUFjO0lBQ3BDLE1BQU0sVUFBVSxHQUFXLFNBQVMsQ0FBQztJQUVyQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBRXJDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLElBQUksVUFBVSxZQUFZLENBQUMsQ0FBQztRQUVyRCxNQUFNLElBQUksR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQXFCLElBQUksRUFBRSxDQUFDO1FBQzlELE1BQU0sUUFBUSxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBeUIsSUFBSSxFQUFFLENBQUM7UUFDdEUsTUFBTSxRQUFRLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUF5QixJQUFJLEVBQUUsQ0FBQztRQUN0RSxNQUFNLE9BQU8sR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQXdCLElBQUksaUJBQWlCLENBQUM7UUFDbkYsTUFBTSxPQUFPLEdBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQXdCLElBQUksT0FBTyxDQUFDLENBQUM7UUFDMUYsTUFBTSxJQUFJLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFxQixJQUFJLFdBQVcsQ0FBQztRQUN2RSxNQUFNLElBQUksR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBcUIsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUNuRixNQUFNLFFBQVEsR0FBWSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQXlCLElBQUksT0FBTyxDQUFDO1FB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