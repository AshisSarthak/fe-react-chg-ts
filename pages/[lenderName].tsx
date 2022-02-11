import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Paper,
  Container,
} from '@material-ui/core';

import { NextPage } from 'next';
import { useFetchLenderFields } from './hooks/useFetchLenderFields';
import { usePostValues } from './hooks/usePostValues';
import { useContext } from 'react';
import {
  LenderPageContext,
  LenderPageContextProvider,
} from './context/LenderPageContext';
import HTMLInput from './common/HtmlInput';
import HTMLSelect from './common/HtmlSelect';
import HTMLCheckBox from './common/HtmlCheckBox';
import { useFormControls } from './hooks/useFormControls';

const LenderNamePage: NextPage = () => {
  const {
    state: { formValues },
  } = useContext(LenderPageContext);
  const {
    errors,
    handleCheckboxChange,
    handleInputValue,
    handleSelectChange,
  } = useFormControls();
  const {
    state: { formFields, postDecision, showDecisionDialog },
    dispatch,
  } = useContext(LenderPageContext);
  useFetchLenderFields();
  const { handlePostValues } = usePostValues();
  const { isFormValid } = useFormControls();

  const generateInputsByKey = (field: any, index: number) => {
    const { type } = field;
    switch (type) {
      case 'text':
        return (
          <HTMLInput
            index={index}
            {...field}
            handleChange={handleInputValue}
            errors={errors}
            formValues={formValues}
          />
        );
      case 'checkbox':
        return (
          <HTMLCheckBox
            index={index}
            {...field}
            handleChange={handleCheckboxChange}
            errors={errors}
            formValues={formValues}
          />
        );

      case 'select':
        return (
          <HTMLSelect
            index={index}
            {...field}
            handleChange={handleSelectChange}
            errors={errors}
            formValues={formValues}
          />
        );
    }
  };

  const renderHTMLFields = (field: any, index: number) => {
    if (typeof field === 'string') {
      return generateInputsByKey({ name: field, type: 'text' }, index);
    } else {
      return generateInputsByKey(field, index);
    }
  };

  const handleDecisionDialogClose = () => {
    dispatch({
      type: 'SET_DECISION_DIALOG',
      payload: false,
    });
  };

  return (
    <Paper
      elevation={2}
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        padding: '15px',
        margin: '0 auto',
      }}
    >
      <Container>
        {formFields.map((field: any, index: number) =>
          renderHTMLFields(field, index),
        )}
        <Box
          style={{
            justifyContent: 'flex-end',
            display: 'flex',
            margin: '20px 0',
          }}
        >
          <Button
            onClick={handlePostValues}
            variant="outlined"
            disabled={!isFormValid()}
          >
            Submit
          </Button>
        </Box>
        <Dialog
          open={showDecisionDialog}
          onClose={handleDecisionDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 0,
              height: '150px',
              width: '150px',
            }}
          >
            {postDecision}
          </DialogContent>
        </Dialog>
      </Container>
    </Paper>
  );
};

const WithProvider = () => (
  <LenderPageContextProvider>
    <LenderNamePage />
  </LenderPageContextProvider>
);

export default WithProvider;
