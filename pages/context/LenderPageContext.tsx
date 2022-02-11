import React, { useReducer, createContext } from 'react';
import { reducer } from './reducer';

const initialState = {
  formFields: [],
  formValues: {},
  postDecision: {},
  errors: undefined,
  showDecisionDialog: false,
};

interface LenderPageContextProps {
  state: any;
  dispatch: any;
}

const LenderPageContext = createContext<LenderPageContextProps>({
  state: initialState,
  dispatch: {},
});
LenderPageContext.displayName = 'LenderPageContext';

function LenderPageContextProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LenderPageContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LenderPageContext.Provider>
  );
}

export { LenderPageContext, LenderPageContextProvider };
