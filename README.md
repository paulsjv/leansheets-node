This project uses `pkg` to build exach executable.  You can find it at [PKG](https://github.com/zeit/pkg). 

To install `pkg` run the following:

    npm instlal -g pkg

To build just run the following command:

    pkg . --out-path <dir>

To install the Node application run `npm install` and to run the server run `npm run server`.

This node app contains copy of the branch `dist` in [LeanSheets](https://github.com/paulsjv/leansheets/tree/dist).

When you run the executable `--help` the following help appears.

    Example run command:
        leansheets-node-<os> --config <path-to-config.json> --debug-log
        
    Valid flags:
        --help          - to get this screen.
        --debug-log     - shows a verbous output of startup and all requests.
        --output-json   - outputs the configuration JSON to the console that was passed in.
        --port          - sets the port to run the server on. Defaults to 5000.

There is also an `exampleConfig.json` that you can build upon.  You'll need to use a site like https://www.base64encode.org/ to encode your `<username>:<password>` so that you can Basic Auth into your instance of JIRA.
    
After you start the application browse to http://localhost:5000 to have it load.
    
If you have any issues please add them the the issues here.
