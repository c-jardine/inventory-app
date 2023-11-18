import React from 'react';
import { MaterialDrawerContext } from '../contexts';

export default function useMaterialDrawerContext() {
  const context = React.useContext(MaterialDrawerContext);

  if (context === undefined) {
    throw new Error(
      'useMaterialDrawerContext must be inside a MaterialDrawerContext provider.'
    );
  }

  return context;
}
