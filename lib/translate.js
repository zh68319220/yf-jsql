const FUNCTIONS = ['select', 'page', 'one', 'update', 'add', 'del'];

const tools = {
  select: function (table, data={}, cols=[]) {
    let columns = '*';
    if(cols.length) columns = cols.join(',');
    let _sql = `SELECT ${columns} from ${table}`;
    let _index = 0;
    for(let prop in data){
      if(data.hasOwnProperty(prop)){
        _index++;
        if(_index===1){
          _sql += ` WHERE ${prop} = '${data[prop]}'`
        } else {
          _sql += ` AND ${prop} = '${data[prop]}'`
        }
      }
    }
    this._sql = _sql;
    return this;
  },
  page: function (size=10, p=1) {
    this._sql += ` limit ${size} offset ${p};`;
    return this._query(this._sql);
  },
  one: function(table, data={}, cols=[]) {
    let columns = '*';
    if(cols.length) columns = cols.join(',');
    let _sql = `SELECT ${columns} from ${table}`;
    let _index = 0;
    for(let prop in data){
      if(data.hasOwnProperty(prop)){
        _index++;
        if(_index===1){
          _sql += ` WHERE ${prop} = '${data[prop]}'`
        } else {
          _sql += ` AND ${prop} = '${data[prop]}'`
        }
      }
    }
    _sql += ' LIMIT 1;';
    return this._query(_sql);
  },
  update: function(table, data) {
    let _sql = `UPDATE ${table} SET `;
    for(let prop in data){
      if(data.hasOwnProperty(prop) && data[prop]){
        _sql += ' `'+prop+'`=' + `'${data[prop]}',`
      }
    }
    _sql = _sql.substring(0,_sql.length - 1);
    _sql += ` WHERE id = ${data.id}`;
    return this._query(_sql);
  },
  add: function(table, data) {
    let _sql = `INSERT INTO ${table} `;
    let _keys = '';
    let _values = '';
    for(let prop in data){
      if(data.hasOwnProperty(prop) && data[prop] !== 0 && data[prop] !== ''){
        _keys += '`'+prop+'`,';
        _values += `'${data[prop]?data[prop]:'NULL'}',`;
      }
    }
    if(_keys.length) _keys = _keys.substring(0, _keys.length-1);
    if(_values.length) _values = _values.substring(0, _values.length-1);
    _sql += `(${_keys}) VALUES (${_values});`;
    return this._query(_sql);
  },
  del: function(table, data) {
    let _sql = `DELETE FROM `+' `'+table+'` '+` WHERE id = '${data.id}';`;
    return this._query(_sql);
  }
};

module.exports = {
  mountTranslate(_this) {
    FUNCTIONS.forEach(f=>_this[f] = tools[f]);
  }
};
