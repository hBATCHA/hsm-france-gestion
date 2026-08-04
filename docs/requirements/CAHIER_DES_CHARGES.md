# Cahier des charges — MVP H.S.M.FRANCE

## 1. Contexte

H.S.M.FRANCE est une petite société de distribution B2B de produits alimentaires importés, notamment du riz, du lait de coco et du jus de coco. Les clients sont principalement des épiceries et commerces locaux. Les factures sont actuellement préparées manuellement.

L’application doit être utilisable par un gérant peu à l’aise avec l’informatique. Elle doit donc être simple, lisible et limitée aux fonctions réellement utiles.

## 2. Objectif

Remplacer la facturation papier et fournir un outil unique pour :

- gérer les clients ;
- gérer les produits et le stock ;
- créer et imprimer les bons de livraison ;
- transformer un bon de livraison en facture ;
- créer une facture directe ;
- enregistrer les paiements ;
- suivre les impayés ;
- consulter un tableau de bord simple ;
- préparer les données à transmettre au comptable ;
- permettre une future connexion à une plateforme de facturation électronique.

## 3. Utilisateurs

### Gérant

Accès aux ventes, clients, produits, stock, bons de livraison, factures et paiements.

### Administrateur

Tous les droits, notamment les paramètres, les utilisateurs et les corrections.

### Comptable

Accès en lecture aux factures, avoirs, paiements et exports.

## 4. Modules du MVP

### Tableau de bord

Afficher :

- chiffre d’affaires du mois ;
- reste à encaisser ;
- factures en retard ;
- produits en stock faible ;
- dernières factures ;
- derniers produits vendus ;
- produits les plus vendus.

### Clients

Informations minimales : raison sociale, responsable, téléphone, e-mail, SIRET, TVA facultative, adresses de facturation et de livraison, délai de paiement et notes.

La fiche client affiche ses bons de livraison, ses factures et son reste à payer.

### Produits et stock

Informations minimales : nom, catégorie, marque, variété, référence, conditionnement, prix d’achat, prix de vente HT, TVA, stock disponible et seuil d’alerte.

Fonctions :

- ajouter du stock ;
- corriger le stock avec un motif ;
- consulter l’historique des mouvements ;
- alerter en cas de stock faible ;
- empêcher le stock négatif par défaut.

Les lots et dates peuvent rester des champs facultatifs et ne nécessitent pas de module avancé dans le MVP.

### Bons de livraison

Parcours : sélectionner le client, ajouter les produits, saisir les quantités, enregistrer en brouillon, valider, générer le PDF, imprimer et créer la facture.

Numérotation proposée : `BL-2026-000001`.

La validation du bon de livraison diminue le stock.

### Factures

Une facture peut être créée :

- à partir d’un bon de livraison ;
- directement, sans bon de livraison.

Numérotation proposée : `FAC-2026-000001`.

Statuts : brouillon, envoyée, partiellement payée, payée, en retard et annulée par avoir.

Une facture validée ne peut plus être supprimée. Une correction passe par un avoir ou un document rectificatif.

### Paiements

Enregistrer le montant, la date, le moyen de paiement, la référence et une note facultative.

Moyens prévus : espèces, chèque, virement, carte et autre.

Gérer les paiements complets et partiels, le reste à payer et les échéances en retard.

### Paramètres

Configurer les informations de H.S.M.FRANCE, le logo, le SIRET, la TVA, l’IBAN, les conditions de paiement, les préfixes de numérotation et les préférences générales.

## 5. Règle métier critique du stock

### Vente avec bon de livraison

`Validation du bon de livraison → diminution du stock`

La transformation du bon en facture ne doit pas diminuer le stock une seconde fois.

### Facture directe

`Validation de la facture directe → diminution du stock`

Chaque sortie de stock doit donc posséder une source unique et traçable.

## 6. Documents

L’application génère :

- bons de livraison PDF ;
- factures PDF ;
- avoirs PDF.

Les documents doivent pouvoir être téléchargés, imprimés et envoyés par e-mail.

Les montants doivent être calculés avec un type décimal et non avec des nombres flottants.

## 7. Exports comptables

Prévoir :

- export CSV des ventes ;
- export CSV des paiements ;
- liste des impayés ;
- téléchargement des PDF sur une période ;
- récapitulatif HT, TVA et TTC.

Le format exact sera validé avec le comptable. Le MVP ne remplace pas un logiciel de comptabilité et ne prétend pas produire un FEC complet.

## 8. Sécurité minimale

- authentification ;
- rôles et autorisations contrôlés côté serveur ;
- mots de passe hachés ;
- HTTPS en production ;
- sauvegardes automatiques ;
- journalisation des validations, corrections de stock et paiements ;
- secrets exclus du dépôt GitHub ;
- données hébergées de préférence dans l’Union européenne.

## 9. Hors périmètre initial

Ne pas développer dans le MVP :

- gestion douanière ;
- suivi de conteneurs ;
- gestion avancée des lots ;
- plusieurs entrepôts ;
- comptabilité complète ;
- rapprochement bancaire automatique ;
- application mobile native ;
- microservices ;
- intelligence artificielle ;
- plateforme fiscale développée en interne.

## 10. Facturation électronique

Le MVP doit conserver des données propres et prévoir une couche d’intégration future. La transmission réglementaire sera déléguée à une plateforme agréée ou à une solution compatible disposant d’une API.

## 11. Critères d’acceptation

Le gérant doit pouvoir sans aide technique :

1. créer un client ;
2. créer ou retrouver un produit ;
3. ajouter du stock ;
4. créer et valider un bon de livraison ;
5. imprimer le bon ;
6. créer la facture correspondante ;
7. enregistrer un paiement ;
8. retrouver immédiatement le reste dû par le client.

Exigences techniques :

- aucun doublon de numéro de facture ou de bon ;
- aucune double diminution du stock ;
- une facture validée reste figée ;
- les calculs HT, TVA et TTC sont exacts ;
- les sauvegardes peuvent être restaurées ;
- les actions sensibles sont tracées.
