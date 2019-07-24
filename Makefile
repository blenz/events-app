dev:
	@docker build -f docker/dev/Dockerfile -t events-app .
	@docker run -it -v `pwd`:/app -p 3000:3000 events-app

kill:
	docker kill events-app_frontend_1