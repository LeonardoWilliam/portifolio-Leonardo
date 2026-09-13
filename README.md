# Leonardo William — Portfólio (v3, dados reais do currículo)

Site estático em HTML5 + CSS3 + JavaScript vanilla — sem frameworks, sem
build step. Basta abrir `index.html` no navegador.

## O que mudou nesta versão

- **Foto real** aplicada (`assets/leonardo-william.webp`, recortada a partir
  da foto enviada).
- **Currículo real em PDF** gerado a partir do `.docx` enviado —
  `assets/curriculo-leonardo-william.pdf` já funciona de verdade.
- **WhatsApp e e-mail reais** em todos os lugares: footer, CTA final,
  contato, botão flutuante e no `mailto:` do formulário
  (`(21) 95920-8821` / `leonardowillian898@gmail.com`).
- **Conteúdo alinhado ao currículo real**: Hero, Sobre, Tecnologias,
  Diferencial e Carreira reescritos para refletir a transição de carreira
  (3 anos em vendas na MV Motors → front-end).
- **Nova seção "Experiência & Educação"**, com a MV Motors, a Estácio de Sá
  e o curso da Microlins.
- **Projetos trocados pelos 3 reais do currículo**: Casa Nova Fácil, Casa
  Limpa e Fresca (fresh-home-clean) e Primeiro Site — confirmei no GitHub
  que "Casa Limpa e Fresca" é o mesmo projeto Vite + React + TypeScript +
  Tailwind + shadcn/ui de antes, só que a URL correta do repositório é sem
  o sufixo `-a7bb1adc`.
- **Ilustração original em SVG** no Projeto em Destaque (casa + vassoura +
  brilhos), no lugar do placeholder abstrato — sem usar banco de imagens.
- **Imagem OG gerada** com a foto real, para like/preview ao compartilhar o
  link (`assets/og-image.webp`).

## Como rodar

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Estrutura

```
/
├── index.html
├── privacidade.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── manifest.json
├── assets/
│   └── icons/
└── README.md
```

---

## 1. O que foi alterado

- **Posicionamento**: o site inteiro foi reordenado para priorizar carreira em
  TI (Hero → Posicionamento → Sobre → Tecnologias → Projetos → Projeto em
  destaque → Serviços para clientes → Diferencial → Roadmap → IA como
  ferramenta → **Carreira/Recrutadores** → Conteúdo técnico → CTA final →
  Contato), conforme a prioridade pedida: 1) Carreira 2) Projetos
  3) Tecnologias 4) GitHub 5) Currículo 6) Clientes.
- **Hero reescrito**: eyebrow "Desenvolvedor de Software", kicker
  "Web • SaaS • Inteligência Artificial", novo headline e subheadline, CTAs
  "Ver meus projetos" / "Ver currículo", link para LinkedIn, indicador
  "Disponível para oportunidades" em português, e linha de localização
  "Rio de Janeiro • Brasil • Remoto • Híbrido".
- **Copy inteira revisada** para tom direto e profissional, sem frases
  genéricas ("transformo sonhos em realidade" etc.).
- **Projetos viraram case studies**: cada card agora mostra objetivo, solução,
  aprendizado, tecnologias e link do GitHub — sem inventar link de demo ao
  vivo (nenhum dos 3 projetos tem deploy público, então só GitHub aparece).
  Adicionei filtro por categoria (Todos / Web / JavaScript / SaaS).
- **Projeto em destaque**: Fresh Home Clean (React + TypeScript + Tailwind +
  shadcn/ui), por ser o projeto com a stack mais próxima de produção.
- **Navbar**: Início, Sobre, Tecnologias, Projetos, Serviços, **Carreira**,
  Contato + CTA "Ver currículo".

## 2. O que foi corrigido

- **Formulário de contato não finge mais sucesso.** Esse era o problema
  crítico apontado no brief. Agora, ao enviar, o formulário abre o cliente de
  e-mail do visitante via `mailto:` com os campos preenchidos, e a mensagem de
  status descreve exatamente isso — nunca "mensagem enviada com sucesso" sem
  ter enviado de fato. O WhatsApp aparece como alternativa direta logo abaixo.
- **Domínio não é mais assumido como real.** Canonical, Open Graph, Twitter
  Card, JSON-LD, `sitemap.xml` e `robots.txt` usam o placeholder
  `SEU-DOMINIO-AQUI.com.br`, fácil de trocar com busca-e-substitui.
