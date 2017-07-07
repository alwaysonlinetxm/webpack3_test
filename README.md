# webpack3_test
a comparison of bundle size among webpack2, webpack3 and rollup.

## Generate modules

Run this command to generate test modules:

```JavaScript
sh generate.sh [n] [type]
```
params:

- n: The number of the generated modules;
- type: The type of the module output, 'num' or 'func';

## Test

Run thess commands to get the output of rollup/webpack2/webpack3:

```
yarn run dev_r
yarn run dev_w2
yarn run dev_w3
yarn run prod_r
yarn run prod_w2
yarn run prod_w3
```


