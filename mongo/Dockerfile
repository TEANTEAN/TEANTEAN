FROM mongo
CMD mongod --fork --logpath /var/log/mongodb.log; \
  mongorestore /backup -u strapi -p password; \
  mongod --shutdown; \
  docker-entrypoint.sh mongod