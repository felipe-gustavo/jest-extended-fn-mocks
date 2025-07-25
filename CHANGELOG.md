# Changelog

All notable changes to this project will be documented in this file.

## 1.0.4 (July 25, 2025)
 - Improve README.md details

## 1.0.3 (July 23, 2025)
 - Mock Global Function to reflect on auto mock
 - Fix last CHANGELOG.md entry to reflect the correct date (metalanguage)


## 1.0.2 (July 22, 2025)
 - Fix type declaration issues not being included in dist
 - Add `cpy-cli` to copy type declarations to the `dist` folder
 - Update `yarn build` script to include copying type declarations
 - Split typescript build into `transpile` and `transpile-alias` scripts
 - Split `compilerOptions` into `tsconfig.json` and `tsconfig.alias.json`

## 1.0.1 (July 22, 2025)

 - Fixed issue with TypeScript alias paths definitions
 - Added `tsc-alias`
 - Updated `yarn build` script to include `tsc-alias` for path alias resolution
 - Created this `CHANGELOG.md` file to track changes
 - Created `.github/PULL_REQUEST_TEMPLATE.md` for consistent PR submissions

## 1.0.0 (July 22, 2025)

 - Initial project setup with TypeScript and JavaScript support
 - Added Yarn and npm configuration
