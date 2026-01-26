from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
from routes.tickets import tickets_bp
from routes.comments import comments_bp

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(tickets_bp)
app.register_blueprint(comments_bp)

@app.route("/")
def home():
    return {"message": "Backend running"}


if __name__ == "__main__":
    app.run(debug=True)