module.exports = {
  user: (app, req, res) => {
    req.assert("name", "o nome é obrigatório.").notEmpty();
    req.assert("email", "o email está inválido.").notEmpty().isEmail();
    req.assert("password", "a senha é obrigatória.").notEmpty();

    let erros = req.validationErrors();

    if (erros) {
      app.utils.error.send(erros, req, res);
      return false;
    } else {
      return true;
    }
  },
};
