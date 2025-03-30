from app import app, db
from models import Project, Skill

sample_projects = [
    Project(
        title="33/11kV Substation Design",
        description="Complete electrical design for county substation upgrade...",
        category="power",
        date_completed=datetime.date(2023, 5, 15)
]

sample_skills = [
    Skill(name="ETAP", proficiency=90, category="Technical"),
    Skill(name="AutoCAD Electrical", proficiency=85, category="Software")
]

with app.app_context():
    db.create_all()
    db.session.bulk_save_objects(sample_projects)
    db.session.bulk_save_objects(sample_skills)
    db.session.commit()