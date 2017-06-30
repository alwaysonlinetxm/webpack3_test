#!/bin/bash
num=$1

if [ -f "./src/modules/module1.js" ]; then
  rm ./src/modules/*
fi

if [ ${num} = '0' ]; then
  exit
fi

for k in $( seq 1 ${num} )
do
   echo "export default ${k}" > ./src/modules/module${k}.js
done
