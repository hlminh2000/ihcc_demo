compose-up:
	docker-compose -f ./compose/docker-compose.yaml up

dev-ui:
	cd ./ui && npm run start

dev-api:
	cd ./api && npm run dev

start-api:
	cd ./api && npm run start

prod-restart-ui:
	cd ./ui \
	&& npm ci \
	&& npm run build \
	&& rm -rf ../api/public && cp -r ./build ../api/public

prod-restart:
	cd ./ui \
	&& npm ci \
	&& npm run build \
	&& rm -rf ../api/public && cp -r ./build ../api/public \
	&& cd ../api \
	&& npm ci \
	&& npx pm2 restart --update-env ts-node