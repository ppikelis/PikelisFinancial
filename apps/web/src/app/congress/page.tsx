import { CollectionPage } from "@/components/CollectionPage";
import { congress } from "@/lib/mock";

export default function CongressPage() {
  return (
    <CollectionPage
      title="Congress"
      description="Monitor congressional portfolios and trading activity."
      collections={congress}
      type="congress"
    />
  );
}
