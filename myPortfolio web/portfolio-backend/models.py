from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(200))
    skills_used = db.Column(db.String(200))
    category = db.Column(db.String(50))  # power/renewable/automation
    date_completed = db.Column(db.Date)

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    proficiency = db.Column(db.Integer)  # 0-100 percentage
    category = db.Column(db.String(30))  # Technical/Software

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    received_at = db.Column(db.DateTime, default=db.func.now())