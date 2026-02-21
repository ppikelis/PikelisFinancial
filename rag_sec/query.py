import time
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from rag_sec.config import CHROMA_DIR, EMBEDDING_MODEL, LLM_MODEL


SYSTEM_PROMPT = """You are a financial research assistant answering questions about SEC filings.
You must ground answers in the provided filing excerpts.
If the sources are insufficient, say: "I can’t confirm that from the indexed filings."
Never include long verbatim excerpts (no more than 25 words from any single source).
Keep quotes short and cite filings."""


def format_snippet(text: str, limit: int = 200):
    words = text.split()
    snippet_words = words[:25]
    snippet = " ".join(snippet_words)
    if len(snippet) > limit:
        snippet = snippet[:limit]
    return snippet


def build_answer(question: str, docs):
    llm = ChatOpenAI(model=LLM_MODEL, temperature=0.2)
    context = "\n\n".join([doc.page_content[:800] for doc in docs])
    prompt = f"{SYSTEM_PROMPT}\n\nQuestion: {question}\n\nContext:\n{context}\n\nAnswer:"
    response = llm.invoke(prompt)
    return response


def ask_question(question: str, symbol: str | None = None, debug: bool = False):
    embeddings = OpenAIEmbeddings(model=EMBEDDING_MODEL)
    vectorstore = Chroma(
        collection_name="sec_filings",
        embedding_function=embeddings,
        persist_directory=CHROMA_DIR
    )

    search_kwargs = {"k": 6, "fetch_k": 20}
    if symbol:
        search_kwargs["filter"] = {"symbol": symbol}

    retriever = vectorstore.as_retriever(
        search_type="mmr",
        search_kwargs=search_kwargs
    )
    start_time = time.time()
    docs = retriever.get_relevant_documents(question)
    latency_ms = int((time.time() - start_time) * 1000)

    if not docs:
        return {
            "answer": "I can’t confirm that from the indexed filings.",
            "citations": [],
            "debug": {
                "latencyMs": latency_ms,
                "retrievedChunkIds": []
            } if debug else None
        }

    response = build_answer(question, docs)
    answer = response.content
    token_usage = response.response_metadata.get("token_usage") if hasattr(response, "response_metadata") else None

    citations = []
    for doc in docs[: max(2, min(6, len(docs)))]:
        meta = doc.metadata
        citations.append(
            {
                "symbol": meta.get("symbol"),
                "formType": meta.get("formType"),
                "filingDate": meta.get("filingDate"),
                "secUrl": meta.get("secUrl"),
                "sectionName": meta.get("sectionName"),
                "snippet": format_snippet(doc.page_content)
            }
        )

    retrieved_chunk_ids = [doc.metadata.get("chunkId") for doc in docs]

    if debug:
        print(
            {
                "question": question,
                "retrievedChunkIds": retrieved_chunk_ids,
                "latencyMs": latency_ms,
                "tokenUsage": token_usage
            }
        )

    return {
        "answer": answer,
        "citations": citations,
        "debug": {
            "latencyMs": latency_ms,
            "retrievedChunkIds": retrieved_chunk_ids,
            "tokenUsage": token_usage
        } if debug else None
    }
