from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

#Initialize connection to database and bind declarative base to an engine
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
# db = SQLAlchemy(app)
# db.Model.metadata.reflect(db.engine)

# class PoliceData(db.Model):
#     __table__ = db.Model.metadata.tables['2015_to_present']
    
#     def __repr__(self):
#         return f'{self.armed}, {self.race}, {self.city}, {self.state}'

#Create home route that returns index.html and allows javascript to access database data
@app.route('/')
def home():
    # asian_data = db.query.filter_by(race='A').all()
    # black_data = db.query.filter_by(race='B').all()
    # white_data = db.query.filter_by(race='W').all()
    # other_data = db.query.filter_by(race='O').all()
    return render_template('index.html', **locals())

if __name__ == '__main__':
    app.run(debug=True)