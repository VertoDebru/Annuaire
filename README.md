# Annuaire
Api Annuaire.
> Projet d'Annuaire inversé.

## Annuaire Back-End
![NodeJs](https://img.shields.io/badge/NodeJs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-EEEEEE?style=for-the-badge&logo=express&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
### Installation
Dans le répertoire `back`, créez un fichier `.env` contenant l'url, le port du serveur et l'url de MongoDB.
```
HOST="127.0.0.1"
PORT=8080
DB_MONGODB="mongodb+srv://..."
```
Ouvrez le répertoire `back` dans le terminal, exécutez :

```terminal
npm install
```
Une fois l'installation terminé exécutez l'une des commandes disponibles.

### Commandes disponibles
Ouvrez le répertoire `back` dans le terminal, exécutez :

```terminal
npm start
```
_Exécute le serveur de l'api._

```terminal
npm run dev
```
_Exécute le serveur de l'api en mode développement. (nodemon)_

### Requêtes disponibles
Pour récuperer un contact selon son id.

> **GET** [http://localhost:8080/api/contacts?id=:id](http://localhost:8080/api/contacts?id=:id)\
_Remplacer :id par l'identifiant du contact._

Pour rechercher un contact selon son nom / numéro de téléphone.

> **GET** [http://localhost:8080/api/contacts?search=:data](http://localhost:8080/api/contacts?search=:data)\
_Remplacer :data par le nom / numéro d'un contact._


## Annuaire Front-End
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![javascript](https://img.shields.io/badge/Javascript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
### Installation
Dans le répertoire `js`, modifier la variable `urlApi` dans le fichier `script.js`.

```javascript
const urlApi = "http://127.0.0.1:8080/api/contacts";
```
_Remplacer `http://127.0.0.1:8080/` par votre url et votre port défini dans le fichier `.env` situé dans le répertoire `back`._
