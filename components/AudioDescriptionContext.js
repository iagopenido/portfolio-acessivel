import { createContext } from 'react';

export const AudioDescriptionContext = createContext({
  enabled: false,
  toggle: () => {}
});
