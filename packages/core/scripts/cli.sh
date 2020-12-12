#!/bin/bash
# By @hiukky https://hiukky.com

set -eE
trap 'err $LINENO' ERR

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
  'kitty'
  'vscode'
  'ulauncher'
  'insomnia'
)
THEMES_FILES=(
  'alacritty.zip'
  'kitty.zip'
  'vscode.vsix'
  'ulauncher.zip'
  'insomnia.zip'
)

# UTILS
get_url_theme() {
  local theme=$1

   if ! printf '%s\n' "${THEMES_FILES[@]}" | grep -P "^$theme$" > /dev/null; then
      echo 'Invalid theme name!'
      exit 0
   fi

  echo "https://github.com/hiukky/flate/releases/download/$RELEASE/$theme"
}

check_pkg() {
  local pkg=$1

  if ! type "$pkg" &> /dev/null ; then
    false; return
  fi
}

install_snap_pkg() {
  sudo snap install "$1"
}

install_npm_pkg() {
  sudo npm i -g "$1"
}

colorfy() {
  check_pkg lolcat
  echo -e "$1" | lolcat
}

printfy() {
  check_pkg figlet
  figlet "$1" | lolcat
}

extract() {
  unzip -o $1.zip -d $1 &> /dev/null && rm -rf $1.zip
}

banner() {
  clear
  printfy '           F l a t e'
  colorfy '    Colorful Dark themes built with ❤︎ by @hiukky'
  echo
}

success() {
  colorfy "\nTheme successfully installed!"
}

installing() {
  colorfy "\nInstalling..."
}

err() {
    echo
    tput setaf 1; echo "Error occurred:"
    awk 'NR>L-4 && NR<L+4 { printf "%-5d%3s%s\n",NR,(NR==L?">>>":""),$0 }' L=$1 $0
}

# THEMES
install_alacritty_theme() {
  local PATH_THEME="$HOME/.config/alacritty/alacritty.yml"
  local THEME="alacritty"
  local VARIANT=$1
  local PKG="alacritty"

  if ! $(check_pkg $PKG); then
    install_snap_pkg $PKG yq
  fi

  mkdir -p $WORKDIR
  curl -sL $(get_url_theme $THEME.zip) > $WORKDIR/$THEME.zip
  sleep 3
  extract $WORKDIR/$THEME

  yq d -i $PATH_THEME 'colors'
  yq m -i -I 4 $PATH_THEME $WORKDIR/$THEME/dist/$VARIANT.yml
}

install_code_theme() {
  local THEME="vscode"
  local PKG="code"

  if ! $(check_pkg $PKG); then
    install_snap_pkg $PKG
  fi

  curl -sL $(get_url_theme $THEME.vsix) > $WORKDIR/$THEME.vsix

  code --install-extension $WORKDIR/$THEME.vsix
}

install_ulauncher_theme() {
  local PATH_THEME="$HOME/.config/ulauncher/user-themes"
  local THEME="ulauncher"
  local PKG="ulauncher"

  if ! $(check_pkg $PKG); then
    install_snap_pkg $PKG
  fi

  mkdir -p $WORKDIR
  curl -sL $(get_url_theme $THEME.zip) > $WORKDIR/$THEME.zip
  sleep 3
  extract $WORKDIR/$THEME
  cp -R $WORKDIR/$THEME/dist/* $PATH_THEME
}

install_insomnia_theme() {
  local PATH_THEME="$HOME/.config/Insomnia/plugins/@flate"
  local THEME="insomnia"
  local PKG="insomnia"

  if ! $(check_pkg $PKG); then
    install_snap_pkg $PKG
  fi

  mkdir -p $WORKDIR
  curl -sL $(get_url_theme $THEME.zip) > $WORKDIR/$THEME.zip
  sleep 3
  extract $WORKDIR/$THEME
  mkdir -p $PATH_THEME
  cp -R $WORKDIR/$THEME $PATH_THEME
}

install_kitty_theme() {
  local PATH_THEME="$HOME/.config/kitty"
  local THEME="kitty"
  local PKG="kitty"
  local VARIANT=$1

  mkdir -p $WORKDIR
  curl -sL $(get_url_theme $THEME.zip) > $WORKDIR/$THEME.zip
  sleep 3
  extract $WORKDIR/$THEME
  mkdir -p $PATH_THEME
  cp -R $WORKDIR/$THEME/dist/$VARIANT.conf $PATH_THEME/flate.conf

  sed -i '/flate/Id' $PATH_THEME/kitty.conf
  bash -c "echo -e '#: Flate color scheme \ninclude $HOME/.config/kitty/flate.conf'" >> $PATH_THEME/kitty.conf
}

# CLI
menu_variants() {
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
      menu_variants
      installing
      install_alacritty_theme $VARIANT
      break;;

      2)
      menu_variants
      installing
      install_kitty_theme $VARIANT
      break;;

      3)
      installing
      install_code_theme
      break;;

      4)
      installing
      install_ulauncher_theme
      break;;

      5)
      installing
      install_insomnia_theme
      break;;
    esac
  done

  success
}

menu
