import { generateNewsArticles } from "./generateArticles";

generateNewsArticles().catch((error) => {
  console.error(error);
  process.exit(1);
});
