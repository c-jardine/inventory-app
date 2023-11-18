import React from 'react';

export const MaterialDrawerContext = React.createContext<
  | {
      screen: 'DETAILS' | 'EDIT';
      setScreen: React.Dispatch<React.SetStateAction<'DETAILS' | 'EDIT'>>;
    }
  | undefined
>(undefined);

export function MaterialDrawerContextProvider(props: {
  children: React.ReactNode;
}) {
  const [screen, setScreen] = React.useState<'DETAILS' | 'EDIT'>('DETAILS');

  return (
    <MaterialDrawerContext.Provider value={{ screen, setScreen }}>
      {props.children}
    </MaterialDrawerContext.Provider>
  );
}
