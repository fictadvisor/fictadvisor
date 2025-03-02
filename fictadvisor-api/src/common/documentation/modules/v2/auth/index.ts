import { AuthDocumentationCheckCaptain } from './checkCaptain';
import { AuthDocumentationCheckRegisterTelegram } from './checkRegisterTelegram';
import { AuthDocumentationCheckResetToken } from './checkResetToken';
import { AuthDocumentationForgotPassword } from './forgotPassword';
import { AuthDocumentationLogin } from './login';
import { AuthDocumentationLoginTelegram } from './loginTelegram';
import { AuthDocumentationRefresh } from './refresh';
import { AuthDocumentationRegister } from './register';
import { AuthDocumentationRegisterTelegram } from './registerTelegram';
import { AuthDocumentationResetPassword } from './resetPassword';
import { AuthDocumentationUpdatePassword } from './updatePassword';
import { AuthDocumentationVerifyEmail } from './verifyEmail';
import { AuthDocumentationVerifyExistsByUnique } from './verifyExistsByUnique';
import { AuthDocumentationGetMe } from './getMe';
import { AuthDocumentationRequestEmailVerification } from './requestEmailVerification';


export const AuthDocumentation = {
  CHECK_CAPTAIN: AuthDocumentationCheckCaptain,
  CHECK_REGISTER_TELEGRAM: AuthDocumentationCheckRegisterTelegram,
  CHECK_RESET_TOKEN: AuthDocumentationCheckResetToken,
  FORGOT_PASSWORD: AuthDocumentationForgotPassword,
  GET_ME: AuthDocumentationGetMe,
  LOGIN: AuthDocumentationLogin,
  LOGIN_TELEGRAM: AuthDocumentationLoginTelegram,
  REFRESH: AuthDocumentationRefresh,
  REGISTER: AuthDocumentationRegister,
  REGISTER_TELEGRAM: AuthDocumentationRegisterTelegram,
  RESET_PASSWORD: AuthDocumentationResetPassword,
  REQUEST_EMAIL_VERIFICATION: AuthDocumentationRequestEmailVerification,
  UPDATE_PASSWORD: AuthDocumentationUpdatePassword,
  VERIFY_EMAIL: AuthDocumentationVerifyEmail,
  VERIFY_EXIST_BY_UNIQUE: AuthDocumentationVerifyExistsByUnique,
};
