from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///mk.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True,nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
def __repr__(self):
        return '<User %r>' % self.username
# Inserting Data
new_user = User(username='johndoe',email='johndoe@gitforgits.com')
db.session.add(new_user)
db.session.commit()

db.create_all()