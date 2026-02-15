import { activityMock, watchlistMock } from "@/lib/mock";

const USE_MOCK_DATA =
  process.env.USE_MOCK_DATA?.toLowerCase() === "true" ||
  process.env.NEXT_PUBLIC_USE_MOCK_DATA?.toLowerCase() === "true";

export async function evaluateAlerts() {
  if (!USE_MOCK_DATA) {
    console.log("Alert evaluation placeholder for real data.");
    return;
  }

  const notifications = [];

  for (const rule of watchlistMock.rules) {
    if (!rule.enabled) {
      continue;
    }

    if (rule.type === "congress_trade") {
      const match = activityMock.find(
        (event) => event.type === "congress" && event.entity.includes("Pelosi")
      );
      if (match) {
        notifications.push(`Congress trade: ${match.entity} ${match.action}`);
      }
    }
  }

  console.log("Mock alerts evaluated:", notifications);
}

evaluateAlerts().catch((error) => {
  console.error(error);
  process.exit(1);
});
