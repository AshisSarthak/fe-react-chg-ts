import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@material-ui/core';
import React from 'react';

const HTMLCheckBox = ({
  name,
  index,
  handleChange,
  errors,
  formValues,
  ...rest
}: any) => {
  return (
    <FormGroup>
      <FormControlLabel
        checked={formValues[name]}
        control={<Checkbox onChange={handleChange} name={name} />}
        label={name}
        {...(errors[name] && { error: true, helperText: errors[name] })}
        {...rest}
      />
      {rest.required && <FormHelperText>Required</FormHelperText>}
    </FormGroup>
  );
};

export default HTMLCheckBox;
