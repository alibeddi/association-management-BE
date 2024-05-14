build:
	docker build -t api .

run:
	docker-compose up

stop:
	docker-compose down