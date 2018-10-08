const FUNCTIONS = ['select', 'page', 'one', 'update', 'add', 'del', 'where', 'run', 'or', 'sort'];

const tools = {
  select: function (table, cols=[]) {
    let columns = '*';
    if(cols.length) columns = cols.join(',');
    this._sql = `SELECT ${columns} from ${table}`;
    return this;
  },
  where: function(data={}) {
    let _index = 0;
    for(let prop in data){
      if(data.hasOwnProperty(prop)){
        _index++;
        if(_index===1){
          this._sql += ` WHERE ${prop} = '${data[prop]}'`
        } else {
          this._sql += ` AND ${prop} = '${data[prop]}'`
        }
      }
    }
    return this;
  },
  or: function(data=[]) {
    data.forEach((item,index)=>{
      if(index===0){
        this._sql += ` WHERE ${item.prop} = '${item.value}'`
      } else {
        this._sql += ` OR ${item.prop} = '${item.value}'`
      }
    });
    return this;
  },
  page: function (size=10, p=1) {
    this._sql += ` limit ${size} offset ${p}`;
    return this;
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
      if(data.hasOwnProperty(prop)){
        if(data[prop] === '' && data[prop] === null) {
          _sql += ' `'+prop+'`=' + `NULL,`
        } else {
          _sql += ' `'+prop+'`=' + `'${data[prop]}',`
        }
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
      if(data.hasOwnProperty(prop)){
        if(data[prop] === '' && data[prop] === null) {
          _keys += '`'+prop+'`,';
          _values += `NULL,`;
        } else {
          _keys += '`'+prop+'`,';
          _values += `'${data[prop]}',`;
        }
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
  },
  sort: function (props) {
    let index = 0;
    for(let prop in props){
      if(props.hasOwnProperty(prop)){
        if(index===0){
          this._sql += ` ORDER BY ${prop} ${props[prop]}`
        } else {
          this._sql += `, ${prop} ${props[prop]}`
        }
        index++;
      }
    }
    return this;
  },
  run: function () {
    this._sql += ` ;`;
    return this._query(this._sql);
  }
};

module.exports = {
  mountTranslate(_this) {
    FUNCTIONS.forEach(f=>_this[f] = tools[f]);
  }
};
