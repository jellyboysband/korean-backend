const UserService = require('../../app/services/UserService');

const { userSalt, userJwtKey } = require('../../app/config');

const PasswordManager = require('../../app/utils/PasswordManager');
const userPasswordManager = new PasswordManager(userSalt);
const JwtManager = require('../../app/utils/JwtManager');
const userJwtManager = new JwtManager(userJwtKey);

// const testCredentials = {
//   access_token:
//     'ya29.GltBB9O6qTHCjIGWsNvCwt0tsFXtUK_ts-39qHsiwTjf6ZALkJDIs_EJhNi4GJijPeBFR0X4J8zxowETl2Z9ybP_54YuUjba4NAG8Po0qWH0AqlD1dFy_txil3en',
//   refresh_token: '1/Yt7fGClVHfx4eG3Lsi7JD3tMoI9TDggC9NpdvfYO-BI',
//   scope:
//     'https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.reproductive_health.write https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/fitness.blood_glucose.write https://www.googleapis.com/auth/fitness.blood_pressure.write https://www.googleapis.com/auth/fitness.location.write https://www.googleapis.com/auth/fitness.activity.write https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/fitness.oxygen_saturation.write https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.nutrition.write openid https://www.googleapis.com/auth/fitness.body_temperature.write https://www.googleapis.com/auth/fitness.body_temperature.read',
//   token_type: 'Bearer',
//   id_token:
//     'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlNTUwOGQyNzk2NWFkNzkwN2MyMzIyMTJkZWZhNDhlZDc2MzcyN2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NzYyNDQxNjY1Mjgtb3I5YTdudWtwbGxoanQ0N3ZqcWExaWJtZXBkaG5jdXAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NzYyNDQxNjY1Mjgtb3I5YTdudWtwbGxoanQ0N3ZqcWExaWJtZXBkaG5jdXAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcyMTIzMTg2ODY5MDkzMjA0NDgiLCJlbWFpbCI6Imtvc3RlbjgxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlhOV053NnV6VmpfbldZUllwaEF0eHciLCJuYW1lIjoiSm9obiBTbWl0aCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLXFzaE5Kc1J0dmVNL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmN2NUVhb3NBMUN3clViNUh1X1RKU1RRak92aVEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IlNtaXRoIiwibG9jYWxlIjoicnUiLCJpYXQiOjE1NjI3NTUyNzIsImV4cCI6MTU2Mjc1ODg3Mn0.SZdM7RAP0NoA2pKVQy60p7CYWsKYFfWDdNxG6KcnLUUfAEm3wzePxFL7m_8KEVJxiEml2j4oNlWZBdRF3ATTiT5QL1VBP-5kugIHPd9-a51iGbWqDbDroo0FjX5lEHp3TyT-2HsjVcduiRycB99jt1c-_69qJ_MfOH4aux2HtIJEXyEDukcOC3mWA3hXLtdWkxCsP55aoj-3-f5jjLEaayO3YrEbcIM_QZrKKBfHjOOQKMZ74wZVkzMVpQ9pUWE7rcBhASXNE0Z0JnxzVrKqSXkphb7oUdXMLjQp1HJj66APmBCj_5xD7xqcBkaWINsq7Q07ViFJsihTRT7BShrosA',
//   expiry_date: 1562758872315
// };
// const { google } = require('googleapis');
// const oauth2Client = new google.auth.OAuth2(
//   '776244166528-or9a7nukpllhjt47vjqa1ibmepdhncup.apps.googleusercontent.com',
//   '1iEhUxNK3y724Otchq-pr0qn',
//   ''
// );
// oauth2Client.setCredentials(testCredentials);

const idToken =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0ZjI5NGM0NTE2MDA4OGQwNzlmZWU2ODEzOGY1MjEzM2QzZTIyOGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NzYyNDQxNjY1MjgtdGJzdWRoNjQ0MTB0bnNhcjRkbmVnbGx0b2NmZmdpMGkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NzYyNDQxNjY1MjgtZHU5cmx1OXRvM21jNnU4cmNzc3AzczkwbWY1dTRxZDUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgzNDY4MTA0MjEwMTc0MjQ5MjciLCJlbWFpbCI6InBkYXN0b3JlMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlZsYWRpbWlyIFZldHJvdiIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLUpmS0FzYTVob0RFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmNNdlpoQ2pGTDIwRnVVU0U0ZFRGc29hRWxhdmcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlZsYWRpbWlyIiwiZmFtaWx5X25hbWUiOiJWZXRyb3YiLCJsb2NhbGUiOiJydSIsImlhdCI6MTU2MzM1ODQ0NywiZXhwIjoxNTYzMzYyMDQ3fQ.NisNnMsqx0papB43YxaMQpQAownKEfuncUr6WTWi7iFdhH06K_eVh35dJoYjt4hNGWcV2wg7C3qUrx3SzjBM8zjM39JbUhFccOg91sP2AweCuC5Gg4BJDnZ72WHli7CnJdbPwp86LpDDd9lO2v62h-3bGQlxMsAMOUT8amz3MKVvEGdJ6UAxQXrja1EeeY4zCgWvJh5FUwPjgBDwCElE2rD7NoFTc9WNvl29tsHBrfwDrMapoRFgFHcdhJssN53HGjdhuYvJF-n8iBl6dFXIIjROnWp1nArVB1_z7H_cTUHS_dd38DciiPCPW1idwqU7l-MMdhIiB70cZKlUUgbBlw';
class UserSuite {
  static async createUser(email = 'user@mail.ru', password = 'password') {
    const user = UserService.create({
      passwordHash: userPasswordManager.hash(password),
      email,
      firstName: 'firstName',
      lastName: 'lastName',
      birthDate: '2010-01-01',
      userPasswordManager,
      height: 200,
      weight: 100
    });
    return user;
  }
  static async createUserByGoogle(googleAccessToken) {
    const user = UserService.getOrCreateByGoogle({
      googleAccessToken,
      firstName: 'firstName',
      lastName: 'lastName',
      birthDate: '2010-01-01',
      userPasswordManager,
      height: 200,
      weight: 100
    });
    return user;
  }
  static async loginUser(id) {
    const token = userJwtManager.getToken(id);
    await UserService.update(id, { token });
    return token;
  }
  static async userRegister() {
    const user = await UserSuite.createUser('test@mail.ru');
    const token = await UserSuite.loginUser(user.id);
    return { user, token };
  }
  static async getGoogleAccessToken() {
    // const { token } = await oauth2Client.getAccessToken();
    return idToken;
    // return testCredentials.id_token;
  }

  static async getUserById(id) {
    return await UserService.getById(id);
  }
}
module.exports = UserSuite;
