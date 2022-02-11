import { FormControl, FormHelperText, TextField } from '@material-ui/core';
import React from 'react';

const HTMLInput = ({
  name,
  index,
  handleChange,
  errors,
  formValues,
  ...rest
}: any) => {
  return (
    <FormControl fullWidth>
      <TextField
        defaultValue={formValues[name]}
        key={index}
        onBlur={handleChange}
        onChange={handleChange}
        name={name}
        label={name}
        autoComplete="none"
        {...(errors[name] && { error: true, helperText: errors[name] })}
        {...rest}
      />
      {rest.required && <FormHelperText>Required</FormHelperText>}
    </FormControl>
  );
};

export default HTMLInput;
