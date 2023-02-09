import {Pool} from 'pg';

let connection;
if(!connection){
  
 connection = new Pool ({
    user: 'joctavio',
    password: 'psswd',
    host: 'localhost',
    port: '5433',
    database: 'db_ppreparatory'
  })
}

export {connection}; 