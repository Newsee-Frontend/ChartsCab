import { idFactory } from '../utils';

export default {
  props: {
    id: { type: String, default: idFactory },
  },
};
