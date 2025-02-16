from flask import Flask
from flask_cors import CORS
from config.config import Config
from routes.review_routes import review_bp
from routes.sentiment import sentiment_bp
from routes.file import file_bp
from routes.analyseslive import analyseslive_bp



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    Config.init_app(app)
    CORS(app)
    # Enregistrement des blueprints (routes)
    app.register_blueprint(sentiment_bp)
    app.register_blueprint(file_bp)
    app.register_blueprint(analyseslive_bp)
    app.register_blueprint(review_bp)

    @app.route('/')
    def home():
        return "Bienvenue sur l'application Flask !"

    return app






