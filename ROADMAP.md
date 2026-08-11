# Roadmap — H.S.M.FRANCE Gestion

> Document de suivi du développement du MVP.
>
> Ce fichier sert de référence commune pour savoir ce qui est terminé, en cours et restant à développer. Il doit être mis à jour au fur et à mesure de l’avancement du projet.

**Dernière mise à jour : 11 août 2026**

## Légende

- [ ] À faire
- [x] Terminé
- 🚧 En cours
- ⏸️ Reporté / hors MVP

## Objectif du MVP

Construire une application web interne simple permettant à H.S.M.FRANCE de gérer :

- les clients ;
- les produits ;
- le stock ;
- les bons de livraison ;
- les factures ;
- les avoirs ;
- les paiements ;
- les impayés ;
- les exports comptables ;
- un tableau de bord de gestion.

Le parcours métier principal est :

`Client → Produits → Stock → Bon de livraison → Facture → Paiement`

---

# Phase 1 — Socle technique

- [ ] Valider l’architecture finale de l’application.
- [ ] Initialiser l’application TypeScript.
- [ ] Configurer React / Next.js selon l’architecture retenue.
- [ ] Configurer Tailwind CSS.
- [ ] Mettre en place la base CSS et la charte graphique H.S.M.FRANCE.
- [ ] Configurer ESLint.
- [ ] Configurer Prettier.
- [ ] Définir la structure des dossiers.
- [ ] Configurer les variables d’environnement.
- [ ] Ajouter un fichier `.env.example` sans secret.
- [ ] Configurer Docker Compose.
- [ ] Configurer PostgreSQL.
- [ ] Installer et configurer Prisma.
- [ ] Installer et configurer Zod.
- [ ] Vérifier le lancement complet de l’environnement de développement.

**Critère de validation :** l’application démarre localement, PostgreSQL est accessible et Prisma peut communiquer avec la base de données.

---

# Phase 2 — Base de données

- [ ] Créer `prisma/schema.prisma`.
- [ ] Modèle `User`.
- [ ] Modèle `Company`.
- [ ] Modèle `Customer`.
- [ ] Modèle `Supplier`.
- [ ] Modèle `Product`.
- [ ] Modèle `StockMovement`.
- [ ] Modèle `DeliveryNote`.
- [ ] Modèle `DeliveryNoteItem`.
- [ ] Modèle `Invoice`.
- [ ] Modèle `InvoiceItem`.
- [ ] Modèle `Payment`.
- [ ] Modèle `CreditNote`.
- [ ] Modèle `AuditLog`.
- [ ] Définir correctement les relations entre les modèles.
- [ ] Utiliser `Decimal` pour tous les montants financiers.
- [ ] Ajouter les index et contraintes d’unicité nécessaires.
- [ ] Créer la première migration Prisma.
- [ ] Ajouter un seed de développement minimal.

**Critère de validation :** une base vierge peut être créée entièrement avec les migrations du projet.

---

# Phase 3 — Authentification et autorisations

- [ ] Mettre en place l’authentification.
- [ ] Connexion.
- [ ] Déconnexion.
- [ ] Gestion de session.
- [ ] Hachage sécurisé des mots de passe si authentification locale.
- [ ] Protection des routes privées.
- [ ] Rôle `ADMIN`.
- [ ] Rôle `MANAGER` / gérant.
- [ ] Rôle `ACCOUNTANT` / comptable.
- [ ] Contrôle des autorisations côté serveur.
- [ ] Tester les accès interdits selon les rôles.

**Critère de validation :** un utilisateur non connecté ne peut pas accéder à l’application et chaque rôle ne voit que les fonctions autorisées.

---

# Phase 4 — Structure générale de l’interface

- [ ] Layout principal de l’application.
- [ ] Sidebar.
- [ ] Header.
- [ ] Navigation.
- [ ] Responsive desktop / tablette.
- [ ] Composants de formulaires réutilisables.
- [ ] Composants de tableaux.
- [ ] Modales / dialogues.
- [ ] Notifications utilisateur.
- [ ] Confirmations pour les actions sensibles.
- [ ] Loaders.
- [ ] États vides.
- [ ] Gestion des erreurs utilisateur.

Navigation cible :

- Tableau de bord
- Clients
- Produits
- Stock
- Bons de livraison
- Factures
- Paiements
- Exports
- Paramètres

---

# Phase 5 — Clients

- [ ] Liste des clients.
- [ ] Recherche des clients.
- [ ] Création d’un client.
- [ ] Modification d’un client.
- [ ] Archivage d’un client.
- [ ] Fiche détaillée client.
- [ ] Raison sociale.
- [ ] Responsable.
- [ ] Téléphone.
- [ ] E-mail.
- [ ] SIRET.
- [ ] Numéro de TVA facultatif.
- [ ] Adresse de facturation.
- [ ] Adresse de livraison.
- [ ] Délai de paiement.
- [ ] Notes.
- [ ] Historique des bons de livraison du client.
- [ ] Historique des factures du client.
- [ ] Affichage du reste à payer.

