# Charte graphique — H.S.M.FRANCE

## 1. Identité de marque

### Nom

**H.S.M.FRANCE**

L’écriture doit toujours respecter :

* les majuscules ;
* les points entre H, S et M ;
* l’absence d’espace avant « FRANCE ».

Écriture correcte :

> H.S.M.FRANCE

### Signature

> IMPORT • DISTRIBUER • PARTAGER

La signature est facultative dans les petits espaces. Elle peut être affichée sur :

* la page de connexion ;
* les factures ;
* les bons de livraison ;
* les documents officiels ;
* la barre latérale lorsque l’espace est suffisant.

---

# 2. Logo

## Concept

Le logo associe :

* un colis ou carton ;
* un entrepôt ou espace de stockage ;
* une pousse végétale ;
* l’importation et la distribution de produits alimentaires.

Le carton représente :

* le commerce ;
* le stockage ;
* les livraisons ;
* l’importation.

La plante représente :

* l’alimentation ;
* l’origine naturelle des produits ;
* la croissance de l’entreprise.

## Versions à prévoir

Le développeur doit disposer de plusieurs versions :

1. logo horizontal complet ;
2. symbole seul ;
3. logo monochrome vert ;
4. logo blanc pour fond vert ;
5. logo horizontal sans signature ;
6. favicon avec le symbole seul.

## Utilisations

### Barre latérale

Utiliser :

* le symbole ;
* le nom H.S.M.FRANCE ;
* éventuellement la signature en petit.

### Documents PDF

Utiliser le logo horizontal complet en haut du document.

### Petit écran

Utiliser uniquement le symbole du colis.

### Favicon

Utiliser uniquement le symbole, sans texte.

## Zone de protection

Laisser autour du logo un espace vide équivalent à environ la hauteur de la lettre « H ».

Aucun texte ou bouton ne doit toucher directement le logo.

## Taille minimale

Logo horizontal :

* largeur minimale recommandée : 160 px.

Symbole seul :

* minimum 32 × 32 px ;
* recommandé dans l’application : 40 × 40 px.

## Important

Le logo généré pour les maquettes sert de direction artistique. Pour la production, il est recommandé de le refaire proprement en **SVG vectoriel** afin d’obtenir :

* des contours nets ;
* une transparence réelle ;
* une meilleure qualité d’impression ;
* une utilisation correcte dans les PDF ;
* une adaptation facile aux différentes tailles.

---

# 3. Palette principale

## Vert principal

```css
--color-primary: #166534;
```

Utilisation :

* boutons principaux ;
* élément actif du menu ;
* liens importants ;
* titres ou montants positifs ;
* icônes principales ;
* logo.

## Vert principal au survol

```css
--color-primary-hover: #14532D;
```

Utilisation :

* état `hover` des boutons verts ;
* état appuyé ;
* navigation active sombre.

## Vert intermédiaire

```css
--color-primary-medium: #15803D;
```

Utilisation :

* graphiques ;
* indicateurs ;
* éléments secondaires de la marque.

## Vert clair

```css
--color-primary-light: #DCFCE7;
```

Utilisation :

* arrière-plan des statuts positifs ;
* zones de résumé ;
* cartes mises en avant ;
* confirmations ;
* fonds d’icônes.

## Vert très clair

```css
--color-primary-subtle: #F0FDF4;
```

Utilisation :

* arrière-plan léger ;
* encadrés d’information ;
* aperçu d’un document ;
* zones sélectionnées.

---

# 4. Couleurs neutres

## Arrière-plan général

```css
--color-background: #F8FAFC;
```

## Surface des cartes

```css
--color-surface: #FFFFFF;
```

## Texte principal

```css
--color-text-primary: #111827;
```

## Texte secondaire

```css
--color-text-secondary: #64748B;
```

## Texte désactivé

```css
--color-text-disabled: #94A3B8;
```

## Bordures

```css
--color-border: #E2E8F0;
```

