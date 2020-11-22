#!/bin/bash
# By @hiukky https://hiukky.com

# Utils
. utils.sh
. config.sh

# Themes
. alacritty.sh

banner() {
  clear

  printfy 'F l a t e'
  colorfy '     Colorful Dark Themes!!'
  echo
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
