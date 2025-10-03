#!/usr/bin/env bash

set -euo pipefail

# Default configuration
SOURCE_DIR="public/assets/media/cases_studies"
OUTPUT_DIR="public/assets/media/cases_studies_360p"
BACKUP_DIR="public/assets/media/cases_studies_originals"

CRF="27"
PRESET="medium"
AUDIO_BITRATE="96k"
HEIGHT="360"

log() {
  printf "[compress_videos] %s\n" "$1"
}

error() {
  printf "[compress_videos][ERROR] %s\n" "$1" >&2
  exit 1
}

if ! command -v ffmpeg >/dev/null 2>&1; then
  error "ffmpeg n'est pas installé. Installez-le (ex: brew install ffmpeg) puis relancez le script."
fi

if [[ ! -d "$SOURCE_DIR" ]]; then
  error "Dossier source introuvable: $SOURCE_DIR"
fi

mkdir -p "$OUTPUT_DIR"
mkdir -p "$BACKUP_DIR"

log "Début de la compression des vidéos depuis $SOURCE_DIR"

shopt -s nullglob
files=("$SOURCE_DIR"/*.mp4 "$SOURCE_DIR"/*.webm)

if [[ ${#files[@]} -eq 0 ]]; then
  error "Aucun fichier .mp4 ou .webm trouvé dans $SOURCE_DIR"
fi

for file in "${files[@]}"; do
  filename=$(basename "$file")
  name_without_ext=${filename%.*}
  ext=${filename##*.}

  backup_path="$BACKUP_DIR/$filename"
  output_path="$OUTPUT_DIR/${name_without_ext}_360p.mp4"

  if [[ ! -f "$backup_path" ]]; then
    log "Sauvegarde de $filename"
    cp "$file" "$backup_path"
  fi

  log "Compression de $filename -> $(basename "$output_path")"

  ffmpeg \
    -y \
    -i "$file" \
    -vf "scale=-2:$HEIGHT" \
    -c:v libx264 \
    -preset "$PRESET" \
    -crf "$CRF" \
    -c:a aac \
    -b:a "$AUDIO_BITRATE" \
    "$output_path"

  log "Compression terminée: $output_path"
done

log "Toutes les vidéos ont été traitées."
log "Vous pouvez mettre à jour vos chemins vers $OUTPUT_DIR/*.mp4"

