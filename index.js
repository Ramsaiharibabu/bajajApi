export default function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;
    const userId = "RamSaiHariBabu_17092004";
    const email = "ramsai.haribabuhundigam2021@vitstudent.ac.in";
    const rollNumber = "21BRS1441";

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));
    const getHighestLowercaseAlphabet = (data) => {
      const lowercaseAlphabets = data.filter((char) => /[a-z]/.test(char));
      return lowercaseAlphabets.length > 0
        ? [lowercaseAlphabets.sort()[lowercaseAlphabets.length - 1]]
        : [];
    };
    const highestLowercaseAlphabet = getHighestLowercaseAlphabet(alphabets);

    res.status(200).json({
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
  } else if (req.method === 'GET') {
    res.status(200).json({ operation_code: 1 });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
