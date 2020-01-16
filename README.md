This project uses `pkg` to build exach executable.  You can find it at [PKG](https://github.com/zeit/pkg). 

To install `pkg` run the following:

`npm instlal -g pkg`

To build just run the following command:

`pkg . --out-path <dir>`

To install the Node application run `npm install` and to run the server run `npm run server`.

This node app contains copy of the branch in [LeanSheets](https://github.com/paulsjv/leansheets).

When you run the executable `--help` the following help appears.

`Example run command:
    leansheets-node-<os> --config <path-to-config.json> --debug-log

Valid flags:
    --help          - to get this screen.
    --debug-log     - shows a verbous output of startup and all requests.
    --output-json   - outputs the configuration JSON to the console that was passed in.
    --port          - sets the port to run the server on. Defaults to 5000.`
