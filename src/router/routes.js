const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/IndexPage.vue")
    }],
  },
  {
    path: "/running",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/runningControl/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/dishSelect",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/dishSelect/IndexPage.vue")
      },
    ],
  },
  {
    path: "/dishEdit",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/dishEdit/IndexPage.vue")
      },
    ],
  },
  {
    path: "/dishEdit2",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/dishEdit2/IndexPage.vue")
      },
    ],
  },
  {
    path: "/systemSettings",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/systemSettings/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/overallControl",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/overallControl/IndexPage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
