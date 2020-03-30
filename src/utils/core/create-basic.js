import mixinsload from '../../mixins/index';
import reprefix from './reprefix';

export default function (sfc) {
  // console.info(sfc);
  // console.info(222222);

  if (sfc.components) {
    Object.keys(sfc.components).forEach(comment => {
      sfc.components[reprefix(comment)] = sfc.components[comment];
      delete sfc.components[comment];
    });
  }

  sfc.mixins = sfc.mixins || [];
  sfc.mixins = [...sfc.mixins, ...mixinsload(sfc)];
  sfc.methods = sfc.methods || {};


  return sfc;
}
