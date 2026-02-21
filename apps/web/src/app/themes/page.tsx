"use client";

import { CollectionPage } from "@/components/CollectionPage";
import { themes } from "@/lib/mock";
import { useState } from "react";
import { Timeframe } from "@/lib/utils/timeframe";

export default function ThemesPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1Y");
  return (
    <CollectionPage
      title="Themes"
      description="Explore curated baskets and emerging thematic clusters."
      collections={themes}
      type="themes"
      timeframe={timeframe}
      onTimeframeChange={setTimeframe}
    />
  );
}
