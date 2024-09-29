import psycopg2

# Database connection configuration
DATABASE = {
    'host': 'localhost',       # Change to the Docker container's IP if needed
    'port': '5432',            # PostgreSQL port
    'database': 'example_db', # Replace with your database name
    'user': 'example_user',        # Replace with your PostgreSQL username
    'password': 'example_password'  # Replace with your PostgreSQL password
}

def get_db_connection():
    """Create a connection to the PostgreSQL database."""
    conn = psycopg2.connect(
        host=DATABASE['host'],
        port=DATABASE['port'],
        database=DATABASE['database'],
        user=DATABASE['user'],
        password=DATABASE['password']
    )
    return conn


def initialize_db():
    """Load the schema.sql file and execute it in the PostgreSQL database."""
    conn = get_db_connection()
    cursor = conn.cursor()

    with open('schema.sql', 'r') as f:
        schema_sql = f.read()
    cursor.execute(schema_sql)
    conn.commit()
    print("Schema loaded successfully.")

    cursor.close()
    conn.close()

def main():
    initialize_db()


    