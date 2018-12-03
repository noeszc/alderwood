// class ApaService
// {
//     private $app;

//     /**
//      * @var ApaModel apaModel
//      */
//     private $apaModel;

//     /**
//      * @var string appKeyGeneral
//      */
//     private $appKeyGeneral;

//     /**
//      * @var string appKey
//      */
//     private $appKey;

//     /**
//      * @var string endPoint
//      */
//     private $endPoint;

//     public function __construct($app, $endPoint, $appKeyGeneral)
//     {
//         $this->app = $app;
//         $this->appKeyGeneral = $appKeyGeneral;
//         $this->endPoint = $endPoint . 'services/apa/metadata';
//         $this->config = $this->app->container->get('config')->toArray();
//     }

//     public function setRegion($region)
//     {
//         $this->appKey = $this->appKeyGeneral.'-' . $region;
//     }

//     public function getApaModel()
//     {
//         if ($this->appKey == null) {
//             throwException(new \Exception("Empty appKey, set Region param"));
//         }

//         if ($this->apaModel != null && $this->apaModel->hasData()) {
//             return $this->apaModel; 
//         }

//         $headers = Array (
//             'PARTITION' => getenv('PARTITION')
//         );

//         $params = array_merge([
//             'sessionKey' => $this->appKey,
//         ], $this->config['general']['api_params_default']);

//         $httpClient = $this->app->container->get('httpClient');
//         $httpClient->setUri($this->endPoint);
//         $httpClient->setParameterGet($params);
//         $httpClient->setHeaders($headers);

//         $response = $httpClient->send();
//         $response = $response->getBody();
//         $data = json_decode($response);
//         $this->apaModel = new ApaModel();
//         $this->apaModel->setData($data);

//         return $this->apaModel;
//     }
// }