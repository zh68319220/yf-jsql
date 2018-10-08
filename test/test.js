const Jsql = require('../lib');

let jsql = new Jsql({
  port: 3000,
  database: {
    DATABASE: 'hospital',
    USERNAME: 'root',
    PASSWORD: 'fly',
    PORT: '3306',
    HOST: 'localhost'
  }
});

async function excute() {
  let data = await jsql.select('article', ['id', 'create_time']).where({id: 2}).sort({create_time: 'DESC'}).page(5, 0).run();
  console.log(data);
  data = await jsql.one('article', {id: 2}, ['id', 'title', 'description', 'create_time']);
  console.log(data);
  data = await jsql.select('article', ['count(*)']).run();
  console.log(data);
}

excute();
