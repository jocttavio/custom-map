import {Pool} from 'pg';

let connection;
if(!connection){
  
 connection = new Pool ({
  user: 'postgres',
  password: 'sss4',
  host: 'localhost',
  port: '5432',
  database: 'BD_Preparatory'
  })
}

export {connection}; 