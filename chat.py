import random
import json
import torch
from model import NeuralNet
from nlp import bag_of_words,tokenize
import time
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
with open('data.json') as f:
    intents = json.load(f)
FILE = "data.pth"
data = torch.load(FILE)
input_size = data["input_size"]
hidden_size = data["hiddent_size"]
output_size = data["outout_size"]
all_word = data['all_word']
tags = data['tags']
model_state = data['model_state']

model = NeuralNet(input_size,hidden_size,output_size).to(device)
model.load_state_dict(model_state)
model.eval()


name_bot = "Ariala"


def get_response(msg):
    
    inp = tokenize(msg)
    X = bag_of_words(inp,all_word)
    X = X.reshape(1,X.shape[0])
    X = torch.from_numpy(X)

    output = model(X)
    _,predicted = torch.max(output,dim=1)
    tag = tags[predicted.item()] 
    probs = torch.softmax(output,dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.75:
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                return f"{random.choice(intent['responses'])}"
    else:
        return f"I do not understand..."