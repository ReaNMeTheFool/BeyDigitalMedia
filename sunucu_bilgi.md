# BEY DIGITAL MEDIA - SERVER MANIFEST (FOR AI AGENTS)

> [!CAUTION]
> **AI AGENT INSTRUCTION:** If you are a future AI agent assigned to deploy a website or manage this system, you MUST read this document thoroughly before proposing any code or running any terminal commands. This server operates on a strict "Minimum Code Architecture" using Docker. Do not modify host configurations manually unless absolutely necessary.

## 1. SERVER DETAILS
- **Project Scope:** Web hosting infrastructure for BeyDigitalMedia (20-30 Next.js / Node.js web applications).
- **OS:** AlmaLinux 9 (64 Bit)
- **IP Address:** `212.68.34.84`
- **SSH Username:** `root`
- **SSH Password:** `Ahmetonur1`
- **Hardware Profile:** 4GB RAM + 8GB NVME Swap Space (Total 12GB effective memory for container workloads), 40GB NVME Disk, E5-2699v4 CPU.

## 2. INFRASTRUCTURE & ARCHITECTURE
We use a pure container-based approach to isolate deployments, prevent dependency conflicts, and make AI management seamless.
- **Container Engine:** Docker & Docker Compose (`docker compose v2` is active).
- **Reverse Proxy / Gateway:** **Nginx Proxy Manager (NPM)**
  - Path: `/opt/sayfalar/npm/`
  - NPM Web Panel: `http://212.68.34.84:81`
  - Purpose: Connects domains to Docker containers graphically and provides one-click Let's Encrypt SSL logic.
- **Container Management GUI:** **Portainer CE**
  - Portainer Web Panel: `https://212.68.34.84:9443`
  - Purpose: Provides visual health, log, and management interface for all active Docker containers.

## 3. FIREWALL SETTINGS (firewalld)
The host is secured using `firewalld`. Only the following ports are permitted:
- `22/tcp` (SSH)
- `80/tcp` (HTTP - NPM Gateway)
- `443/tcp` (HTTPS - NPM Gateway)
- `81/tcp` (NPM Admin Panel)
- `8000/tcp` & `9443/tcp` (Portainer Admin Panel)

> [!WARNING]
> Do NOT open any direct application ports (e.g., node on 3000) to the public via firewalld. All external traffic MUST pass through Nginx Proxy Manager on ports 80/443.

## 4. DEPLOYMENT WORKFLOW (HOW TO HOST A NEW SITE)

When the USER requests a new Next.js website deployment:
1. Connect to the host via SSH (`Ahmetonur1` password through Paramiko or similar).
2. Create an isolated project directory: `mkdir -p /opt/sayfalar/<project_name>`
3. Place a lightweight `docker-compose.yml` into that directory. The image should either be pre-built, or use a Dockerfile in the same folder.
4. Ensure the container's network can be reached. Expose a local port mapping (e.g., `127.0.0.1:3000:3000`) but *do not open it in firewalld*.
5. Run `docker compose up -d --build`.
6. Use Nginx Proxy Manager (either via port 81 API or asking the user to do it in the GUI) to map `www.domain.com` to `127.0.0.1:3000` (or Docker bridge IP) and issue the SSL.

## 5. DEFAULT CREDENTIALS
- **NPM Initial Login:** `admin@example.com` / `changeme` (The USER is instructed to change this).
- **Portainer Initial Setup:** The USER must visit `https://212.68.34.84:9443` to set up the initial admin password.

## 6. EMERGENCY / TROUBLESHOOTING
- If the server runs out of RAM (Next.js is memory heavy), verify Swap is active via `free -h`.
- Review NPM logs: `docker logs npm-app-1 -f` inside `/opt/sayfalar/npm/`.
- Review port conflicts: `ss -tlnp`.

## 7. Encountured problems and how they solved:
entering website or curling website was returning "{"status":"OK","setup":true,"version":"..."}"

this was a answer from nginx proxy maanger(NPM) admin panel not from docker/localhost 

in npm's database (/data/database.sqlite) in table proxy_host at forward_host was set to 127.0.0.1 
in npm container this means pointing itself that mean npm was redirecting rquest coming from othersite to 
localhost:3000 but this was npm itself 

# solving steps:

# connecting docker to npm network

step 1:

we added npm_default as a extarnal network to docker-compose.yml

so npm became able to solve xxx-app-1 hostname oover domains

step 2:

we set HOSTNAME=0.0.0.0 in docker-compose.yml environment variables so Next.js standalone server listens on all interfaces not just container hostname

step 3:

we updated npm sqlite database forward_host from 127.0.0.1 to xxx-app-1 via:

sqlite3 /data/database.sqlite "UPDATE proxy_host SET forward_host='xxx-app-1' WHERE id=1;"

## 2. Docker build failing with getaddrinfo ENOTFOUND mongo

During docker compose build npm run build was trying to connect to Payload CMS which needs MongoDB but builder stage cannot resolve mongo hostname because docker compose services are not available at build time only at runtime

# solving steps:

step 1:

We refactored sitemap.ts to only return static hardcoded pages at build time. No database calls during build

step 2:

We created a dynamic /api/sitemap route handler that connects to Payload CMS at runtime and fetches blog posts and projects from MongoDB then returns XML

step 3:

We updated robots.txt to reference /api/sitemap instead of sitemap.ts static file

This pattern applies to any Next.js file that calls CMS during static generation inside Docker builder. Move CMS-dependent logic to runtime API endpoints

## 3. Docker build killed by OOM killer (SIGKILL) on 4GB server

During `docker compose build` or `docker build` the Next.js build process was getting killed with SIGKILL because the Docker build container had no memory limit and the Linux OOM killer intervened when available RAM ran out. Server has 4GB RAM + 8GB swap but Next.js Turbopack build consumes all available memory in spikes.

# solving steps:

step 1:

Clean Docker build cache to free up space (old cache was 4.2GB):
```
docker builder prune -f
```

step 2:

Build with explicit memory limits using `docker build --memory=3g --memory-swap=5g` instead of `docker compose build` (which does not support memory limits). This caps the build container at 3GB RAM with 5GB max (RAM + swap).

```
docker build --memory=3g --memory-swap=5g -t beydigital-app .
docker compose up -d --no-build
```

step 3:

Created `scripts/push-to-server.sh` which dynamically checks available server RAM via SSH and calculates appropriate `--memory` and `--memory-swap` values before building. This prevents manual guesswork and adapts to whatever memory is free at deploy time.

Key takeaway: Never use `docker compose build` on low-memory servers. Always set explicit `--memory` limits based on available RAM. The Next.js page that caused the DB connection error during build was also made `force-dynamic` (see section 2 pattern).
