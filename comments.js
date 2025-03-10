// Create web server
// 1. Install express.js
// 2. Create a new server
// 3. Create a new route
// 4. Create a new endpoint
// 5. Create a new file to store comments
// 6. Create a new function to read comments from file
// 7. Create a new function to write comments to file
// 8. Create a new function to add comment
// 9. Create a new function to get comments
// 10. Create a new function to delete comment

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

const COMMENTS_PATH = path.join(__dirname, 'comments.json');

app.get('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(COMMENTS_PATH, 'utf8'));
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(COMMENTS_PATH, 'utf8'));
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync(COMMENTS_PATH, JSON.stringify(comments, null, 2));
  res.json(newComment);
});

app.delete('/comments/:id', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(COMMENTS_PATH, 'utf8'));
  const id = req.params.id;
  const commentIndex = comments.findIndex((comment) => comment.id === id);
  if (commentIndex === -1) {
    res.status(404).json({ error: 'Comment not found' });
    return;
  }
  comments.splice(commentIndex, 1);
  fs.writeFileSync(COMMENTS_PATH, JSON.stringify(comments, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});