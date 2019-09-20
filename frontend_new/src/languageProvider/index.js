import Enlang from './entries/en-US';
import Zhlang from './entries/zh-Hans-CN';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  en: Enlang,
  zh: Zhlang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.zh.data);

export default AppLocale;
