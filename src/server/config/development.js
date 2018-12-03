const ENV = process.env.SERVER_ENV;
const localConfig = {
  hostname: 'localhost',
  port: 8081,
  portSSL: 8443,
  app: {
    session: {
      expires: '3600',
      path: '/',
      domain: null,
      secure: false,
      secret: 't6uMo8ouZE9IAL6tgoxhZmDbxb7EYIYv',
    },
    origin_default: 'webclient',
    allow_origin: {
      playerhtml5: 'http://local.clarovideo.com',
      playeredge: 'http://local.clarovideo.com',
      webclient: 'https://local.clarovideo.com',
      webclient_nonssl: 'http://local.clarovideo.com',
    },
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
    api_landing_params_default: {
      applicationId: '814001',
      forceNodo: 'home',
      token: 'MTQ2NzA0NjQ4NQ==',
      cmsDataprovider: 'true',
      forcedeviceType: 'web',
      forcedeviceSubtype: 'generic',
      authpn: 'webclient',
      authpt: 'tfg1h3j4k6fd7',
      format: 'json',
    },
    uuid: '086ae2ab0c0cd3df0e594a88edc2996ddebb9d9e',

    app_key: '531eed34tvfy7b73a818a234',
    facebook_app_id: '393390730742243',
    social_api: {
      url: 'http://social.claromusica.imusica.com.br/',
      keys: {
        public: 'b84e9ac808f9a251b5fd1b65b70ef6d5',
        private: '2a11d9a2bdf5dc2480c66447fd66a5c2',
      },
      timezone: 'UTC',
    },
    metrics: {
      google: {
        tag_manager: {
          GTM: 'GTM-MDNTLG',
        },
      },
    },
  },
  metricas: {
    active: false,
    googletagmanager: 'GTM-WZ73MW',
    googletagmanager_amco: 'GTM-MMB7QS',
    akamai_analytics_config_url:
      'https://ma343-r.analytics.edgekey.net/config/beacon-17415.xml',
    akamai_analytics_config_file_path: '?enableGenericAPI=1',
    akamai_media_server_ip_element: 'serverip',
    newrelic: {
      active: false,
      applicationID: '16700313',
    },
    akamai_analytics_data_std_format: {
      dashwv: 'DASH',
      dashwv_ma: 'DASH',
      dashpr: 'DASH',
      dashpr_ma: 'DASH',
      hls: 'DASH',
      hls_ma: 'L',
      hls_kr: 'L',
      hlsfps: 'L',
      hlsfps_ma: 'L',
      smooth_streaming: 'A',
      smooth_streaming_ma: 'A',
    },
  },
  paths: {
    ...getPaths(ENV),
  },
  player: {
    bufferingtime: '30',
    diffTimeReloadChannel: '1',
    akamaiAnalyticsPlugin:
      'http://79423.analytics.edgesuite.net/SL/archv2/plugins/SSMEv2.0.1572.18/MediaAnalytics.xap',
    akamaiAnalyticsConfig:
      'https://ma343-r.analytics.edgekey.net/config/beacon-17414.xml',
    akamaiAnalyticsUrl: 'https://79423.analytics.edgekey.net/js/csma.js',
    qualityConfig: {
      low: {
        from: '0',
        to: '428000',
        label: 'phtml5_low_quality',
      },
      mid: {
        from: '428000',
        to: '997000',
        label: 'phtml5_mid_quality',
      },
      high: {
        from: '997000',
        to: '2500000',
        label: 'phtml5_high_quality',
      },
      hd: {
        from: '2500000',
        to: '9999999',
        label: 'phtml5_hd_quality',
      },
      auto: {
        label: 'phtml5_auto_quality',
      },
    },
    playerParams: {
      device_category: 'web',
      device_model: 'html5',
      device_type: 'html5',
      // device_so: 'windows',
      device_manufacturer: 'windows',
      api_version: 'v5.82',
      authpn: 'slplayer',
      authpt: '2hjkrco45jhgk',
    },
    streamingTypes: {
      default: {
        type: 'dashwv',
        live_type: 'dashwv',
        video_type: 'application/dash+xml',
        url_certificate:
          'https://widevine-vod-test.clarovideo.net/licenser/getcertificate',
      },
      edge: {
        type: 'dashpr',
        live_type: 'hls_kr',
        video_type: 'application/dash+xml',
        url_certificate: '',
      },
      safari: {
        type: 'hlsfps',
        live_type: 'hls_kr',
        video_type: 'application/x-mpegURL',
        url_certificate:
          'https://fairplaytest.clarovideo.net/ksm/getcertificate',
      },
    },
    licenser_timeout: '30000',
  },
  regions: {
    region: {
      brasil: { lang: 'POR', skin: 'sk_brasil' },
      colombia: { skin: 'sk_colombia' },
      mexico: { skin: 'sk_telmex' },
      chile: { skin: 'sk_chile' },
      argentina: { skin: 'sk_argentina' },
      deutschland: { skin: 'sk_deutschland' },
      dominicana: { skin: 'sk_dominicana' },
      uruguay: { skin: 'sk_uruguay' },
      paraguay: { skin: 'sk_paraguay' },
      peru: { skin: 'sk_peru' },
      ecuador: { skin: 'sk_ecuador' },
      costarica: { skin: 'sk_costarica' },
      guatemala: { skin: 'sk_guatemala' },
      honduras: { skin: 'sk_honduras' },
      elsalvador: { skin: 'sk_elsalvador' },
      nicaragua: { skin: 'sk_nicaragua' },
      panama: { skin: 'sk_panama' },
    },
    region_default_lang: 'ESP',
    region_default_skin: 'sk_telmex',
    region_default: 'mexico',
    region_default_livefilter: '23664',
  },
  seoTools: {
    data_feed: {
      api_url: 'http://www.clarovideo.net',
      api_path: '/services/content/datafeed',
    },
  },
  silverlight: {
    onerror: 'OnErrorEventHandler',
    source: '/webclient/sk_core/swf/PlayerSSV3.xap?rnd=20180618_397_2_3',
    background: 'black',
    minRuntimeVersion: '5.1',
    autoUpgrade: true,
    initparams: {
      autoStart: false,
      allowFullScreen: true,
      defaultAction: 'fullscreen',
      linkTarget: '_blank',
      LicenseServerUri:
        'https://playreadyweb.clarovideo.net/rightsmanager.asmx',
      bufferingtime: 10,
      controlbarvisibilitynormalscreen: true,
      controlbarvisibilityfullscreen: true,
      controlbarvisibilityintervalfullscreen: 5000,
      translatorhelper: 'slPlayerTranslator',
      smoothstreamingqualitybufferdiscard: true,
      timepositionmode: 'toend',
      exitbuttonenabled: true,
      akamaiAnalyticsEnabled: true,
      akamaiAnalyticsPlugin:
        'http://79423.analytics.edgesuite.net/SL/archv2/plugins/SSMEv2.0.1572.18/MediaAnalytics.xap',
      akamaiAnalyticsConfig:
        'http://ma343-r.analytics.edgesuite.net/config/beacon-4442.xml',
      enablegpuacceleration: true,
      enableframeratecounter: true,
      windowless: false,
      maxframerate: 60,
      analyticshelper: 'slPlayerAnalytics',
      informplayerready: 'slPlayerFullReady',
      log: 'logPlayerError',
      sendLog: 'errorReport',
      jsActions: 'slPlayerActions',
      responseencrypted: true,
      css: 0,
      configtype: 'BufferShort',
      preferred_initial_bitrate: 1500000,
      remindbitrate: 'max',
      userollingcredits: true,
      minimalcountdowntonextepisode: 15,
      domainTrackingService: 'http://microfwk.clarovideo.net/services/track/',
      theme: 'claro',
      difftimereloadchannel: 1,
      flaghdenabled: true,
      flagppeenabled: true,
    },
  },
};

