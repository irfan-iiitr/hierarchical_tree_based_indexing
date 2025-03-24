import os


def stage_2_classification(crime_text: str, stage_1_class: str, stage_2_classes: list[list], stage_1_class_index: int) -> str:
    
    prompt = f"""You are an expert at classifying criminal texts. You will be given an excerpt from a criminal case.\
              The text has already been classified to be a part of the class: {stage_1_class}
               You are required to classify it into one of the following sub-classes based on which one it is most relevant to:\
               {stage_2_classes[stage_1_class_index]}

               Classify the given text into one of the above given classes: {crime_text}.\

               You are supposed to return only one sub-class.\
               Just return the class name, no unnecessary text should be returned nor any digits.
           """
    return prompt