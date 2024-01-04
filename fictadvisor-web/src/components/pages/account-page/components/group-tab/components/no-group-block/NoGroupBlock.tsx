import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';

import Alert from '@/components/common/ui/alert';
import { AlertType } from '@/components/common/ui/alert/types';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import Checkbox from '@/components/common/ui/form/with-formik/checkbox';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import Progress from '@/components/common/ui/progress';
import { transformGroups } from '@/components/pages/account-page/components/group-tab/components/no-group-block/utils';
import { validationSchema } from '@/components/pages/account-page/components/group-tab/components/no-group-block/validation';
import useAuthentication from '@/hooks/use-authentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { RequestNewGroupBody } from '@/lib/api/user/types/RequestNewGroupBody';
import UserAPI from '@/lib/api/user/UserAPI';
import theme from '@/styles/theme';
import { UserGroupState } from '@/types/user';

import * as muiStyles from './NoGroupBlock.styles';

const NoGroupBlock: FC = () => {
  const isTablet = useMediaQuery(theme.breakpoints.down('mobileMedium'));
  const { displayError } = useToastError();
  const { user, update } = useAuthentication();
  const { isLoading, data } = useQuery(['groups'], () => GroupAPI.getAll(), {
    refetchOnWindowFocus: false,
  });
  const handleSubmitGroup = async (data: RequestNewGroupBody) => {
    try {
      await UserAPI.requestNewGroup(data, user.id);
      await update();
    } catch (error) {
      displayError(error);
    }
  };

  if (isLoading) return <Progress />;

  if (!data) return null;

  return (
    <Box sx={muiStyles.content}>
      {user.group?.state === UserGroupState.PENDING ? (
        <>
          <Box>
            <Typography sx={muiStyles.textContent} variant="h4">
              {user.group.code}
            </Typography>
          </Box>
          <Box sx={muiStyles.alertDesktopPending}>
            <Alert
              title="Твоя заявка ще не прийнята, очікуй підтвердження"
              type={AlertType.INFO}
            />
          </Box>
          <Box>
            <Divider
              sx={muiStyles.divider}
              text="Або обери іншу групу"
              textAlign={
                isTablet ? DividerTextAlign.LEFT : DividerTextAlign.CENTER
              }
            />
          </Box>
        </>
      ) : (
        <>
          <Box sx={muiStyles.alertDesktop}>
            <Alert
              title={'Твоя заявка відхилена'}
              type={AlertType.ERROR}
              description={'Обери іншу групу нижче та надішли новий запит'}
            />
          </Box>
          <Box sx={muiStyles.alertMobile}>
            <Alert title={'Твоя заявка відхилена'} type={AlertType.ERROR} />
          </Box>
        </>
      )}
      <Formik
        initialValues={{ groupId: '', isCaptain: false }}
        onSubmit={handleSubmitGroup}
        validateOnMount
        validateOnChange
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form>
            <FormikDropdown
              options={transformGroups(data.groups)}
              label="Група"
              name="groupId"
              placeholder="вибери зі списку"
            />
            <Checkbox label="Староста" name="isCaptain" />
            <Button
              text="Надіслати запит"
              type="submit"
              size={ButtonSize.SMALL}
              disabled={!isValid}
              sx={muiStyles.buttonGroup}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default NoGroupBlock;
