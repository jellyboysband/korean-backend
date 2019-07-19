const db = require('../app/db');

(async () => {
  await db.sequelize.query(`
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
  GRANT ALL ON SCHEMA public TO ${db.sequelize.config.database};
  GRANT ALL ON SCHEMA public TO public;`);
  await db.sequelize.close();
})();
