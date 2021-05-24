#!/bin/bash


if [ $1 == "up" ]; then
	exec docker-compose up -d
elif [ $1 == "up-db" ]; then
	exec docker-compose up -d mongo
elif [ $1 == "up-backend" ]; then
	exec docker-compose up -d mongo strapi
elif [ $1 == "down" ]; then
	exec docker-compose down
elif [ $1 == "destroy" ]; then 
	exec docker system prune -a --volumes
elif [ $1 == "save" ] && [ $2 == "front" ]; then 
	exec docker-compose build
elif [ $1 == "save" ] && [ $2 == "back" ]; then
	exec docker exec -t mongo mongodump -u strapi -p password --out ./backup/ ; docker-compose up -d --build
elif [ $1 == "test" ]; then
	exec docker exec -t gn_nextjs_1 yarn test
else
	echo "USAGE: 
		up - brings up docker container
		down - brings down containers
		destroy - clean docker slate including removing volumes
		save front - save changes to frontend
		save back - save changes to backend"
fi
