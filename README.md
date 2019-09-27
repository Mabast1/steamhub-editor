## STEAMHUB Editor ![](https://img.shields.io/badge/version-3.0-blue?style=flat-square) ![](https://img.shields.io/badge/build-passing-success?style=flat-square&logo=react)

### Technologies
- [React.js](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)

### Prerequisites
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [VS Code](https://code.visualstudio.com/) - recommended extensions:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  
### Getting Started
Fork this repository on Github. Clone your forked repository into your hard drive.
```bash
$ git clone https://github.com/YOURUSERNAME/steamhub-editor.git
```
Move into the project directory, and install all necessary packages.
```bash
$ cd steamhub-editor
$ npm install
```
Setup the environment variables by creating a file called `.env` in the project's root directory.
```bash
#You can find all of this information in your Firebase project settings

REACT_APP_API_KEY        = YOUR_API_KEY_HERE
REACT_APP_AUTH_DOMAIN    = YOUR_PROJECT_ID_HERE.firebaseapp.com
REACT_APP_DATABASE_URL   = https://YOUR_PROJECT_ID_HERE.firebaseio.com
REACT_APP_PROJECT_ID     = YOUR_PROJECT_ID_HERE
REACT_APP_STORAGE_BUCKET = YOUR_PROJECT_ID_HERE.appspot.com
```
Run the app locally.
```bash
$ npm start
```
You can now see the app at http://localhost:3000.

### Deployment
Build the app for production.
```bash
$ npm run build
```
Make sure that you have the latest version of [Firebase CLI](https://firebase.google.com/docs/cli).
```bash
$ npm install -g firebase-tools
```
Sign into Firebase with your Google account if you haven't done so already.
```bash
$ firebase login
```
Deploy the app.
```bash
$ firebase deploy --only hosting
```

### Contributors
STEAMHUB Editor was originally built by [@irasuna](https://github.com/irasuna) while working at [Idealab Kids LLC.](https://www.idealabkids.com/)
