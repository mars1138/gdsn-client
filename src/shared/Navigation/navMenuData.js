export const navMenuData = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'Products',
    url: '/products',
    submenu: [
      {
        title: 'Active Products',
        url: '/products/active',
        submenu: [
          {
            title: 'Published',
            url: '/products/published',
          },
          {
            title: 'Unpublished',
            url: '/products/unpublished',
          },
        ],
      },
      {
        title: 'Add Product',
        url: '/products/add',
      },
      {
        title: 'Inactive Products',
        url: '/products/inactive',
      },
    ],
  },
  {
    title: 'Services',
    url: '/services',
  },
  {
    title: 'Resources',
    url: '/resources',
    submenu: [
      {
        title: 'Webinars',
        url: '/resources/webinars',
      },
      {
        title: 'Training',
        url: '/resources/training',
      },
      {
        title: 'Support',
        url: '/resources/support',
      },
    ],
  },
  {
    title: 'Price Plans',
    url: '/plans',
  },
  {
    title: 'About',
    url: '/about',
  },
];

export const navMenuDataLoggedOut = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'Services',
    url: '/services',
  },
  {
    title: 'Resources',
    url: '/resources',
    submenu: [
      {
        title: 'Webinars',
        url: '/resources/webinars',
      },
      {
        title: 'Training',
        url: '/resources/training',
      },
      {
        title: 'Support',
        url: '/resources/support',
      },
    ],
  },
  {
    title: 'Price Plans',
    url: '/plans',
  },
  {
    title: 'About',
    url: '/about',
  },
];
