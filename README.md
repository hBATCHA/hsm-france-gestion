# H.S.M.FRANCE — Gestion

Application web interne de facturation et gestion pour H.S.M.FRANCE.

---

## Prérequis

- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- npm

---

## Mode développement (recommandé)

### 1. Base de données

```bash
docker compose up db -d
```

PostgreSQL démarre sur le port **5432**.

Créer un fichier `.env` à la racine du projet :

```env
POSTGRES_USER=hsm
POSTGRES_PASSWORD=ton_mot_de_passe_db
POSTGRES_DB=hsm_france
```

### 2. Backend

```bash
cd backend
npm install
```

Créer un fichier `backend/.env` :

```env
DATABASE_URL=postgresql://hsm:ton_mot_de_passe_db@localhost:5432/hsm_france
JWT_SECRET=un_secret_long_et_aleatoire
ADMIN_EMAIL=admin@hsm-france.fr
ADMIN_PASSWORD=ton_mot_de_passe_admin
```

Appliquer les migrations et créer le premier utilisateur :

```bash
npx prisma migrate dev
npx prisma db seed
```

Démarrer :

```bash
npm run dev
```

API disponible sur **http://localhost:3000**.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Application disponible sur **http://localhost:5173**.

---

## Mode tout-en-un (Docker)

Créer un fichier `.env` à la racine du projet :

```env
POSTGRES_USER=hsm
POSTGRES_PASSWORD=ton_mot_de_passe_db
POSTGRES_DB=hsm_france

JWT_SECRET=un_secret_long_et_aleatoire
ADMIN_EMAIL=admin@hsm-france.fr
ADMIN_PASSWORD=ton_mot_de_passe_admin
```

Puis lancer :

```bash
docker compose up --build
```

| Service    | URL                        |
|------------|----------------------------|
| Frontend   | http://localhost:5173       |
| Backend    | http://localhost:3000       |
| PostgreSQL | localhost:5432              |

Les migrations sont appliquées automatiquement au démarrage du backend.

---

## Structure du projet

```
backend/        API Express + TypeScript + Prisma
frontend/       Interface React + Vite + Tailwind CSS
docs/           Documentation, maquettes et charte graphique
docker-compose.yml
.env            Variables d'environnement (ne jamais commiter)
```
