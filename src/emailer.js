"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCallback = exports.send = void 0;
const nodemailer = require("nodemailer");
const inspect_1 = require("./inspect");
const moduleName = 'emailer';
const emailFrom = process.env.EMAIL_FROM ?
    process.env.EMAIL_FROM : 'ex-emailer';
const emailHost = process.env.EMAIL_HOST ?
    process.env.EMAIL_HOST : 'smtp.gmail.com';
const emailPassword = process.env.EMAIL_PASSWORD ?
    process.env.EMAIL_PASSWORD : '';
const emailPort = process.env.EMAIL_PORT ?
    process.env.EMAIL_PORT : '';
const emailTo = process.env.EMAIL_TO ?
    process.env.EMAIL_TO : 'Don Bales <don.bales@bounteous.com>';
const emailUsername = process.env.EMAIL_USERNAME ?
    process.env.EMAIL_USERNAME : '';
function send(emailText, subject = '') {
    const methodName = 'send';
    console.log(`${moduleName}#${methodName}: Starting...`);
    return new Promise((resolve, reject) => {
        const text = emailText && emailText.toString ? emailText.toString() : inspect_1.inspect(emailText);
        // console.log(`${moduleName}#${methodName}: text=\n${text}`);
        const options = {};
        options.host = emailHost;
        if (emailUsername && emailPassword) {
            options.auth = {
                pass: emailPassword,
                user: emailUsername
            };
        }
        if (emailPort) {
            options.port = emailPort;
        }
        const transporter = nodemailer.createTransport(options);
        // console.log(inspect(transporter));
        const mailOptions = {
            from: emailFrom,
            subject,
            text,
            to: emailTo
        };
        // console.log(inspect(mailOptions));
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(`${moduleName}#${methodName}: inspect(error)=\n${inspect_1.inspect(err)}`);
                reject(err);
            }
            else {
                // console.log(`${moduleName}#${methodName}: inspect(info)=${inspect(info)}.`);
                resolve(info);
            }
        });
    });
}
exports.send = send;
function sendCallback(emailText, subject = '', callback) {
    const methodName = 'send';
    console.log(`${moduleName}#${methodName}: Starting...`);
    const text = emailText && emailText.toString ? emailText.toString() : inspect_1.inspect(emailText);
    // console.log(`${moduleName}#${methodName}: text=\n${text}`);
    const options = {};
    options.host = emailHost;
    if (emailUsername && emailPassword) {
        options.auth = {
            pass: emailPassword,
            user: emailUsername
        };
    }
    if (emailPort) {
        options.port = emailPort;
    }
    const transporter = nodemailer.createTransport(options);
    // console.log(inspect(transporter));
    const mailOptions = {
        from: emailFrom,
        subject,
        text,
        to: emailTo
    };
    // console.log(inspect(mailOptions));
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(`${moduleName}#${methodName}: inspect(error)=\n${inspect_1.inspect(err)}`);
            callback({ err });
        }
        else {
            // console.log(`${moduleName}#${methodName}: inspect(info)=${inspect(info)}.`);
            callback({ info });
        }
    });
    callback(emailText);
}
exports.sendCallback = sendCallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVtYWlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjs7O0FBRS9CLHlDQUF5QztBQUd6Qyx1Q0FBb0M7QUFFcEMsTUFBTSxVQUFVLEdBQVcsU0FBUyxDQUFDO0FBRXJDLE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFxQixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFFcEQsTUFBTSxTQUFTLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQXFCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0FBRXhELE1BQU0sYUFBYSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUF5QixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFOUMsTUFBTSxTQUFTLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUUxQyxNQUFNLE9BQU8sR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBbUIsQ0FBQyxDQUFDLENBQUMscUNBQXFDLENBQUM7QUFFM0UsTUFBTSxhQUFhLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQXlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUU5QyxTQUFnQixJQUFJLENBQUMsU0FBYyxFQUFFLFVBQWtCLEVBQUU7SUFDdkQs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