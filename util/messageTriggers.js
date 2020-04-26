"use strict";

var promise = require('promise');
const _sendEmail = require("./sendEmail");
const sendMail = new _sendEmail.sendMail();
var config = require('../config/config');

function messageTrigger() {}


messageTrigger.prototype.referralMail = function (mailId, firstName, lastName, password,activationUrl) {


    var htmlTemplate = "",
        sub = "";
    return new promise(function (resolve, reject) {
        try {

             sub = 'Reset password';
            // htmlTemplate = "Dear " + firstName + " " + lastName + ",<p> We have received a request for resetting your login password </p> <p> URL: <a href='" + activationUrl + "'>  Click here to change your password.</a><p>Best regards,</p><p>Close Loops</p>";
            htmlTemplate = `<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Welcome</title>
                </head>
                <body>
                    <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="background:#ecf0f6; font-family:Verdana, Geneva, sans-serif;">
                       <tr>
                          <td style="padding:40px 0;">
                                 <table style="background:#fff;width: 570px;margin: auto;padding:0 20px;">
                                   <tr>
                                       <td style="padding:20px 0;">
                                           <p style="font-size:14px;">Dear ${firstName} ${lastName},</p>
                                           <p style="line-height:25px; font-size:14px;">We have received a request for resetting your login password</p>
                                           <p style="line-height:25px; font-size:14px;"> To login, </p>
                                           <p style="line-height:25px; font-size:14px;"><a href="${activationUrl}" style="background-color:#76a6ef;text-decoration:none;color:#fff;padding:5px 8px;">Click here to change your password.</a></p>
                                        
                                       </td>
                                    </tr>
                                </table>
                            </td>
                      </tr>
                        <tr>
                            <td align="center" style="font-size:16px; background:#76a6ef; color:#fff; padding:16px 16px 5px;">Thank you for choosing Aderang</td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size:11px; background:#76a6ef; color:#fff; padding:8px;">Copyrights Aderang</td>
                        </tr>
                    </table>
                </body>
            </html>`;
        
            sendMail.send(mailId, sub, htmlTemplate).then(response => {
                
                resolve(true);
                
            }).catch(err => {
                console.log("ZZZZZZZZZZZZz");
                console.log(err);
                resolve(false);
            });

        } catch (e) {
            console.log("ZZZZZZZZZZZZz"); 
            console.log(e);
            resolve(false);
        }
    });
}

module.exports = messageTrigger;