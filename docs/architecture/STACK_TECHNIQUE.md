# Stack technique recommandée

## Architecture

Monolithe modulaire dans un seul dépôt. Le MVP ne nécessite ni microservices, ni Kubernetes, ni application mobile native.

## Technologies

- **Langage** : TypeScript
- **Framework full-stack** : Next.js avec App Router
- **Interface** : React, Tailwind CSS et shadcn/ui
- **Icônes** : Lucide React
- **Base de données** : PostgreSQL
- **ORM et migrations** : Prisma
- **Validation** : Zod
- **Formulaires** : React Hook Form
- **Authentification** : Auth.js ou solution équivalente
- **PDF** : React PDF ou moteur HTML vers PDF testé
- **Tests unitaires** : Vitest
- **Tests de parcours** : Playwright
- **Développement local** : Docker Compose
- **CI** : GitHub Actions

## Principes

- Utiliser `Decimal` pour les montants financiers.
- Les numéros de facture et de bon sont attribués dans une transaction atomique.
- Une facture validée conserve un snapshot des coordonnées, lignes, prix et taxes.
- Les clients et produits déjà utilisés sont archivés, pas supprimés physiquement.
- Les autorisations sont toujours contrôlées côté serveur.
- Les mouvements de stock sont immuables et possèdent une source métier.
- Les clés, mots de passe et secrets ne sont jamais commités.

## Modèle de données initial

- `User`
- `Company`
- `Customer`
- `Supplier`
- `Product`
- `StockMovement`
- `DeliveryNote`
- `DeliveryNoteItem`
- `Invoice`
- `InvoiceItem`
- `Payment`
- `CreditNote`
- `AuditLog`

## Ordre de développement

1. Initialisation Next.js, qualité de code et Docker.
2. PostgreSQL, Prisma et modèle de données.
3. Authentification, rôles et structure générale de l’interface.
4. Clients.
5. Produits et mouvements de stock.
6. Bons de livraison et génération PDF.
7. Factures, avoirs et numérotation.
8. Paiements et impayés.
9. Tableau de bord et exports comptables.
10. Tests, sauvegardes et déploiement.

## Structure cible

```text
src/
├── app/
├── components/
├── features/
│   ├── customers/
│   ├── products/
│   ├── stock/
│   ├── delivery-notes/
│   ├── invoices/
│   └── payments/
├── lib/
├── services/
├── validations/
└── types/

prisma/
├── schema.prisma
├── migrations/
└── seed.ts
```

La priorité est la maintenabilité et la simplicité d’utilisation, pas la sophistication de l’architecture.
