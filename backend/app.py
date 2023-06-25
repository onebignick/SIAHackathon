from flask import Flask, request
from flask_cors import CORS
from simple_salesforce import Salesforce
# ----------------------------------- END OF IMPORTS --------------------------------------------\

app = Flask(__name__)
CORS(app)
sf = Salesforce(username="qwertyuiopasdfgh@gmail.com", password="passwORD111?", security_token="7GWalhKTXQ2Mqemi5722tsf7")
# ----------------------------------- END OF MIDDLEWARE --------------------------------------------

@app.route('/signup', methods=['POST'])
def signup():
    if request.method == "POST":
        result = sf.query(f"SELECT Name, username__c FROM SIA_Account__c WHERE username__c='{request.json['username']}'")
        if len(result) == 0:
            sf.SIA_Account__c.create({
                "username__c": request.json["username"],
                "password__c": request.json["password"],
            })
            return True
        return False


@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        result = sf.query(f"SELECT Name, username__c, password__c FROM SIA_Account__c WHERE username__c='{request.json['username']}'")
        if len(result) != 0 and request.json["password"] == result["records"][0]["password__c"]:
            return result['records'][0]['Name']
        return False
    

@app.route("/updateContact", methods=["POST"])
def update():
    if request.method == "POST":
        result = sf.query(f"SELECT last_visited FROM SIA_ACCOUNT WHERE username={request.json['username']}")
        new_visited = request.json["last_visited"] + result
        print(new_visited)


@app.route("/test", methods=["POST", "GET"])
def test():
    if request.method == "POST":
        res = [request.json["hello"], request.json["another"]]
        return res
    return "pong"
# ----------------------------------- END OF ROUTES --------------------------------------------

if __name__ == "__main__":
    app.run(port=5000, debug=True)