const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { User } = require('../../database/models');
const { registerRules, loginRules } = require('../validators/users');
const upload = require('../middlewares/upload');
const { guestOnly, authOnly } = require('../middlewares/auth');
const router = express.Router();

router.get('/register', guestOnly, (req, res) => res.render('users/register', { title: 'Crear cuenta', old: {}, errors: [] }));
router.post('/register', guestOnly, upload.single('image'), registerRules, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).render('users/register', { title: 'Crear cuenta', old: req.body, errors: errors.array() });
  try {
    const user = await User.create({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: await bcrypt.hash(req.body.password, 10), image: req.file ? `/images/users/${req.file.filename}` : '', category: 'customer' });
    req.session.userId = user.id;
    res.redirect('/users/profile');
  } catch (error) { next(error); }
});

router.get('/login', guestOnly, (req, res) => res.render('users/login', { title: 'Ingresar', errors: [], old: {} }));
router.post('/login', guestOnly, loginRules, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).render('users/login', { title: 'Ingresar', errors: errors.array(), old: req.body });
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(422).render('users/login', { title: 'Ingresar', errors: [{ msg: 'Email o contraseña incorrectos.' }], old: req.body });
    req.session.userId = user.id;
    if (req.body.remember) res.cookie('userId', user.id, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
    res.redirect('/users/profile');
  } catch (error) { next(error); }
});

router.post('/logout', authOnly, (req, res) => { res.clearCookie('userId'); req.session.destroy(() => res.redirect('/')); });
router.get('/profile', authOnly, (req, res) => res.render('users/profile', { title: 'Mi perfil' }));

module.exports = router;
