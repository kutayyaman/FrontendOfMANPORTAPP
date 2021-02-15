import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Add User': 'Add User',
                'Passwords must match': 'Passwords must match',
                'Loading...': 'Loading...',
                'Name': 'Name',
                'Surname': 'Surname',
                'Email': 'Email',
                'Password': 'Password',
                'Re-Enter-Password': 'Re-Enter-Password',
                'Login': 'Login',
                'Home': 'Home',
                'Dashboard': 'Dashboard',
                'Management': 'Management',
                'Issues': 'Issues',
                'Links': 'Links',
                'Language': 'Language',
                'Logout': 'Logout',
                'Last Issues': 'Last Issues'
            }
        },
        tr: {
            translations: {
                'Add User': 'Kullanıcı Ekle',
                'Passwords must match': 'Şifreler Eşleşmiyor',
                'Loading...': 'Yükleniyor...',
                'Name': 'Ad',
                'Surname': 'Soyad',
                'Email': 'Mail adresi',
                'Password': 'Şifre',
                'Re-Enter-Password': 'Şifre tekrar',
                'Login': 'Giriş Yap',
                'Home': 'Anasayfa',
                'Dashboard': 'Panel',
                'Management': 'Yönetim',
                'Issues': 'Sorunlar',
                'Links': 'Linkler',
                'Language': 'Dil',
                'Logout': 'Çıkış Yap',
                'Last Issues': 'Son Hatalar'
            }
        }
    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});
export default i18n;