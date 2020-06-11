from flask import Flask, render_template, url_for, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from webscrape_ticker import num_2020_killings


app = Flask(__name__)

#Initialize connection to database and bind declarative base to an engine
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///killings_db.sqlite'
db = SQLAlchemy(app)

class PoliceData(db.Model):
    __tablename__ = 'police_killings'
    index = db.Column(db.Integer, primary_key=True)
    raceethnicity = db.Column(db.String(80))
    year = db.Column(db.Integer)
    city = db.Column(db.String(80))
    state = db.Column(db.String(80))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    state_fp = db.Column(db.Integer)
    armed = db.Column(db.String(80))
    
    def __repr__(self):
        return f"({self.raceethnicity},{self.state_fp},{self.latitude},{self.longitude},{self.armed})"

#Create home route that returns index.html and allows javascript to access database data
@app.route('/')
def home():
    
    killings_count = num_2020_killings
    return render_template('index.html', **locals())


#Create callable route which can be accessed in javascript logic.js file. Add jsonify data to each endpoint
@app.route('/killings/<race>')
def killings(race):
    data = {'results': []}
    fields = ('race','State_Code','latitude','longitude','armed')
    QueryData = PoliceData.query.filter_by(raceethnicity=race).all()
    for row in QueryData:
        data['results'].append({fields[0]:row.raceethnicity, fields[1]:row.state_fp, fields[2]:row.latitude, fields[3]:row.longitude, fields[4]:row.armed})

    return jsonify(data)
  

if __name__ == '__main__':
    app.run(debug=True)