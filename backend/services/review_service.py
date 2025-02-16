from config.db import get_db_connection


class ReviewService:
    @staticmethod
    def create_review(review_data):
        """Créer une nouvelle review"""
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            sql = """INSERT INTO reviews 
                     (customer_id, product_name, review_title, review_text, rating, 
                     sentiment_label, date_posted, verified_purchase, review_source, 
                     language, helpful_votes, region, emotions_detected, 
                     aspect_mentioned, keywords)
                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

            values = (
                review_data["customer_id"], review_data["product_name"], review_data["review_title"],
                review_data["review_text"], review_data["rating"], review_data["sentiment_label"],
                review_data["date_posted"], review_data["verified_purchase"], review_data["review_source"],
                review_data["language"], review_data["helpful_votes"], review_data["region"],
                review_data["emotions_detected"], review_data["aspect_mentioned"], review_data["keywords"]
            )

            cursor.execute(sql, values)
            conn.commit()
            review_id = cursor.lastrowid

            cursor.close()
            conn.close()

            return {"message": "Review created successfully", "review_id": review_id}

        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_all_reviews():
        """Récupérer toutes les reviews"""
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute("SELECT * FROM reviews")
            reviews = cursor.fetchall()

            cursor.close()
            conn.close()

            return reviews

        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_review_by_id(review_id):
        """Récupérer une review par ID"""
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute("SELECT * FROM reviews WHERE review_id = %s", (review_id,))
            review = cursor.fetchone()

            cursor.close()
            conn.close()

            if review:
                return review
            return {"message": "Review not found"}

        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def update_review(review_id, review_data):
        """Mettre à jour une review"""
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            sql = """UPDATE reviews SET 
                     customer_id = %s, product_name = %s, review_title = %s, review_text = %s, 
                     rating = %s, sentiment_label = %s, date_posted = %s, verified_purchase = %s, 
                     review_source = %s, language = %s, helpful_votes = %s, region = %s, 
                     emotions_detected = %s, aspect_mentioned = %s, keywords = %s 
                     WHERE review_id = %s"""

            values = (
                review_data["customer_id"], review_data["product_name"], review_data["review_title"],
                review_data["review_text"], review_data["rating"], review_data["sentiment_label"],
                review_data["date_posted"], review_data["verified_purchase"], review_data["review_source"],
                review_data["language"], review_data["helpful_votes"], review_data["region"],
                review_data["emotions_detected"], review_data["aspect_mentioned"], review_data["keywords"],
                review_id
            )

            cursor.execute(sql, values)
            conn.commit()

            cursor.close()
            conn.close()

            return {"message": "Review updated successfully"}

        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def delete_review(review_id):
        """Supprimer une review"""
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            cursor.execute("DELETE FROM reviews WHERE review_id = %s", (review_id,))
            conn.commit()

            cursor.close()
            conn.close()

            return {"message": "Review deleted successfully"}

        except Exception as e:
            return {"error": str(e)}
