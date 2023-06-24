from flask import Flask, request
from flask_login import (
    login_manager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from flask_cors import CORS
from oauthlib.oauth2 import WebApplicationClient
import requests
from simple_salesforce import Salesforce
# ----------------------------------- END OF IMPORTS --------------------------------------------\

app = Flask(__name__)
CORS(app)
sf = Salesforce(username="qwertyuiopasdfgh@gmail.com", password="passwORD111?", security_token="7GWalhKTXQ2Mqemi5722tsf7")
# ----------------------------------- END OF MIDDLEWARE --------------------------------------------

@app.route('/signup', methods=['POST'])
def signup():
    if request.method == "POST":
        result = sf.SIA_Account__c.create({
            "username": request.json["username"],
            "password": request.json["password"],
        })
        return result
    

@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        result = sf.query(f"SELECT password FROM SIA_ACCOUNT WHERE username={request.json['username']}")
        if result != request.json["password"]:
            return False
        else:
            return True
    return False
    

@app.route("/updateContact", methods=["POST"])
def update():
    if request.method == "POST":
        result = sf.query(f"SELECT last_visited FROM SIA_ACCOUNT WHERE username={request.json['username']}")
        new_visited = request.json["last_visited"] + result
        print(new_visited)

# ----------------------------------- END OF ROUTES --------------------------------------------

if __name__ == "__main__":
    app.run(port=5000, debug=True)