function getPaths(env) {
  if (env === 'test') {
    return {
      url_dominio_player: 'http://local.clarovideo.com/',
      url_action_player: '{@region@}/demo/playerview-html5?group_id=',
      url_dominio_ficha: 'https://wwwtest2.clarovideo.com/',
      url_dominio_login: 'https://wwwtest2.clarovideo.com/',
      url_dominio_buscador: 'https://wwwtest2.clarovideo.com/',
      url_dominio_devices: 'https://wwwtest2.clarovideo.com/',
      url_dominio_dataprovider_lang: 'https://wwwtest2.clarovideo.com/',
      url_dominio_dataprovider_player: 'https://wwwtest2.clarovideo.com/',
      url_dominio_webclient: 'https://local.clarovideo.com/',
      url_path_dataprovider_player: 'apis/{@region@}/dataprovider/',
      url_dominio_tracking_player: '',
      url_path_tracking_player: '',
      url_dominio_dataprovider: 'https://wwwtest2.clarovideo.com/',
      url_dominio_microfwk: 'https://mfwkweb-api-test.clarovideo.net/',
      url_dominio_cms: 'http://administradorestest.clarovideo.com/',
      url_ficha_player: {
        default: 'http://local.clarovideo.com/',
        edge: 'http://local.clarovideo.com/',
        safari: 'http://local.clarovideo.com/',
        chrome: 'http://local.clarovideo.com/',
        firefox: 'http://local.clarovideo.com/',
      },
      static_domains: [
        'http://local.clarovideo.com',
        'http://local.clarovideo.com',
      ],
      base_url: '',
      url_dominio_microfwk_player: 'http://microfwk-test.clarovideo.net/',
      api_version: 'v4.91',
      start_header_info_domain:
        'http://start-web.clarovideo.net/apis/dataprovider/startheaderinfo',
      assets_folder: '/dist/assets',
      end_point_apa: 'https://apa-api-web-test.clarovideo.net/',
    };
  }

  return {
    url_dominio_player: 'http://local.clarovideo.com/',
    url_action_player: '{@region@}/demo/playerview-html5?group_id=',
    url_dominio_ficha: 'https://wwwtest2.clarovideo.com/',
    url_dominio_login: 'https://wwwtest2.clarovideo.com/',
    url_dominio_buscador: 'https://wwwtest2.clarovideo.com/',
    url_dominio_devices: 'https://wwwtest2.clarovideo.com/',
    url_dominio_dataprovider_lang: 'https://wwwtest2.clarovideo.com/',
    url_dominio_dataprovider_player: 'https://wwwtest2.clarovideo.com/',
    url_dominio_webclient: 'https://local.clarovideo.com/',
    url_path_dataprovider_player: 'apis/{@region@}/dataprovider/',
    url_dominio_tracking_player: '',
    url_path_tracking_player: '',
    url_dominio_dataprovider: 'https://wwwtest2.clarovideo.com/',
    url_dominio_microfwk: 'https://mfwkweb-api.clarovideo.net/',
    url_dominio_cms: 'http://administradorestest.clarovideo.com/',
    url_ficha_player: {
      default: 'http://local.clarovideo.com/',
      edge: 'http://local.clarovideo.com/',
      safari: 'http://local.clarovideo.com/',
      chrome: 'http://local.clarovideo.com/',
      firefox: 'http://local.clarovideo.com/',
    },
    static_domains: [
      // array de dominios que devuelven el contenido estatico
      'http://local.clarovideo.com',
      'http://local.clarovideo.com',
    ],
    base_url: '',
    url_dominio_microfwk_player: 'http://mfwkweb-api.clarovideo.net/',
    api_version: 'v5.82',
    start_header_info_domain:
      'http://start-web.clarovideo.net/apis/dataprovider/startheaderinfo',
    assets_folder: '/webclient/sk_core',
    end_point_apa: 'https://apa-api-web.clarovideo.net/',
  };
}

export default localConfig;
