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
  let data = await jsql.select('article', {id: 2}, ['id']).page(5, 0);
  console.log(data);
  data = await jsql.one('article', {id: 2}, ['id', 'title', 'description', 'content', 'create_time']);
  console.log(data);
}

excute();
