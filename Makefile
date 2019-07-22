dev:
	@docker-compose \
		--project-directory . \
		-f docker/dev/docker-compose.yml \
	up --force-recreate --build

kill:
	docker kill events-app_frontend_1