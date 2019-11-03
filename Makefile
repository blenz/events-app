APP_NAME= events-app

APP_NAME_DEV= $(APP_NAME)-dev

build-dev:
	@docker build \
		-f docker/dev/Dockerfile \
		-t $(APP_NAME_DEV) .

dev:
	@docker run --rm -it \
		-v `pwd`:/app \
		-p 3000:3000 \
		$(APP_NAME_DEV)
