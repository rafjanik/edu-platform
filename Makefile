up:
	docker-compose up

down:
	docker-compose down

logs:
	docker-compose logs

build:
	docker-compose build --no-cache

shell:
	docker exec -it edu-platforma-backend bash 

shell-root:
	docker exec -it -u root edu-platforma-backend bash 


version:
	docker --version