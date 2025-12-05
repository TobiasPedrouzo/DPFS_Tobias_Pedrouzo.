const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');

function readUsers() {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([], null, ' '));
        return [];
    }
    const fileContent = fs.readFileSync(usersFilePath, 'utf-8') || '[]';
    try { return JSON.parse(fileContent); } catch { return []; }
}

function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
}

const usersController = {
    register: (req, res) => {
        return res.render('users/register', { error: null, old: {} });
    },
    processRegister: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('users/register', { error: errors.array()[0].msg, old: req.body });
        }
        const users = readUsers();
        const { name, email, password } = req.body;
        const existing = users.find(u => u.email === email);
        if (existing) {
            return res.render('users/register', { error: 'El email ya está registrado', old: req.body });
        }
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            avatar: req.file ? '/images/users/' + path.basename(req.file.path) : '/images/users/default.png',
            role: 'user'
        };
        users.push(newUser);
        writeUsers(users);
        req.session.userLogged = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar, role: newUser.role };
        return res.redirect('/users/profile');
    },
    login: (req, res) => {
        return res.render('users/login', { error: null, old: {}, redirect: req.query.redirect || '' });
    },
    processLogin: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('users/login', { error: errors.array()[0].msg, old: req.body });
        }
        const users = readUsers();
        const { email, password, remember, redirect } = req.body;
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.render('users/login', { error: 'Credenciales inválidas', old: { email } });
        }
        const okPassword = bcrypt.compareSync(password, user.password);
        if (!okPassword) {
            return res.render('users/login', { error: 'Credenciales inválidas', old: { email } });
        }
        req.session.userLogged = { id: user.id, name: user.name, email: user.email, avatar: user.avatar, role: user.role };
        if (remember) {
            res.cookie('rememberEmail', user.email, { maxAge: 1000 * 60 * 60 * 24 * 30 });
        }
        if (redirect) { return res.redirect(redirect); }
        return res.redirect('/users/profile');
    },
    profile: (req, res) => {
        return res.render('users/profile', { user: req.session.userLogged });
    },
    logout: (req, res) => {
        res.clearCookie('rememberEmail');
        req.session.destroy(() => {
            return res.redirect('/');
        });
    }
};

module.exports = usersController;

