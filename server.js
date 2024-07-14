const express = require('express');
const path = require('path');
const cors = require('cors'); // הוספת המודול cors

const app = express();

// הגדרת ה-CORS כדי לאפשר בקשות מהמקור שלך
app.use(cors({
  origin: 'https://eatventure-15176c479d24.herokuapp.com/' // החלף לכתובת הדומיין של הפרונטאנד שלך בייצור
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
