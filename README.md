# purepass-core

[![npm](https://img.shields.io/npm/v/purepass-core.svg)](https://npmjs.com/package/purepass-core)
[![Travis](https://img.shields.io/travis/purepass/purepass-core.svg)](https://travis-ci.org/purepass/purepass-core)
[![Greenkeeper badge](https://badges.greenkeeper.io/purepass/purepass-core.svg)](https://greenkeeper.io/)
[![Coveralls](https://img.shields.io/coveralls/purepass/purepass-core.svg)](https://coveralls.io/github/purepass/purepass-core)

[purepass-core docs generated with TypeDoc](https://purepass.github.io/purepass-core/)


## the problem
The biggest vulnerability we all face in web security is that passwords are hard.

Certain websites require different password traits, such as upper-case and lower-case letters, symbols, and minimum length.

This puts a burden on us to keep passwords complicated, making them even more difficult to remember.

To make matters worse we shouldn't re-use passwords because this can turn any one compromised password into many breaches.

## the solution

purepass takes a secret, and a namespace, and they are hashed together using sha256 and other optional configuration to generate a password 64 characters in length, with all the traits any website requires.

It is advisable that you choose a new secret for every site, but if thats too much (you aren't alone!), changing the namespace from one site to the next will ensure that your 64 character password will be entirely different for each site or service you log in to.

Instead of the 'one password' approach where you lock many different passwords behind a master password, purepass only requires you to remember one secret, and the arbitrary namespace you chose for the service, and you can just run it again with the promise that it will always generate the same 64 character password, provided you pass the same parameters.

## usage

This package is the core library for generating passwords, the source will always be public. It is already implemented in the following places:

For a command line interface, checkout [purepass-cli](https://github.com/purepass/purepass-cli).

For convenience [purepass.run](https://purepass.run) is a [purepass-view](https://github.com/purepass/purepass-view) implementation running in the browser.


## reliability

The deterministic password generator algorithm will not change. This is a project you can count on. Contributions are welcomed and encouraged!
