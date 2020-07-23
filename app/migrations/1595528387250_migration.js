/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    name: {
      type: 'varchar(1000)',
      notNull: true
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.sql(`INSERT INTO users (name) VALUES ('max');`);
}

exports.down = pgm => {
  pgm.dropTable('users', {
    ifExists: true,
  });
};