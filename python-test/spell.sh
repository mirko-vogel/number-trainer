#!/bin/bash
F=`mktemp`
Q=${1// /+}
echo Spelling $Q ...
wget -q -U Mozilla -O $F "http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=$Q&tl=ar" && mplayer $F --really-quiet
rm $F
