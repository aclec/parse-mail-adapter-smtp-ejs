import {AdapterOptionsInterface, MailOptionsInterface, ParseDataEmailInterface} from "./types";
import {createTransporter} from "./functions/createTransporter";
import {renderTemplate} from "./functions/renderTemplate";
import {_sendMail} from "./functions/_sendMail";

let MailAdapter = (adapterOptions: AdapterOptionsInterface) => {

    // --- Init Transporter ---
    const transporter = createTransporter(adapterOptions.nodeMailerOptions);

    // --- Email Functions ---

    // Email
    const sendEmail = ( options: MailOptionsInterface ) => {

        if(options.template){
            return renderTemplate(options.template, options.data, options.locale, adapterOptions).then((result) => {

                let mail = {
                    from: options.from,
                    to: options.to,
                    subject: options.subject,
                    text: options.text || "",
                    html: result
                };

                return _sendMail(mail, transporter);
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

    // Password
    const sendPasswordResetEmail = ( data: ParseDataEmailInterface ) => {

        if (adapterOptions?.templatesOptions?.templates && adapterOptions?.templatesOptions?.templates?.resetPassword) {

            return renderTemplate(
                adapterOptions.templatesOptions.templates.resetPassword.template,
                {...data, user: data.user.get('email') || data.user.get('username')},
                data.user.get("locale"),
                adapterOptions

            ).then((result) => {

                return _sendMail({
                    from: adapterOptions.defaultFrom,
                    subject: adapterOptions.templatesOptions.templates.resetPassword?.subject || 'Reset Password',
                    to: data.user.get('email') || data.user.get('username'),
                    html: result,
                }, transporter);

            }).catch((e) => {

                return new Promise((resolve, reject) => {
                    console.log(e)
                    reject(e);
                });
            });

        } else {

            return _sendMail({
                from: adapterOptions.defaultFrom,
                subject: adapterOptions.templatesOptions.templates.resetPassword?.subject || 'Reset Password',
                to: data.user.get('email') || data.user.get('username'),
                text: data.link,
            }, transporter);
        }
    }

    // Email Verification
    const sendVerificationEmail = ( data: ParseDataEmailInterface ) => {

        if (adapterOptions?.templatesOptions?.templates && adapterOptions?.templatesOptions?.templates?.resetPassword) {

            return renderTemplate(
                adapterOptions.templatesOptions.templates.verifyEmail.template,
                {...data, user: data.user.get('email') || data.user.get('username')},
                data.user.get("locale"),
                adapterOptions

            ).then((result) => {

                return _sendMail({
                    from: adapterOptions.defaultFrom,
                    subject: adapterOptions.templatesOptions.templates.verifyEmail?.subject || 'Verify Email',
                    to: data.user.get('email') || data.user.get('username'),
                    html: result,
                }, transporter);

            }).catch((e) => {

                return new Promise((resolve, reject) => {
                    console.log(e)
                    reject(e);
                });
            });

        } else {

            return _sendMail({
                from: adapterOptions.defaultFrom,
                subject: adapterOptions.templatesOptions.templates.verifyEmail?.subject || 'Verify Email',
                to: data.user.get('email') || data.user.get('username'),
                text: data.link,
            }, transporter);
        }

    }


    // --- Return Adapter ---
    return Object.freeze({
        sendMail: sendEmail,
        sendPasswordResetEmail: sendPasswordResetEmail,
        sendVerificationEmail: sendVerificationEmail
    })
}

// --- Export Adapter ---
export default MailAdapter;