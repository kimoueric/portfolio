# 🚀 Portfolio Kimou.dev

Portfolio personnel moderne et interactif développé avec **Lenis.js**, **GSAP**, et **TailwindCSS**.

## ✨ Fonctionnalités

- 🎯 **Smooth Scrolling** avec Lenis.js pour une navigation ultra-fluide
- 🎨 **Animations GSAP** professionnelles (ScrollTrigger, parallax, reveal effects)
- 💎 **Design Premium** avec glassmorphism et gradients dynamiques
- 🎭 **Cursor Follower** personnalisé (desktop uniquement)
- 🧲 **Magnetic Buttons** avec effet d'attraction
- 📱 **Responsive Design** optimisé pour tous les écrans
- 🌓 **Dark/Light Mode** avec transition fluide
- ⚡ **Performance optimisée** avec lazy loading et animations GPU-accelerated

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **TailwindCSS** - Framework CSS utility-first
- **Lenis.js** - Smooth scrolling library
- **GSAP** - Animation library professionnelle
- **ScrollTrigger** - Plugin GSAP pour animations au scroll
- **Vanilla JavaScript** - Logique et interactions

## 📂 Structure du Projet

```
portfolio/
├── index.html              # Page principale
├── assets/
│   ├── css/
│   │   └── style.css      # Styles personnalisés
│   ├── js/
│   │   └── main.js        # JavaScript principal (GSAP + Lenis)
│   ├── images/            # Images du portfolio
│   └── icons/             # Icônes des technologies
└── README.md              # Documentation
```

## 🚀 Installation & Utilisation

### Prérequis
- Un navigateur web moderne
- Un serveur local (Python, Node.js, ou autre)

### Lancement

#### Avec Python 3
```bash
python3 -m http.server 8000
```

#### Avec Node.js (http-server)
```bash
npx http-server -p 8000
```

#### Avec PHP
```bash
php -S localhost:8000
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans la configuration TailwindCSS dans `index.html` :

```javascript
colors: {
  accent: {
    purple: '#a855f7',
    pink: '#ec4899',
    blue: '#3b82f6',
    green: '#10b981',
  }
}
```

### Animations
Les animations sont configurées dans `assets/js/main.js`. Vous pouvez ajuster :
- La durée du smooth scroll
- Les délais d'animation
- Les effets de parallax
- Les triggers de ScrollTrigger

### Contenu
Modifiez directement le contenu dans `index.html` :
- Sections Hero, About, Skills, Projects, Contact
- Liens sociaux
- Informations personnelles

## 📱 Sections

1. **Hero** - Introduction avec animation de texte et boutons CTA
2. **About** - Présentation personnelle avec image
3. **Skills** - Grille de compétences techniques
4. **Projects** - Cartes de projets avec images et descriptions
5. **Contact** - Formulaire de contact
6. **Footer** - Copyright et liens

## 🎯 Animations Implémentées

- ✅ Fade in/out au scroll
- ✅ Parallax sur images et backgrounds
- ✅ Reveal animations sur les titres
- ✅ Stagger animations sur les cartes
- ✅ Hover effects avec GSAP
- ✅ Cursor follower magnétique
- ✅ Smooth scroll avec Lenis
- ✅ Navigation active au scroll
- ✅ Scroll to top button

## 🔧 Configuration Lenis

```javascript
const lenis = new Lenis({
  duration: 1.2,              // Durée du smooth scroll
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,               // Active le smooth scroll
  mouseMultiplier: 1,         // Sensibilité de la souris
  touchMultiplier: 2,         // Sensibilité du touch
});
```

## 🎨 Effets Visuels

- **Glassmorphism** - Effets de verre sur les cartes
- **Gradients Animés** - Transitions de couleurs fluides
- **Blur Effects** - Arrière-plans flous
- **Glow Effects** - Effets de lueur sur hover
- **Shimmer** - Effet de brillance

## 📊 Performance

- ⚡ Animations GPU-accelerated
- 🖼️ Lazy loading des images
- 🎯 Optimisation ScrollTrigger
- 💾 LocalStorage pour les préférences
- 🔄 RAF (RequestAnimationFrame) optimisé

## 🌐 Compatibilité

- ✅ Chrome/Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Mobile (iOS/Android)

## 📝 Notes

- Le cursor follower est désactivé sur mobile pour de meilleures performances
- Les animations respectent `prefers-reduced-motion` pour l'accessibilité
- Le thème est sauvegardé dans le localStorage

## 🤝 Contribution

Ce portfolio est un projet personnel, mais les suggestions sont les bienvenues !

## 📄 Licence

© 2024 Kimou N'cho Guy-Eric - Tous droits réservés

## 👨‍💻 Auteur

**Kimou N'cho Guy-Eric**
- Développeur Full Stack
- Spécialisé en Next.js, Spring Boot, Apache Airflow
- Portfolio : [kimou.dev](https://kimou.dev)

---

Développé avec ❤️ et beaucoup de ☕
