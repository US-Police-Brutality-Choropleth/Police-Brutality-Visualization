from flask import Flask, render_template, url_for
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
        return f'{self.armed}, {self.raceethnicity}, {self.city}, {self.state}'

#Create home route that returns index.html and allows javascript to access database data
@app.route('/')
def home():
    # asian_data = db.query.filter_by(raceethnicity='A').all()
    black_data = PoliceData.query.filter_by(raceethnicity='Black').all()
    # white_data = db.query.filter_by(race='W').all()
    # other_data = db.query.filter_by(race='O').all()
    killings_count = num_2020_killings
    return render_template('index.html', **locals())

if __name__ == '__main__':
    app.run(debug=True)