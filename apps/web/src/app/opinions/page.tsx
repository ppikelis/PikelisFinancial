import { CollectionPage } from "@/components/CollectionPage";
import { opinions } from "@/lib/mock";

export default function OpinionsPage() {
  return (
    <CollectionPage
      title="Opinions"
      description="Themes based on analyst and author sentiment clusters."
      collections={opinions}
      type="opinions"
    />
  );
}
