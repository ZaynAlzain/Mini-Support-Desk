from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)

@app.route("/")
def home():
    return {"message": "Backend running"}


if __name__ == "__main__":
    app.run(debug=True)