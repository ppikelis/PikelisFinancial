import { CollectionPage } from "@/components/CollectionPage";
import { themes } from "@/lib/mock";

export default function ThemesPage() {
  return (
    <CollectionPage
      title="Themes"
      description="Explore curated baskets and emerging thematic clusters."
      collections={themes}
      type="themes"
    />
  );
}
