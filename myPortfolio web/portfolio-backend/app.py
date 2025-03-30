from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Project, Skill, Message
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create tables (run once)
with app.app_context():
    db.create_all()

# API Endpoints
@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'description': p.description,
        'image_url': p.image_url,
        'category': p.category
    } for p in projects])

@app.route('/api/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    return jsonify([{
        'name': s.name,
        'proficiency': s.proficiency,
        'category': s.category
    } for s in skills])

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    data = request.json
    new_message = Message(
        name=data['name'],
        email=data['email'],
        content=data['message']
    )
    db.session.add(new_message)
    db.session.commit()
    
    # Add email sending logic here (see next section)
    return jsonify({'status': 'Message received!'})

if __name__ == '__main__':
    app.run(debug=True)
    
import smtplib
from email.mime.text import MIMEText
from threading import Thread

def send_notification_email(message):
    msg = MIMEText(f"""
    New portfolio message:
    From: {message.name} <{message.email}>
    Message: {message.content}
    """)
    
    msg['Subject'] = 'New Contact Form Submission'
    msg['From'] = 'your-portfolio@example.com'
    msg['To'] = 'your-personal@email.com'
    
    with smtplib.SMTP('smtp.yourprovider.com', 587) as server:
        server.starttls()
        server.login('your-email@example.com', 'your-password')
        server.send_message(msg)

# Modify contact endpoint:
@app.route('/api/contact', methods=['POST'])
def handle_contact():
    data = request.json
    new_message = Message(...)
    db.session.add(new_message)
    db.session.commit()
    
    # Run email in background
    Thread(target=send_notification_email, args=(new_message,)).start()
    
    return jsonify({'status': 'Message received!'})