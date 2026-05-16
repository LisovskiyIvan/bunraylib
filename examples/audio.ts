import { Raylib, COLORS, KEYS } from "../src";
import { join } from "path";

Raylib.initWindow(1200, 800, "Audio Demo");
Raylib.setTargetFPS(60);
Raylib.initAudioDevice();

const audioFile = join(import.meta.dir, "../assets/audio/Preview.ogg");
const musicFile = join(import.meta.dir, "../assets/audio/music.ogg");

const sound = Raylib.loadSound(audioFile);
const music = Raylib.loadMusicStream(musicFile);

let volume = 1.0;
let pitch = 1.0;
let pan = 0.5;
let musicPlaying = false;
let soundPlaying = false;

while (!Raylib.windowShouldClose()) {
  const dt = Raylib.getFrameTime();

  if (Raylib.isKeyPressed(KEYS.SPACE)) {
    soundPlaying = !soundPlaying;
    if (soundPlaying) Raylib.playSound(sound);
    else Raylib.stopSound(sound);
  } 
  if (Raylib.isKeyPressed(KEYS.M)) {
    musicPlaying = !musicPlaying;
    if (musicPlaying) Raylib.playMusicStream(music);
    else Raylib.stopMusicStream(music);
  }

  if (Raylib.isKeyDown(KEYS.UP)) volume = Math.min(volume + dt, 1.0);
  if (Raylib.isKeyDown(KEYS.DOWN)) volume = Math.max(volume - dt, 0.0);
  if (Raylib.isKeyDown(KEYS.RIGHT)) pitch = Math.min(pitch + dt * 0.5, 2.0);
  if (Raylib.isKeyDown(KEYS.LEFT)) pitch = Math.max(pitch - dt * 0.5, 0.1);
  if (Raylib.isKeyPressed(KEYS.P)) pan = pan > 0.5 ? 0.0 : 1.0;

  if (musicPlaying) Raylib.updateMusicStream(music);

  Raylib.setSoundVolume(sound, volume);
  Raylib.setSoundPitch(sound, pitch);
  Raylib.setSoundPan(sound, pan);
  Raylib.setMusicVolume(music, volume);
  Raylib.setMusicPitch(music, pitch);
  Raylib.setMusicPan(music, pan);

  Raylib.beginDrawing();
  Raylib.clearBackground(COLORS.DARKGRAY);

  let y = 10;
  Raylib.drawText("AUDIO DEMO", 10, y, 28, COLORS.GOLD); y += 40;
  Raylib.drawText(`Volume: ${(volume * 100).toFixed(0)}%`, 10, y, 20, COLORS.WHITE); y += 25;
  Raylib.drawText(`Pitch: ${pitch.toFixed(2)}x`, 10, y, 20, COLORS.CYAN); y += 25;
  Raylib.drawText(`Pan: ${pan < 0.5 ? "Left" : pan > 0.5 ? "Right" : "Center"}`, 10, y, 20, COLORS.LIME); y += 30;

  Raylib.drawText(`Sound: ${Raylib.isSoundPlaying(sound) ? "Playing" : "Stopped"}`, 10, y, 20, COLORS.ORANGE); y += 25;
  Raylib.drawText(`Music: ${Raylib.isMusicStreamPlaying(music) ? "Playing" : "Stopped"}`, 10, y, 20, COLORS.MAGENTA); y += 30;

  const musicTime = Raylib.getMusicTimePlayed(music);
  const musicLen = Raylib.getMusicTimeLength(music);
  if (musicLen > 0 && Number.isFinite(musicTime) && Number.isFinite(musicLen)) {
    const progress = musicTime / musicLen;
    const barW = Math.round(Math.max(0, Math.min(300, 300 * progress)));
    Raylib.drawRectangle(10, y, 300, 10, COLORS.GRAY);
    if (barW > 0) Raylib.drawRectangle(10, y, barW, 10, COLORS.GOLD);
    Raylib.drawText(`${musicTime.toFixed(1)}s / ${musicLen.toFixed(1)}s`, 320, y - 5, 16, COLORS.WHITE);
  }
  y += 40;

  Raylib.drawText("[SPACE] Play sound", 10, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[M] Toggle music", 10, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[UP/DOWN] Volume", 10, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[LEFT/RIGHT] Pitch", 10, y, 16, COLORS.LIGHTGRAY); y += 20;
  Raylib.drawText("[P] Toggle pan (L/R)", 10, y, 16, COLORS.LIGHTGRAY); y += 20;

  Raylib.drawFPS(Raylib.getScreenWidth() - 100, 10);
  Raylib.endDrawing();
}

Raylib.unloadSound(sound);
Raylib.unloadMusicStream(music);
Raylib.closeAudioDevice();
Raylib.closeWindow();
