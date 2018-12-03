import config from 'server/config/main.config';

function index (req, res) {
  res.render('main', {
    reduxState: {
      config: config.general,
    },
  });
}

export default index;
