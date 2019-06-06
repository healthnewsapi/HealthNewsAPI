#!/bin/bash

until curl -X GET $URL_DB_NEWS
do
    sleep 1s
done

npm run start
