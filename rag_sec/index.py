import argparse
import requests
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.schema import Document
from rag_sec.config import BASE_URL, CHROMA_DIR, EMBEDDING_MODEL


def fetch_filings(symbol: str):
    response = requests.get(f"{BASE_URL}/api/sec/export", params={"symbol": symbol})
    response.raise_for_status()
    return response.json()


def build_documents(filings: list[dict]):
    docs: list[Document] = []
    for filing in filings:
        sections = filing.get("sections") or []
        if sections:
            for section in sections:
                content = section.get("text", "")
                if not content.strip():
                    continue
                metadata = {
                    "symbol": filing["symbol"],
                    "formType": filing["formType"],
                    "filingDate": filing["filingDate"],
                    "secUrl": filing["secUrl"],
                    "filingId": filing["filingId"],
                    "accessionNumber": filing.get("accessionNumber"),
                    "sectionName": section.get("sectionName")
                }
                docs.append(Document(page_content=content, metadata=metadata))
        else:
            text = filing.get("textContent") or ""
            if not text.strip():
                continue
            metadata = {
                "symbol": filing["symbol"],
                "formType": filing["formType"],
                "filingDate": filing["filingDate"],
                "secUrl": filing["secUrl"],
                "filingId": filing["filingId"],
                "accessionNumber": filing.get("accessionNumber"),
                "sectionName": None
            }
            docs.append(Document(page_content=text, metadata=metadata))
    return docs


def run_index(symbols: list[str]):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1400, chunk_overlap=200)
    embeddings = OpenAIEmbeddings(model=EMBEDDING_MODEL)
    vectorstore = Chroma(
        collection_name="sec_filings",
        embedding_function=embeddings,
        persist_directory=CHROMA_DIR
    )

    for symbol in symbols:
        filings = fetch_filings(symbol)
        docs = build_documents(filings)
        chunks = splitter.split_documents(docs)
        ids = []
        for idx, doc in enumerate(chunks):
            chunk_id = f"{doc.metadata.get('filingId')}-{idx}"
            doc.metadata["chunkId"] = chunk_id
            doc.metadata["chunkIndex"] = idx
            ids.append(chunk_id)
        if chunks:
            vectorstore.add_documents(chunks, ids=ids)
            print(f"Indexed {len(chunks)} chunks for {symbol}")
        else:
            print(f"No text content for {symbol}")

    vectorstore.persist()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--symbols", required=True, help="Comma-separated symbols")
    args = parser.parse_args()

    symbols = [symbol.strip().upper() for symbol in args.symbols.split(",") if symbol.strip()]
    run_index(symbols)
