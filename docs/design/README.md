# Design H.S.M.FRANCE

Ce dossier regroupe la direction visuelle du MVP.

## Ressources

- [Galerie HTML des quatorze écrans](mockups/index.html)
- [Charte graphique complète](../CHARTE_GRAPHIQUE.md)
- Logo horizontal : `../public/branding/logo-hsm-france-horizontal.svg`
- Icône : `../public/branding/logo-hsm-france-icon.svg`

## Écrans de référence

1. Connexion
2. Tableau de bord
3. Clients
4. Fiche client
5. Nouvelle livraison
6. Bons de livraison
7. Détail du bon de livraison
8. Produits et stock
9. Fiche produit
10. Ajustement de stock
11. Nouvelle facture
12. Factures
13. Détail de la facture et paiement
14. Paramètres

## Règles d’implémentation

- L’interface est entièrement en français.
- La priorité est donnée à l’ordinateur et à la tablette.
- Chaque page présente une seule action principale clairement visible.
- Les cartes, boutons, champs, tableaux et badges doivent être des composants réutilisables.
- Les erreurs techniques ne doivent jamais être affichées telles quelles au gérant.
- Le vert `#166534` est réservé aux actions principales et états positifs.
- L’orange signale une attention et le rouge une erreur, un retard ou une action dangereuse.

## Composants attendus

`AppSidebar`, `AppHeader`, `PageHeader`, `Card`, `KpiCard`, `PrimaryButton`, `SecondaryButton`, `TextInput`, `SelectInput`, `SearchInput`, `StatusBadge`, `DataTable`, `ConfirmDialog`, `Toast`, `CustomerSelector`, `ProductSelector`, `QuantitySelector`, `StockIndicator`.

La galerie est une référence fonctionnelle. Les dimensions finales devront être adaptées au responsive design sans modifier la hiérarchie ni les parcours métier.
