import PlayerVOD from 'shared/containers/PlayerVOD';

export default [
  {
    path: '/:country/home/all.php'
  },
  {
    path: '/:country/home/preference.php'
  },
  {
    path: "/:country/register"
  },
  {
    path: "/:country/payment"
  },
  {
    path: "/:country/terms"
  },
  {
    path: "/:country/home/user.php"
  },
  {
    path: "/:country/search"
  },
  {
    path: "/:country/vcard/:id"
  },
  {
    path: "/:country/event/:eventId"
  },
  {
    path: "/:country/vcard/:nodeId/:titleUri/:id"
  },
  {
    path: "/:country/vcard/:nodeId/:id"
  },
  {
    path: "/:country/devices.php"
  },
  {
    path: "/:country/videotutoriales"
  },
  {
    path: "/:country/tutoriales"
  },
  {
    path: "/:country/socialProfile/:socialId"
  },
  {
    path: "/:country/socialProfile"
  },
  {
    path: "/:country/iframe/epg"
  },
  {
    path: "/:country/iframe/channels/grid"
  },
  {
    path: '/:country/download/:groupId'
  },
  {
    path: '/:country/:node',
    component: PlayerVOD,
  },
  {
    path: '/:country/user.php'
  },
  {
    path: '/:country/reminder'
  },
  {
    path: '/:country/reset-password'
  },
  {
    path: '/:country/userdetectwsregister'
  },
  {
    path: '/:country/userdetectwsconfirm'
  },
  {
    path: '/:country/login_redirect'
  },
  {
    path: '/:country/homeuser/foxpluslogin'
  },
  {
    path: '/:country/:node/all.php',
  },
]