# Turing-Machine

## Mise en place de l’environnement de travail

L’environnement de travail a été conçu pour être propre, structuré et facilement déployable. J’ai utilisé **Docker**, **Symfony** et **GitHub** afin de garantir la maintenabilité, le versionnement et la portabilité du projet.

## Choix des technologies

- **Symfony (via Docker)** : utilisé comme framework PHP pour structurer la logique métier de manière claire et efficace (routes, formulaires, sessions...).
- **Docker** : permet de standardiser l’environnement d’exécution (version de PHP, serveur web, extensions...) et d’isoler l’application du système hôte.
- **GitHub** : utilisé pour le versionnement du projet, le suivi des modifications et la collaboration.
- **HTML / CSS / JavaScript** : pour l’affichage côté client et l’interaction utilisateur.
- **(Optionnel) JSON ou base de données** : selon les besoins du projet, pour le stockage de données.

## Organisation du projet

- Le code source est versionné et hébergé sur **GitHub**.
- Le backend tourne dans un **conteneur Docker** configuré avec Symfony.
- Le front-end est servi via le répertoire `public/` de Symfony.
- Les fichiers `Dockerfile`, `docker-compose.yml` et `.env` définissent l’environnement de développement.

## Justification des choix

- **Reproductibilité** : Docker permet de garantir un environnement cohérent sur toutes les machines.
- **Structure** : Symfony facilite une architecture claire et maintenable.
- **Suivi** : GitHub assure un historique des versions et une facilité de collaboration.
- **Professionnalisme** : Ces outils sont couramment utilisés en entreprise et reflètent les standards actuels du développement web.
