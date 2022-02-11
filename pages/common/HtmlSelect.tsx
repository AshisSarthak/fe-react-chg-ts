import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import React from 'react';

const HTMLSelect = ({
  name,
  index,
  handleChange,
  errors,
  formValues,
  ...rest
}: any) => {
  return (
    <FormControl required={rest.required} fullWidth>
      <InputLabel id={`select-field-${index}`}>{name}</InputLabel>
      <Select
        labelId={`select-field-${index}`}
        id={`select-field-${name}`}
        label="Age"
        onChange={handleChange}
        name={name}
        value={formValues[name]}
        {...rest}
        {...(errors[name] && { error: true, helperText: errors[name] })}
      >
        {rest.options.map((option: any, ind: number) => (
          <MenuItem value={option} key={ind}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {rest.required && <FormHelperText>Required</FormHelperText>}
    </FormControl>
  );
};

export default HTMLSelect;
