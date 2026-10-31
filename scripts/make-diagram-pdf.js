const fs = require('fs');

const esc = (value) => value.replace(/([\\()])/g, '\\$1');
const lines = [
  ['Nido Sur - Diagrama entidad-relacion', 48, 780, 18],
  ['USERS', 70, 700, 14], ['PK id', 70, 678, 10], ['firstName / lastName', 70, 660, 10], ['email UNIQUE', 70, 642, 10], ['password / image / category', 70, 624, 10],
  ['PRODUCTS', 285, 700, 14], ['PK id', 285, 678, 10], ['name / description', 285, 660, 10], ['image / price / stock', 285, 642, 10], ['colors / sizes JSON', 285, 624, 10], ['FK categoryId', 285, 606, 10],
  ['CATEGORIES', 540, 700, 14], ['PK id', 540, 678, 10], ['name UNIQUE', 540, 660, 10], ['slug UNIQUE', 540, 642, 10],
  ['CART_ITEMS', 410, 470, 14], ['PK id / FK cartId / FK productId', 410, 448, 10], ['quantity', 410, 430, 10],
  ['Relaciones: Category 1:N Product | Cart 1:N CartItem | Product 1:N CartItem', 70, 340, 11]
];
let stream = '0.95 0.93 0.88 rg 0 0 842 842 re f\n0.14 0.19 0.16 rg\n';
for (const [text, x, y, size] of lines) stream += `BT /F1 ${size} Tf ${x} ${y} Td (${esc(text)}) Tj ET\n`;
stream += '0.14 0.19 0.16 RG 1.5 w 55 585 170 140 re S 270 585 220 140 re S 525 585 180 140 re S 390 405 230 100 re S 225 655 m 270 655 l S 490 655 m 525 655 l S 485 455 m 525 585 l S\n';

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`
];
let pdf = '%PDF-1.4\n'; const offsets = [0];
objects.forEach((object, index) => { offsets[index + 1] = Buffer.byteLength(pdf); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
const xref = Buffer.byteLength(pdf); pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`; for (let i = 1; i <= objects.length; i++) pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`; pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
fs.writeFileSync('docs/database-diagram.pdf', pdf);
