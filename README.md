# EOF Parser and Visualizer

Website to visualize EOF bytecode

Uses [@ethereumjs/evm](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm) to parse EOF bytecode. As of writing, the parser was not released yet. Therefore the ethereumjs-monorepo is linked as a submodule.

# Install

Install the submodule:

```
cd ethereumjs-monorepo
git submodule update --init
```

Install dependencies:

```
npm install
```

Build @ethereumjs/evm:

```
npm run build --workspace=@ethereumjs/evm
```

Install main project:

```
cd ..  # If you were in ethereumjs-monorepo
npm install
```

# Run

```
npm run start
```
