import { createUsersTable, seedUsersTable } from "@/app/actions";
import { db } from "@db";
import { UsersTable } from "@db/tables/Users";

const fetchUsers = async () => {
  try {
    return await db.select().from(UsersTable);
  } catch (e: any) {
    if (e.message === `relation "users" does not exist`) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
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
    <table className={className}>
      <thead>
        <tr>
          <th className="text-left border-b border-b-white">Name</th>
          <th className="pl-4 text-left border-b border-b-white">Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr className="group/tr" key={user.id}>
            <td className="group-first/tr:pt-2">{user.name}</td>
            <td className="pl-4 group-first/tr:pt-2">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