**Critère de validation :** le gérant peut créer, retrouver et modifier rapidement un client.

---

# Phase 6 — Produits

- [ ] Liste des produits.
- [ ] Recherche.
- [ ] Création d’un produit.
- [ ] Modification.
- [ ] Archivage.
- [ ] Nom.
- [ ] Référence.
- [ ] Catégorie.
- [ ] Marque.
- [ ] Variété.
- [ ] Conditionnement.
- [ ] Prix d’achat.
- [ ] Prix de vente HT.
- [ ] TVA.
- [ ] Stock disponible.
- [ ] Seuil d’alerte.
- [ ] Champs facultatifs pour lot / date si nécessaires.

---

# Phase 7 — Gestion du stock

- [ ] Entrée de stock.
- [ ] Correction de stock avec motif obligatoire.
- [ ] Historique des mouvements.
- [ ] Stock disponible calculé de manière fiable.
- [ ] Alerte de stock faible.
- [ ] Blocage du stock négatif par défaut.
- [ ] Source métier obligatoire sur chaque mouvement.
- [ ] Journalisation des corrections de stock.

## Règle métier critique

### Vente avec bon de livraison

`Validation du BL → diminution du stock`

La transformation du BL en facture **ne doit jamais diminuer le stock une seconde fois**.

### Facture directe

`Validation de la facture directe → diminution du stock`

**Critère de validation :** aucune opération métier ne peut provoquer une double sortie de stock.

---

# Phase 8 — Bons de livraison

- [ ] Liste des bons de livraison.
- [ ] Création d’un BL.
- [ ] Sélection du client.
- [ ] Ajout des produits.
- [ ] Saisie des quantités.
- [ ] Modification des lignes en brouillon.
- [ ] Enregistrement en brouillon.
- [ ] Validation du BL.
- [ ] Numérotation automatique, ex. `BL-2026-000001`.
- [ ] Numérotation atomique et sans doublon.
- [ ] Diminution du stock lors de la validation.
- [ ] Génération PDF.
- [ ] Téléchargement.
- [ ] Impression.
- [ ] Préparation de l’envoi par e-mail.
- [ ] Transformation du BL en facture.

---

# Phase 9 — Factures

- [ ] Liste des factures.
- [ ] Création depuis un bon de livraison.
- [ ] Création d’une facture directe.
- [ ] Numérotation automatique, ex. `FAC-2026-000001`.
- [ ] Numérotation atomique et sans doublon.
- [ ] Calcul HT.
- [ ] Calcul TVA.
- [ ] Calcul TTC.
- [ ] Date d’échéance.
- [ ] Statut `DRAFT`.
- [ ] Statut `SENT`.
- [ ] Statut `PARTIALLY_PAID`.
- [ ] Statut `PAID`.
- [ ] Statut `OVERDUE`.
- [ ] Gestion de l’annulation par avoir.
- [ ] Snapshot des coordonnées client lors de la validation.
- [ ] Snapshot des lignes, prix et taxes.
- [ ] Facture figée après validation.
- [ ] Interdiction de suppression d’une facture validée.
- [ ] Génération PDF.
- [ ] Téléchargement.
- [ ] Impression.
- [ ] Préparation de l’envoi par e-mail.

---

# Phase 10 — Avoirs

- [ ] Création d’un avoir depuis une facture.
- [ ] Lien entre facture et avoir.
- [ ] Gestion des lignes corrigées.
- [ ] Calcul des montants.
- [ ] Numérotation des avoirs.
- [ ] Génération PDF.
- [ ] Historique des avoirs.
- [ ] Mise à jour cohérente du statut de la facture concernée.

---

# Phase 11 — Paiements

- [ ] Liste des paiements.
- [ ] Enregistrer un paiement.
- [ ] Montant.
- [ ] Date.
- [ ] Moyen de paiement.
- [ ] Espèces.
- [ ] Chèque.
- [ ] Virement.
- [ ] Carte.
- [ ] Autre.
- [ ] Référence.
- [ ] Note facultative.
- [ ] Paiements partiels.
- [ ] Paiements complets.
- [ ] Calcul automatique du reste dû.
- [ ] Mise à jour automatique du statut de la facture.
- [ ] Journalisation des paiements.

---

# Phase 12 — Impayés

- [ ] Liste des factures échues non soldées.
- [ ] Calcul du nombre de jours de retard.
- [ ] Montant restant par facture.
- [ ] Montant restant par client.
- [ ] Filtres par client.
- [ ] Filtres par échéance.
- [ ] Total des créances clients.

---

# Phase 13 — Tableau de bord

