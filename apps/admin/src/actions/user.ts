"use server";

import "server-only";
import { User, UserForm } from "@/domain/user";
import { getFirebaseAdminApp } from "@/lib/firebase/admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { redirect } from "next/navigation";
import { uploadFile } from "./file";

export async function getUserById(userId: string): Promise<User> {
  const app = getFirebaseAdminApp();
  const db = getFirestore(app);
  const usersCollection = db.collection("users");
  const doc = await usersCollection.doc(userId).get();
  return doc.data() as User;
}

export async function getUsers(): Promise<User[]> {
  const app = getFirebaseAdminApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const usersCollection = db.collection("users");
  const snapshot = await usersCollection.get();

  const users = await Promise.all(
    snapshot.docs.map((doc) => {
      return new Promise<User>((resolve) => {
        auth.getUser(doc.id).then((user) => {
          resolve({
            ...(doc.data() as {
              name: string;
              tags?: string[];
              vm: { name: string; user: string; ip: string };
              vms: { name: string; user: string; ip: string }[];
            }),
            id: doc.id,
            email: user.email ?? "",
            sshPrivateKey: "",
            sshPublicKey: "",
            wireguardConfig: "",
          } satisfies User);
        });
      });
    })
  );

  return users;
}

export async function updateUser(
  userId: string,
  user: UserForm
): Promise<User> {
  // Upload ssh key files
  const sshPrivateKey = user.sshPrivateKey ?? "";
  const sshPrivateKeyFile = new File([sshPrivateKey], "vm-key");
  const sshPrivateKeyFileName = await uploadFile(userId, sshPrivateKeyFile);
  user.sshPrivateKey = sshPrivateKeyFileName;

  const sshPublicKey = user.sshPublicKey ?? "";
  const sshPublicKeyFile = new File([sshPublicKey], "vm-key.pub");
  const sshPublicKeyFileName = await uploadFile(userId, sshPublicKeyFile);
  user.sshPublicKey = sshPublicKeyFileName;

  // Upload wireguard config file
  const wireguardConfig = user.wireguardConfig ?? "";
  const wireguardConfigFile = new File([wireguardConfig], "wireguard.conf");
  const wireguardConfigFileName = await uploadFile(userId, wireguardConfigFile);
  user.wireguardConfig = wireguardConfigFileName;

  const app = getFirebaseAdminApp();
  const db = getFirestore(app);
  const usersCollection = db.collection("users");
  const doc = await usersCollection.doc(userId).get();
  await usersCollection.doc(userId).update(user);
  redirect("/");
  return doc.data() as User;
}

export async function createUser(user: UserForm) {
  const app = getFirebaseAdminApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const newUser = await auth.createUser({
    email: user.email,
  });

  const usersCollection = db.collection("users");
  await usersCollection.doc(newUser.uid).set(user);
  redirect("/");
}
