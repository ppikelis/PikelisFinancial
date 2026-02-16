import { CollectionPage } from "@/components/CollectionPage";
import { banks } from "@/lib/mock";

export default function BanksPage() {
  return (
    <CollectionPage
      title="Banks"
      description="Track curated collections of banks and financial institutions."
      collections={banks}
      type="banks"
    />
  );
}
