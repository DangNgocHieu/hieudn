export const HTTP_CODES = {
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  TIMEOUT: 504,
};

export const GENDER_LIST_COMMON = [
  {
    key: 1,
    value: "common.gender.male",
  },
  {
    key: 2,
    value: "common.gender.female",
  },
  {
    key: 3,
    value: "common.gender.others",
  },
  {
    key: 4,
    value: "common.gender.no-anwser",
  },
];

export const FORM_KEY = {
  VERIFY_PASSWORD: "VERIFY_PASSWORD",
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  PROFILE_CORPORATE_STEP_ONE: "PROFILE_CORPORATE_STEP_ONE",
  PROFILE_CORPORATE_STEP_SECOND: "PROFILE_CORPORATE_STEP_SECOND",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CHANGE_PROCESS_CORPORATE: "CHANGE_PROCESS_CORPORATE",
  CHANGE_PROCESS_REPRESENTATIVE: "CHANGE_PROCESS_REPRESENTATIVE",
  CHANGE_PROCESS_TRANSACTOR: "CHANGE_PROCESS_TRANSACTOR",
  RESET_PASSWORD: "RESET_PASSWORD",
};

export const LOCALE_KEY = { EN: "en", JA: "ja" };

export const LOCALE = {
  [LOCALE_KEY.EN]: {
    KEY_NAME: "common.language.english",
    CODE: "en",
  },
  [LOCALE_KEY.JA]: {
    KEY_NAME: "common.language.japanese",
    CODE: "jp",
  },
};

export const SCREEN_ID = {
  SIGNUP: "signup",
  SIGNUP_INPUT_BASIC: "signup_input_basic",
  TWO_FA: "2fa-login",
  CHANGE_2FA_METHOD: "2fa_change_2fa",
  CHANGE_SETTING: "2fa_change_setting",
};

export const CHARACTER_ALLOW_PASSWORD = `!"”#$%&'()\\-=^~\\￥|@\`[［「【{;+:*\\]］」】},<.>/?_\\\\`;
