import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n.use(HttpBackend) // Подключение загрузчика переводов
    .use(LanguageDetector) // Определение языка (например, из localStorage, cookie или браузера)
    .use(initReactI18next) // Подключение React
    .init({
        fallbackLng: "en", // Язык по умолчанию
        debug: true, // Установите false в продакшене
        interpolation: {
            escapeValue: false, // React уже экранирует значения
        },
        backend: {
            loadPath: "/locales/{{lng}}/translation.json", // Путь к файлам переводов
        },
    });

export default i18n;
