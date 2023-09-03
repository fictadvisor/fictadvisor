import { FC } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';

import * as styles from './TextArea.styles';

interface ScheduleTextAreaProps extends TextFieldProps<'standard'> {
  name: string;
}
const TextArea: FC<ScheduleTextAreaProps> = ({ name, ...props }) => {
  const [formikProps, { touched, error }, { setValue, setTouched }] =
    useField(name);

  return (
    <TextField
      {...props}
      {...formikProps}
      variant="standard"
      margin="normal"
      sx={styles.textArea}
      multiline
      rows={3}
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
};

export default TextArea;
