from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify;
from flask_cors import CORS
from flask_restful import Resource, Api;
app = Flask(__name__)
from flask_mysqldb import MySQL
import os

# os.getenv("MYSQL_HOST")
app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST");
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER");
app.config['MYSQL_PASSWORD'] = "";
app.config['MYSQL_DB'] = os.getenv("MYSQL_DB");
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app);
api = Api(app);
CORS(app, resources={r'/*': {'origins': '*'}})





class Users(Resource):
    def get(self):
        cursor = mysql.connection.cursor()
        cursor.execute("select * from users");
        data = cursor.fetchall();
        data = jsonify(data);

        return data;

    # def post(self):
    #     print("post request called");
    #     conn = mysql.connection
    #     cursor = conn.cursor()
    #     got = request.json;
    #     number = got["number"];
    #     otp = got["otp"];
    #     print(number)
    #     print(otp)
    #     if number and otp:
    #         query = "insert into users(number, otp) values(%s,%s)";
    #         bindData = (number, otp)
    #         cursor.execute(query, bindData)
    #         conn.commit();
    #         return jsonify({"status": "ok"});
    #     else:
    #         return jsonify({"status": "error"});   
    # 
    # 
    def post(self):
        conn = mysql.connection;
        cursor = conn.cursor()
        body = request.json;
        email = "'" + body["email"] + "'";
        # otp = body["otp"];
        number = "'"+body["number"] + "'";
        if email and number:
            query = "INSERT INTO bliss_register_app(user_id, email, password, country, pincode, birthyear, interest, role, leader_name, passreset, register_date, status, name, mobile, company, session_id, plan, first_date, email_org) VALUES ('',"+ email +",'','','',2002,'','','','','2022-01-01','','',"+ number+",'','','','2022-01-01','')"
            cursor.execute(query);
            conn.commit();
            return jsonify({"status": "ok"});
        else:
            return jsonify({"status": "error"});



                




class Otp(Resource):
    def post(self):
        conn = mysql.connection;
        cursor = conn.cursor()
        body = request.json;
        email = "'" + body["email"] + "'";
        otp = "'" + body["otp"] + "'";
        if email and otp:
            query = "INSERT INTO otp(email, otp) VALUES ("+ email+ ","+ otp+")";
            cursor.execute(query);
            conn.commit();
            return jsonify({"status": "ok"});
        else:
            return jsonify({"status": "error"});




class Data(Resource):
    def post(self):
        conn = mysql.connection;
        cursor = conn.cursor()
        body = request.json;
        email = body["email"];
        if email:
            query = "select * from bliss_register_app join otp on bliss_register_app.email = otp.email";
            cursor.execute(query);
            data = cursor.fetchall();
            data = jsonify(data);

            return data;
        else:
            return {"status" : "error"};            


        







api.add_resource(Users, "/api/v1/users");
api.add_resource(Otp, "/api/v1/otp");
api.add_resource(Data, "/api/v1/all");



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.getenv("POST"), debug=True);