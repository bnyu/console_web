import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enUS from './en-us'
import cnZH from './cn-zh'
import jpJA from './jp-ja'

Vue.use(VueI18n)

const messages = {
    'en': enUS,
    'en-us': enUS,
    'us-en': enUS,
    'cn': cnZH,
    'cn-zh': cnZH,
    'zh-cn': cnZH,
    'jp': jpJA,
    'jp-ja': jpJA,
    'ja-jp': jpJA
}

const defaultLang = 'en'

export function getLanguage() {
  const language = (navigator.language || defaultLang).toLowerCase();
  if (language && messages[language]) return language
  return defaultLang
}

const i18n = new VueI18n({
  locale: getLanguage(),
  silentFallbackWarn: process.env.NODE_ENV === 'production',
  fallbackLocale: defaultLang,
  messages
})

export default i18n
