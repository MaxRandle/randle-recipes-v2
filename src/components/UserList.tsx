import { createUsersTable, db, seedUsersTable } from "@db/drizzle";
import { UsersTable } from "@db/tables/Users";

export const UserList = async ({ className }: { className?: string }) => {
  let users;
  let startTime = Date.now();
  try {
    users = await db.select().from(UsersTable);
  } catch (e: any) {
    if (e.message === `relation "users" does not exist`) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      // Table is not created yet
      await createUsersTable();
      await seedUsersTable();

      startTime = Date.now();
      users = await db.select().from(UsersTable);
    } else {
      throw e;
    }
  }

  return (
    <ul className={className}>
      <li>user 1</li>
      <li>user 2</li>
      <li>user 3</li>
    </ul>
  );
};
