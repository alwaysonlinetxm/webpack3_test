#!/bin/bash
for k in $( seq 1 $1 )
do
   echo "export default ${k}" > module${k}.js
done
