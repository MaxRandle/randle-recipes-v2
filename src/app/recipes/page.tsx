import { AddRandomRecipeForm } from "@components/AddRandomRecipeForm";
import { Section } from "@ui/Section";

export default function Page() {
  return (
    <main className="h-full">
      <Section>
        <div className="container">
          <h1 className="text-3xl">Recipes</h1>
        </div>
      </Section>

      <Section>
        <div className="container">
          <AddRandomRecipeForm />
        </div>
      </Section>

      <Section>
        <div className="container"></div>
      </Section>
    </main>
  );
}
