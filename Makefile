dev:
	@docker-compose \
		--project-directory . \
		-f docker/dev/docker-compose.yml \
	up --force-recreate --build