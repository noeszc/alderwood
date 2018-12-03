// import apaService from 'server/services/enviroment.service';

export function getFooterDataReact(region) {
  return {};
  // apaService.setRegion(region);
  // model = apaService.getApaModel();

  // const filePath = path.resolve(__dirname, '../config/footerReact.json');
  // const footerJ = model.getApaDataByKey('footer_params',file_get_contents(filePath));
  // const array = JSON.parse(footerJ);

  // const footer_data = {
  //   'links': [],
  //   'socials': [],
  //   'contact': [],
  //   'chat': [],
  // };

  // const links_chunks_right = [];
  //   // Links

  // const linksarray = (
  //   array.links[region]
  //   ? array.links[region]
  //   : (
  //       array.links.default
  //       ? array.links.default
  //       : null
  //     )
  //   );
  // if (linksarray) {
  //   const count_group = 4;
  //   const count = linksarray.link.length;

  //   links_chunks = array_chunk(linksarray['link'], count_group);
  //   links_chunks_left = links_chunks[0];
  //   array_shift(links_chunks);
  //   if (count > count_group) {
  //       links_chunks_right = links_chunks[0];
  //   }
  //   footer_data['links'] = ['left' => links_chunks_left, 'right' => links_chunks_right];
  // } else {
  //   footer_data['links'] = ['left' => [], 'right' => []];
  // }

  // foreach ( footer_data['links'] as valor) {
  //   if (is_array( valor)) {
  //     foreach ( valor as &elem) {
  //       if(isset(elem['url']))
  //         elem['url']=  model.getTranslation(this.region,elem['url'] );
  //     }
  //   } else {
  //     valor=  model.getTranslation(this.region,valor);
  //   }

  // }

  // footer_data['socials'] =
  //   isset(array['socials'][this.region])
  //   ? array['socials'][this.region]['social']
  //   : (
  //     isset(array['socials']['default'])
  //     ? array['socials']['default']['social']
  //     : []
  //   );

  // foreach ( footer_data['socials'] as &valor) {
  //   if(isset(valor['url'])) {
  //     valor['url']=  model.getTranslation(this.region,valor['url'] );
  //   }
  // }

  // footer_data['contact'] =
  //   isset(array['contact'][this.region])
  //   ? array['contact'][this.region]
  //   : (
  //     isset(array['contact']['default'])
  //     ? array['contact']['default']
  //     : []
  //   );

  // foreach ( footer_data['contact'] as &valor) {
  //   if(is_array( valor)) {
  //     foreach ( valor as &elem) {
  //       if(isset(elem['url'])) {
  //         elem['url']=  model.getTranslation(this.region,elem['url'] );
  //       }
  //     }
  //   }
  // }

  // footer_data['chat'] = isset(array['chat'][this.region]) ? array['chat'][this.region] : (isset(array['chat']['default']) ? array['chat']['default'] : []);
  // foreach ( footer_data['chat'] as &valor) {
  //   if(is_array( valor))
  //     foreach ( valor as &elem) {
  //       if(isset(elem['url']))
  //         elem['url']=  model.getTranslation(this.region,elem['url'] );
  //     }

  // }

  // return footer_data;
}