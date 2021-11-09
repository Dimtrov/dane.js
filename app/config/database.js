/**
 *  dane.js
 *
 *  A modern web MVC framework for Node.js
 *  Copyright (c) 2021, Dimtrov Lab's
 *  This content is released under the Mozilla Public License 2 (MPL-2.0)
 *
 *  @package	dane.js
 *  @author	    Dimitri Sitchet Tomkeu <devcode.dst@gmail.com>
 *  @copyright	Copyright (c) 2021, Dimtrov Lab's. (https://dimtrov.hebfree.org)
 *  @copyright	Copyright (c) 2021, Dimitri Sitchet Tomkeu. (https://www.facebook.com/dimtrovich)
 *  @license	https://opensource.org/licenses/MPL-2.0 MPL-2.0 License
 *  @homepage	https://dimtrov.hebfree.org/works/dane.js
 *  @version    0.0.1
 */

/*
| -------------------------------------------------------------------
| DATABASE CONNECTIVITY SETTINGS
| -------------------------------------------------------------------
| This file will contain the settings needed to access your database.
|
| For complete instructions please consult the 'Database Configuration' in User Guide.
|
| -------------------------------------------------------------------
| EXPLANATION OF VARIABLES
| -------------------------------------------------------------------
|
|	['dialect'] The database driver. e.g.: mysql.
|			Currently supported: mysql, postgres, sqlite
|	['port'] The port of your database server. e.g: 3306
|	['host'] The hostname of your database server.
|	['username'] The username used to connect to the database
|	['password'] The password used to connect to the database
|	['database'] The name of the database you want to connect to

|	['logging'] TRUE/FALSE - By default, we will log to console every SQL query it performs
*/

module.exports = {
    development: {
        hostname: "localhost",
        username: "root",
        password: "",
        database: "test",
        dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
        logging: true,
        sync: true,
    },
    test: {
        hostname: "localhost",
        username: "root",
        password: "",
        database: "test",
        dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
        logging: true, 
        sync: true
    },
    production: {
        hostname: "localhost",
        username: "root",
        password: "",
        database: "test",
        dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
        logging: false, 
        sync: false
    }
}