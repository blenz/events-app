dev:
	docker-compose \
		--project-directory . \
		-f build/dev/docker-compose.yml \
	up --force-recreate --build