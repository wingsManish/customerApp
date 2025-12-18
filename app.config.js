import 'dotenv/config';

const appJson = require('./app.json');

export default ({ config }) => {
  const defaultAuthUrl = 'https://tba-authentication-dev.azurewebsites.net';

  const apiUrl =
    process.env.API_ENDPOINT ||
    appJson.expo?.extra?.apiUrl ||
    defaultAuthUrl;

  const authApiUrl =
    process.env.AUTH_API_ENDPOINT ||
    process.env.API_ENDPOINT ||
    appJson.expo?.extra?.authApiUrl ||
    appJson.expo?.extra?.apiUrl ||
    defaultAuthUrl;

  const clientKey =
    process.env.CLIENT_KEY ||
    appJson.expo?.extra?.clientKey ||
    'customer';

  const authToken =
    process.env.AUTH_TOKEN ||
    appJson.expo?.extra?.authToken ||
    'test';

  const refreshTokenDefault =
    process.env.REFRESH_TOKEN ||
    appJson.expo?.extra?.refreshTokenDefault ||
    '';

  const apiEnabledEnv = process.env.API_ENABLED;
  const apiEnabled =
    apiEnabledEnv !== undefined
      ? apiEnabledEnv === 'true'
      : appJson.expo?.extra?.apiEnabled ?? Boolean(process.env.API_ENDPOINT);

  return {
    ...appJson.expo,
    ...config,
    extra: {
      ...appJson.expo?.extra,
      ...config.extra,
      apiEnabled,
      apiUrl,
      authApiUrl,
      clientKey,
      authToken,
      refreshTokenDefault,
      eas: appJson.expo?.extra?.eas,
      router: appJson.expo?.extra?.router ?? {},
    },
  };
};
