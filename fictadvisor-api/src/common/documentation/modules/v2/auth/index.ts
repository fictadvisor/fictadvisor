import { AuthDocumentationCheckCaptain } from './check-captain';
import { AuthDocumentationCheckRegisterTelegram } from './check-register-telegram';
import { AuthDocumentationCheckResetToken } from './check-reset-token';
import { AuthDocumentationForgotPassword } from './forgot-password';
import { AuthDocumentationLogin } from './login';
import { AuthDocumentationLoginTelegram } from './login-telegram';
import { AuthDocumentationRefresh } from './refresh';
import { AuthDocumentationRegister } from './register';
import { AuthDocumentationRegisterTelegram } from './register-telegram';
import { AuthDocumentationResetPassword } from './reset-password';
import { AuthDocumentationUpdatePassword } from './update-password';
import { AuthDocumentationVerifyEmail } from './verify-email';
import { AuthDocumentationVerifyExistsByUnique } from './verify-exists-by-unique';
import { AuthDocumentationGetMe } from './get-me';
import { AuthDocumentationRequestEmailVerification } from './request-email-verification';


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
