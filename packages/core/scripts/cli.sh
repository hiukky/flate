#!/bin/bash
# By @hiukky https://hiukky.com

# CONSTANTS
RELEASE="develop"
WORKDIR="$HOME/.tmp/flate"
VARIANTS=(
  'flate'
  'flate-arc'
  'flate-punk'
)
THEMES=(
  'alacritty'
  'vscode'
)
THEMES_FILES=(
  'alacritty.zip'
  'vscode.vsix'
)

# UTILS
getURLTheme() {
  local theme=$1

   if ! printf '%s\n' "${THEMES_FILES[@]}" | grep -P "^$theme$" > /dev/null; then
      echo 'Invalid theme name!'
      exit 0
   fi

  echo "https://github.com/hiukky/flate/releases/download/$RELEASE/$theme"
}

checkPkg() {
  local pkg=$1

  if ! type "$pkg" &> /dev/null ; then
    false; return
  fi
}

installSnapPkg() {
  sudo snap install "$1"
}

installNPMPkg() {
  sudo npm i -g "$1"
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

# THEMES
installAlacrittyTheme() {
  local PATH_THEME="$HOME/.config/alacritty/alacritty.yml"
  local THEME="alacritty"
  local VARIANT=$1

  checkPkg yq

  mkdir -p $WORKDIR
  curl -sL $(getURLTheme $THEME.zip) > $WORKDIR/$THEME.zip
  sleep 3

  unzip -o $WORKDIR/$THEME.zip -d $WORKDIR/$THEME &> /dev/null && rm -rf $WORKDIR/$THEME.zip

  yq d -i $PATH_THEME 'colors'
  yq m -i -I 4 $PATH_THEME $WORKDIR/$THEME/dist/$VARIANT.yml

  echo
  colorfy "Theme successfully installed!"
}

installVSCodeTheme() {
  local THEME="vscode"
  local PKG="code"

  if ! $(checkPkg $PKG); then
    installSnapPkg $PKG
  fi

  curl -sL $(getURLTheme $THEME.vsix) > $WORKDIR/$THEME.vsix

  code --install-extension $WORKDIR/$THEME.vsix

  echo
  colorfy "Theme successfully installed!"
}

# CLI
menuVariants() {
  banner

  PS3=$'\nSelect an variant: '

  select option in "${VARIANTS[@]}"
  do
    case "$REPLY" in
      1 | 2 | 3)
        local variant=${VARIANTS[$REPLY -1]}
        export VARIANT="$variant"
        break;;
      esac
  done
}

menu() {
  banner

  PS3=$'\nSelect an theme: '

  echo

  select option in "${THEMES[@]}"
  do
    case "$REPLY" in
      1)
      menuVariants
      installAlacrittyTheme $VARIANT
      break;;

      2)
      installVSCodeTheme
      break;;
    esac
  done
}

menu
