require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

app.post('/gerar-imagem', async (req, res) => {
  const { prompt, imagem } = req.body;

  try {
    const response = await fetch('https://gateway.pixazo.ai/getImage/v1/getSDXLImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.PIXAZO_API_KEY
      },
      body: JSON.stringify({
        prompt: prompt,
        negativePrompt: 'ugly, blurry, bad quality',
        initImage: imagem,
        steps: 20,
        cfg: 7,
        strength: 0.75,
        aspect_ratio: '1:1',
        output_format: 'jpg',
        output_quality: 90
      })
    });

    const data = await response.json();
    console.log('Resposta Pixazo:', JSON.stringify(data));

    if (data.imageUrl) {
      res.json({ imagem: data.imageUrl });
    } else {
      res.status(500).json({ erro: 'Falha ao gerar imagem', detalhe: data });
    }

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => console.log('Servidor a correr na porta 3000'));