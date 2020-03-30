import { namespace } from '../../config';
import { humpToLine } from '../../utils/library/stringcover';

export default name => {
  const n = name.replace(name[0], name[0].toLowerCase());

  return `${namespace}-${humpToLine(n)}`;
};
