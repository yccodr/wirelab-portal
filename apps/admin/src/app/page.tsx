import { getUserFiles, readFile } from "@/actions/file";
import { getUserById, getUsers } from "@/actions/user";
import UserTableSkeleton from "@/components/skeletons/user-table";
import UserModal from "@/components/user-modal";
import UserTable from "@/components/user-table";
import type { User } from "@/domain/user";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const getUserCredentials = async (user: User) => {
  const files = await getUserFiles(user.id);
  for (const file of files) {
    if (user === undefined) {
      break;
    }

    let f;
    let fileContent;
    switch (file?.split("/").reverse()[0]) {
      case "vm-key":
        f = await readFile(user.id, "vm-key");
        fileContent = new TextDecoder().decode(f);
        user.sshPrivateKey = fileContent;
        break;
      case "vm-key.pub":
        f = await readFile(user.id, "vm-key.pub");
        fileContent = new TextDecoder().decode(f);
        user.sshPublicKey = fileContent;
        break;
      case "wireguard.conf":
        f = await readFile(user.id, "wireguard.conf");
        fileContent = new TextDecoder().decode(f);
        user.wireguardConfig = fileContent;
        break;
    }
  }
};

const getUser = async (userId: string) => {
  const user = await getUserById(userId);
  await getUserCredentials(user);
  return user;
};

interface IProps {
  searchParams?: { userId?: string; create?: boolean; tags?: string };
}

export default async function Home(props: IProps) {
  const users = await getUsers();
  const selectedTags = props.searchParams?.tags?.split(",") ?? [];

  const selectedUser = props.searchParams?.userId
    ? await getUser(props.searchParams.userId)
    : undefined;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management Admin Panel</h1>

      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable users={users} selectedTags={selectedTags} />
      </Suspense>

      <Link
        href="/?create=true"
        className="rounded-full block w-fit sticky left-[90%] lg:bottom-12 bottom-8 p-4 drop-shadow-lg bg-white hover:bg-gray-200 transition-colors"
      >
        <PlusIcon className="h-8 w-8" />
      </Link>

      {selectedUser && <UserModal value={selectedUser} isOpen={true} />}
      {props.searchParams?.create && <UserModal isOpen={true} create={true} />}
    </div>
  );
}
