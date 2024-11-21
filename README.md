# EOF Parser and Visualizer

Website to visualize EOF bytecode

Uses [@ethereumjs/evm](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm) to parse EOF bytecode. As of writing, the parser was not released yet. Therefore the ethereumjs-monorepo is linked as a submodule.

# Install

```
npm install
```

This will install the submodule and build the @ethereumjs/evm package (see `prepare` script in `package.json` for more details).

# Run

```
npm start
```

# Build

```
npm run build
```
