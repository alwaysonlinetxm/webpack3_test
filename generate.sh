#!/bin/bash
num=$1
main="./src/main.js"
data="var content = 0"

if [ -f "./src/modules/module1.js" ]; then
  rm ./src/modules/*
  : > ${main}
fi

if [ ${num} = '0' ]; then
  exit
fi

for k in $( seq 1 ${num} )
do
  data="${data} + m${k}"
  echo "import m${k} from './modules/module${k}.js';" >> ${main}
  echo "export default ${k}" > ./src/modules/module${k}.js
done

echo "${data}; document.body.innerHTML = content;" >> ${main}
