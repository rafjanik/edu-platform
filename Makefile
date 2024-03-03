up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs

build:
	docker-compose build --no-cache

shell:
	docker exec -it edu-platforma-backend bash 

version:
	docker --version