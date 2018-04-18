import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from 'src/components/Dashboard/Views/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Registration from 'src/components/Dashboard/Views/Registration.vue'
import Data from 'src/components/Dashboard/Views/Data.vue'
import ApplyTeacherReq from 'src/components/Dashboard/Views/ApplyTeacherReq.vue'
import Items from 'src/components/Dashboard/Views/Items.vue'
import AddChild from 'src/components/Dashboard/Views/AddChild.vue'
import Item from 'src/components/Dashboard/Views/Item.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/stats',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'Item',
        name: 'Item',
        component: Item
      },
      {
        path: 'Registration',
        name: 'Registration',
        component: Registration
      },
      {
        path: 'Data',
        name: 'Data',
        component: Data
      },
      {
        path: 'ApplyTeacherReq',
        name: 'Apply Teacher Request',
        component: ApplyTeacherReq
      },
      {
        path: 'stats',
        name: 'User Profile',
        component: UserProfile
      },
      {
        path: 'Items',
        name: 'Items',
        component: Items
      },
      {
        path: 'AddChild',
        name: 'Add Child',
        component: AddChild
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
