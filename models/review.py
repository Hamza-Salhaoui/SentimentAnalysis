from sqlalchemy import Column, Integer, String, Text, Enum, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Review(Base):
    __tablename__ = 'reviews'

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, nullable=False)
    product_name = Column(String(255), nullable=False)
    review_title = Column(String(255), nullable=False)
    review_text = Column(Text, nullable=False)
    rating = Column(Integer, nullable=True)
    sentiment_label = Column(Enum('Positif', 'Négatif', 'Neutre'), nullable=False)
    date_posted = Column(Date, nullable=False)
    verified_purchase = Column(Boolean, nullable=False)
    review_source = Column(String(100), nullable=False)
    language = Column(Enum('Français', 'Anglais', 'Espagnol', 'Autre'), nullable=False)
    helpful_votes = Column(Integer, default=0, nullable=True)
    region = Column(String(50), nullable=True)
    emotions_detected = Column(String(255), nullable=True)
    aspect_mentioned = Column(String(255), nullable=True)
    keywords = Column(String(255), nullable=True)

    def __repr__(self):
        return f"<Review(review_id={self.review_id}, product_name='{self.product_name}', rating={self.rating})>"
