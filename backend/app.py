from flask import Flask, request
from flask_cors import CORS
from simple_salesforce import Salesforce
import openai
import os
# ----------------------------------- END OF IMPORTS --------------------------------------------\

app = Flask(__name__)
openai.api_key = os.getenv("API_KEY")
CORS(app)
sf = Salesforce(username="qwertyuiopasdfgh@gmail.com", password="passwORD111?", security_token="7GWalhKTXQ2Mqemi5722tsf7")
# ----------------------------------- END OF MIDDLEWARE --------------------------------------------

@app.route('/signup', methods=['POST'])
def signup():
    if request.method == "POST":
        result = sf.query(f"SELECT Name, username__c FROM SIA_Account__c WHERE username__c='{request.json['username']}'")
        print(result['records'])
        if len(result['records']) == 0:
            sf.SIA_Account__c.create({
                "username__c": request.json["username"],
                "password__c": request.json["password"],
            })
            return "1"
    return "0"


@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        result = sf.query(f"SELECT Name, username__c, password__c FROM SIA_Account__c WHERE username__c='{request.json['username']}'")
        if len(result) != 0 and request.json["password"] == result["records"][0]["password__c"]:
            cur_user = result['records'][0]['Name']
            return cur_user
    return False
    

@app.route("/updateContact", methods=["POST"])
def update():
    if request.method == "POST":
        if request.json["id"]:
            result = sf.query(f"SELECT last_visited__c FROM SIA_ACCOUNT__c WHERE Name='{request.json['id']}'")
            to_update = result['records'][0]['last_visited__c']
            if to_update is None:
                to_update = request.json["tag"]
                sf.SIA_Account__c.update(request.json["id"], {"last_visited__c": to_update})
            else:
                to_update = request.json["tag"] + "," + to_update
                sf.SIA_Account__c.update(request.json["id"], {"last_visited__c": to_update})
            return to_update
    return []


@app.route("/prompt", methods=["POST"])
def prompt():
    if request.method == "POST":
        messages = [{
            "role": "system",
            "content": "You are a intelligent assistant"
        }]
        result = sf.query(f"SELECT last_visited__c FROM SIA_ACCOUNT__c WHERE Name='{request.json['id']}'")
        if len(result['records']) == 0:
            return "Failed"
        last_visited = result['records'][0]['last_visited__c']
        if last_visited is None:
            messages.append({
                "role": "user",
                "content": "You are a professional travel agent, suggest some hot spots to travel to"
            })
        else:
            messages.append({
                "role": "user",
                "content": f"You are a professional travel agent, This person has searched for [{last_visited}] recently, where do you think he is likely to want to go next?"
            })
        chat = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
        reply = chat.choices[0].message.content
        print(f"{reply}")
        return reply
# ----------------------------------- END OF ROUTES --------------------------------------------

if __name__ == "__main__":
    app.run(port=5000, debug=True)