# Rename all .ogg files in every folder below this to sound.ogg

find . -name "*.ogg" -execdir mv {} sound.ogg \;

