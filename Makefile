.PHONY=build

build:
	@pnpm ts-build

run: build
	@node bin/index.js

debug:
	@pnpm start:debug