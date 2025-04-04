from app.groq_client import llm

def classify_case(case: str) -> str:
    prompt = f"""You are an expert at classifying criminal texts. You will be given an excerpt from a criminal case.\
You are required to classify it into one of the following classes based on which one it is most relevant to:
1) Military and State Offenses
2) Public Order and Rioting
3) Corruption and Bribery
4) Fraud and Counterfeiting
5) Public Servant Misconduct
6) Offenses Against Human Body
7) Offenses Against Property
8) Offenses Against Public Tranquility
9) Offenses Against Religion
10) Miscellaneous

Classify the given text into one of the above given classes: {case}.

You are supposed to return only one class.
Just return the class name, no unnecessary text should be returned nor any digits."""

    response = llm.complete(prompt)
    return response.text.strip()
