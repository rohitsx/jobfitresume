import { getDatabase, ref } from "firebase/database";
import { FirebaseApp } from "./firebase";
import { getAuth } from "firebase/auth";

export function getDbRef(uid: string) {
	getAuth();
	const database = getDatabase(FirebaseApp);
	const dbRef = ref(database, "users/" + uid);
	return dbRef;
}

export function getBetaDbRef(uid: string) {
	getAuth();
	const database = getDatabase(FirebaseApp);
	const dbRef = ref(database, "beta/" + uid);
	return dbRef;
}
