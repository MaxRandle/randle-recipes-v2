import { createUsersTable, seedUsersTable } from "@app/actions";
import { db } from "@db";
import { UsersTable } from "@db/tables/Users";
import { Table, Tbody, Td, Th, Thead, Tr } from "@ui/Table";
import clsx from "clsx";

const fetchUsers = async () => {
  try {
    return await db.select().from(UsersTable);
  } catch (e: any) {
    if (e.code === "42P01") {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now...",
      );
      // Table is not created yet
      await createUsersTable();
      await seedUsersTable(3);

      return await db.select().from(UsersTable);
    } else {
      throw e;
    }
  }
};

export const UserList = async ({ className }: { className?: string }) => {
  const users = await fetchUsers();

  return (
    <Table className={clsx("w-full max-w-full", className)}>
      <Thead>
        <Tr>
          <Th className="w-1/3">Id</Th>
          <Th className="w-1/3">Name</Th>
          <Th className="w-1/3">Email</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.id}</Td>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const UserListSkeleton = ({ className }: { className?: string }) => {
  return (
    <Table className={clsx("w-full max-w-full", className)}>
      <Thead>
        <Tr>
          <Th className="w-1/3">Id</Th>
          <Th className="w-1/3">Name</Th>
          <Th className="w-1/3">Email</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[...Array(3)].map((_, i) => (
          <Tr key={i}>
            <Td>
              <div className="my-1 h-4 w-full animate-pulse rounded-md bg-slate-800" />
            </Td>
            <Td>
              <div className="my-1 h-4 w-full animate-pulse rounded-md bg-slate-800" />
            </Td>
            <Td>
              <div className="my-1 h-4 w-full animate-pulse rounded-md bg-slate-800" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
