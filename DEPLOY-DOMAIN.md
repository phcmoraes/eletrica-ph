# 🌐 Deploy eletricaph.com - Guia Completo

## 🎯 **Configuração do Domínio eletricaph.com**

### **Pré-requisitos:**
- ✅ Domínio `eletricaph.com` registrado
- ✅ Acesso ao painel DNS do domínio
- ✅ Conta no Vercel/Netlify/Cloudflare Pages

---

## 🚀 **Opção 1: Deploy com Vercel (Recomendado)**

### **1. Deploy Inicial:**
```bash
cd /caminho/para/PH_Eletrica
npx vercel --prod
```

### **2. Configurar Domínio Personalizado:**
```bash
vercel domains add eletricaph.com
vercel domains add www.eletricaph.com
```

### **3. Configurações DNS:**
No painel do seu provedor de domínio, adicione:

```dns
# A Records
@ → 76.76.19.61
www → 76.76.19.61

# CNAME (alternativo)
www → cname.vercel-dns.com
```

---

## 🌐 **Opção 2: Deploy com Netlify**

### **1. Deploy via Git:**
1. Faça push do código para GitHub
2. Conecte repositório no Netlify
3. Configure domínio personalizado

### **2. Configurações DNS:**
```dns
# A Records
@ → 75.2.60.5
www → 75.2.60.5

# CNAME
www → your-site-name.netlify.app
```

---

## ☁️ **Opção 3: Cloudflare Pages**

### **1. Deploy:**
1. Upload dos arquivos via dashboard
2. Ou conecte repositório GitHub

### **2. DNS no Cloudflare:**
```dns
# A Records (proxy ativado)
@ → 192.0.2.1
www → 192.0.2.1
```

---

## 🔧 **Configurações Adicionais**

### **SSL/HTTPS:**
- ✅ **Vercel**: Automático
- ✅ **Netlify**: Automático  
- ✅ **Cloudflare**: Automático

### **Redirecionamentos:**
```
www.eletricaph.com → eletricaph.com (301)
http://eletricaph.com → https://eletricaph.com (301)
```

### **Headers de Segurança:**
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📊 **Google Analytics (Opcional)**

Adicione antes do `</head>` no index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔍 **Google Search Console**

1. **Adicione propriedade:** https://eletricaph.com
2. **Verificação:** Via tag HTML ou DNS
3. **Envie sitemap:** https://eletricaph.com/sitemap.xml

---

## 📱 **Testes Pós-Deploy**

### **Checklist de Verificação:**
- [ ] Site carrega em https://eletricaph.com
- [ ] Redirecionamento www → non-www funciona
- [ ] SSL ativo (cadeado verde)
- [ ] Formulário WhatsApp funcional
- [ ] Formulário Email funcional
- [ ] Site responsivo (mobile/desktop)
- [ ] Imagem do Phillip carregando
- [ ] Google Search Console configurado

### **Ferramentas de Teste:**
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **SSL Test:** https://www.ssllabs.com/ssltest/
- **Mobile Test:** https://search.google.com/test/mobile-friendly

---

## 🎉 **Status Final**

Quando tudo estiver configurado:

✅ **eletricaph.com** - Site principal  
✅ **www.eletricaph.com** - Redirecionamento  
✅ **HTTPS** - Certificado SSL ativo  
✅ **SEO** - Meta tags otimizadas  
✅ **Performance** - Site otimizado  

---

**🚀 PH Elétrica agora tem presença digital profissional!**

**Contato do Site:**
- 📧 phcmoraes.tech@gmail.com
- 📱 +55 12 99700-7101
- 🌐 https://eletricaph.com
