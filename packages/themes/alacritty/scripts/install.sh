#!/bin/bash

declare FLAG=$(echo "$@")
declare PATH_THEME="$HOME/.config/alacritty/alacritty.yml"
declare VARIANTS=('flate' 'flate-arc' 'flate-punk')

yq &> /dev/null

if [[ "$?" -eq 127 ]]; then
  sudo snap install yq
fi

install() {
 [[ -z $1 ]] && variant='flate' || variant=$1

 if ! printf '%s\n' "${VARIANTS[@]}" | grep -P "^$variant$" > /dev/null; then
  echo 'Invalid theme name!'
  exit 0
 fi

 yq d -i $PATH_THEME 'colors'
 yq m -i -I 4 $PATH_THEME $PWD/dist/$variant.yml

 echo "Instaled!!"
}

echo
install $FLAG
