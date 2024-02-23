const express = require('express');
const bodyParser = require('body-parser');
const { translate } = require('free-translate');
const cors = require('cors'); // Import cors middleware
async function translateText() {
    try {
        const translatedText = await translate('Hello', { from: 'en', to: 'fr' });
        console.log('Translated text:', translatedText);
    } catch (error) {
        console.error('Error during translation:', error);
    }
}

translateText();
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("hello world from backend");

});
// POST endpoint for translation
app.post('/translate', async (req, res) => {
    try {
        // Check if request body contains the text to translate
        console.log('Request received:', req.body);

        // Check if request body contains the text to translate
        if (!req.body || !req.body.text) {
            return res.status(400).json({ error: 'Request body must contain a "text" field.' });
        }

        console.log('Translating:', req.body.text);

        // Translate the text
        const translatedText = await translate(req.body.text, { from: 'en', to: 'fr' });

        console.log('Translation:', translatedText);

        // Send back the translated text
        res.json({ translation: translatedText });
    } catch (error) {
        console.error('Error during translation:', error);
        res.status(500).json({ error: 'An error occurred during translation.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});