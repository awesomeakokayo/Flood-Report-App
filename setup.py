from setuptools import setup, find_packages

setup(
    name="flood-report-api",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn[standard]",
        "sqlalchemy",
        "psycopg2-binary",
        "python-dotenv",
        "passlib",
        "python-jose[cryptography]",
        "bcrypt",
        "pillow",
    ],
)