import { AddRandomUserForm } from "@components/AddRandomUserForm";
import { AddUserForm } from "@components/AddUserForm";
import { DeleteUserForm } from "@components/DeleteUserForm";
import { UserList, UserListSkeleton } from "@components/UserList";
import { Section } from "@ui/Section";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="h-full">
      <Section>
        <div className="container">
          <h1 className="text-3xl">Users</h1>
        </div>
      </Section>

      <Section>
        <div className="container">
          <AddUserForm className="mt-4" />
          <AddRandomUserForm className="mt-4" />
          <DeleteUserForm className="mt-4" />
        </div>
      </Section>

      <Section>
        <div className="container">
          <Suspense fallback={<UserListSkeleton className="mt-8" />}>
            <UserList className="mt-8" />
          </Suspense>
        </div>
      </Section>
    </main>
  );
}
