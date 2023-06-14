import { Box, Container } from '@mui/material';
import { Form, Formik } from 'formik';

import { Switch } from '@/components/common/ui/form';
import Checkbox from '@/components/common/ui/form/checkbox/Checkbox';
import RadioGroup from '@/components/common/ui/form/radio/RadipGroup';

import * as styles from './ControlsTestPage.styles';

const ControlsTestPage = () => {
  const handleChange = (event: any) => {
    console.log(event.target.value);
  };

  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <Box sx={styles.wrapper}>
      <Formik
        initialValues={{
          c0: false,
          c1: false,
          c2: false,
          c3: false,
          c4: false,
          c5: false,
          c6: false,
          r1: false,
          r2: false,
          r3: false,
          r4: false,
          r5: false,
          r6: false,
          r7: false,
        }}
        onSubmit={handleSubmit}
        validateOnMount
      >
        <Form>
          <Container sx={styles.wrapper}>
            <Checkbox name="c0" label="text them" textType="body2Medium" />
            <Checkbox name="c1" label="text them" color="error" />
            <Checkbox name="c2" label="text them" color="lection" />
            <Checkbox name="c3" label="text them" color="practice" />
            <Checkbox name="c4" label="text them" color="laba" />
            <Checkbox
              name="c5"
              label="text them"
              color="event"
              textType="body2Medium"
            />
            <Checkbox
              name="c6"
              label="text disabled controls"
              color="primary"
              disabled={true}
            />
          </Container>
          <br />
          <RadioGroup
            onChange={handleChange}
            options={[
              { value: '1', label: 'так' },
              { value: '0', label: 'ні' },
            ]}
            textType="body1"
            name="r1"
          />
          <br />
          <Box sx={styles.wrapper}>
            <Switch label="Input" />
            <br />
            <Switch label="Input" labelPlacement="start" />
            <br />
            <Switch />
            <br />
            <Switch labelPlacement="start" />
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default ControlsTestPage;
