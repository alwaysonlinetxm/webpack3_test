#!/bin/bash
num=$1
type=$2
main="./src/main.js"
data="var content = 0"

if [ -f "./src/modules/module1.js" ];
then
  rm ./src/modules/*
  : > ${main}
fi

if [ ${num} = '0' ];
then
  exit
fi

for k in $( seq 1 ${num} )
do
  if [ ${type} = 'num' ];
  then
    data="${data} + m${k}"
    echo "import m${k} from './modules/module${k}.js';" >> ${main}
    echo "export default ${k}" > ./src/modules/module${k}.js
  elif [ ${type} = 'func' ]
  then
    data="${data} + m${k}()"
    echo "import m${k} from './modules/module${k}.js';" >> ${main}
    echo "export default function() { return ${k} }" > ./src/modules/module${k}.js
  else
    data="${data} + m${k}(${k})"
    echo "import m${k} from './modules/module${k}.js';" >> ${main}
    echo "export default function(n) { return ${k}*n }" > ./src/modules/module${k}.js
  fi
done

echo "${data}; document.body.innerHTML = content;" >> ${main}
