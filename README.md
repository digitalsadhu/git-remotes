# git-remotes
Fetch git remotes (A nice parsed version of `git remote -v`)

## Installation

```
npm install git-remotes
```

## Usage
```js
var gitRemotes = require('git-remotes');

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
var gitRemotes = require('git-remotes');

gitRemotes('./path/to/directory', function (err, remotes) {
  // ...
})
```

## Remote objects

Remote objects look like:
```js
{
  name: 'origin'
  url: 'git@github.com:digitalsadhu/git-remotes.git'
}
```
