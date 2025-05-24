import { initializeApp } from "firebase/app";
import env from "./env";

const firebaseConfig = {
	apiKey: env.firebaseAppId,
	authDomain: env.firebaseAuthDomain,
	projectId: env.firebaseProjectId,
	storageBucket: env.firebaseStorageBucket,
	messagingSenderId: env.firebaseMessagingSenderId,
	appId: env.firebaseAppId,
	measurementId: env.firebaseMeasurementId,
	databaseURL: env.firebaseDatabaseURL,
};

const app = initializeApp(firebaseConfig);

export { app as FirebaseApp };
