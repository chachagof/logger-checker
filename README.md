# Pokdeng log check

This project is designed for checking Pokdeng logs. You can refactor the conditions in the controller as you see fit, but you must follow the tips below.

## Requirements

To ensure that this project can retrieve your logs, you need to create two directories: one for your app.log and the other for error.log. You can change the names in the constants in app.js, and the default names are provided below.

```sh
mkdir appLog checkLog
```

In controller, I hide some sensitive word in condition. So you must to build new config what you want. And there is am example in configs director 

```sh
mkdir -p configs 
touch configs/errorType.json
```

### Controller Files

There are three files in the controller:

- IllegalCards: Used to check for persons with illegal card errors.
- InfoLod: Used to verify whether players' bet counts  are greater than or equal to their win counts.
- NormalError: Used to check and record all error types from error.log.

### Build project

You can modify the conditions in all files as you wish. Also, this project provides a package service. So if you believe the controller meets your requirements, then you can use the command below to build.

```sh
npm run build
```