## Bordures plus légères

```css
--color-border-subtle: #F1F5F9;
```

## Arrière-plan secondaire

```css
--color-background-secondary: #F1F5F9;
```

---

# 5. Couleurs fonctionnelles

## Succès

```css
--color-success: #15803D;
--color-success-background: #DCFCE7;
--color-success-border: #BBF7D0;
```

Utilisation :

* facture payée ;
* stock correct ;
* paiement enregistré ;
* bon livré ;
* action réussie.

## Avertissement

```css
--color-warning: #D97706;
--color-warning-background: #FFF7ED;
--color-warning-border: #FED7AA;
```

Utilisation :

* stock faible ;
* paiement partiel ;
* facture bientôt échue ;
* élément nécessitant une vérification.

## Erreur ou danger

```css
--color-danger: #DC2626;
--color-danger-background: #FEF2F2;
--color-danger-border: #FECACA;
```

Utilisation :

* facture en retard ;
* rupture de stock ;
* suppression ;
* erreur ;
* action irréversible.

## Information

```css
--color-info: #2563EB;
--color-info-background: #EFF6FF;
--color-info-border: #BFDBFE;
```

Utilisation :

* facture envoyée ;
* information neutre ;
* document en cours de traitement.

---

# 6. Règle d’utilisation des couleurs

Le vert constitue la couleur principale de l’application.

Répartition visuelle recommandée :

* 70 % de blanc et de gris clair ;
* 20 % de couleurs neutres et de texte ;
* 10 % de vert et de couleurs d’état.

Le rouge ne doit jamais être utilisé pour une action normale.

Le rouge est réservé :

* aux erreurs ;
* aux retards ;
* aux ruptures ;
* aux suppressions ;
* aux montants problématiques.

L’orange est réservé aux avertissements et situations intermédiaires.

---

# 7. Typographie

## Police principale

Choix recommandé :

```css
font-family: "Inter", sans-serif;
```

Alternative avec Next.js :

```css
font-family: "Geist", sans-serif;
```

Police de secours :

```css
font-family: Inter, Geist, Arial, sans-serif;
```

## Graisses

* Regular : 400 ;
* Medium : 500 ;
* Semi-bold : 600 ;
* Bold : 700.

Éviter les graisses très fines.

## Tailles

### Grand titre de page

```css
font-size: 30px;
font-weight: 700;
line-height: 1.2;
```

### Titre de carte ou de section

```css
font-size: 20px;
font-weight: 600;
line-height: 1.3;
```

### Sous-titre

```css
font-size: 18px;
font-weight: 600;
```

### Texte normal

```css
font-size: 16px;
font-weight: 400;
line-height: 1.5;
```

### Libellé de formulaire

```css
font-size: 14px;
font-weight: 500;
```

### Petit texte secondaire

```css
font-size: 13px;
font-weight: 400;
```

### Indicateur financier principal

```css
font-size: 28px;
font-weight: 700;
```

Le texte courant ne doit pas descendre sous 14 px.

---

# 8. Grille et mise en page

## Structure desktop

```text
Barre latérale : 280 px
Barre supérieure : 88 px
Contenu : largeur restante
```

La largeur maximale du contenu peut être limitée à :

```css
max-width: 1600px;
```

## Espacement du contenu

```css
padding: 24px 32px;
```

## Grille

Utiliser une grille de base de 8 px.

Espacements autorisés :

* 4 px ;
* 8 px ;
* 12 px ;
* 16 px ;
* 24 px ;
* 32 px ;
* 40 px ;
* 48 px.

Éviter les espacements arbitraires comme 17 px ou 23 px.

## Espacement entre cartes

```css
gap: 24px;
```

## Espacement intérieur d’une carte

```css
padding: 24px;
```

Pour une petite carte :

```css
padding: 20px;
```

---

# 9. Barre latérale

## Dimensions

```css
width: 280px;
background: #FFFFFF;
border-right: 1px solid #E2E8F0;
```

