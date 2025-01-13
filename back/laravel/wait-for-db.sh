#!/bin/bash
until mysql -h db -u root -proot -e "SHOW DATABASES;" &> /dev/null
do
  echo "Esperando a que la base de datos esté lista..."
  sleep 3
done
echo "Base de datos lista. Iniciando Laravel..."
exec "$@"
