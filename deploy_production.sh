#!/usr/bin/env bash
rm -R dist/
npm run build
mv dist newpoleweb
rm newpoleweb.zip
zip -r newpoleweb.zip newpoleweb/
scp newpoleweb.zip ubuntu@poletalks.com:~/
ssh ubuntu@poletalks.com
