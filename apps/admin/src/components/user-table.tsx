import { Button } from "@repo/ui/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Badge } from "@repo/ui/components/ui/badge";
import Link from "next/link";
import { User } from "@/domain/user";
import TagFilterDropdown from "./tag-filter-dropdown";

interface IProps {
  users: User[];
  selectedTags: string[];
}

async function UserTable(props: IProps) {
  const allTags = Array.from(
    new Set(props.users.flatMap((user) => user.tags ?? []))
  );

  const filteredUsers =
    props.selectedTags.length === 0
      ? props.users
      : props.users.filter((user) =>
          props.selectedTags.some((tag) => user.tags?.includes(tag))
        );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="flex items-center">
            Tags
            <TagFilterDropdown
              allTags={allTags}
              selectedTags={props.selectedTags}
            />
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.tags?.map((tag) => (
                <Badge key={tag} className="mr-1">
                  {tag}
                </Badge>
              ))}
            </TableCell>
            <TableCell>
              <Link href={`/?userId=${user.id}`}>
                <Button type="button">Edit</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UserTable;
