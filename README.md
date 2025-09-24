IT Repair Shop - Gestion des Réparations et Achats en Ligne
Ce projet est une application web complète pour une boutique de réparation informatique, permettant la gestion des réparations, l'achat de produits et l'authentification des utilisateurs.

Fonctionnalités Clés
Authentification : Inscription et connexion sécurisées pour les utilisateurs.

Gestion des Réparations : Un système pour que les clients puissent soumettre des demandes de réparation et suivre leur statut.

Achats en Ligne : Un catalogue de produits avec un panier d'achat et un processus de paiement sécurisé.

Tableau de Bord Admin : Un panneau d'administration pour la gestion complète des utilisateurs, des réparations, des commandes et des produits.

Technologies Utilisées
Frontend : React.js avec Vite, React Router, et Sass pour le stylisme.

Backend : Un backend PHP/MySQL simple suivant une architecture MVC (Modèle-Vue-Contrôleur).

Base de Données : MySQL pour le stockage des données.

Outils : Git pour le contrôle de version, Postman pour les tests d'API.

Guide d'Installation et de Démarrage
Suivez ces instructions pour cloner le projet, installer les dépendances et le démarrer en local.

1. Configuration du Backend (PHP & MySQL)
Prérequis
Assurez-vous d'avoir un environnement de développement web (comme Laragon, XAMPP ou WampServer) avec PHP et MySQL installés.

Cloner le dépôt :

Bash

git clone https://github.com/Masihullah37/IT-Repairs.git
cd IT-Repairs
Configuration du serveur :

Copiez le contenu du dossier Backend dans le répertoire de votre serveur web (par exemple, C:/laragon/www/IT_Repairs/Backend).

Configuration de la base de données :

Créez une base de données MySQL vide nommée it_repairs.

Importez le schéma de la base de données (si un fichier .sql est disponible).

Configuration de la base de données :

Ouvrez le fichier de configuration de la base de données de votre backend (le chemin exact peut varier).

Mettez à jour les informations de connexion à la base de données : nom de l'utilisateur, mot de passe et nom de la base de données.

Test de l'API :

Assurez-vous que le backend est accessible. Vous devriez pouvoir y accéder via une URL comme http://localhost/IT_Repairs/Backend/.

2. Configuration du Frontend (React)
Prérequis
Assurez-vous d'avoir Node.js et npm (ou yarn) installés.

Accéder au dossier frontend :

Bash

cd frontend
Installation des dépendances :

Bash

npm install
Démarrage du serveur de développement :

Le serveur de développement Vite se lancera et affichera l'URL de l'application (par exemple, http://localhost:5173/).

Bash

npm run dev
Configuration du proxy (si nécessaire) :

Vérifiez le fichier vite.config.js pour vous assurer que le proxy pointe correctement vers votre backend.

JavaScript

// vite.config.js
server: {
    proxy: {
        "/Backend": {
            target: "http://localhost/IT_Repairs",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/Backend/, "/Backend")
        }
    }
}
Utilisation
Ouvrez votre navigateur et naviguez vers l'URL affichée par Vite (http://localhost:5173/).

L'application devrait être entièrement fonctionnelle, avec le frontend communiquant avec le backend via les API.