import os
class Config:
    UPLOAD_FOLDER = 'uploads'
    DEBUG = True

    @staticmethod
    def init_app(app):
        if not os.path.exists(Config.UPLOAD_FOLDER):
            os.makedirs(Config.UPLOAD_FOLDER)

