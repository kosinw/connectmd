import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

import serviceAccount from "service.account.json";

if (typeof window === "undefined") {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
      databaseURL: "https://connectmd0.firebaseio.com",
    });
  }
}

export { admin };
