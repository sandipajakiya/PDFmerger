import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { mergePdfs } from './merge.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 3000;

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  console.log(req.files);
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
