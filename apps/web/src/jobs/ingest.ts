import { runIngestion } from "./ingest";

runIngestion().catch((error) => {
  console.error(error);
  process.exit(1);
});
