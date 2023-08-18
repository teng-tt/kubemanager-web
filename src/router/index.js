import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'              the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/index'
  },
  {
	 path: '/dashboard',
	 component: Layout,
	 redirect: '/dashboard/index',
	 name: 'Dashboard',
	 meta: {title: 'dashboard', icon: 'dashboard'},
	 children: [
	 {
		path: 'index',
		name: 'Index',
		component: () => import('@/views/dashboard/index'),
        meta: {title: '仪表盘', icon: 'dashboard'}
	 }
	]
  },
  {
    path: '/node',
    component: Layout,
    redirect: '/node/nodes',
    name: 'Node',
    meta: {title: '节点管理', icon: 'pod'},
    children: [
      {
        path: 'list',
        name: 'NodeList',
        component: () => import('@/views/node/index'),
        meta: {title: '节点列表', icon: 'node'}
      },
      {
        path: 'edit',
        name: 'Node',
        component: () => import('@/views/node/edit'),
        meta: {title: "编辑节点", icon: 'node', activeMenu: "/node/list"},
        hidden: true
      }
    ]
  },
  {
    path: '/pod',
    component: Layout,
    redirect: '/pod/pods',
    name: 'Pod',
    meta: {title: 'Pod管理', icon: 'workload'},
    children: [
      {
        path: 'list',
        name: 'PodList',
        component: () => import('@/views/pod/index'),
        meta: {title: "Pod列表", icon: 'workload'}
      },
      {
        path: 'create',
        name: 'Pod',
        component: () => import('@/views/pod/create'),
        meta: {title: '更新Pod', icon: 'workload', activeMenu: "/pod/list"},
        hidden: true
      }
    ]
  },
  {
    path: '/volume',
    component: Layout,
    redirect: '/volume/configmaps',
    name: 'ConfigMap',
    meta: {title: '存储卷管理', icon: 'data'},
    children: [
      {
        path: 'configmaps',
        name: 'ConfigMaps',
        component: () => import('@/views/configmap/index'),
        meta: {title: 'ConfigMap', icon: 'cm', activeMenu: "/volume/configmaps"}
      },
      {
        path: 'configmap-edit',
        name: 'ConfigMapEdit',
        component: () => import('@/views/configmap/edit'),
        meta: {title: 'ConfigMap', icon: 'cm', activeMenu: "/volume/configmaps"},
        hidden: true,
      },
      {
        path: 'secrets',
        name: 'Secrets',
        component: () => import('@/views/secret/index'),
        meta: {title: 'Secret', icon: 'secret', activeMenu: "/volume/secrets"}
      },
      {
        path: 'secret-edit',
        name: 'SecretEdit',
        component: () => import('@/views/secret/edit'),
        meta: {title: 'Secret', icon: 'secret', activeMenu: "/volume/secrets"},
        hidden: true,
      },
      {
        path: 'pvs',
        name: 'PersistentVolume',
        component: () => import('@/views/pv/index'),
        meta: {title: 'PersistentVolume', icon: 'pv', activeMenu: "/volume/pvs"}
      },
      {
        path: 'pv-edit',
        name: 'PVEdit',
        component: () => import('@/views/pv/edit'),
        meta: {title: '编辑PV', icon: 'pv', activeMenu: "/volume/pvs"},
        hidden: true,
      },
      {
        path: 'pvcs',
        name: 'PersistentVolumeClaim',
        component: () => import('@/views/pvc/index'),
        meta: {title: 'PersistentVolumeClaim', icon: 'pvc', activeMenu: "/volume/pvcs"}
      },
      {
        path: 'pvc-edit',
        name: 'PVCEdit',
        component: () => import('@/views/pvc/edit'),
        meta: {title: '编辑PVC', icon: 'pvc', activeMenu: "/volume/pvcs"},
        hidden: true,
      },
      {
        path: 'scs',
        name: 'StorageClass',
        component: () => import('@/views/sc/index'),
        meta: {title: 'StorageClass', icon: 'sc', activeMenu: "/volume/scs"}
      },
      {
        path: 'sc-edit',
        name: 'SCEdit',
        component: () => import('@/views/sc/edit'),
        meta: {title: '编辑SC', icon: 'pvc', activeMenu: "/volume/scs"},
        hidden: true,
      },
    ]
  },
  {
    path: '/discovery',
    component: Layout,
    redirect: '/discovery/services',
    name: 'Discovery',
    meta: {title: '服务发现', icon: 'discovery'},
    children: [
      {
        path: 'services',
        name: 'Services',
        component: () => import('@/views/svc/index'),
        meta: {title: 'Service', icon: 'svc', activeMenu: "/discovery/services"}
      },
      {
        path: 'service-edit',
        name: 'Services',
        component: () => import('@/views/svc/edit'),
        meta: {title: 'Service', icon: 'svc', activeMenu: "/discovery/services"},
        hidden: true
      },
      {
        path: 'ingresses',
        name: 'Ingress',
        component: () => import('@/views/ingress/index'),
        meta: {title: 'Ingress', icon: 'ingress', activeMenu: "/discovery/ingresses"}
      },
      {
        path: 'ingress-edit',
        name: 'Ingress',
        component: () => import('@/views/ingress/edit'),
        meta: {title: 'Ingress', icon: 'ingress', activeMenu: "/discovery/ingresses"},
        hidden: true
      },
      {
        path: 'ingroutes',
        name: 'IngRoute',
        component: () => import('@/views/ingroute/index'),
        meta: {title: 'IngressRoute', icon: 'ingroute', activeMenu: "/discovery/ingroutes"}
      },
      {
        path: 'ingroute-edit',
        name: 'IngRoute',
        component: () => import('@/views/ingroute/edit'),
        meta: {title: 'IngressRoute', icon: 'ingroute', activeMenu: "/discovery/ingroutes"},
        hidden: true
      },
    ]
  },
  {
    path: '/workload',
    component: Layout,
    redirect: '/workload/deployments',
    name: 'Discovery',
    meta: {title: '工作负载管理', icon: 'workload'},
    children: [
      {
        path: 'deployments',
        name: 'Deployment',
        component: () => import('@/views/deployment/index'),
        meta: {title: 'Deployment', icon: 'workload', activeMenu: "/workload/deployments"}
      },
      {
        path: 'deployment-edit',
        name: 'Deployment',
        component: () => import('@/views/deployment/edit'),
        meta: {title: 'Deployment', icon: 'workload', activeMenu: "/workload/deployments"},
        hidden: true
      },
      {
        path: 'daemonsets',
        name: 'DaemonSet',
        component: () => import('@/views/daemonset/index'),
        meta: {title: 'DaemonSet', icon: 'workload', activeMenu: "/workload/daemonsets"}
      },
      {
        path: 'daemonset-edit',
        name: 'DaemonSet',
        component: () => import('@/views/daemonset/edit'),
        meta: {title: 'DaemonSet', icon: 'workload', activeMenu: "/workload/daemonsets"},
        hidden: true
      },
      {
        path: 'statefulsets',
        name: 'StatefulSet',
        component: () => import('@/views/statefulset/index'),
        meta: {title: 'StatefulSet', icon: 'workload', activeMenu: "/workload/statefulsets"}
      },
      {
        path: 'statefulset-edit',
        name: 'StatefulSet',
        component: () => import('@/views/statefulset/edit'),
        meta: {title: 'StatefulSet', icon: 'workload', activeMenu: "/workload/statefulsets"},
        hidden: true
      },
      {
        path: 'jobs',
        name: 'Job',
        component: () => import('@/views/job/index'),
        meta: {title: 'Job', icon: 'workload', activeMenu: "/workload/jobs"}
      },
      {
        path: 'job-edit',
        name: 'Job',
        component: () => import('@/views/job/edit'),
        meta: {title: 'Job', icon: 'workload', activeMenu: "/workload/jobs"},
        hidden: true
      },
      {
        path: 'cronjobs',
        name: 'CronJob',
        component: () => import('@/views/cronjob/index'),
        meta: {title: 'CronJob', icon: 'workload', activeMenu: "/workload/cronjobs"}
      },
      {
        path: 'cronjob-edit',
        name: 'CronJob',
        component: () => import('@/views/cronjob/edit'),
        meta: {title: 'CronJob', icon: 'workload', activeMenu: "/workload/cronjobs"},
        hidden: true
      },
    ]
  },
  {
    path: '/rbac',
    component: Layout,
    redirect: '/rbac/salist',
    name: 'Rbac',
    meta: {title: 'RABC', icon: 'secret'},
    children: [
      {
        path: 'salist',
        name: 'ServiceAccounts',
        component: () => import('@/views/sa/index'),
        meta: {title: 'ServiceAccount', icon: 'secret', activeMenu: "/rbac/salist"}
      },
      {
        path: 'sa-edit',
        name: 'ServiceAccounts',
        component: () => import('@/views/sa/edit'),
        meta: {title: 'ServiceAccount', icon: 'secret', activeMenu: "/rbac/salist"},
        hidden: true
      },
      {
        path: 'rolelist',
        name: 'Role',
        component: () => import('@/views/role/index'),
        meta: {title: 'Role', icon: 'secret', activeMenu: "/rbac/rolelist"}
      },
      {
        path: 'role-edit',
        name: 'Role',
        component: () => import('@/views/role/edit'),
        meta: {title: 'Role', icon: 'secret', activeMenu: "/rbac/rolelist"},
        hidden: true
      },
      {
        path: 'rblist',
        name: 'RoleBinding',
        component: () => import('@/views/rb/index'),
        meta: {title: 'RoleBinding', icon: 'secret', activeMenu: "/rbac/rblist"}
      },
      {
        path: 'rb-edit',
        name: 'RoleBinding',
        component: () => import('@/views/rb/edit'),
        meta: {title: 'RoleBinding', icon: 'secret', activeMenu: "/rbac/rblist"},
        hidden: true
      },
    ],
  },
  {
    path: '/harbor',
    component: Layout,
    redirect: '/harbor/projects',
    name: 'Harbor',
    meta: {title: 'Harbor', icon: 'harbor'},
    children: [
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/views/harbor/project'),
        meta: {title: 'Harbor', icon: 'harbor', activeMenu: "/harbor/projects"}
      },
      {
        path: 'repositories',
        name: 'Repositories',
        component: () => import('@/views/harbor/repository'),
        meta: {title: 'Repository', icon: 'secret', activeMenu: "/harbor/projects"},
        hidden: true
      },
      {
        path: 'artifacts',
        name: 'Artifacts',
        component: () => import('@/views/harbor/artifact'),
        meta: {title: 'Artifact', icon: 'secret', activeMenu: "/harbor/projects"},
        hidden: true
      },
    ]
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require svc support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
