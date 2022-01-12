"use strict";
const path = require('path');
const nodemailer = require("nodemailer");
const ejs = require('ejs');

let MailAdapter = (adapterOptions) => {

    // Create transporter for send emails with SMTP
    let transporter = nodemailer.createTransport({
        host: adapterOptions.host,
        port: adapterOptions.port,
        secure: adapterOptions.secure,
        auth: {
            user: adapterOptions.user,
            pass: adapterOptions.password
        },
        tls:{
            ciphers:'SSLv3'
        }
    });


    // Core Functions

    let getUserEmail = (user) => {
        return user.get('email') || user.get('username');
    };

    // Render templates with ejs
    let renderTemplate = (template, data, locale) => {
        let templatePath = adapterOptions.templatesDir;
        if( adapterOptions.locales.indexOf(locale) > -1 ){
            templatePath += `${locale}/${template}`
        }else {
            templatePath += `${adapterOptions.defaultLocale}/${template}`
        }

        return new Promise((resolve, reject) => {
            ejs.renderFile(templatePath, data, function(err, str){
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(str);
                }
            });
        });
    };

    // Default function to Send mails
    let _sendMail = (mail) => {
        let mailOptions = {
            from: mail.from,
            to: mail.to,
            subject: mail.subject,
            html: mail.html || "",
            text: mail.text || ""
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    };


    // Exported module functions


    // Function fo send custom mails
    let sendEmail = (options) => {
        let mail = {
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: options.text || ""
        };

        if(options.template){
            return renderTemplate(options.template, options.data, options.locale).then((result) => {
                mail.html = result;

                return _sendMail(mail);
            }).catch((e) => {

                return new Promise((resolve, reject) => {
                    console.log(e)
                    reject(e);
                });
            });

        }else {
            throw "Error"
        }
    };


    // Specific function for reset password.  data => {appName, link, user} user is Parse Object
    let sendPasswordResetEmail = (data) => {
        let mail = {
            from: adapterOptions.from,
            subject: 'Reset Password',
            to: getUserEmail(data.user)
        };

        if (adapterOptions.templates && adapterOptions.templates.resetPassword) {

            return renderTemplate(adapterOptions.templates.resetPassword.template, data, data.user.get("locale")).then((result) => {
                mail.html = result;
                mail.subject = adapterOptions.templates.resetPassword.subject;

                return _sendMail(mail);
            }).catch((e) => {

                return new Promise((resolve, reject) => {
                    console.log(e)
                    reject(e);
                });
            });

        } else {
            mail.text = data.link;

            return _sendMail(mail);
        }
    };


    // Specific function for verify email.  data => {appName, link, user}  user is Parse Object
    let sendVerificationEmail = (data) => {
        let mail = {
            from: adapterOptions.from,
            subject: 'Verify Email',
            to: getUserEmail(data.user)
        };

        if (adapterOptions.templates && adapterOptions.templates.verifyEmail) {

            return renderTemplate(adapterOptions.templates.verifyEmail.template, data, data.user.get("locale")).then((result) => {
                mail.html = result;
                mail.subject = adapterOptions.templates.verifyEmail.subject;

                return _sendMail(mail);
            }).catch((e) => {

                return new Promise((resolve, reject) => {
                    console.log(e);
                    reject(e);
                });
            });

        } else {
            mail.text = data.link;

            return _sendMail(mail);
        }
    };

    return Object.freeze({
        sendMail: sendEmail,
        sendPasswordResetEmail: sendPasswordResetEmail,
        sendVerificationEmail: sendVerificationEmail
    });
};

module.exports = MailAdapter;