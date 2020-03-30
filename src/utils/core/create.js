/**
 * Create a component with common options
 */
import createBasic from './create-basic';
import Layout from '../../Layout/Layout';

export default function(sfc) {
  sfc.components = Object.assign(sfc.components || {}, {
    Layout,
  });

  return createBasic(sfc);
}
