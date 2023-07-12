import React from 'react';
import { AuthContext, T } from './AuthContext';

export function useAuth() {
  return React.useContext(AuthContext) as T;
}
