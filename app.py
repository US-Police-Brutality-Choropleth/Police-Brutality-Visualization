from flask import Flask, render_template, url_for, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from webscrape_ticker import num_2020_killings 


app = Flask(__name__)

#Initialize connection to database and bind declarative base to an engine
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///killings_db.sqlite'
db = SQLAlchemy(app)

class PoliceData2015(db.Model):
    __tablename__ = 'police_killings_2015'
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

class PoliceData2015ToPresent(db.Model):
    __tablename__ = 'police_killings_2015_to_present'
    index = db.Column(db.Integer, primary_key=True)
    race = db.Column(db.String(80))
    date = db.Column(db.Integer)
    city = db.Column(db.String(80))
    state = db.Column(db.String(80))
    state_names = db.Column(db.String(80))
    armed = db.Column(db.String(80))
    year = db.Column(db.Integer)
    
    def __repr__(self):
        return f"({self.race},{self.year},{self.state},{self.state_names},{self.armed})"

#Create home route that returns index.html and allows javascript to access database data
@app.route('/')
def intro():
    
    killings_count = num_2020_killings
    return render_template('intro.html', **locals())

@app.route('/choropleth')
def choropleth():
    
    killings_count = num_2020_killings
    return render_template('choropleth.html', **locals())

@app.route('/markers')
def markers():
    
    killings_count = num_2020_killings
    return render_template('markers.html', **locals())

@app.route('/pie')
def pie():
    
    killings_count = num_2020_killings
    return render_template('pie.html', **locals())


#Create callable route which can be accessed in javascript logic.js file. Add jsonify data to each endpoint
@app.route('/AllKillings/<race>')
def AllKillings(race):
    data = {'results': []}
    fields = ('race','date','city','full_state','armed')
    QueryData = PoliceData2015ToPresent.query.filter_by(race=race).all()
    for row in QueryData:
        data['results'].append({fields[0]:row.race, fields[1]:row.date, fields[2]:row.city, fields[3]:row.state_names, fields[4]:row.armed})

    return jsonify(data)

@app.route('/2015killings/<race>')
def killings2015(race):
    data = {'results': []}
    fields = ('race','state','longitude','latitude','armed')
    QueryData = PoliceData2015.query.filter_by(raceethnicity=race).all()
    for row in QueryData:
        data['results'].append({fields[0]:row.raceethnicity, fields[1]:row.state, fields[2]:row.longitude, fields[3]:row.latitude, fields[4]:row.armed})

    return jsonify(data)
  

if __name__ == '__main__':
    app.run(debug=True)