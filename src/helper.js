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
exports.randomInt = exports.randomBytes = void 0;
const crypto = require("crypto");
const inspect_1 = require("./inspect");
const moduleName = 'helper';
const bytes = [...' 0123456789 ABCDEFGHI JKLMNOPQR STUVWXYZ. '];
function randomBytes(logger, size = 13) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = 'randomBytes';
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
        let results = '';
        for (let i = 0; i < size; i++) {
            results += bytes[yield randomInt(logger, 0, bytes.length)];
        }
        //console.log(results);
        return results;
    });
}
exports.randomBytes = randomBytes;
function randomInt(logger, min = 1, max = 10) {
    const methodName = 'randomInt';
    return new Promise((resolve, reject) => {
        crypto.randomInt(min, max, (err, value) => {
            if (err) {
                logger.error({ moduleName, methodName, error: inspect_1.inspect(err) });
                return reject(err);
            }
            else {
                return resolve(value);
            }
        });
    });
}
exports.randomInt = randomInt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUdqQyx1Q0FBb0M7QUFFcEMsTUFBTSxVQUFVLEdBQVcsUUFBUSxDQUFDO0FBRXBDLE1BQU0sS0FBSyxHQUFVLENBQUMsR0FBRyw0Q0FBNEMsQ0FBQyxDQUFDO0FBRXZFLFNBQXNCLFdBQVcsQ0FBQyxNQUFjLEVBQUUsT0FBZSxFQUFFOztRQUNqRSxNQUFNLFVBQVUsR0FBVyxhQUFhLENBQUM7UUFDM0M7Ozs7Ozs7Ozs7O1VBV0U7UUFDQSxJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUM7UUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixPQUFPLElBQUksS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFFRCx1QkFBdUI7UUFFdkIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUFBO0FBdEJELGtDQXNCQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxNQUFjLEVBQUUsTUFBYyxDQUFDLEVBQUUsTUFBYyxFQUFFO0lBQ3pFLE1BQU0sVUFBVSxHQUFXLFdBQVcsQ0FBQztJQUN2QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBWSxFQUFFLE1BQVcsRUFBRSxFQUFFO1FBQy9DLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQVEsRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUNyRCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNMLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFaRCw4QkFZQyJ9