import { CONFIG } from '../lib/config';

export const getClientSideConfig = () => {
  return (typeof window !== 'undefined' &&
    JSON.parse(
      document.getElementById('APP_CONFIG')?.innerText || '{}'
    )) as CONFIG;
};

const useConfig = () => getClientSideConfig();

export default useConfig;
