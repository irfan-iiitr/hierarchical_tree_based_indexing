import os
from config import config
from groq import Groq
import pandas as pd
from llama_index.llms.groq import Groq
from llama_index.core import Settings

from model import get_llm, llm_inference
from stage_1_classification import stage_1_classification
from stage_2_classification import stage_2_classification

Settings.llm = get_llm(config["model_name"])
os.environ["OPENAI_API_KEY"] = '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'

## stage 1 classes
stage_1_classes = [
    'Military and State Offenses',
    'Public Order and Rioting',
    'Corruption and Bribery',
    'Fraud and Counterfeiting',
    'Public Servant Misconduct',
    'Offenses Against Human Body',
    'Offenses Against Property',
    'Offenses Against Public Tranquility',
    'Offenses Against Religion',
    'Miscellaneous'
]

## stage 2 classes
stage_2_classes = [
    ['Impersonation and Misrepresentation',
     'War and Depredation',
     'Mutiny and Desertion',
     'Miscellaneous Military Offenses'],
    ['Rioting and Unlawful Assembly',
     'Provocation and Enmity',
     'Obstruction and Assault',
     'Miscellaneous Public Order Offenses'],
    ['Bribery and Gratification',
     'Misuse of Office',
     'Abetment of Corruption',
     'Miscellaneous Corruption Offenses'],
    ['Counterfeiting Coins',
     'Counterfeiting Stamps',
     'Fraudulent Use of Counterfeit Items',
     'Miscellaneous Fraud Offenses'],
    ['Disobedience and Negligence',
     'Framing False Documents',
     'Abuse of Authority',
     'Miscellaneous Public Servant Offenses'],
    ['Murder and Culpable Homicide',
     'Negligent Acts Causing Death',
     'Dowry and Suicide-Related Offenses',
     'Miscellaneous Human Body Offenses'],
    ['Fraudulent Concealment and Removal',
     'False Claims and Deception',
     'Harboring Offenders',
     'Miscellaneous Property Offenses'],
    ['Promoting Enmity',
     'Rioting and Unlawful Assembly',
     'Obstruction and Provocation',
     'Miscellaneous Public Tranquility Offenses'],
    ['Defiling Places of Worship',
     'Insulting Religious Beliefs',
     'Disturbing Religious Assemblies',
     'Miscellaneous Religious Offenses'],
    ['Public Nuisance',
     'Obscenity and Indecency',
     'Other Offenses']
]


def verify_stage_1_class(stage_1_class: str, stage_1_classes: list) -> tuple:
    
    status = 0
    index = 0
    for j in range(len(stage_1_classes)):
        if stage_1_class == stage_1_classes[j]:
            status = 1
            index = j
            break
        #print(stage_1_class, " ", stage_1_classes[j])
    
    if status == 1:
        return stage_1_class, index
    else:
        return "Miscellaneous", index


def verify_stage_2_class(stage_2_class: str, classes: list[list]) -> str:
    
    status = 0
    for j in range(len(classes)):
        if stage_2_class == classes[j]:
            status = 1
            break
    
    if status == 1:
        return stage_2_class
    else:
        return classes[-1]


def crime_classification(crime_text: str) -> tuple:
    
    llm = get_llm(config["model_name"])
    
    ## Stage 1 classification
    stage_1_classification_prompt = stage_1_classification(crime_text, stage_1_classes)
    stage_1_class = str(llm_inference(llm, stage_1_classification_prompt))
    stage_1_class = stage_1_class.strip()
    
    # verifying stage 1 class
    stage_1_class, stage_1_class_index = verify_stage_1_class(stage_1_class, stage_1_classes)
    
    ## Stage 2 classification
    stage_2_classification_prompt = stage_2_classification(crime_text, stage_1_class, stage_2_classes, stage_1_class_index)
    stage_2_class = str(llm_inference(llm, stage_2_classification_prompt))
    stage_2_class = stage_2_class.strip()
    
    # verifying stage 2 class
    stage_2_class = verify_stage_2_class(stage_2_class, stage_2_classes[stage_1_class_index])
    
    return stage_1_class, stage_2_class


def main():
    
    crime_dataset = pd.read_csv("data/final_ipc.csv")
    
    ## sample
    crime_text = crime_dataset["Offense"][34]
    stage_1_class, stage_2_class = crime_classification(crime_text)
    
    print(f"Stage 1 class: {stage_1_class}")
    print(f"Stage 2 class: {stage_2_class}")
    

if __name__ == "__main__":
    main()