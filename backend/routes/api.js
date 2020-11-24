var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var path = require('path');

// Return All stores in jason
router.get('/stores', function(req, res, next) {

  var dbpath = path.resolve(__dirname, "../db/kumo.db");

  let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      db.close();
      return res.status(500).json({error: err.message});
    }
  });

  db.serialize(() => {
    db.all(`SELECT * FROM TBL_STORE`, (err, allRows) => {
      if (err) {
        db.close();
        return res.status(500).json({error: err.message});
      }

      db.close();
      return res.json(allRows);

    });
  });

});

router.get('/stores/region', function (req, res, next) {
  
    let inputs = req.query.inputs;
    if (inputs == null) {
      inputs = [];
    }
    let types = req.query.types;
    if (types == undefined) {
      types = [];
    }

    const sql = 'SELECT * FROM TBL_STORE WHERE TYPE=? OR TYPE=? OR TYPE=?';
    var dbpath = path.resolve(__dirname, "../db/kumo.db");

    let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return res.status(500).json({error: err.message});
      }
      else {

        const json = [];

        db.all(sql, types, (err, rows) => {

          for (let j = 0; j < rows.length; j++) {
            let cnt = 0;
            for (let i = 0; i < inputs.length; i++) {
              if (rows[j].address.includes(inputs[i])) {
                cnt ++;
              }
            }

            if (cnt == inputs.length) {
              json.push(rows[j]);
            }
          }

          db.close();
          return res.json(json);
        });
      }
    });
});

router.get('/stores/name', function (req, res, next) {
  
    let inputs = req.query.inputs;
    if (inputs == undefined) {
      inputs = [];
    }
    let types = req.query.types;
    if (types == undefined) {
      types = [];
    }

    const sql = 'SELECT * FROM TBL_STORE WHERE TYPE=? OR TYPE=? OR TYPE=?';
    var dbpath = path.resolve(__dirname, "../db/kumo.db");

    let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return res.status(500).json({error: err.message});
      }
      else {

        const json = [];

        db.all(sql, types, (err, rows) => {

          for (let j = 0; j < rows.length; j++) {
            let cnt = 0;
            for (let i = 0; i < inputs.length; i++) {
              if (rows[j].name.includes(inputs[i])) {
                cnt ++;
              }
            }

            if (cnt == inputs.length) {
              json.push(rows[j]);
            }
          }

          db.close();
          return res.json(json);
        });
      }
    });
});

module.exports = router;
