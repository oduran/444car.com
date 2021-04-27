import { addLocale, useLocale } from 'ttag';
import * as cookie from './cookie';
const translationsObj = require(`./locales/tr.po.json`);

const LOCALE_COOKIE = '__locale';

export function getLocale() {
    return cookie.get(LOCALE_COOKIE) || 'en';
}

export function saveLocale(locale) {
    cookie.set(LOCALE_COOKIE, locale);
}

// setup
const locale = getLocale();

if (locale !== 'en') {
    //const translationsObj = require(`./locales/${locale}.json`);
    addLocale(locale, translationsObj);
    //addLocale(locale, localeData);
    useLocale(locale);
}