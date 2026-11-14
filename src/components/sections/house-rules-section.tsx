import { CardGrid } from "@/components/sections/card-grid";
import { CheckerStrip, Section } from "@/components/ui/primitives";
import { houseRules, houseRulesCopy } from "@/content/home";

/** Short list of norms. */
export function HouseRulesSection() {
  return (
    <>
      <CheckerStrip className="opacity-80" />
      <Section
        eyebrow={houseRulesCopy.eyebrow}
        title={houseRulesCopy.title}
        lede={houseRulesCopy.lede}
      >
        <CardGrid items={houseRules} columns={3} />
      </Section>
    </>
  );
}
