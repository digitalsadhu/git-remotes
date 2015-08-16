# git-remotes [![Build Status](https://travis-ci.org/digitalsadhu/git-remotes.svg?branch=master)](https://travis-ci.org/digitalsadhu/git-remotes)
Fetch git remotes (A nice parsed version of `git remote -v`).

Runs `git remote -v`, grabs the result, parses each remote out of it and produces an array of objects out of it.

## Installation

```
npm install git-remotes
```

## Usage

Require module
```js
var gitRemotes = require('git-remotes');
```

Retrieving git remotes for the current directory
```js
gitRemotes(function (err, remotes) {
  if (err) {
    //do something with the error
  }

  console.log(remotes)
  // -> so long as `err` is null,
  //`remotes` is always an array with 0 or more objects
  // representing git remotes
})
```

Retrieving git remotes for a specified directory
```js
gitRemotes('./path/to/directory', function (err, remotes) {
  // ...
})
```

## Remote objects

`remotes` is an array of remote objects that look like:
```js
[
  {
    name: 'origin'
    url: 'git@github.com:digitalsadhu/git-remotes.git'
  },
  //...
]
```
