#!/bin/bash

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
  PS3=$'\nSelect an variant: '

  select option in "${VARIANTS[@]}"
  do
    case "$REPLY" in
      1 | 2 | 3)
        local variant=${VARIANTS[$REPLY -1]}

        get $variant

        yq d -i $PATH_THEME 'colors'
        yq m -i -I 4 $PATH_THEME $WORKDIR/$variant.yml
        rm -rf $WORKDIR

        break;;
      *)
        echo 'Invalid option!'
      esac
  done

 echo
 echo "Instaled!!"
}

install
