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
