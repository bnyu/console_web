import 'src/css/app.menu.scss'

export default {
  name: 'AppMenu',
  props: {
    path: '',
    menu: Array[Object]
  },
  methods: {
    getMenuView (h, menu, path, level) {
      if (menu.children !== void 0) {
        return h(
          'q-expansion-item',
          {
            staticClass: 'non-selectable',
            ref: path,
            props: {
              label: this.$t(menu.name),
              dense: level > 0,
              icon: menu.icon,
              expandSeparator: true,
              defaultOpened: false,
              switchToggleSide: level > 0,
              denseToggle: level > 0
            }
          },
          menu.children.map(item => this.getMenuView(
            h,
            item,
            path + (item.path !== void 0 ? '/' + item.path : ''),
            level + 1
          ))
        )
      }

      const props = {
        to: path,
        dense: level > 0,
        insetLevel: level > 1 ? 1.25 : level
      }

      const attrs = {}

      if (menu.external === true) {
        Object.assign(props, {
          to: void 0,
          clickable: true,
          tag: 'a'
        })

        attrs.href = menu.path
        attrs.target = '_blank'
      }

      return h('q-item', {
        ref: path,
        props,
        attrs,
        staticClass: 'app-menu-entry non-selectable'
      }, [
        menu.icon !== void 0
          ? h('q-item-section', {
            props: { avatar: true }
          }, [h('q-icon', { props: { name: menu.icon } })])
          : null,

        h('q-item-section', [this.$t(menu.name)]),

        menu.badge !== void 0
          ? h('q-item-section', {
            props: { side: true }
          }, [h('q-badge', [menu.badge])])
          : null
      ])
    }
  },

  render (h) {
    if (this.menu) {
      return h('q-list', { staticClass: 'app-menu' }, this.menu.map(
        item => this.getMenuView(h, item, '/' + item.path, 0)
      ))
    }
  }
}
