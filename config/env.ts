import 'dotenv/config';

export const env = {
  uiBaseUrl:
    process.env.UI_BASE_URL ?? 'https://www.saucedemo.com',

  apiBaseUrl:
    process.env.API_BASE_URL ?? 'https://dummyjson.com'
};