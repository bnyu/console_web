// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'i18n',
      'axios'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-us', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',

      // use in render, auto-import no work
      components: [
        'QList',
        'QItem',
        'QExpansionItem',
        'QItemSection',
        'QItemLabel',
        'QIcon',
        'QBadge'
      ],
      directives: [],

      // Quasar plugins
      plugins: []
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      env: ctx.dev
        ? { // build (development):
          API_BASE_URL: JSON.stringify('http://127.0.0.1:21011')
        }
        : { // build (production):
          API_BASE_URL: JSON.stringify('http://127.0.0.1:21011')
        },

      scopeHoisting: true,
      // vueRouterMode: 'history',
      // showProgress: false,
      // gzip: true,
      // analyze: true,
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
      }
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      // https: true,
      port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: []

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    // ssr: {
    //   pwa: false
    // },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    // pwa: {
    //   // workboxPluginMode: 'InjectManifest',
    //   // workboxOptions: {}, // only for NON InjectManifest
    //   manifest: {
    //     // name: 's1_gate_console_v2',
    //     // short_name: 's1_gate_console_v2',
    //     // description: 's1_gate_console_v2',
    //     display: 'standalone',
    //     orientation: 'portrait',
    //     background_color: '#ffffff',
    //     theme_color: '#027be3',
    //     icons: [
    //       {
    //         'src': 'statics/icons/icon-128x128.png',
    //         'sizes': '128x128',
    //         'type': 'image/png'
    //       },
    //       {
    //         'src': 'statics/icons/icon-192x192.png',
    //         'sizes': '192x192',
    //         'type': 'image/png'
    //       },
    //       {
    //         'src': 'statics/icons/icon-256x256.png',
    //         'sizes': '256x256',
    //         'type': 'image/png'
    //       },
    //       {
    //         'src': 'statics/icons/icon-384x384.png',
    //         'sizes': '384x384',
    //         'type': 'image/png'
    //       },
    //       {
    //         'src': 'statics/icons/icon-512x512.png',
    //         'sizes': '512x512',
    //         'type': 'image/png'
    //       }
    //     ]
    //   }
    // },

    // https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    // cordova: {
    //   // id: 's1_gate_console_v2',
    //   // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    // },

    // https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    // electron: {
    //   // bundler: 'builder', // or 'packager'
    //
    //   extendWebpack (cfg) {
    //     // do something with Electron main process Webpack cfg
    //     // chainWebpack also available besides this extendWebpack
    //   },
    //
    //   packager: {
    //     // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
    //
    //     // OS X / Mac App Store
    //     // appBundleId: '',
    //     // appCategoryType: '',
    //     // osxSign: '',
    //     // protocol: 'myapp://path',
    //
    //     // Windows only
    //     // win32metadata: { ... }
    //   },
    //
    //   builder: {
    //     // https://www.electron.build/configuration/configuration
    //
    //     // appId: 's1_gate_console_v2'
    //   }
    // }
  }
}
