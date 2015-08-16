var expect = require('expect')
var gr = require('../index')
var cp = require('child_process')

describe('git-remotes module', function () {
  before(function () {
    cp.execSync('mkdir ./fake-app', {cwd: __dirname})
    cp.execSync('mkdir ./fake-app2', {cwd: __dirname})
    cp.execSync('git init', {cwd: __dirname + '/fake-app'})
    cp.execSync('git init', {cwd: __dirname + '/fake-app2'})
    cp.execSync('git remote add origin git@test.com:test/test', {cwd: __dirname + '/fake-app'})
    cp.execSync('git remote add remote git@test.com:test/test', {cwd: __dirname + '/fake-app'})
  });
  after(function () {
    cp.execSync('rm -r ./fake-app', {cwd: __dirname})
    cp.execSync('rm -r ./fake-app2', {cwd: __dirname})
  });
  describe('reading from the current directory', function () {
    it ('should return an array with 1 remote', function (done) {
      gr(function (err, remotes) {
        expect(err).toBe(null)
        expect(remotes.length).toBe(1)
        done()
      })
    })
    it ('should produce a remotes array with a remote object', function (done) {
      gr(function (err, remotes) {
        expect(err).toBe(null)
        expect(remotes[0].name).toBe('origin')
        expect(remotes[0].url).toMatch(/digitalsadhu\/git-remotes\.git/)
        done()
      })
    })
  })
  describe('reading from a directory with no remotes', function () {
    it ('should return an empty array', function (done) {
      gr(__dirname + '/fake-app2', function (err, remotes) {
        expect(err).toBe(null)
        expect(remotes.length).toBe(0)
        done()
      })
    })
  })
  describe('reading from a directory with several remotes', function () {
    it ('should return an array with several remote entries', function (done) {
      gr(__dirname + '/fake-app', function (err, remotes) {
        expect(err).toBe(null)
        expect(remotes.length).toBe(2)
        done()
      })
    })
  })
})
