import time
from rag_sec.query import ask_question


TEST_CASES = {
    "AAPL": [
        ("What risks are highlighted in the latest 10-K?", True, False),
        ("Describe revenue growth drivers discussed in recent filings.", True, False),
        ("Summarize any mention of supply chain risks.", True, False),
        ("What is the latest operating margin trend?", True, False),
        ("What did the company say about AI investments?", True, False),
        ("What is the latest debt position and leverage?", True, False),
        ("Is there any new guidance for next quarter?", True, False),
        ("What are the key competitive threats?", True, False),
        ("Did the filings mention layoffs in Q4 2025?", False, True),
        ("Confirm a dividend increase announced last week.", False, True)
    ],
    "NVDA": [
        ("What were the latest revenue drivers discussed in filings?", True, False),
        ("Summarize data center demand commentary.", True, False),
        ("What risks are described about supply constraints?", True, False),
        ("Did management mention customer concentration?", True, False),
        ("What is the trend in gross margin?", True, False),
        ("What capital expenditure outlook is discussed?", True, False),
        ("What are key regulatory risks listed?", True, False),
        ("Summarize any mention of new product cycles.", True, False),
        ("Confirm a new acquisition announced yesterday.", False, True),
        ("Did the filing confirm a new dividend policy?", False, True)
    ],
    "MSFT": [
        ("What are the top risk factors in the latest 10-K?", True, False),
        ("Summarize Azure growth commentary in filings.", True, False),
        ("What is the trend in operating margin?", True, False),
        ("What are key competitive pressures described?", True, False),
        ("Did the filing mention pricing changes?", True, False),
        ("What does the company say about capex?", True, False),
        ("Summarize any AI-related disclosures.", True, False),
        ("What are the main customer segments discussed?", True, False),
        ("Confirm a buyback authorization from this week.", False, True),
        ("Did the company announce a merger today?", False, True)
    ]
}


def run_eval():
    total = 0
    passed = 0
    failures = []

    for symbol, cases in TEST_CASES.items():
        for question, expect_citations, expect_uncertain in cases:
            total += 1
            start = time.time()
            result = ask_question(question, symbol)
            latency = int((time.time() - start) * 1000)

            citations = result.get("citations") or []
            answer = result.get("answer") or ""

            has_citations = len(citations) >= 1
            has_uncertain = "I can’t confirm that from the indexed filings." in answer

            ok = True
            if expect_citations and not has_citations:
                ok = False
            if not expect_citations and has_citations:
                ok = False
            if expect_uncertain and not has_uncertain:
                ok = False
            if not expect_uncertain and has_uncertain:
                ok = False

            if ok:
                passed += 1
            else:
                failures.append(
                    {
                        "symbol": symbol,
                        "question": question,
                        "expect_citations": expect_citations,
                        "expect_uncertain": expect_uncertain,
                        "citations": len(citations),
                        "uncertain": has_uncertain,
                        "latencyMs": latency
                    }
                )

    print(f"RAG Eval: {passed}/{total} passed")
    if failures:
        print("Failures:")
        for failure in failures:
            print(failure)


if __name__ == "__main__":
    run_eval()
