#!/bin/bash

set -eo pipefail

echo "--- :package: Build job checkout directory"

pwd
ls -la

echo "--- :evergreen_tree: Build job environment"

env

echo "--- install local dependencies"

cd sandbox && npm install

exit
