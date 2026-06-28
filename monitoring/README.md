# Monitoring

Prometheus + Grafana + postgres-exporter are part of the main
`docker-compose.yml`, alongside the API/web/bot/postgres services. They run on
the same `fictadvisor` (and `fictadvisor-dev`) networks, so Prometheus scrapes
the API and Postgres directly by container name.

## What gets scraped

- **API metrics** — `fictadvisor-api:80/metrics` and `fictadvisor-api-dev:80/metrics`.
  Provided by `prom-client` wired into NestJS (`fictadvisor-api/src/modules/metrics/`):
  default Node.js/process metrics plus an `http_requests_total` counter and an
  `http_request_duration_seconds` histogram recorded by a global interceptor,
  exposed at `GET /metrics`. The endpoint appears once the API image is rebuilt
  with this code.
- **Postgres metrics** — `postgres-exporter:9187`, connected to `postgres-db`.

## Endpoints

| Service    | URL                   | Notes                          |
|------------|-----------------------|--------------------------------|
| Prometheus | http://localhost:9090 | Targets at `/targets`          |
| Grafana    | http://localhost:3300 | login from env (default admin/admin) |

## Environment files

Like the other services, the monitoring services read their config from
`~/deployment/env/*.env` (these live on the host, not in the repo). Templates
are in [`env-examples/`](./env-examples) — copy and fill them in:

```bash
cp monitoring/env-examples/postgres-exporter.env.example     ~/deployment/env/postgres-exporter.env
cp monitoring/env-examples/postgres-exporter-dev.env.example ~/deployment/env/postgres-exporter-dev.env
cp monitoring/env-examples/grafana.env.example              ~/deployment/env/grafana.env
```

| File | Service | Keys |
|------|---------|------|
| `postgres-exporter.env`     | `postgres-exporter`     | `DATA_SOURCE_NAME` → `postgres-db` (password must match `postgres.env`) |
| `postgres-exporter-dev.env` | `postgres-exporter-dev` | `DATA_SOURCE_NAME` → `postgres-db-dev` (password must match `postgres-dev.env`) |
| `grafana.env`               | `grafana`               | `GF_SECURITY_ADMIN_USER`, `GF_SECURITY_ADMIN_PASSWORD`, `GF_USERS_ALLOW_SIGN_UP` |

The existing `postgres.env` / `postgres-dev.env` need **no new keys** — the
exporter DSNs just have to use the same password. The API env files are
unchanged: `/metrics` is exposed automatically with no extra config.

## Dashboards

Grafana auto-provisions the Prometheus datasource and four dashboards
(`monitoring/grafana/dashboards/`), split prod vs dev by Prometheus `job` label:
**FICT Advisor API — prod/dev** and **PostgreSQL — prod/dev**. Prometheus scrape
config lives in `monitoring/prometheus/prometheus.yml` (jobs `fictadvisor-api`,
`fictadvisor-api-dev`, `postgres`, `postgres-dev`).

> Note: `prometheus.yml` is a single-file bind mount. After editing it, run
> `docker compose up -d --force-recreate prometheus` — a SIGHUP reload keeps
> serving the old file because the edit replaces its inode.