## Élément du menu

```css
height: 52px;
border-radius: 10px;
padding: 0 16px;
gap: 12px;
```

## Élément actif

```css
background: #166534;
color: #FFFFFF;
```

## Élément inactif

```css
color: #111827;
background: transparent;
```

## Survol

```css
background: #F0FDF4;
color: #166534;
```

Chaque élément doit contenir :

* une icône ;
* un texte explicite ;
* une zone entièrement cliquable.

---

# 10. Barre supérieure

## Hauteur

```css
height: 88px;
```

## Style

```css
background: #FFFFFF;
border-bottom: 1px solid #E2E8F0;
```

Elle contient :

* le titre de la page ;
* la recherche globale ;
* le profil utilisateur ;
* éventuellement des notifications.

La recherche globale doit mesurer environ :

```css
width: 440px;
height: 48px;
```

---

# 11. Cartes

## Carte standard

```css
background: #FFFFFF;
border: 1px solid #E2E8F0;
border-radius: 14px;
padding: 24px;
box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
```

## Carte mise en avant

```css
background: #F0FDF4;
border: 1px solid #DCFCE7;
```

## Ombres

Les ombres doivent rester très légères.

```css
--shadow-card: 0 4px 14px rgba(15, 23, 42, 0.05);
--shadow-dropdown: 0 12px 30px rgba(15, 23, 42, 0.12);
```

Ne pas utiliser de grandes ombres sombres.

---

# 12. Coins arrondis

```css
--radius-small: 6px;
--radius-medium: 10px;
--radius-large: 14px;
--radius-xl: 18px;
--radius-pill: 9999px;
```

Utilisation :

* champs : 8 à 10 px ;
* boutons : 8 à 10 px ;
* cartes : 14 px ;
* badges : arrondi complet.

---

# 13. Boutons

## Bouton principal

```css
height: 48px;
padding: 0 20px;
background: #166534;
color: #FFFFFF;
border-radius: 10px;
font-size: 16px;
font-weight: 600;
```

Survol :

```css
background: #14532D;
```

## Bouton secondaire

```css
background: #FFFFFF;
color: #166534;
border: 1px solid #166534;
```

## Bouton léger

```css
background: #DCFCE7;
color: #166534;
border: none;
```

## Bouton dangereux

```css
background: #FFFFFF;
color: #DC2626;
border: 1px solid #DC2626;
```

## Dimensions

Bouton normal :

```css
height: 44px;
```

Bouton important :

```css
height: 52px;
```

Bouton avec icône :

```css
gap: 10px;
```

Les actions importantes doivent toujours contenir un texte, pas uniquement une icône.

---

# 14. Champs de formulaire

## Style standard

```css
height: 48px;
background: #FFFFFF;
border: 1px solid #CBD5E1;
border-radius: 8px;
padding: 0 14px;
font-size: 15px;
color: #111827;
```

## Focus

```css
border-color: #166534;
box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.12);
outline: none;
```

## Erreur

```css
border-color: #DC2626;
box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.08);
```

## Champ désactivé

```css
background: #F1F5F9;
color: #94A3B8;
```

## Libellés

Les libellés doivent toujours rester visibles au-dessus des champs.

Ne pas utiliser le placeholder comme unique indication.

Les champs obligatoires sont marqués par :

```text
*
```

en rouge.

---

# 15. Tableaux

## En-tête

```css
background: #F8FAFC;
color: #334155;
font-size: 14px;
font-weight: 600;
```

## Ligne

```css
min-height: 64px;
border-bottom: 1px solid #E2E8F0;
```

## Survol

```css
background: #F8FAFC;
```

## Alignement

* texte à gauche ;
* montants à droite ;
* statuts centrés ;
* actions à droite.

## Actions

Afficher au maximum deux actions principales.

Placer les autres actions dans un menu :

```text
⋯
```

---

# 16. Badges de statut

## Structure

