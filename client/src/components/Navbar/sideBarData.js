export const sideBarData = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
  },

  {
    name: 'Movies',
    path: '/admin/',
    submenu: [
      {
        name: 'Movies',
        path: '/admin/movies',
      },
      {
        name: 'Add Movies',
        path: '/admin/addmovie',
      },
    ],
  },
  {
    name: 'Tv Series',
    path: '/admin/tvseries',
    submenu: [
      {
        name: 'Add Movies',
        path: '/admin/addtvmovie',
      },
    ],
  },
];
