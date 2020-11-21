#!/bin/bash

declare FLAG=$(echo "$@")
declare PATH_THEME="$HOME/.config/alacritty/alacritty.yml"
declare URL_THEME="https://raw.githubusercontent.com/hiukky/flate/develop/packages/themes/alacritty/release"
declare VARIANTS=('flate' 'flate-arc' 'flate-punk')
declare WORKDIR="$HOME/.tmp/flate"

yq &> /dev/null

if [[ "$?" -eq 127 ]]; then
  sudo snap install yq
fi

get() {
 mkdir -p $WORKDIR
 curl GET -s $URL_THEME/$1.yml > $WORKDIR/$1.yml
 sleep 3
}

install() {
 [[ -z $1 ]] && variant='flate' || variant=$1

 if ! printf '%s\n' "${VARIANTS[@]}" | grep -P "^$variant$" > /dev/null; then
  echo 'Invalid theme name!'
  exit 0
 fi

 get $variant

 yq d -i $PATH_THEME 'colors'
 yq m -i -I 4 $PATH_THEME $WORKDIR/$variant.yml
 rm -rf $WORKDIR

 echo "Instaled!!"
}

echo
install $FLAG
