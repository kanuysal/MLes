const database = process.env.REACT_APP_DATABASE

let db;
if (database === "storage") {
  db = require('./storage');
} else if (database === "data") {
  db = require('./data');
}

export { db }