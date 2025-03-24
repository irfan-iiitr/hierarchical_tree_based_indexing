import os


def stage_1_classification(crime_text: str, stage_1_classes: list) -> str:
    
    prompt = f"""You are an expert at classifying criminal texts. You will be given an excerpt from a criminal case.\
               You are required to classify it into one of the following classes based on which one it is most relevant to:\
               {stage_1_classes}

               Classify the given text into one of the above given classes: {crime_text}.\

               You are supposed to return only one class.\
               Just return the class name, no unnecessary text should be returned nor any digits.
               """

    return prompt