# 🚀 Deploy Instructions - PH Elétrica Website

## 📁 Estrutura do Projeto

```
PH_Eletrica/
├── index.html          # Página principal (pronta para deploy)
├── assets/             # Pasta para recursos estáticos
│   ├── images/         # Imagens do site
│   └── README.md       # Documentação dos assets
├── DEPLOY.md           # Este arquivo
└── ph.md              # Documentação do projeto
```

## 🌐 Opções de Deploy

### 1. Vercel (Recomendado)

1. **Instale o Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **No terminal, navegue até a pasta do projeto:**
   ```bash
   cd /caminho/para/PH_Eletrica
   ```

3. **Execute o deploy:**
   ```bash
   vercel
   ```

4. **Siga as instruções:**
   - Link to existing project? → No
   - Project name? → ph-eletrica (ou outro nome)
   - Directory? → ./
   - Auto-deploy? → Yes

### 2. Netlify

1. **Via Drag & Drop:**
   - Acesse: https://app.netlify.com/drop
   - Arraste a pasta completa do projeto
   - Site estará online imediatamente

2. **Via CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir .
   netlify deploy --prod --dir .
   ```

### 3. GitHub Pages

1. **Crie um repositório no GitHub**
2. **Faça upload dos arquivos**
3. **Vá em Settings → Pages**
4. **Source: Deploy from branch → main**

### 4. Servidor Local (Teste)

```bash
# Python 3
python -m http.server 8000

# Node.js (se tiver)
npx serve .

# PHP
php -S localhost:8000
```

Acesse: http://localhost:8000

## ⚙️ Configurações Adicionais

### Domínio Personalizado
- Para usar domínio próprio (ex: pheletrica.com.br)
- Configure DNS para apontar para o serviço escolhido
- Adicione arquivo CNAME (se necessário)

### Analytics (Opcional)
Adicione antes do `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📱 QR Code WhatsApp

Para gerar QR Code do WhatsApp, use este link:
```
https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/5512997007101?text=Olá,%20me%20chamo%20[NOME],%20gostaria%20de%20um%20orçamento%20para%20serviço%20elétrico.
```

## ✅ Checklist Pré-Deploy

- [ ] Teste o site localmente
- [ ] Verifique links do WhatsApp e Email
- [ ] Teste responsividade em dispositivos móveis
- [ ] Substitua imagens placeholder por fotos reais
- [ ] Verifique informações de contato
- [ ] Teste formulário de contato

## 🔧 Manutenção

- **Atualizações**: Edite o `index.html` e faça novo deploy
- **Imagens**: Adicione na pasta `assets/images/`
- **Backup**: Mantenha cópia local do projeto

## 📞 Suporte

Para dúvidas sobre o site, verifique:
1. Console do navegador (F12) para erros
2. Teste em modo incógnito
3. Verifique compatibilidade do navegador

---

**Site criado para PH Elétrica - Phillip Moraes**
🚀 Pronto para o sucesso online!
