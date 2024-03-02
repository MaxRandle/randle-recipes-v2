import { UserList } from "@components/UserList";
import { Section } from "@ui/Section";

export default function Page() {
  return (
    <main className="h-full">
      <Section>
        <div className="container">
          <h1 className="text-2xl">Page</h1>
          <p className="mt-4">Welcome to the page.</p>
          <UserList className="mt-8" />
        </div>
      </Section>
    </main>
  );
}
