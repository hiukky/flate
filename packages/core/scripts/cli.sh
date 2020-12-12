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

extract() {
  unzip -o $1.zip -d $1 &> /dev/null && rm -rf $1.zip
}

banner() {
  clear

  printfy 'F l a t e'
  colorfy '     Colorful Dark Themes!!'
  echo
}

success() {
  echo
  colorfy "Theme successfully installed!"
}

# THEMES
installAlacrittyTheme() {
  local PATH_THEME="$HOME/.config/alacritty/alacritty.yml"
  local THEME="alacritty"
  local VARIANT=$1
  local PKG="alacritty"

  if ! $(checkPkg $PKG); then
    installSnapPkg $PKG yq
  fi

  mkdir -p $WORKDIR
  curl -sL $(getURLTheme $THEME.zip) > $WORKDIR/$THEME.zip
  sleep 3
  extract $WORKDIR/$THEME

  yq d -i $PATH_THEME 'colors'
  yq m -i -I 4 $PATH_THEME $WORKDIR/$THEME/dist/$VARIANT.yml

  success
}

installVSCodeTheme() {
  local THEME="vscode"
  local PKG="code"

  if ! $(checkPkg $PKG); then
    installSnapPkg $PKG
  fi

  curl -sL $(getURLTheme $THEME.vsix) > $WORKDIR/$THEME.vsix

  code --install-extension $WORKDIR/$THEME.vsix

  success
}

installUlauncherTheme() {
  local PATH_THEME="$HOME/.config/ulauncher/user-themes"
  local THEME="ulauncher"
  local PKG="ulauncher"

  if ! $(checkPkg $PKG); then
    installSnapPkg $PKG
  fi

  mkdir -p $WORKDIR
  curl -sL $(getURLTheme $THEME.zip) > $WORKDIR/$THEME.zip
  sleep 3
  extract $WORKDIR/$THEME
  cp -R $WORKDIR/$THEME/dist/* $PATH_THEME

  success
}

installInsomniaTheme() {
  local PATH_THEME="$HOME/.config/Insomnia/plugins/@flate"
  local THEME="insomnia"
  local PKG="insomnia"

  if ! $(checkPkg $PKG); then
    installSnapPkg $PKG
  fi

  mkdir -p $WORKDIR
  curl -sL $(getURLTheme $THEME.zip) > $WORKDIR/$THEME.zip
  sleep 3
  extract $WORKDIR/$THEME
  mkdir -p $PATH_THEME
  cp -R $WORKDIR/$THEME $PATH_THEME

  success
}

installKittyTheme() {
  local PATH_THEME="$HOME/.config/kitty"
  local THEME="kitty"
  local PKG="kitty"
  local VARIANT=$1

  mkdir -p $WORKDIR
  curl -sL $(getURLTheme $THEME.zi) > $WORKDIR/$THEME.zip
  sleep 3
  extract $WORKDIR/$THEME
  mkdir -p $PATH_THEME
  cp -R $WORKDIR/$THEME/dist/$VARIANT.conf $PATH_THEME/flate.conf

  sed -i '/flate/Id' $PATH_THEME/kitty.conf
  bash -c "echo -e '#: Flate color scheme \ninclude $HOME/.config/kitty/flate.conf'" >> $PATH_THEME/kitty.conf

  success
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
      menuVariants
      installKittyTheme $VARIANT
      break;;

      3)
      installVSCodeTheme
      break;;

      4)
      installUlauncherTheme
      break;;

      5)
      installInsomniaTheme
      break;;
    esac
  done
}

menu
