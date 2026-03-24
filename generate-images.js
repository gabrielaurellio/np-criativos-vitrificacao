const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY || ''; // Use variável de ambiente — NUNCA hardcode
const OUTPUT_DIR = path.join(__dirname, 'images');

const images = [
  {
    id: 'v1-1x1', aspectRatio: '1:1',
    prompt: 'Professional automotive photography of a luxury sedan with dull oxidized fading paint, harsh direct sunlight creating uneven reflections, dusty weathered surface, dramatic dark background with deep red and orange atmospheric lighting, cinematic commercial photography, no text, no people, no watermark'
  },
  {
    id: 'v1-9x16', aspectRatio: '9:16',
    prompt: 'Professional automotive photography of a luxury sedan with dull oxidized fading paint, harsh direct sunlight creating uneven reflections, dusty weathered surface, dramatic dark background with deep red and orange atmospheric lighting, cinematic commercial photography, no text, no people, no watermark'
  },
  {
    id: 'v2-1x1', aspectRatio: '1:1',
    prompt: 'Luxury car with flawless mirror-like ceramic coated paint finish, showroom quality, deep perfect reflections on sleek dark car body, pure black background, golden warm professional studio spotlights, pristine automotive excellence, commercial advertisement photography, dramatic contrast, no text, no people, no watermark'
  },
  {
    id: 'v2-9x16', aspectRatio: '9:16',
    prompt: 'Luxury car with flawless mirror-like ceramic coated paint finish, showroom quality, deep perfect reflections on sleek dark car body, pure black background, golden warm professional studio spotlights, pristine automotive excellence, commercial advertisement photography, dramatic contrast, no text, no people, no watermark'
  },
  {
    id: 'v3-1x1', aspectRatio: '1:1',
    prompt: 'Extreme close-up macro photography of perfect water droplets beading on hydrophobic ceramic coated car paint, spherical water beads rolling off dark glossy surface, blue tinted professional studio lighting, hydrophobic water repellent ceramic coating effect clearly visible, ultra sharp automotive detail photography, no text, no people, no watermark'
  },
  {
    id: 'v3-9x16', aspectRatio: '9:16',
    prompt: 'Extreme close-up macro photography of perfect water droplets beading on hydrophobic ceramic coated car paint, spherical water beads rolling off dark glossy surface, blue tinted professional studio lighting, hydrophobic water repellent ceramic coating effect clearly visible, ultra sharp automotive detail photography, no text, no people, no watermark'
  },
  {
    id: 'v4-1x1', aspectRatio: '1:1',
    prompt: 'Premium luxury dark car in immaculate showroom condition, golden warm dramatic studio lighting, deep black paint with flawless mirror-like reflection, high-end automotive commercial photography, dark moody background with subtle golden ambient glow, prestigious automobile excellence, no text, no people, no watermark'
  },
  {
    id: 'v4-9x16', aspectRatio: '9:16',
    prompt: 'Premium luxury dark car in immaculate showroom condition, golden warm dramatic studio lighting, deep black paint with flawless mirror-like reflection, high-end automotive commercial photography, dark moody background with subtle golden ambient glow, prestigious automobile excellence, no text, no people, no watermark'
  },
  {
    id: 'v5-1x1', aspectRatio: '1:1',
    prompt: 'Split side by side automotive photography, left side showing car with dull oxidized chalky faded paint no shine, right side showing exact same car with perfect ceramic coating mirror finish brilliant shine, sharp vertical divider line in the center, dramatic professional studio lighting, before and after ceramic coating comparison, no text, no people, no watermark'
  },
  {
    id: 'v5-9x16', aspectRatio: '9:16',
    prompt: 'Split automotive photography, top half showing car hood with dull oxidized chalky faded paint, bottom half showing same car hood with perfect ceramic coating mirror finish brilliant shine, sharp horizontal divider, dramatic professional studio lighting, before and after comparison, no text, no people, no watermark'
  }
];

async function generateImage(item) {
  process.stdout.write(`Gerando ${item.id} (${item.aspectRatio})... `);

  // Adiciona instrução de proporção no prompt para modelos generateContent
  const ratioHint = item.aspectRatio === '9:16'
    ? 'vertical portrait format 9:16 aspect ratio, tall composition'
    : 'square format 1:1 aspect ratio';

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${item.prompt}, ${ratioHint}` }]
        }],
        generationConfig: {
          responseModalities: ['IMAGE']
        }
      })
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.log(`❌ ${res.status}: ${err.slice(0, 300)}`);
    return null;
  }

  const data = await res.json();

  // Extrair imagem dos parts
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));

  if (!imgPart) {
    console.log(`❌ sem imagem. Resposta: ${JSON.stringify(data).slice(0, 300)}`);
    return null;
  }

  const ext = imgPart.inlineData.mimeType.includes('png') ? 'png' : 'jpg';
  const outPath = path.join(OUTPUT_DIR, `${item.id}.${ext}`);
  fs.writeFileSync(outPath, Buffer.from(imgPart.inlineData.data, 'base64'));
  console.log(`✅  (${ext})`);
  return outPath;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const item of images) {
    await generateImage(item);
    await new Promise(r => setTimeout(r, 1500));
  }

  console.log('\n🎉 Todas as imagens geradas em ./images/');
}

main().catch(console.error);
