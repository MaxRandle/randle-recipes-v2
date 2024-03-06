import { createUsersTable, seedUsersTable } from "@app/actions";
import { db } from "@db";
import { UsersTable } from "@db/tables/Users";
import clsx from "clsx";

const fetchUsers = async () => {
  try {
    return await db.select().from(UsersTable);
  } catch (e: any) {
    if (e.message === `relation "users" does not exist`) {
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
    <table
      border={0}
      cellPadding={0}
      cellSpacing={0}
      className={clsx("w-full max-w-full border-separate", className)}
    >
      <thead>
        <tr>
          <th className="w-1/2 rounded-tl-md border-b border-l border-t border-white py-1 pl-4 text-left">
            Name
          </th>
          <th className="w-1/2 rounded-tr-md border-b border-r border-t border-white px-4 py-1 text-left">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr className="group/tr" key={user.id}>
            <td className="border-l pl-4 pt-1 group-last/tr:rounded-bl-md group-last/tr:border-b group-last/tr:pb-1">
              {user.name}
            </td>
            <td className="line-clamp-1 text-nowrap border-r px-4 pt-1 group-last/tr:rounded-br-md group-last/tr:border-b group-last/tr:pb-1">
              {user.email}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const UserListSkeleton = ({ className }: { className?: string }) => {
  return (
    <table
      border={0}
      cellPadding={0}
      cellSpacing={0}
      className={clsx("w-full border-separate", className)}
    >
      <thead>
        <tr>
          <th className="w-1/2 rounded-tl-md border-b border-l border-t border-white py-1 pl-4 text-left">
            Name
          </th>
          <th className="w-1/2 rounded-tr-md border-b border-r border-t border-white px-4 py-1 text-left">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(3)].map((_, i) => (
          <tr className="group/tr" key={i}>
            <td className="border-l pl-4 pt-1 group-last/tr:rounded-bl-md group-last/tr:border-b group-last/tr:pb-1">
              <div className="my-1 h-4 w-full animate-pulse rounded-md bg-slate-800" />
            </td>
            <td className="border-r px-4 pt-1 group-last/tr:rounded-br-md group-last/tr:border-b group-last/tr:pb-1">
              <div className="my-1 h-4 w-full animate-pulse rounded-md bg-slate-800" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
