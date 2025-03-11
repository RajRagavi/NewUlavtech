import admin from "firebase-admin";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

// Get the correct directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Read the service account file correctly in ES Module
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));

// ✅ Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ✅ Function to set admin role
const setAdminRole = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: "admin" });
    console.log(`✅ Admin role assigned to user: ${uid}`);
  } catch (error) {
    console.error("❌ Error setting custom claim:", error);
  }
};

// 🚀 Replace with the actual user’s UID
setAdminRole("iOxMuP26usS8O1JsrPdcY7odInd2");
