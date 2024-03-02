import { AddUserForm } from "@components/AddUserForm";
import { DeleteUserForm } from "@components/DeleteUserForm";
import { UserList } from "@components/UserList";
import { Section } from "@ui/Section";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="h-full">
      <Section>
        <div className="container">
          <h1 className="text-2xl">Page</h1>
          <p className="mt-4">Welcome to the page.</p>
          <AddUserForm className="mt-4" />
          <DeleteUserForm className="mt-4" />
          <Suspense fallback={<p className="mt-8">Loading...</p>}>
            <UserList className="mt-8" />
          </Suspense>
        </div>
      </Section>
    </main>
  );
}
