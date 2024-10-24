# Bitwake API

## Requirements

- Node

### Postgres

Running a Postgres instance using Docker:

```bash
docker run -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

To connect to the database using Nix:

```bash
nix-shell -p postgresql --command "psql postgresql://postgres:postgres@127.0.0.1:5432"
```

Creating the database:

```sql
CREATE DATABASE bitwake;
```

Creating the tables:

```sql
CREATE TABLE users (
  device_id varchar(64) PRIMARY KEY,
  amount integer NOT NULL,
  count integer NOT NULL
);
```