```css
display: inline-flex;
align-items: center;
height: 28px;
padding: 0 12px;
border-radius: 9999px;
font-size: 13px;
font-weight: 500;
```

## Payée, actif, livré, stock correct

```css
background: #DCFCE7;
color: #15803D;
```

## Partielle, stock faible, à facturer

```css
background: #FFF7ED;
color: #D97706;
```

## En retard, rupture, annulée

```css
background: #FEF2F2;
color: #DC2626;
```

## Brouillon

```css
background: #F1F5F9;
color: #475569;
```

## Envoyée

```css
background: #EFF6FF;
color: #2563EB;
```

---

# 17. Icônes

Bibliothèque recommandée :

> Lucide React

Style :

* contour simple ;
* largeur uniforme ;
* aucune icône 3D dans l’interface ;
* taille normale : 20 px ;
* grande icône de carte : 24 px ;
* icône de menu : 22 px.

## Exemples

* tableau de bord : `House` ;
* livraison : `Truck` ;
* bon de livraison : `ClipboardList` ;
* facture : `FileText` ;
* clients : `Users` ;
* produits : `Package` ;
* paiement : `CircleEuro` ;
* paramètres : `Settings` ;
* ajout : `Plus` ;
* validation : `CircleCheck` ;
* avertissement : `TriangleAlert` ;
* suppression : `Trash2`.

Ne pas mélanger plusieurs bibliothèques d’icônes.

---

# 18. Graphiques

Les graphiques doivent rester simples.

## Couleurs recommandées

```css
--chart-green-900: #14532D;
--chart-green-700: #15803D;
--chart-green-500: #22C55E;
--chart-green-300: #86EFAC;
--chart-green-200: #BBF7D0;
```

## Graphiques autorisés

* barres horizontales ;
* courbe simple ;
* diagramme en anneau ;
* classement avec barres.

Éviter :

* les graphiques 3D ;
* les animations excessives ;
* les tableaux de bord surchargés ;
* plus de cinq couleurs sur un même graphique.

---

# 19. Photos des produits

Les images des produits doivent :

* avoir un fond blanc ou transparent ;
* être centrées ;
* respecter le même cadrage ;
* ne pas être déformées ;
* utiliser un format carré.

Dimensions recommandées :

```text
800 × 800 px
```

Formats :

* WebP ;
* PNG ;
* JPEG.

Dans les tableaux, utiliser des vignettes de :

```text
40 × 40 px
```

Dans une fiche produit :

```text
160 × 160 px
```

---

# 20. Responsive design

## Desktop

À partir de :

```css
min-width: 1280px;
```

* barre latérale complète ;
* plusieurs colonnes ;
* tableaux complets.

## Tablette

Entre :

```css
768px et 1279px
```

* barre latérale rétractable ;
* cartes sur deux colonnes ;
* formulaires réorganisés ;
* tableaux avec défilement horizontal si nécessaire.

## Téléphone

Sous :

```css
768px
```

* navigation dans un menu ;
* cartes sur une colonne ;
* boutons sur toute la largeur ;
* tableaux remplacés par des cartes lorsque possible.

L’application est principalement pensée pour ordinateur et tablette.

---

# 21. Accessibilité

## Contraste

Le texte doit respecter un contraste suffisant par rapport au fond.

Ne jamais utiliser du vert clair pour du texte principal sur fond blanc.

## Navigation clavier

Tous les éléments doivent être accessibles avec :

* `Tab` ;
* `Shift + Tab` ;
* `Entrée` ;
* `Espace` ;
* `Échap`.

## Zones cliquables

Taille minimale :

```text
44 × 44 px
```

## Statuts

Ne jamais identifier un statut uniquement par une couleur.

Toujours afficher également un texte :

* « Payée » ;
* « En retard » ;
* « Stock faible ».

## Erreurs

Afficher :

* le champ concerné ;
* une bordure rouge ;
* un message explicite.

Exemple :

> Le numéro SIRET est obligatoire.

---

