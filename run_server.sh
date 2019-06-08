#!/bin/bash

until curl -X GET $URL_DB_NEWS
do
    sleep 1s
done

yarn start
