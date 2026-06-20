const express = require('express');
const db = require('./database');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.static('.'));
app.use(express.json());
app.use(cors());

app.get('/todos', (req, res) => {
  const todos = db.prepare('SELECT * FROM todos').all();
  res.json(todos);
});

app.post('/todos', (req, res) => {
  db.prepare('INSERT INTO todos (task) VALUES (?)').run(req.body.task);
  const todos = db.prepare('SELECT * FROM todos').all();
  res.json(todos);
});

app.delete('/todos/:id', (req, res) => {
  db.prepare('DELETE FROM todos WHERE id = ?').run(req.params.id);
  const todos = db.prepare('SELECT * FROM todos').all();
  res.json(todos);
});
app.put('/todos/:id', (req,res) => {
    db.prepare('UPDATE todos SET completed = ? WHERE id = ?').run(req.body.completed, req.params.id);
    const todos = db.prepare ('SELECT * FROM todos').all();
    res.json(todos);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});