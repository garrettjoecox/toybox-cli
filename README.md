# ToyBox-cli

ToyBox-cli is an enviroment generator for toy problems.

## Installation
Install the module with:

```bash
$ npm install -g toybox-cli
```

## Getting started

Generate a new toybox with:
```
$ toybox init
```
If it mentions something about not finding gulp run `npm install -g gulp`

Then just run `toybox start` while inside the new directory to start
the live reload server. (It will reload the window upon saving files)

## Pulling and Pushing
As of 0.2.0, `toybox init` now adds the upstream remote for you, and you now
have access to the methods pull and push.

`toybox pull`  - Pulls any new toy problems from HR's upstream remote

`toybox push`  - Prompts for commit message and pushes any changes up to your origin master

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/garrettjoecox/toybox-cli/issues).

