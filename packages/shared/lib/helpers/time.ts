import { format as formatDate, fromUnixTime, getUnixTime, isSameDay } from 'date-fns';

import { serverTime } from '@proton/crypto';

export type DateFnsOptions = Parameters<typeof formatDate>[2];

export type Options = DateFnsOptions & {
    /**
     * Date format if `unixTime` argument is today. If false then force `format`. 'p' by default.
     */
    sameDayFormat?: string | false;
    /**
     * Date format in general case. 'PP' by default.
     */
    format?: string;
};

/**
 * Convert UNIX timestamp into a readable time. The format of the readable time is:
 * ** Hours and minutes if the UNIX timestamp is from the same day,
 * ** Day, month and year otherwise
 */
export const readableTime = (unixTime: number, options: Options = {}) => {
    let { sameDayFormat, format, ...dateFnsOptions } = options;
    sameDayFormat = sameDayFormat ?? 'p';
    format = format ?? 'PP';

    const date = fromUnixTime(unixTime);

    if (sameDayFormat && isSameDay(date, Date.now())) {
        return formatDate(date, sameDayFormat, dateFnsOptions);
    }

    return formatDate(date, format, dateFnsOptions);
};

export type OptionsWithIntl = {
    /**
     * Locale code string, or an array of such strings like 'en' or 'en-US'.
     */
    localeCode?: string | string[];
    /**
     * Intl format options.
     */
    intlOptions?: Intl.DateTimeFormatOptions;
    /**
     * Intl options if readableTimeIntl `unixTime` argument is today.
     */
    sameDayIntlOptions?: Intl.DateTimeFormatOptions | false;
};

/**
 * Convert UNIX timestamp into a readable time with Intl.DateTimeFormat API. The format of the readable time is:
 * ** Hours and minutes if the UNIX timestamp is from the same day,
 * ** Day, month and year otherwise
 * @param unixTime {number}
 * @param {Object} options
 * @param {Object} [options.intlOptions={month: 'short', day: 'numeric', year: 'numeric'}]
 * @param {Object} [options.sameDayIntlOptions={month: 'short', day: 'numeric', year: 'numeric'}]
 */
export const readableTimeIntl = (unixTime: number, options: OptionsWithIntl = {}) => {
    let { sameDayIntlOptions, localeCode = 'en-US', intlOptions } = options;

    const defaultIntlOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    intlOptions = intlOptions ?? defaultIntlOptions;

    const defaultSameDayOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    sameDayIntlOptions = sameDayIntlOptions ?? defaultSameDayOptions;

    const date = new Date(unixTime * 1000);

    if (sameDayIntlOptions && isSameDay(date, Date.now())) {
        return Intl.DateTimeFormat(localeCode, sameDayIntlOptions).format(date);
    }
    return Intl.DateTimeFormat(localeCode, intlOptions).format(date);
};

export const getCurrentUnixTimestamp = () => {
    return getUnixTime(serverTime());
};
