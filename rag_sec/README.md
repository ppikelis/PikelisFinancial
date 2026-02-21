# SEC Filings RAG (Local MVP)

## Setup
```
python -m venv .venv
.\.venv\Scripts\activate
pip install -r rag_sec/requirements.txt
```

Create `.env`:
```
OPENAI_API_KEY=your_key
BASE_URL=http://localhost:3000
CHROMA_DIR=./rag_sec/chroma
EMBEDDING_MODEL=text-embedding-3-small
LLM_MODEL=gpt-4o-mini
```

## Index filings
```
python -m rag_sec.index --symbols NVDA,AAPL,MSFT
```

## Run server
```
python -m rag_sec.server
```

Server runs on `http://localhost:8000`.

## Health check
```
curl http://localhost:8000/health
```

## SEC + RAG
### Setup
- Ensure SEC filings are ingested into the app DB (`npm run sec:ingest`).
- Run the RAG indexer for curated symbols:
  ```
  python -m rag_sec.index --symbols AAPL,NVDA
  ```
- Start the RAG server:
  ```
  python -m rag_sec.server
  ```

### Troubleshooting
- Missing User-Agent: set `SEC_USER_AGENT="FinAdvisor (you@email.com)"`.
- Rate limit: reduce `--symbols` and rerun, or wait for backoff.
- CIK issues: ensure symbol is in `CIK_MAP`.
- Empty text extraction: some filings have non-standard HTML; metadata still stored.
