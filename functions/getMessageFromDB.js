const Database = require('better-sqlite3');
const db = new Database('star.db');

function getMessageFromDatabase(msgid) {
    return (db.prepare('SELECT * FROM starids WHERE msgid = ?').get(msgid) || {}).starid;
  }

  module.exports = getMessageFromDatabase;
