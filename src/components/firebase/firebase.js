import app from 'firebase/app';
import 'firebase/auth';
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

    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  onAuthListener = (next, fallback) => {
    return this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
  };

  // Auth API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // Database API
  user = id => this.db.doc(`users/${id}`);
  users = () => this.db.collection('users');
  module = id => this.db.doc(`modules/${id}`);
  modules = () => this.db.collection('modules');
  cog = id => this.db.doc(`cogs/${id}`);
  cogs = () => this.db.collection('cogs');
  subject = id => this.db.doc(`subjects/${id}`);
  subjects = () => this.db.collection('subjects');
  level = id => this.db.doc(`levels/${id}`);
  levels = () => this.db.collection('levels');
  service = id => this.db.doc(`services/${id}`);
  services = () => this.db.collection('services');

  // Storage API
  storageRef = path => this.storage.ref(path);
}

export default Firebase;
