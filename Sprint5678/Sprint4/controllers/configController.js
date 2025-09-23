const fs = require('fs');
const path = require('path');

const applicationsPath = path.join(__dirname, '../data/applications.json');
const verificationsPath = path.join(__dirname, '../data/verifications.json');

function readJson(file) {
    if (!fs.existsSync(file)) return [];
    try { return JSON.parse(fs.readFileSync(file, 'utf-8') || '[]'); } catch { return []; }
}
function writeJson(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, ' '));
}

module.exports = {
    applyForm: (req, res) => {
        res.render('config/apply', { error: null });
    },
    processApply: (req, res) => {
        const items = readJson(applicationsPath);
        const { name, dni, categoria, descripcion } = req.body;
        const docs = (req.files || []).map(f => '/images/docs/' + path.basename(f.path));
        const record = { id: items.length ? items[items.length-1].id + 1 : 1, name, dni, categoria, descripcion, documents: docs, createdAt: new Date().toISOString() };
        items.push(record);
        writeJson(applicationsPath, items);
        res.render('config/apply', { error: null, success: 'Solicitud enviada correctamente.' });
    },
    verifyForm: (req, res) => {
        res.render('config/verify', { error: null });
    },
    processVerify: (req, res) => {
        const items = readJson(verificationsPath);
        const { name, dni, motivo } = req.body;
        const docs = (req.files || []).map(f => '/images/docs/' + path.basename(f.path));
        const record = { id: items.length ? items[items.length-1].id + 1 : 1, name, dni, motivo, documents: docs, createdAt: new Date().toISOString() };
        items.push(record);
        writeJson(verificationsPath, items);
        res.render('config/verify', { error: null, success: 'Documentación enviada.' });
    }
};

