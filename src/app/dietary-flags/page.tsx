import {
  DietaryFlagDisplay,
  DietaryFlagDisplaySkeleton,
} from "@components/DietaryFlagDisplay";
import { Section } from "@ui/Section";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="h-full">
      <Section>
        <div className="container">
          <h1 className="text-3xl">Dietary flags</h1>
        </div>
      </Section>

      <Section>
        <div className="container"></div>
      </Section>

      <Section>
        <div className="container">
          <Suspense fallback={<DietaryFlagDisplaySkeleton className="mt-8" />}>
            <DietaryFlagDisplay className="mt-8" />
          </Suspense>
        </div>
      </Section>
    </main>
  );
}
