#!/bin/bash
docker run -d --name test_postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_DB=mydb -p 5432:5432 pgvector/pgvector:pg15
