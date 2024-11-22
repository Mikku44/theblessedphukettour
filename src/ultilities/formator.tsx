export const formatCurrency = (amount:number, currencyCode:string) => {
    const config = {
        'EUR': {
            locale: 'de-DE',
            options: { style: 'currency', currency: 'EUR' }
        },
        'THB': {
            locale: 'th-TH',
            options: { style: 'currency', currency: 'THB' }
        },
        'USD': {
            locale: 'en-US',
            options: { style: 'currency', currency: 'USD' }
        }
    };
    const currencyConfig = config[currencyCode];
    if (!currencyConfig) {
        throw new Error(`Currency code "${currencyCode}" is not supported.`);
    }
    const formatter = new Intl.NumberFormat(currencyConfig.locale, currencyConfig.options);
    return formatter.format(amount);
};