FROM python:3.12-slim

WORKDIR /srv
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY data ./data

EXPOSE 8000
# The app waits for the database (wait_for_db) so compose ordering is safe.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
