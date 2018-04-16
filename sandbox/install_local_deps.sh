#!/bin/bash

set -eo pipefail

echo "--- :package: Build job checkout directory"

pwd
ls -la

echo "--- :evergreen_tree: Build job environment"

env

echo "--- :node: Node version"

node --version

echo "--- :cookie: install local dependencies"

yarn install --pure-lockfile

# this is needed because there is some problem linking the compiled bits
npm rebuild detox

exit
