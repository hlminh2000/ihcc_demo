compose-up:
	docker-compose -f ./compose/docker-compose.yaml up

dev-ui:
	cd ./ui && npm run start

dev-api:
	cd ./api && npm run dev

start-api:
	cd ./api && npm run start