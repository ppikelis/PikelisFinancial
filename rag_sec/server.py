from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_sec.query import ask_question
from rag_sec.index import run_index

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class AskRequest(BaseModel):
    symbol: str | None = None
    question: str
    debug: bool = False


class ReindexRequest(BaseModel):
    symbols: list[str]


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/ask")
def ask(request: AskRequest):
    if not request.symbol:
        raise HTTPException(status_code=400, detail="Symbol is required.")
    return ask_question(request.question, request.symbol, request.debug)


@app.post("/askAll")
def ask_all(request: AskRequest):
    return ask_question(request.question, None, request.debug)


@app.post("/reindex")
def reindex(request: ReindexRequest):
    run_index([symbol.upper() for symbol in request.symbols])
    return {"status": "ok"}
