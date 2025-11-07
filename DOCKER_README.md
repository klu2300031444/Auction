# Docker Setup for Auction Application

This project includes Docker configurations for both the frontend (React) and backend (Spring Boot) applications.

## Project Structure

```
project/
├── backend/
│   ├── Dockerfile              # Production backend image
│   └── .dockerignore
├── Frontend/
│   ├── Dockerfile              # Production frontend image
│   ├── Dockerfile.dev          # Development frontend image
│   └── .dockerignore
├── docker-compose.yml          # Production orchestration
├── docker-compose.dev.yml      # Development orchestration
└── DOCKER_README.md           # This file
```

## Services

### Production Services
- **MySQL Database**: MySQL 8.0 on port 3306
- **Backend**: Spring Boot application on port 3000
- **Frontend**: React application served by Nginx on port 80

### Development Services
- **MySQL Database**: MySQL 8.0 on port 3306
- **Backend**: Spring Boot application on port 3000 (with volume mounting)
- **Frontend**: React development server on port 5173 (with hot reload)

## Quick Start

### Production Deployment

1. **Build and start all services:**
   ```bash
   cd project
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - MySQL: localhost:3306

### Development Setup

1. **Start development environment:**
   ```bash
   cd project
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Access the application:**
   - Frontend (with hot reload): http://localhost:5175
   - Backend API: http://localhost:3000
   - MySQL: localhost:3306

## Individual Service Commands

### Backend Only
```bash
# Production
docker build -t auction-backend ./backend
docker run -p 3000:3000 auction-backend

# Development (with volume mounting)
docker run -p 3000:3000 -v $(pwd)/backend:/app auction-backend
```

### Frontend Only
```bash
# Production
docker build -t auction-frontend ./Frontend
docker run -p 80:80 auction-frontend

# Development
docker build -f ./Frontend/Dockerfile.dev -t auction-frontend-dev ./Frontend
docker run -p 5173:5173 -v $(pwd)/Frontend:/app auction-frontend-dev
```

## Database Configuration

The MySQL database is configured with:
- **Database**: CICDPROJECT
- **Root Password**: admin
- **User**: auction_user
- **Password**: auction_pass

## Environment Variables

### Backend Environment Variables
- `SPRING_DATASOURCE_URL`: Database connection URL
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `SPRING_PROFILES_ACTIVE`: Spring profile (dev/prod)

### Frontend Environment Variables
- `VITE_API_URL`: Backend API URL (defaults to http://localhost:3000)

## Useful Commands

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Stop services
```bash
# Production
docker-compose down

# Development
docker-compose -f docker-compose.dev.yml down
```

### Clean up
```bash
# Remove containers and networks
docker-compose down --volumes --remove-orphans

# Remove images
docker-compose down --rmi all
```

### Database Management
```bash
# Access MySQL shell
docker-compose exec mysql mysql -u root -p

# Backup database
docker-compose exec mysql mysqldump -u root -p CICDPROJECT > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -p CICDPROJECT < backup.sql
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 80, 3000, 3306, and 5173 are not in use
2. **Database connection**: Wait for MySQL to fully start before backend starts
3. **Build failures**: Check Docker logs for specific error messages

### Reset Everything
```bash
# Stop and remove everything
docker-compose down --volumes --remove-orphans
docker system prune -a

# Rebuild from scratch
docker-compose up --build --force-recreate
```

## Production Considerations

1. **Security**: Change default passwords in production
2. **SSL**: Configure SSL certificates for HTTPS
3. **Monitoring**: Add health checks and monitoring
4. **Scaling**: Use Docker Swarm or Kubernetes for production scaling
5. **Backups**: Implement regular database backups

