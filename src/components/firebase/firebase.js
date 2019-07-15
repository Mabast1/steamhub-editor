import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.firestore();
    this.storage = app.storage();
  }

  module = id => this.db.doc(`modules/${id}`);
  modules = () => this.db.collection('modules');

  storageRef = () => this.storage.ref();
}

export default Firebase;
