var promise = require('promise'),
    nodemailer = require('nodemailer');
var config = require('../config/config');
const sgMail = require('@sendgrid/mail');

/**
 * Send Email Class
 * with default paramters 
 * host  
 * port
 * username
 * password
 * from
 */
class sendEmail {

    constructor(host= config.Smtp.host,
                port= config.Smtp.port,
                username= config.Smtp.username,
                password= config.Smtp.password,
                from= config.Smtp.from) 
    {
        this.host = config.Smtp.host;
        this.username = config.Smtp.username;
        this.password = config.Smtp.password;
        this.from = config.Smtp.from;
        this.port = config.Smtp.port;
        this.transporter = nodemailer.createTransport(
            {
                host: this.host,
                port: this.port,
                secure: false,
                auth: {
                    user: this.username,
                    pass: this.password
                },
                logger: false,
                debug: false
            }, {
                from: this.from,
                headers: {
                    'X-Laziness-level': 1000 // just an example header, no need to use this
                }
            }
        );
    }
    send(to,subject,html) {
       return new Promise((resolve,reject)=>{
           try {
            let newTransporter = nodemailer.createTransport(
                                {
                                host: config.Smtp.host,
                                port: config.Smtp.port,
                                secure: false,
                                auth: {
                                    user: config.Smtp.username,
                                    pass: config.Smtp.password
                                },
                                logger: false,
                                debug: false
                                }, {
                                    from: config.Smtp.from,
                                    headers: {
                                        'X-Laziness-level': 1000 // just an example header, no need to use this
                                    }
                                }
            );

            let message = {
                to:  to,
                subject: subject, 
                html: html
            };
            newTransporter.sendMail(message, (error, info) => {
                newTransporter.close();
                if (error) {
                    reject(error)
                    // return;
                }else{
                    resolve(info);
                }                
            });
        } catch(e) {
            reject(e)
        }
        })
    }
 
}

class sendMail {

    send(mailId,subject,htmlTemplate) {
        return new Promise((resolve,reject)=>{
            try {
             
                	
                sgMail.setApiKey(config.sendGripApiKey);
                const msg = {
                to: mailId,
                from: 'admin@aderang.com',
                subject: subject,
                text: htmlTemplate,
                html: htmlTemplate,
                };
                sgMail.send(msg);
                resolve(true);
            } catch(e) {
                reject(e)
            }
         })
     }

}
module.exports = {
    sendEmail : sendEmail,
    sendMail : sendMail
}
    