- **Menu mobile** (bug de altura por causa do `backdrop-filter` na navbar)
  continua corrigido desta vez também, e foi retestado.
- **Nenhuma experiência, cliente, métrica ou certificado inventados** — as
  seções "Diferencial" e "Sobre" são explícitas sobre não ter anos de
  experiência profissional, e a seção "Conhecimentos vs. Stack utilizada nos
  projetos" separa o que é teórico do que foi de fato usado em projetos reais.

## 3. Arquivos criados

| Arquivo | Para quê |
|---|---|
| `robots.txt` | Indexação por buscadores |
| `sitemap.xml` | Mapa do site para SEO |
| `manifest.json` | Metadados básicos (PWA-ready, mínimo) |
| `privacidade.html` | Aviso de privacidade simples e honesto sobre o formulário |
| `favicon` | Inline (SVG data URI com "LW"), não precisa de arquivo separado |

## 4. O que você ainda precisa substituir

Estas são as únicas coisas que impedem o site de ir para produção hoje:

| O quê | Onde | Status |
|---|---|---|
| **Domínio** | Busque `SEU-DOMINIO-AQUI` em `index.html`, `robots.txt`, `sitemap.xml`, `privacidade.html` | ⚠️ Ainda é um placeholder — SEO aponta para um domínio que não existe até você trocar |
| Número do WhatsApp | `(21) 95920-8821` | ✅ Já é o real, em todos os lugares |
| E-mail de contato | `leonardowillian898@gmail.com` | ✅ Já é o real, em todos os lugares |
| Foto profissional | `assets/leonardo-william.webp` | ✅ Já é a foto real enviada |
| Currículo em PDF | `assets/curriculo-leonardo-william.pdf` | ✅ Já é o PDF real, gerado a partir do seu .docx |
| OG image | `assets/og-image.webp` | ✅ Já gerada com sua foto |

## 5. Como publicar

1. Substitua os itens da tabela acima.
2. Suba a pasta inteira para Vercel, Netlify, GitHub Pages ou Cloudflare
   Pages — todos servem arquivos estáticos direto, sem configuração.
3. Aponte o domínio real para o deploy e atualize os placeholders de domínio.
4. (Opcional) Configure Formspree/EmailJS/Supabase seguindo o comentário
   acima do `<form>` em `index.html`, se quiser um envio que não dependa do
   cliente de e-mail do visitante.

## 6. Checklist final para candidatura a vagas de TI

- [ ] Troquei o domínio, e-mail e número de WhatsApp placeholder
- [ ] Adicionei uma foto profissional em `assets/leonardo-william.webp`
- [ ] Gerei e adicionei meu currículo em PDF
- [ ] Testei o formulário de contato abrindo meu próprio cliente de e-mail
- [ ] Testei o link do WhatsApp em um celular de verdade
- [ ] Revisei o LinkedIn para bater com o que o site promete
- [ ] Fiz o deploy e testei o site publicado no celular
- [ ] Rodei o Lighthouse (Chrome DevTools → Lighthouse) e conferi performance/SEO/acessibilidade
- [ ] Testei em Chrome, Firefox e Safari (ou peça para alguém com iPhone testar)

## Testes já realizados nesta versão

- Sem overflow horizontal em 320 / 360 / 375 / 390 / 430 / 768 / 1024 / 1366 / 1920px
- Fallback de foto funciona (placeholder "LW" aparece sem quebrar o layout)
- Filtro de projetos funciona (Todos / Web / JavaScript / SaaS)
- Formulário: validação de campos, e envio real via `mailto:` (sem mensagem de sucesso falsa)
- Botão flutuante do WhatsApp não cobre conteúdo (circular, canto inferior direito)
- Menu mobile com altura correta, fecha com Esc e ao clicar em link
- `prefers-reduced-motion` respeitado (todas as 33 animações de reveal)
- Navegação por teclado com foco visível
- Sem chaves, segredos ou credenciais no código

## Testado em (responsividade)

Larguras: 280 (Galaxy Fold fechado), 320, 360, 375, 390, 430, 600, 768, 820,
1024, 1180, 1280, 1366, 1440, 1920, 2560, 3840px — sem overflow horizontal em
nenhuma. Também testado: rotação de retrato para paisagem no celular, toque
real (tap, não só clique de mouse) no menu e nos filtros de projeto, e
tamanho de alvos de toque (menu, botões e filtros ajustados para no mínimo
44×44px, o padrão recomendado para dedos em telas touch).
