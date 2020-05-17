#!/bin/bash

set -eou pipefail

export AWS_PROFILE=mindful-api
export BUCKET=s3://mindfulmassage.biz
aws s3 sync --acl public-read --cache-control max-age=3600 js $BUCKET/js
aws s3 sync --acl public-read --cache-control max-age=3600 files $BUCKET/files
aws s3 sync --acl public-read --cache-control max-age=3600 html $BUCKET/html
aws s3 sync --acl public-read --cache-control max-age=3600 css $BUCKET/css
aws s3 sync --acl public-read --cache-control max-age=1209600 img $BUCKET/img
aws s3 sync --acl public-read --cache-control max-age=1209600 favicons $BUCKET/favicons
aws s3 cp --acl public-read --cache-control max-age=3600 index.html $BUCKET/index.html
