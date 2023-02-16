import {Pool} from 'pg';

let connection;
if(!connection){
  
 connection = new Pool ({
  user: 'jocta',
  password: 'psswd',
  host: '172.20.0.1',
  port: '5432',
  database: 'db_preparatory'
  })
}

export {connection}; 
