import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';


export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const localeCookie = cookies().get('locale')?.value;

  // Set a default locale if the cookie is not found
  const locale = localeCookie || 'en';
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});