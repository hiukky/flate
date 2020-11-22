#!/bin/bash
# By @hiukky https://hiukky.com

. config.sh
. utils.sh

PATH_THEME="$HOME/.config/alacritty/alacritty.yml"
DIR=$WORKDIR/alacritty

checkPkg yq

installAlacrittyTheme() {
  local variant=$1

  mkdir -p $DIR
  curl GET -s $(getURLTheme alacritty)/$variant.yml > $DIR/$variant.yml
  sleep 3

  yq d -i $PATH_THEME 'colors'
  yq m -i -I 4 $PATH_THEME $DIR/$variant.yml
  rm -rf $DIR

  echo
  colorfy "Theme successfully installed!"
}