# 22. Ton rédactionnel

L’application doit employer un français simple et direct.

## Verbes d’action

Utiliser :

* Ajouter ;
* Enregistrer ;
* Valider ;
* Télécharger ;
* Imprimer ;
* Envoyer ;
* Modifier ;
* Annuler.

## À éviter

* jargon technique ;
* termes anglais inutiles ;
* messages système ;
* abréviations non expliquées.

## Exemple correct

> Le stock a été mis à jour.

## Exemple incorrect

> Stock transaction successfully committed.

## Confirmations

> Valider ce bon de livraison ?

> Le stock sera diminué. Cette action ne pourra pas être annulée directement.

---

# 23. Notifications

## Succès

> La facture a été créée avec succès.

## Erreur

> La facture n’a pas pu être enregistrée.

## Avertissement

> Le stock de ce produit est faible.

## Information

> La facture a été enregistrée en brouillon.

Les notifications apparaissent en haut à droite et disparaissent après quelques secondes, sauf si une action est requise.

---

# 24. Variables CSS proposées

```css
:root {
  --color-primary: #166534;
  --color-primary-hover: #14532D;
  --color-primary-medium: #15803D;
  --color-primary-light: #DCFCE7;
  --color-primary-subtle: #F0FDF4;

  --color-background: #F8FAFC;
  --color-background-secondary: #F1F5F9;
  --color-surface: #FFFFFF;

  --color-text-primary: #111827;
  --color-text-secondary: #64748B;
  --color-text-disabled: #94A3B8;

  --color-border: #E2E8F0;
  --color-border-subtle: #F1F5F9;

  --color-success: #15803D;
  --color-success-background: #DCFCE7;

  --color-warning: #D97706;
  --color-warning-background: #FFF7ED;

  --color-danger: #DC2626;
  --color-danger-background: #FEF2F2;

  --color-info: #2563EB;
  --color-info-background: #EFF6FF;

  --radius-small: 6px;
  --radius-medium: 10px;
  --radius-large: 14px;
  --radius-xl: 18px;
  --radius-pill: 9999px;

  --shadow-card: 0 4px 14px rgba(15, 23, 42, 0.05);
  --shadow-dropdown: 0 12px 30px rgba(15, 23, 42, 0.12);
}
```

---

# 25. Configuration Tailwind proposée

```ts
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          500: "#22C55E",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
        warning: {
          50: "#FFF7ED",
          600: "#D97706",
        },
        danger: {
          50: "#FEF2F2",
          600: "#DC2626",
        },
      },
      borderRadius: {
        card: "14px",
        control: "10px",
      },
      boxShadow: {
        card: "0 4px 14px rgba(15, 23, 42, 0.05)",
        dropdown: "0 12px 30px rgba(15, 23, 42, 0.12)",
      },
    },
  },
};

export default config;
```

---

# 26. Composants du design system

Le développeur doit créer au minimum les composants suivants :

```text
AppSidebar
AppHeader
PageHeader
Card
KpiCard
PrimaryButton
SecondaryButton
DangerButton
TextInput
SelectInput
DateInput
SearchInput
Textarea
StatusBadge
DataTable
Pagination
ConfirmDialog
EmptyState
Toast
ProductThumbnail
MoneyDisplay
CustomerSelector
ProductSelector
QuantitySelector
StockIndicator
```

Tous les écrans doivent réutiliser ces composants pour conserver une apparence homogène.

---

# 27. Principe directeur

L’utilisateur principal n’étant pas très à l’aise avec l’informatique, chaque écran doit respecter cette règle :

> Une seule action principale clairement visible par page.

Exemples :

* Nouvelle livraison : « Valider la livraison » ;
* Nouvelle facture : « Valider la facture » ;
* Paiement : « Valider le paiement » ;
* Produit : « Enregistrer le produit » ;
* Client : « Enregistrer le client ».

Les actions secondaires doivent être moins visibles afin de ne pas créer de confusion.
