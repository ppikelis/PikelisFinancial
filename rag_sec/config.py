import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
if OPENAI_API_KEY:
    print(f"OPENAI_API_KEY loaded (last4): {OPENAI_API_KEY[-4:]}")
BASE_URL = os.getenv("BASE_URL", "http://localhost:3000")
CHROMA_DIR = os.getenv("CHROMA_DIR", "./rag_sec/chroma")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")
