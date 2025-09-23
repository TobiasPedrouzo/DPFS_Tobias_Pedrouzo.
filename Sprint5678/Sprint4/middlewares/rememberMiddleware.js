const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function readUsers() {
    if (!fs.existsSync(usersFilePath)) return [];
    try { return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8') || '[]'); } catch { return []; }
}

module.exports = (req, res, next) => {
    if (!req.session.userLogged && req.cookies && req.cookies.rememberEmail) {
        const users = readUsers();
        const user = users.find(u => u.email === req.cookies.rememberEmail);
        if (user) {
            req.session.userLogged = { id: user.id, name: user.name, email: user.email, avatar: user.avatar, role: user.role };
        }
    }
    next();
};

