export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_FORM_FIELDS':
      return {
        ...state,
        formFields: action.payload,
      };
    case 'SET_FORM_VALUES':
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload },
      };
    case 'SET_DECISION':
      return {
        ...state,
        postDecision: action.payload,
        showDecisionDialog: true,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'SET_DECISION_DIALOG':
      return {
        ...state,
        showDecisionDialog: action.payload,
      };
    default:
      return state;
  }
};
