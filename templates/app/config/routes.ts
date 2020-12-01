export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },

  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    // component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './manage/index',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/tblist',
    component: './ListTableList',
  },

  // {
  //   path: '/desktop',
  //   component: './desktop/pageA',
  // },
  // {
  //   path: '/mobile',
  //
  //   component: './mobile/pageA',
  // },

  {
    path: '/manage',

    component: './manage/index',
  },
  // pc 和 mobile 公用一套路由，页面内部去拆分代码
  {
    path: '/index',
    component: './pageA',
  },
  {
    path: '/list',
    component: './sysTemplateMain/list/index',
  },
  {
    path: '/edit',
    component: './sysTemplateMain/edit/index',
  },
  {
    path: '/view',
    component: './sysTemplateMain/view/index',
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    component: './404',
  },
];
