compose-up:
	docker-compose -f ./compose/docker-compose.yaml up

dev-ui:
	cd ./ui && npm run start

dev-api:
	cd ./api && npm run dev

start-api:
	cd ./api && npm run start

prod-restart:
	pm2 restart ts-node && cd ./ui && npm run build && sudo rm -rf /var/www/html/portal && sudo cp -r build /var/www/html/portal