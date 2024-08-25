const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Helper function to get the highest lowercase alphabet
const getHighestLowercaseAlphabet = (data) => {
  const lowercaseAlphabets = data.filter((char) => /[a-z]/.test(char));
  return lowercaseAlphabets.length > 0
    ? [lowercaseAlphabets.sort()[lowercaseAlphabets.length - 1]]
    : [];
};

// POST endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  const userId = "RamSaiHariBabu_17092004";
  const email = "ramsai.haribabuhundigam2021@vitstudent.ac.in";
  const rollNumber = "21BRS1441";

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestLowercaseAlphabet = getHighestLowercaseAlphabet(alphabets);

  res.json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
