#!/bin/bash
# By @hiukky https://hiukky.com


BRANCH="develop"
WORKDIR="$HOME/.tmp/flate"
VARIANTS=(
  'flate'
  'flate-arc'
  'flate-punk'
)
THEMES=(
  'alacritty'
)

getURLTheme() {
  local theme=$1

   if ! printf '%s\n' "${THEMES[@]}" | grep -P "^$theme$" > /dev/null; then
      echo 'Invalid theme name!'
      exit 0
   fi

  echo "https://raw.githubusercontent.com/hiukky/flate/$BRANCH/packages/themes/$theme/release"
}

checkPkg() {
  local pkg=$1

   bash $pkg &> /dev/null

  if [[ "$?" -eq 127 ]]; then
    sudo snap install "$pkg"
  fi
}

colorfy() {
  checkPkg lolcat
  echo "$1" | lolcat
}

printfy() {
  checkPkg figlet
  figlet "$1" | lolcat
}

banner() {
  clear

  printfy 'F l a t e'
  colorfy '     Colorful Dark Themes!!'
  echo
}

installAlacrittyTheme() {
  local PATH_THEME="$HOME/.config/alacritty/alacritty.yml"
  local DIR=$WORKDIR/alacritty

  checkPkg yq

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

menu() {
  local variant=$1

  banner

  PS3=$'\nSelect an theme: '

  echo

  select option in "${THEMES[@]}"
  do
    case "$REPLY" in
      1)
      installAlacrittyTheme $variant
      break;;
    esac
  done
}

menuVariants() {
  banner

  PS3=$'\nSelect an variant: '

  select option in "${VARIANTS[@]}"
  do
    case "$REPLY" in
      1 | 2 | 3)
        local variant=${VARIANTS[$REPLY -1]}
        menu $variant
        break;;
      esac
  done
}

menuVariants
