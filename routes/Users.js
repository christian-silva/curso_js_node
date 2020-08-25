const neDB = require("nedb");

// Cria banco de dados
let db = new neDB({
  filename: "users.db",
  autoload: true,
});

module.exports = (app) => {
  let route = app.route("/users");

  // método get para consultar
  route.get((req, res) => {
    //name:1 asc ou -1 desc
    // find procura todos, por isso do {}
    db.find({})
      .sort({ name: 1 })
      .exec((err, users) => {
        if (err) {
          app.utils.error.send(err, req, res);
        } else {
          res.status(200).json({ users });
        }
      });
  });


  // método post para salvar os dados - insert do db
  route.post((req, res) => {
    if(!app.utils.validator.user(app,req,res)) return false;

    db.insert(req.body, (err, user) => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user);
      }
    });
  });

  let routeID = app.route("/users/:id");

  
  // método get para consultar - findOne do db para consultar um registro pelo id
  routeID.get((req, res) => {
    //name:1 asc ou -1 desc
    db.findOne({ _id: req.params.id }).exec((err, users) => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json({ users });
      }
    });
  });

  
  // método put para alterar os dados - update do db
  routeID.put((req, res) => {
      
    if(!app.utils.validator.user(app,req,res)) return false;
    
    db.update({ _id: req.params.id }, req.body, (err) => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(Object.assign(req.params, req.body));
      }
    });
  });

  // método delete para remover um dado - remove do db
  routeID.delete((req, res) => {
    //name:1 asc ou -1 desc
    db.remove({ _id: req.params.id }, {}, (err) => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(req.params);
      }
    });
  });
};
