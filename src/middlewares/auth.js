const { User } = require('../../database/models');

async function attachCurrentUser(req, res, next) {
  try {
    const userId = req.session.userId || req.cookies.userId;
    res.locals.currentUser = userId ? await User.findByPk(userId, { attributes: { exclude: ['password'] } }) : null;
    next();
  } catch (error) { next(error); }
}

function guestOnly(req, res, next) {
  if (res.locals.currentUser) return res.redirect('/users/profile');
  next();
}

function authOnly(req, res, next) {
  if (!res.locals.currentUser) return res.redirect('/users/login');
  next();
}

module.exports = { attachCurrentUser, guestOnly, authOnly };
