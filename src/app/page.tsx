import { Section } from "@ui/Section";

import NextLink from "next/link";

export default function Page() {
  return (
    <main className="h-full">
      <Section>
        <div className="container">
          <h1 className="text-3xl">Navigation</h1>
          <p className="mt-4">Welcome to the page.</p>
        </div>
      </Section>

      <Section>
        <div className="container">
          <ul className="list-inside list-disc space-y-2">
            <li className="text-lg underline">
              <NextLink href="users">Users</NextLink>
            </li>
            <li className="text-lg underline">
              <NextLink href="dietary-flags">DietaryFlags</NextLink>
            </li>
          </ul>
        </div>
      </Section>
    </main>
  );
}
