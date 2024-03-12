import { createDietaryFlagsTable, seedDietaryFlagsTable } from "@app/actions";
import { db } from "@db";
import { DietaryFlagsTable } from "@db/tables/DietaryFlags";
import { Table, Tbody, Td, Th, Thead, Tr } from "@ui/Table";
import clsx from "clsx";

const fetchDietaryFlags = async () => {
  try {
    return await db.select().from(DietaryFlagsTable);
  } catch (e: any) {
    console.log("fetchDietaryFlags", e);
    if (e.code === "42P01") {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now...",
      );
      // Table is not created yet
      await createDietaryFlagsTable();
      await seedDietaryFlagsTable();

      return await db.select().from(DietaryFlagsTable);
    } else {
      throw e;
    }
  }
};

export const DietaryFlagDisplay = async ({
  className,
}: {
  className?: string;
}) => {
  const dietaryFlags = await fetchDietaryFlags();

  return (
    <Table className={clsx("w-full max-w-full", className)}>
      <Thead>
        <Tr>
          <Th className="w-1/2">Id</Th>
          <Th className="w-1/2">Symbol</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dietaryFlags.map((dietaryFlag) => (
          <Tr key={dietaryFlag.id}>
            <Td>{dietaryFlag.id}</Td>
            <Td>{dietaryFlag.symbol}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const DietaryFlagDisplaySkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Table className={clsx("w-full max-w-full", className)}>
      <Thead>
        <Tr>
          <Th className="w-1/2">Id</Th>
          <Th className="w-1/2">Symbol</Th>
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
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
