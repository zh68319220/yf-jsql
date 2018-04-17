const mysql = require('mysql');
const SQL_OPTION = require('./default.js');
const {mountTranslate} = require('./translate.js');

function jsql(option={}) {
  this._opt = Object.assign({}, SQL_OPTION, option);
  this._pool = mysql.createPool({
    host: this._opt.database.HOST,
    user: this._opt.database.USERNAME,
    password: this._opt.database.PASSWORD,
    database: this._opt.database.DATABASE
  });
  this._query = function (sql, values) {
    return new Promise((resolve, reject) => {
      this._pool.getConnection(function (err, connection) {
        if (err) {
          console.error(err);
          resolve(JSON.parse(JSON.stringify(err)))
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              console.error(err);
              resolve(JSON.parse(JSON.stringify(err)))
            } else {
              resolve(JSON.parse(JSON.stringify(rows)))
            }
            connection.release()
          });
        }
      });
    });
  };
  mountTranslate(this);
}

module.exports = jsql;
