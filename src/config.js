import config from '../env.param.config';

export const namespace = 'ns';

export const palette = {
  red: {
    color: '#C91C01',
    back: '#FFF1F1',
  },

  green: {
    color: '#0B9354',
    back: '#EDF6F2',
  },

  black: {
    color: '#333',
    back: '#F2F3F6',
  },

  orange: {
    color: '#F55C46',
    back: '#FBEBED',
  },

  purple: {
    color: '#623E7D',
    back: '#e9d6f8',
  },

  Pink: {
    color: '#861B87',
    back: '#f8e0f8',
  },
};

export const env_param_config = () => {
  const env = process.env.NODE_ENV;

  const k = env === 'production' ? 'prod' : 'dev';

  return config[k];
};

export const remUnit = env_param_config().remUnit;
