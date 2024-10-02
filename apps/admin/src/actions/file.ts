import "server-only";
import { getFirebaseAdminApp } from "@/lib/firebase/admin";
import { getStorage } from "firebase-admin/storage";

export async function getUserFiles(uid: string) {
  const app = getFirebaseAdminApp();
  const db = getStorage(app);
  const bucket = db.bucket();

  // Get all files in user directory
  const query = await bucket.getFiles({ prefix: `${uid}/` });
  const files = query[0].map((file) => file.metadata.name);

  return files;
}

export async function readFile(uid: string, fileName: string) {
  const app = getFirebaseAdminApp();
  const db = getStorage(app);
  const bucket = db.bucket();

  const fileRef = bucket.file(`${uid}/${fileName}`);
  const [buffer] = await fileRef.download();

  return buffer;
}

export async function uploadFile(uid: string, file: File) {
  const app = getFirebaseAdminApp();
  const db = getStorage(app);
  const bucket = db.bucket();

  // Create a reference to the file path in the bucket
  const filePath = `${uid}/${file.name}`;
  const fileRef = bucket.file(filePath);
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // Upload the file to the specified path
  await fileRef.save(fileBuffer, {
    metadata: {
      contentType: file.type,
    },
  });

  return fileRef.metadata.name;
}
