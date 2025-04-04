from app.groq_client import llm

stage_1_classes = [
    'Military and State Offenses', 'Public Order and Rioting', 'Corruption and Bribery',
    'Fraud and Counterfeiting', 'Public Servant Misconduct', 'Offenses Against Human Body',
    'Offenses Against Property', 'Offenses Against Public Tranquility', 'Offenses Against Religion',
    'Miscellaneous'
]

stage_2_classes = [
    ['Impersonation and Misrepresentation', 'War and Depredation', 'Mutiny and Desertion', 'Miscellaneous Military Offenses'],
    ['Rioting and Unlawful Assembly', 'Provocation and Enmity', 'Obstruction and Assault', 'Miscellaneous Public Order Offenses'],
    ['Bribery and Gratification', 'Misuse of Office', 'Abetment of Corruption', 'Miscellaneous Corruption Offenses'],
    ['Counterfeiting Coins', 'Counterfeiting Stamps', 'Fraudulent Use of Counterfeit Items', 'Miscellaneous Fraud Offenses'],
    ['Disobedience and Negligence', 'Framing False Documents', 'Abuse of Authority', 'Miscellaneous Public Servant Offenses'],
    ['Murder and Culpable Homicide', 'Negligent Acts Causing Death', 'Dowry and Suicide-Related Offenses', 'Miscellaneous Human Body Offenses'],
    ['Fraudulent Concealment and Removal', 'False Claims and Deception', 'Harboring Offenders', 'Miscellaneous Property Offenses'],
    ['Promoting Enmity', 'Rioting and Unlawful Assembly', 'Obstruction and Provocation', 'Miscellaneous Public Tranquility Offenses'],
    ['Defiling Places of Worship', 'Insulting Religious Beliefs', 'Disturbing Religious Assemblies', 'Miscellaneous Religious Offenses'],
    ['Public Nuisance', 'Obscenity and Indecency', 'Other Offenses']
]

def classify_stage_1(case: str) -> str:
    prompt = f"""You are an expert at classifying criminal texts. Classify the following text into one of the following:
{', '.join(stage_1_classes)}

Text: {case}

Return only the class name."""
    response = llm.complete(prompt)
    return response.text.strip()

def classify_stage_2(case: str, stage_1_class: str) -> str:
    index = stage_1_classes.index(stage_1_class)
    subclasses = stage_2_classes[index]

    prompt = f"""This text belongs to category: {stage_1_class}.
Now classify it into one of these subcategories:
{subclasses}

Text: {case}

Return only the subcategory name."""
    response = llm.complete(prompt)
    return response.text.strip()
