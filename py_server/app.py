from flask import (Flask, request)
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from enum import Enum
from typing import List
# from uuid import uuid4
# from pymongo import (InsertOne)
# from bson import ObjectId

# password = open("password.txt", "r").read()
password = "BEE"
# Connect to mongodb
uri = f"mongodb+srv://BEE:{password}@cluster0.scwq00d.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))

# Flask app
app = Flask(__name__)

# Ping server
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

database = client.stuff

cars = database.cars
users = database.users

def process_result(res):
    res["_id"] = str(res["_id"])

    return res

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route("/user/create")
def create_user():

    res = users.insert_one({
        "name" : "Jose"
    })
    return str(res.inserted_id)

@app.route("/user/<name>")
def find_user(name : str):
    res = users.find_one({"name" : name})
    if res == None:
        return "Not found"
    return process_result(res)
    

@app.route("/car/create")
def register_car(): 
    
    thiscar = Car(dictionary={
        "owner" : "Jose", 
        "mileage" : 100000,
    }, make=Make.Toyota, dashboard=DashBoard([

    ]))

    cars.insert_one(thiscar.toDict())
    return "works\n"

@app.route("/car/<name>")    
def getCarDetails(name:str):
    result = cars.find_one({"owner" : name})
    res = process_result(result)
    return res

class Make(Enum):
    Toyota = "Toyota"
    Kia = "Kia"
    Tesla = "Tesla"

class DashBoardItem():
    def __init__(self, name : str, due : str, ) -> None:
        self.name = name
        self.due = due
        pass

class DashBoard():
    def __init__(self, items : List[DashBoardItem]) -> None:
        self.boarditems = items
        pass

    @staticmethod
    def processDashboard(board : DashBoard):
        res  = []
        for item in board.boarditems:
            res.append(item.__dict__)
        return res


class Car(object):
    def __init__(self, dictionary:object, make : Make = None, dashboard : DashBoard = None) -> None:
        for key in dictionary:
            setattr(self, key, dictionary[key])
            
        
        self.make = make.value if not hasattr(self, "make") else self.make
        
        self.dashboard = dashboard.boarditems if not hasattr(self, "dashboard") else self.dashboard
        
        pass
    def toDict(self) ->dict:
        # res = {}
        # for attribute in self:
        #     setattr(res, attribute, self[attribute])
        return self.__dict__
