module.exports = function(req, res, next) {
  // req.setLocale(req.session.languagePreference);
  req.setLocale('es');
  next();
};
