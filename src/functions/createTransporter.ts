import nodemailer = require("nodemailer");

export interface AdapterOptionInterface{
    host: string,
    port: number,
    secure: boolean,
    auth?: {
        user: string,
        pass: string
    },
    tls?: {
        ciphers?: string,
        maxVersion?: string,
        minVersion?: string
    },
    otherProps?: {
        [key: string]: any
    }
}

export function createTransporter(adapterOptions: AdapterOptionInterface){

    return nodemailer.createTransport({
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

}