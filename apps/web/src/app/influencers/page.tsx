import { CollectionPage } from "@/components/CollectionPage";
import { influencers } from "@/lib/mock";

export default function InfluencersPage() {
  return (
    <CollectionPage
      title="Influencers"
      description="Collections based on prominent investor personalities."
      collections={influencers}
      type="influencers"
    />
  );
}
