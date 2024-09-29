# Dockerfile for Flask app
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy files
COPY requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

# Run Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
