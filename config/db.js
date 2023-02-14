import {Pool} from 'pg';

let connection;
if(!connection){
  
 connection = new Pool ({
  user: 'joctavio',
  password: 'psswd',
  host: '172.28.0.1',
  port: '5433',
  database: 'db_preparatory'
  })
}

export {connection}; 