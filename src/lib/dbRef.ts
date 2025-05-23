import { getDatabase, ref } from "firebase/database";
import { FirebaseApp } from "./firebase";

export function getDbRef() {
	const uid = localStorage.getItem("uid");
	const database = getDatabase(FirebaseApp);
	const dbRef = ref(database, "users/" + uid);
	return dbRef;
}
