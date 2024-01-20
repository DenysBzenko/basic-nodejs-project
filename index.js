const express = require('express');
const path = require('path');
const app = express();
const port = 3001;


app.use('/assets', express.static(path.join(__dirname, 'assets')));


const cat = require('./data/cat.json');
const dog = require('./data/dog.json');
const documentation = require('./data/doc.json'); 


app.get('/html1', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/pages/page1.html'));
});

app.get('/html2', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/pages/page2.html'));
});


app.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'assets', filename));
});


app.get('/objects/:type/:id', (req, res) => {
    const { type, id } = req.params;
    const obj = (type === 'cat' ? cat : dog).find(item => item.id.toString() === id);
    obj ? res.json(obj) : res.status(404).send('Object not found');
});

app.get('/objects/:type', (req, res) => {
    const type = req.params.type;
    res.json(type === 'cat' ? cat : dog);
}); 

app.get('/objects', (req, res) => {
    res.json({ cat, dog });
});


app.get('/info', (req, res) => {
    res.json(documentation);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
