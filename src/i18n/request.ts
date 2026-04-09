import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "./config";

export default getRequestConfig(async () => {
  // Obtener locale desde cookie o header Accept-Language
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value as Locale | undefined;

  let locale: Locale = defaultLocale;

  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    // Detectar desde Accept-Language header
    const headersList = await headers();
    const acceptLang = headersList.get("accept-language");
    if (acceptLang?.startsWith("en")) {
      locale = "en";
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
