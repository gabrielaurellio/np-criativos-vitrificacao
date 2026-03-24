# Meta Ads Safe Zones — Regras de Design NP Car Detail

## Especificações por Formato

### Stories / Reels (9:16) — 1080 × 1920 px

```
┌─────────────────────────┐  ← y=0
│  ⚠ ZONA DE PERIGO      │
│  270px = 14% do topo   │
│  Coberto por:           │
│  · Ícone de perfil      │
│  · Nome da conta        │
│  · Botão de fechar      │
│  · Indicador "Patrocin."│
├─────────────────────────┤  ← y=270  ✅ SAFE ZONE COMEÇA
│                         │
│   ZONA SEGURA           │
│   1270px de altura      │
│   950px de largura      │
│                         │
│  Coloque aqui:          │
│  ✓ Logo / branding      │
│  ✓ Headline principal   │
│  ✓ Subtítulo            │
│  ✓ Features / bullets   │
│  ✓ CTA button           │
│                         │
├─────────────────────────┤  ← y=1540  ✅ SAFE ZONE TERMINA
│  ⚠ ZONA DE PERIGO      │
│  380px = 20% do rodapé │
│  Coberto por:           │
│  · Botão CTA do Meta   │
│  · Prompt swipe-up      │
│  · Barra de interação   │
└─────────────────────────┘  ← y=1920
```

| Zona | Pixels | % da altura | Coberto por |
|------|--------|-------------|-------------|
| **Topo** | 270px | 14% | Perfil, fechar, timestamp |
| **Rodapé** | 380px | 20% | CTA Meta, swipe-up |
| **Laterais** | 65px | 6% | (margem visual) |
| **✅ Safe Zone** | 1270px | 66% | Área utilizável |

---

### Feed (1:1) — 1080 × 1080 px

```
┌─────────────────────────┐
│  ~~ margem 100px ~~    │
│  ┌───────────────────┐  │
│  │                   │  │
│  │   ÁREA SEGURA     │  │
│  │   880 × 880 px    │  │
│  │                   │  │
│  └───────────────────┘  │
│  ~~ margem 100px ~~    │
└─────────────────────────┘
```

| Zona | Pixels | Observação |
|------|--------|------------|
| **Todas as bordas** | 100px | Best practice — conteúdo não fica cortado |
| **Área útil** | 880 × 880px | Centro da imagem |

---

## Regras Obrigatórias (Design Rules)

### Stories (9:16)
1. **Nenhum elemento crítico acima de y=280px** — logo NP começa em y≥280px
2. **Nenhum elemento crítico abaixo de y=1540px** — CTA button termina antes de y=1520px
3. **Padding mínimo lateral de 65px** em todos os elementos de texto
4. **Headline e CTA obrigatoriamente na safe zone** (y=280 a y=1520)

### Feed (1:1)
1. **Padding mínimo de 100px** de todas as bordas para texto crítico
2. Logo e headline devem estar no centro seguro (x=100 a x=980, y=100 a y=980)
3. CTA button não deve tocar as bordas (mínimo 60px de margem lateral)

---

## Valores de Padding Aplicados nos Criativos HTML

### Stories (9:16)
```css
.top-bar { padding: 295px 80px 0; }   /* logo a y≈295, abaixo dos 270px */
.bottom  { padding: 0 80px 420px; }   /* CTA a y≈1500, acima dos 380px do rodapé */
```

### Feed (1:1)
```css
.top-bar { padding: 44px 60px; }      /* mínimo visual, safe zone menos crítica */
.bottom  { padding: 0 60px 65px; }    /* margem adequada */
```

---

## Referências
- Meta Business Help: facebook.com/business/help/980593475366490
- AdsUploader Safe Zones: adsuploader.com/blog/meta-ads-safe-zones
- Reels (diferença): rodapé **670px** (35%) — ainda mais crítico que Stories
