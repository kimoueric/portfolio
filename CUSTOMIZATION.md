# 🎨 Guide de Personnalisation Rapide

Ce guide vous aidera à personnaliser rapidement votre portfolio.

## 📝 Modifier vos Informations Personnelles

### 1. Nom et Titre
Dans `index.html`, ligne 141-145 :
```html
<span class="bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
  Kimou N'cho <!-- Changez ici -->
</span>
```

### 2. Description
Ligne 148-151 :
```html
<p class="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-8 max-w-3xl mx-auto">
  Développeur <span class="text-accent-blue font-semibold">Full Stack</span> passionné...
  <!-- Modifiez votre description ici -->
</p>
```

### 3. Technologies Principales
Ligne 154-169, modifiez les badges :
```html
<span class="px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50 text-sm">
  <span class="text-blue-400">●</span> Next.js <!-- Changez ici -->
</span>
```

## 🔗 Modifier les Liens Sociaux

Dans `index.html`, ligne 173-188 :
```html
<a href="https://github.com/votre-username" class="...">
  <i class="fi fi-brands-github text-xl"></i>
</a>
```

Remplacez `#` par vos vrais liens :
- GitHub : `https://github.com/votre-username`
- Twitter : `https://twitter.com/votre-username`
- LinkedIn : `https://linkedin.com/in/votre-username`
- Facebook : `https://facebook.com/votre-username`

## 🖼️ Changer votre Photo

1. Placez votre photo dans `assets/images/`
2. Nommez-la `me.JPG` ou modifiez la ligne 303 :
```html
<img src="./assets/images/votre-photo.jpg" alt="Votre Nom" class="..." />
```

## 💼 Ajouter/Modifier des Projets

Dans `index.html`, section Projects (ligne 360+) :

```html
<div class="project-card group">
  <div class="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-800/50 hover:border-accent-purple/50 transition-all">
    
    <!-- Image du projet -->
    <div class="relative h-64 overflow-hidden">
      <img src="./assets/images/votre-projet.jpg" alt="Nom du Projet" class="..." />
    </div>
    
    <!-- Contenu -->
    <div class="relative p-8">
      <h3 class="text-2xl font-bold mb-3">Nom du Projet</h3>
      <p class="text-sm text-accent-purple mb-4">Sous-titre</p>
      <p class="text-slate-300 mb-6">
        Description de votre projet...
      </p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span class="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-sm text-red-400">Tag1</span>
        <span class="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-400">Tag2</span>
      </div>
      
      <a href="lien-vers-projet" class="...">
        <span>En savoir plus</span>
      </a>
    </div>
  </div>
</div>
```

## 🎯 Ajouter/Modifier des Compétences

Dans `index.html`, section Skills (ligne 280+) :

```html
<div class="skill-card group">
  <div class="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50 hover:border-blue-500/50 transition-all hover:scale-105">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div class="relative">
      <img src="./assets/icons/votre-techno.svg" alt="Nom" class="w-16 h-16 mx-auto mb-4" />
      <h3 class="text-center font-semibold">Nom de la Techno</h3>
    </div>
  </div>
</div>
```

## 🎨 Personnaliser les Couleurs

### Dans TailwindCSS (index.html, ligne 16-37)

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        accent: {
          purple: '#a855f7',  // Changez ces couleurs
          pink: '#ec4899',
          blue: '#3b82f6',
          green: '#10b981',
        }
      },
    },
  },
};
```

### Couleurs Disponibles
- `accent-purple` : Violet principal
- `accent-pink` : Rose
- `accent-blue` : Bleu
- `accent-green` : Vert

## ⚙️ Ajuster les Animations

Dans `assets/js/main.js` :

### Vitesse du Smooth Scroll
Ligne 6-16 :
```javascript
const lenis = new Lenis({
  duration: 1.2,  // Augmentez pour ralentir, diminuez pour accélérer
  smooth: true,
});
```

### Délais d'Animation
Ligne 100+ :
```javascript
gsap.from('.hero-content h1', {
  y: 100,
  opacity: 0,
  duration: 1,  // Durée de l'animation
  stagger: 0.2  // Délai entre chaque élément
});
```

## 📧 Configurer le Formulaire de Contact

Le formulaire est actuellement statique. Pour le rendre fonctionnel :

### Option 1 : Formspree
1. Créez un compte sur [Formspree](https://formspree.io)
2. Dans `index.html`, ligne 440, ajoutez :
```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST" class="space-y-6">
```

### Option 2 : EmailJS
1. Créez un compte sur [EmailJS](https://www.emailjs.com)
2. Ajoutez le script EmailJS dans `index.html`
3. Modifiez `assets/js/main.js` pour gérer l'envoi

### Option 3 : Backend personnalisé
Créez votre propre API backend pour gérer les soumissions.

## 🌓 Thème par Défaut

Dans `assets/js/main.js`, ligne 270 :
```javascript
const currentTheme = localStorage.getItem('theme') || 'dark';  // Changez 'dark' en 'light'
```

## 📱 Responsive Design

Les breakpoints TailwindCSS :
- `sm:` - 640px et plus
- `md:` - 768px et plus
- `lg:` - 1024px et plus
- `xl:` - 1280px et plus
- `2xl:` - 1536px et plus

Exemple :
```html
<div class="text-2xl md:text-4xl lg:text-6xl">
  <!-- 2xl sur mobile, 4xl sur tablette, 6xl sur desktop -->
</div>
```

## 🚀 Optimisation des Images

1. Compressez vos images avec [TinyPNG](https://tinypng.com)
2. Utilisez des formats modernes (WebP)
3. Ajoutez `loading="lazy"` sur les images :
```html
<img src="..." alt="..." loading="lazy" />
```

## 📊 Analytics

### Google Analytics
Ajoutez avant `</head>` dans `index.html` :
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

## 🔍 SEO

### Meta Tags
Dans `index.html`, ligne 3-7 :
```html
<title>Votre Nom - Votre Titre</title>
<meta name="description" content="Votre description" />
<meta name="keywords" content="vos, mots, clés" />
<meta name="author" content="Votre Nom" />
```

### Open Graph (Réseaux Sociaux)
Ajoutez dans `<head>` :
```html
<meta property="og:title" content="Votre Nom - Portfolio" />
<meta property="og:description" content="Votre description" />
<meta property="og:image" content="./assets/images/og-image.jpg" />
<meta property="og:url" content="https://votre-domaine.com" />
```

## 🎯 Checklist Avant Publication

- [ ] Modifier toutes les informations personnelles
- [ ] Remplacer les liens sociaux
- [ ] Ajouter vos projets
- [ ] Changer votre photo
- [ ] Configurer le formulaire de contact
- [ ] Optimiser les images
- [ ] Tester sur mobile
- [ ] Vérifier les liens
- [ ] Ajouter Google Analytics
- [ ] Configurer le SEO
- [ ] Tester les performances (Lighthouse)

## 💡 Conseils

1. **Testez régulièrement** sur différents navigateurs et appareils
2. **Optimisez les images** pour de meilleures performances
3. **Gardez le design cohérent** avec votre marque personnelle
4. **Mettez à jour régulièrement** vos projets et compétences
5. **Utilisez des vraies données** plutôt que du lorem ipsum

## 🆘 Besoin d'Aide ?

- Consultez le `README.md` pour plus de détails
- Vérifiez la console du navigateur pour les erreurs
- Testez avec `python3 -m http.server 8000`

---

Bon courage avec votre portfolio ! 🚀
