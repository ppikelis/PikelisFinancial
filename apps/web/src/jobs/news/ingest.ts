import { ingestNews } from "./ingestNews";

ingestNews().catch((error) => {
  console.error(error);
  process.exit(1);
});