- [ ] Chiffre d’affaires du mois.
- [ ] Reste à encaisser.
- [ ] Nombre et montant des factures en retard.
- [ ] Produits en stock faible.
- [ ] Dernières factures.
- [ ] Derniers produits vendus.
- [ ] Produits les plus vendus.
- [ ] Liens rapides vers les actions principales.

**Remarque :** le tableau de bord est développé après les modules métier afin d’utiliser de vraies données.

---

# Phase 14 — Paramètres H.S.M.FRANCE

- [ ] Informations légales de la société.
- [ ] Raison sociale.
- [ ] SIRET.
- [ ] Numéro de TVA.
- [ ] Adresse.
- [ ] Téléphone.
- [ ] E-mail.
- [ ] Logo.
- [ ] IBAN.
- [ ] Conditions de paiement.
- [ ] Préfixes de numérotation.
- [ ] Préférences générales.

---

# Phase 15 — Exports comptables

- [ ] Export CSV des ventes.
- [ ] Export CSV des paiements.
- [ ] Export de la liste des impayés.
- [ ] Récapitulatif HT / TVA / TTC sur une période.
- [ ] Téléchargement des PDF sur une période.
- [ ] Préparer un format adaptable aux besoins du comptable.

Le MVP ne remplace pas un logiciel de comptabilité et ne vise pas à produire un FEC complet.

---

# Phase 16 — Audit et sécurité

- [ ] Journal `AuditLog`.
- [ ] Traçabilité des validations de BL.
- [ ] Traçabilité des validations de factures.
- [ ] Traçabilité des corrections de stock.
- [ ] Traçabilité des paiements.
- [ ] Traçabilité des actions administratives sensibles.
- [ ] Validation Zod côté serveur.
- [ ] Contrôle des autorisations sur chaque opération sensible.
- [ ] Protection contre les accès à des ressources non autorisées (IDOR).
- [ ] Secrets exclus de Git.
- [ ] HTTPS en production.
- [ ] Headers de sécurité adaptés.
- [ ] Sauvegardes automatiques PostgreSQL.
- [ ] Procédure de restauration testée.
- [ ] Hébergement des données de préférence dans l’Union européenne.

---

# Phase 17 — Tests

## Tests unitaires / intégration

- [ ] Calcul HT.
- [ ] Calcul TVA.
- [ ] Calcul TTC.
- [ ] Numérotation unique des BL.
- [ ] Numérotation unique des factures.
- [ ] Mouvements de stock.
- [ ] Validation BL puis facture sans double sortie de stock.
- [ ] Facture directe et sortie de stock.
- [ ] Paiement partiel.
- [ ] Paiement complet.
- [ ] Facture figée après validation.
- [ ] Autorisations selon les rôles.

## Tests de parcours

- [ ] `Client → Produit → Stock → BL → Facture → Paiement`.
- [ ] Création d’une facture directe.
- [ ] Création d’un avoir.
- [ ] Consultation des impayés.
- [ ] Export comptable.

---

# Phase 18 — CI/CD et production

- [ ] GitHub Actions.
- [ ] Vérification ESLint en CI.
- [ ] Vérification TypeScript en CI.
- [ ] Tests automatiques en CI.
- [ ] Build automatique.
- [ ] Gestion des migrations Prisma en production.
- [ ] Environnement de staging si nécessaire.
- [ ] Environnement de production.
- [ ] HTTPS.
- [ ] Sauvegardes PostgreSQL.
- [ ] Monitoring.
- [ ] Logs applicatifs.
- [ ] Documentation de déploiement.

---

# Hors périmètre du MVP

- [ ] ⏸️ Gestion douanière avancée.
- [ ] ⏸️ Suivi de conteneurs.
- [ ] ⏸️ Gestion avancée des lots.
- [ ] ⏸️ Plusieurs entrepôts.
- [ ] ⏸️ Comptabilité complète.
- [ ] ⏸️ Rapprochement bancaire automatique.
- [ ] ⏸️ Application mobile native.
- [ ] ⏸️ Microservices.
- [ ] ⏸️ Intelligence artificielle.
- [ ] ⏸️ Plateforme fiscale développée en interne.

---

# Ordre de développement retenu

1. Socle technique
2. Base de données
3. Authentification et rôles
4. Structure générale de l’interface
5. Clients
6. Produits
7. Stock
8. Bons de livraison
9. Factures
10. Avoirs
11. Paiements
12. Impayés
13. Tableau de bord
14. Paramètres
15. Exports comptables
16. Audit et sécurité
17. Tests
18. CI/CD et production

---

# Journal d’avancement

| Date | Phase | Évolution |
|---|---|---|
| 11/08/2026 | Organisation | Création de la roadmap de développement du MVP. |

---

# Prochaine étape

**Phase 1 — Socle technique**

Avant le développement fonctionnel, vérifier l’état réel du projet et finaliser la configuration de l’environnement : framework, Tailwind CSS, PostgreSQL, Prisma, Docker, validation et structure du code.
