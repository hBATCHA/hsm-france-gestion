



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

### 2. Backend

```bash
cd backend
npm install
```

Créer un fichier `backend/.env` avec les variables suivantes :

```
DATABASE_URL=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
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

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Puis lancer :

```bash
docker compose up --build -d
```

| Service    | URL                        |
|------------|----------------------------|
| Frontend   | http://localhost:5173       |
| Backend    | http://localhost:3000       |
| PostgreSQL | localhost:5432              |

---

## Structure du projet

```
backend/        API Express + TypeScript + Prisma
frontend/       Interface React + Vite + Tailwind CSS
docs/           Documentation, maquettes et charte graphique
docker-compose.yml
```

