# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.1.0 (2020-09-14)

### ⚠ BREAKING CHANGES

- Project no longer uses git flow model.

### Features

- **docker-compose:** added docker-compose.yml ([cc3a7be](https://github.com/kosinw/connectmd/commit/cc3a7be8e11792756b1f14c679937dc3f301dc3e))
- **docker-compose:** added redis image to docker-compose.yml ([d23ffa4](https://github.com/kosinw/connectmd/commit/d23ffa47282d98cb31f15cd254af7d9d2eef4fe5))
- **server:** added apollo-server and initial resolver ([2038e0d](https://github.com/kosinw/connectmd/commit/2038e0de826fd2859c2dcf44e52c28bb6d424092)), closes [#2](https://github.com/kosinw/connectmd/issues/2)
- **server:** added basic typescript and project configuration ([aa05a66](https://github.com/kosinw/connectmd/commit/aa05a66be319d8d2a1c267adf2448915c3f99384))
- **server:** added knex and redis to apollo context ([dc01776](https://github.com/kosinw/connectmd/commit/dc01776645e9956d3151210d00da5d6cb4082f03)), closes [#2](https://github.com/kosinw/connectmd/issues/2)
- **server:** added knex migrations and config ([ad1cfdb](https://github.com/kosinw/connectmd/commit/ad1cfdb7966808ce57b584b8f34619736a995cd3))
- **server:** added server logging with pino.js ([cce1ad6](https://github.com/kosinw/connectmd/commit/cce1ad61da050d6c5ad9662a81c41a3d0c7acda9)), closes [#1](https://github.com/kosinw/connectmd/issues/1)
- **server:** added user seed script and profile model ([#4](https://github.com/kosinw/connectmd/issues/4), [#5](https://github.com/kosinw/connectmd/issues/5)) ([1808fb8](https://github.com/kosinw/connectmd/commit/1808fb8413f7ff225a4e674d4f5aa222054bf952))
- **server:** changed names + added profile models ([#5](https://github.com/kosinw/connectmd/issues/5)) ([8ea6eef](https://github.com/kosinw/connectmd/commit/8ea6eef7bb3616707c2709383d27d1d64e65c6d1))
- **server:** changed users schema to use CUIDs over integers and implemented logout ([3163972](https://github.com/kosinw/connectmd/commit/31639729fcce3340b07d38f461843a28a563bd51)), closes [#3](https://github.com/kosinw/connectmd/issues/3)
- **server:** implemented local auth login and registration ([#3](https://github.com/kosinw/connectmd/issues/3), [#4](https://github.com/kosinw/connectmd/issues/4)) ([da7cc9e](https://github.com/kosinw/connectmd/commit/da7cc9ed4b6d7ccf4f0b9f9e47a61bac5e87acee))
- **server:** started implementing users resolvers ([#3](https://github.com/kosinw/connectmd/issues/3)) ([b292948](https://github.com/kosinw/connectmd/commit/b29294828601e974c4aa71012767f6ab12da6880))
- **server/loaders:** started implementing config loaders for express and redis ([d6235ff](https://github.com/kosinw/connectmd/commit/d6235ff65e7b74dcc37ff1d76f30f34c35af8fc9))

### Bug Fixes

- **package:** added husky hooks ([ab25183](https://github.com/kosinw/connectmd/commit/ab25183b630f2e2e1a11b6f07ee4fd98bf779d16))
- **server:** replaced pino-http with express-pino-logger ([8665372](https://github.com/kosinw/connectmd/commit/8665372edee3f38a072fc9ea2a6461a8379d24ff))
- **server/apollo:** configured debug playground to include credentials for cookies ([a50f6a8](https://github.com/kosinw/connectmd/commit/a50f6a843be6273c660786db8d493cbdfb6e7b5f))

- merged develop into master ([816653c](https://github.com/kosinw/connectmd/commit/816653c9ba33ea28f14a7a75689dc8a83eae2d07))
