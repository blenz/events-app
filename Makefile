APP_DEV_NAME= events-app-dev

build-dev:
	@docker build --rm -q -f docker/dev/Dockerfile -t $(APP_DEV_NAME) .

run-dev:
	@docker run -it -v `pwd`:/app -p 3000:3000 $(APP_DEV_NAME)

stop-dev:
	@docker stop $(APP_DEV_NAME)