#!/usr/bin/env bash
rm -R dist/
npm run build
mv dist orbiz
rm orbiz.zip
zip -r orbiz.zip orbiz/
scp orbiz.zip ubuntu@poletalks.com:~/
ssh ubuntu@poletalks.com
