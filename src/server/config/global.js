const globalConfig = {
  app: {
    site_name: 'Clarovideo',
    site_strapline: 'Clarovideo',
    session: {
      expires: '864000',
      lifetime: '864000',
      path: '/',
      domain: null,
      secure: false,
      httponly: false,
      secret: 't6uMo8ouZE9IAL6tgoxhZmDbxb7EYIYv',
    },
    url_scheme: 'https://',
  },
  'cache-control': {
    default: 'max-age=3600,!no-store,!bypass-cache',
    index: 'max-age=21600,!no-store,!bypass-cache',
    levels: 'max-age=21600,!no-store,!bypass-cache',
    landing: 'max-age=21600,!no-store,!bypass-cache',
    card: 'max-age=21600,!no-store,!bypass-cache',
    login: 'max-age=21600,!no-store,!bypass-cache',
    rest: 'no-store',
    tools: 'no-store',
    user: 'no-store',
    tooltip: 'max-age=21600,!no-store,!bypass-cache',
    predictivesearch: 'max-age=21600,!no-store,!bypass-cache',
    debug: 'no-store',
  },
  general: {
    api_params_default: {
      device_id: 'web',
      device_category: 'web',
      device_manufacturer: 'generic',
      device_model: 'web',
      device_type: 'web',
      api_version: 'v5.82',
      authpn: 'webclient',
      authpt: 'tfg1h3j4k6fd7',
      format: 'json',
    },
    uuid: '086ae2ab0c0cd3df0e594a88edc2996ddebb9d9e',
    app_key: '531eed34tvfy7b73a818a234',
    facebook_app_id: '407287369327882',
    chat: {
      mexico: {
        enable: true,
        url:
          'http://chat.clientesweb.net/clarovideo/clientesweb/clarovideo/default.aspx?department=7067',
      },
      chile: {
        enable: true,
        url: 'http://clarochile.custhelp.com/app/chat/chat_clarovideo',
      },
      default: {
        enable: false,
        url:
          'http://chat.clientesweb.net/clarovideo/clientesweb/clarovideo/default.aspx?department=7067',
      },
    },
    metrics: {
      google: {
        tag_manager: {
          GTM: 'GTM-MDNTLG',
        },
      },
    },
  },
  partials: {
    carrousel: {
      default: 'Helpers/carrouselsection.phtml',
      highlight: 'Helpers/carrousel-highlight.phtml',
      listadoinfinito: 'Helpers/listadoinfinito.phtml',
      especial3: 'Helpers/especial3.phtml',
      fox: 'Helpers/carrouselfox.phtml',
    },
  },
  paths: {
    // 'cssversion' : '1.1.9_1',
    // 'jsversion' : '1.1.9_1',
    base_url: '/playerhtml5',
    api_paths: {
      login: 'services/user/login',
      check_login: 'services/user/isloggedin',
      logout: 'services/user/logout',
      cms_level: 'services/cms/level',
      loginSocial: 'services/user/sociallogin',
      cms_landing: 'services/cms/landing',
      terms_conditions: 'services/user/settermsandconditions',
      preview_cms_landing: 'fe/sitesplus/mexico/landing/preview',
    },
    landing_type: 'landingslide',
    url_dominio_http: 'http://local.clarovideo.com/',
  },
  seoTools: {
    data_feed: {
      api_url: 'http://www.clarovideo.net',
      api_path: '/services/content/datafeed',
    },
  },
  silverlight: {
    onerror: 'OnErrorEventHandler',
    source: '/webclient/sk_core/swf/PlayerSSV3.xap?31450',
    background: 'black',
    minRuntimeVersion: '5.1.10411.0',
    autoUpgrade: true,
    initparams:
      'autoStart=false,allowFullScreen=true,defaultAction=fullscreen,linkTarget=_blank,LicenseServerUri=http://10.9.0.188/PRSimpleLicenser152/rightsmanager.asmx,bufferingtime=10,controlbarvisibilitynormalscreen=true,controlbarvisibilityfullscreen=true,controlbarvisibilityintervalfullscreen=5000,translatorhelper=slPlayerTranslator,smoothstreamingqualitybufferdiscard=true,theme=claro,timepositionmode=toend,exitbuttonenabled=true,akamaiAnalyticsEnabled=true,akamaiAnalyticsPlugin=http://79423.analytics.edgesuite.net/SL/archv2/plugins/SSMEv2.0.1572.18/MediaAnalytics.xap,akamaiAnalyticsConfig=http://ma343-r.analytics.edgesuite.net/config/beacon-4442.xml,enablegpuacceleration=true,enableframeratecounter=true,windowless=false,maxframerate=60,analyticshelper=slPlayerAnalytics,informplayerready=slPlayerFullReady,log=logPlayerError,sendLog=errorReport,jsActions=slPlayerActions,authpn=slplayer,authpt=2hjkrco45jhgk,responseencrypted=true,css=0,contentId=,configtype=BufferShort,userollingcredits=true,api_version=v4.1,region=mexico,groupId=545419,preview=true,urlDataProvider=http://wwwtest.clarovideo.com/apis/mexico/dataprovider/,urlMicroFwk=http://mfwkweb-api-test.clarovideo.net/services/',
  },
};

export default globalConfig;
