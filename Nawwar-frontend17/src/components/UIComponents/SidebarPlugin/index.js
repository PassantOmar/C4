import Sidebar from './SideBar.vue'
// <!-- hanakhod dih-->
const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Overview',
      icon: 'ti-user',
      path: '/admin/Overview'
    },
    {
      name: 'Registration',
      icon: 'ti-pencil-alt2',
      path: '/admin/Registration'
    },
    {
      name: 'Data',
      icon: 'ti-bell',
      path: '/admin/Data'
    },
    {
      name: 'Teacher Request',
      icon: 'ti-write',
      path: '/admin/ApplyTeacherReq'
    },
    {
      name: 'User Profile',
      icon: 'ti-user',
      path: '/admin/stats'
    },
    {
      name: 'Items',
      icon: 'ti-package',
      path: '/admin/Items'
    },
    {
      name: 'Add Child',
      icon: 'ti-face-smile',
      path: '/admin/AddChild'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
