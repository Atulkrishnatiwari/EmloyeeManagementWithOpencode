import React, { createContext, useContext } from 'react';
import type { ApiMode } from '../services/employeeApi';

type ApiModeContextValue = {
  apiMode: ApiMode;
  setApiMode: (mode: ApiMode) => void;
};

const ApiModeContext = createContext<ApiModeContextValue>({
  apiMode: 'rest',
  setApiMode: () => {},
});

export const ApiModeProvider = ApiModeContext.Provider;

export function useApiMode() {
  return useContext(ApiModeContext);
}
