import { LenderPageContext } from 'pages/context/LenderPageContext';
import { useContext, useState } from 'react';

export const useFormControls = () => {
  const [errors, setErrors] = useState([] as any);
  const {
    state: { formFields, formValues },
    dispatch,
  } = useContext(LenderPageContext);

  const handleInputValue = (e: any) => {
    const { name, value, required } = e.target;

    if (required) {
      if (!value) {
        setErrors({
          ...errors,
          [name]: `${name} can not be blank`,
        });
      }
    }
    dispatch({
      type: 'SET_FORM_VALUES',
      payload: {
        [name]: value,
      },
    });
  };

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;

    dispatch({
      type: 'SET_FORM_VALUES',
      payload: { [name]: checked },
    });
  };

  const handleSelectChange = (e: any) => {
    const { name, value, required } = e.target;

    dispatch({
      type: 'SET_FORM_VALUES',
      payload: { [name]: value },
    });
    if (required) {
      if (!value) {
        setErrors({
          ...errors,
          [name]: `${name} can not be blank`,
        });
      }
    }
  };

  const isFormValid = () => {
    if (typeof formFields[0] === 'string') {
      return false;
    }

    const invalidFields = formFields.find(
      (field: any) =>
        field.required &&
        (!formValues[field.name] || formValues[field.name] === ''),
    );
    return invalidFields ? invalidFields.length : 1;
  };

  return {
    handleInputValue,
    handleCheckboxChange,
    handleSelectChange,
    errors,
    isFormValid,
  };
};
