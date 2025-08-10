# 🚀 DEPLOY GUIDE: PH Elétrica → Vercel → eletricaph.com

## ✅ ETAPA 1: Deploy na Vercel (CONCLUÍDA)

### 📁 Estrutura do Projeto Otimizada:
```
📦 PH_Eletrica/
├── 📄 index.html          # Página principal (HTML limpo)
├── 🎨 style.css           # Estilos externos
├── ⚡ script.js           # JavaScript externo
├── 📋 package.json        # Configuração do projeto
├── ⚙️ vercel.json         # Configuração Vercel
├── 🌐 CNAME               # Domínio customizado
├── 🔍 sitemap.xml         # SEO - Mapa do site
├── 🤖 robots.txt          # SEO - Indexação
└── 📂 assets/
    └── 📂 images/
        └── 📸 profilePH.JPG
```

### 🛠️ Comandos para Deploy:

#### Opção A: Deploy via GitHub + Vercel
```bash
# 1. Inicializar repositório Git
git init
git add .
git commit -m "🚀 Deploy inicial PH Elétrica - eletricaph.com"

# 2. Conectar ao GitHub
git remote add origin https://github.com/SEU_USERNAME/ph-eletrica.git
git branch -M main
git push -u origin main

# 3. Conectar Vercel ao repositório GitHub
# https://vercel.com/new
```

#### Opção B: Deploy via Vercel CLI
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login na Vercel
vercel login

# 3. Deploy do projeto
vercel --prod
```

---

## ✅ ETAPA 2: Conectar Domínio eletricaph.com

### 📝 No Vercel Dashboard:

1. **Acessar Project Settings**
   ```
   Dashboard → ph-eletrica → Settings → Domains
   ```

2. **Adicionar Domínio Customizado**
   ```
   Add Domain: eletricaph.com
   Add Domain: www.eletricaph.com
   ```

3. **Copiar Configurações DNS**
   A Vercel irá mostrar:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### ⚙️ No Wix (Brasil) - Configuração DNS:

1. **Acessar Painel Wix Domains**
   ```
   https://wix.com/my-account/domains
   ```

2. **Configurar DNS para eletricaph.com**
   ```
   Domínios → eletricaph.com → Gerenciar DNS
   ```

3. **Adicionar Registros DNS**
   ```
   Registro A:
   - Tipo: A
   - Nome: @ (ou deixar vazio)
   - Valor: 76.76.19.61
   - TTL: 3600

   Registro CNAME:
   - Tipo: CNAME
   - Nome: www
   - Valor: cname.vercel-dns.com
   - TTL: 3600
   ```

4. **Remover Registros Conflitantes**
   - Excluir registros A e CNAME existentes
   - Manter apenas NS e MX records do Wix

---

## ⏰ TEMPO DE PROPAGAÇÃO

- **DNS**: 24-48 horas (máximo)
- **SSL**: Automático após DNS ativo
- **Teste**: https://eletricaph.com

---

## 🔍 VERIFICAÇÃO FINAL

### Checklist de Funcionalidades:
- [ ] Site carrega em https://eletricaph.com
- [ ] Site carrega em https://www.eletricaph.com
- [ ] SSL ativo (cadeado verde)
- [ ] Responsividade (mobile/desktop)
- [ ] WhatsApp funcional
- [ ] Email funcional
- [ ] SEO otimizado (title, meta, sitemap)
- [ ] Performance Lighthouse > 90

### URLs de Teste:
- **Vercel**: https://ph-eletrica.vercel.app
- **Domínio**: https://eletricaph.com
- **WWW**: https://www.eletricaph.com

---

## 🆘 TROUBLESHOOTING

### Problema: Domínio não carrega
```bash
# Verificar DNS
nslookup eletricaph.com
dig eletricaph.com

# Forçar limpeza cache DNS (macOS)
sudo dscacheutil -flushcache
```

### Problema: SSL não ativa
- Aguardar 24h após DNS propagado
- Verificar no Vercel → Domains → SSL

### Problema: Site não atualiza
- Clear cache do navegador
- Verificar se deploy foi feito com sucesso
- Redeployar se necessário

---

## 📞 SUPORTE TÉCNICO

**Vercel**: https://vercel.com/support
**Wix Domains**: https://support.wix.com/
**DNS Checker**: https://dnschecker.org/

---

✨ **DEPLOY REALIZADO COM SUCESSO!** ✨
🌐 **eletricaph.com está no ar!** 🌐
