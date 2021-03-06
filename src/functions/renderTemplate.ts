import {AdapterOptionsInterface} from "../types";
import * as ejs from "ejs";

export const renderTemplate = (
    template: string,
    data: {[key: string]: string} | undefined,
    locale: string | undefined,
    adapterOptions: AdapterOptionsInterface
) => {

    let templatePath = adapterOptions.templatesOptions.templatesDir;

    if( adapterOptions.templatesOptions.locales.indexOf(locale || "$$") > -1 ){
        templatePath += `${locale}/${template}`
    }else {
        templatePath += `${adapterOptions.templatesOptions.defaultLocale}/${template}`
    }


    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, data || {}, function(err, str){
            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve(str);
            }
        });
    });

}