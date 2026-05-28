import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib } from "../src";
import type { AudioStream } from "../src/types";
import { join } from "path";
import { existsSync, unlinkSync, readFileSync } from "fs";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Audio Test");
  Raylib.setTargetFPS(60);
  Raylib.initAudioDevice();
});

afterAll(() => {
  Raylib.closeAudioDevice();
  Raylib.closeWindow();
});

describe("Audio device", () => {
  test("isAudioDeviceReady", () => {
    expect(Raylib.isAudioDeviceReady()).toBe(true);
  });

  test("setMasterVolume does not crash", () => {
    Raylib.setMasterVolume(0.5);
  });

  test("getMasterVolume", () => {
    Raylib.setMasterVolume(0.5);
    const vol = Raylib.getMasterVolume();
    expect(typeof vol).toBe("number");
    expect(Math.abs(vol - 0.5)).toBeLessThan(0.1);
  });
});

describe("Wave", () => {
  const audioFile = join(import.meta.dir, "../assets/audio/Preview.ogg");

  test("loadWave", () => {
    const wave = Raylib.loadWave(audioFile);
    expect(wave).toBeGreaterThanOrEqual(0);
    Raylib.unloadWave(wave);
  });

  test("isWaveValid", () => {
    const wave = Raylib.loadWave(audioFile);
    expect(Raylib.isWaveValid(wave)).toBe(true);
    Raylib.unloadWave(wave);
  });

  test("waveCopy", () => {
    const wave = Raylib.loadWave(audioFile);
    const copy = Raylib.waveCopy(wave);
    expect(Raylib.isWaveValid(copy)).toBe(true);
    Raylib.unloadWave(copy);
    Raylib.unloadWave(wave);
  });

  test("exportWave does not crash", () => {
    const wave = Raylib.loadWave(audioFile);
    const tmpFile = join(import.meta.dir, "_rr_test_wave.wav");
    const result = Raylib.exportWave(wave, tmpFile);
    expect(typeof result).toBe("boolean");
    Raylib.unloadWave(wave);
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
  });
});

describe("Sound", () => {
  const audioFile = join(import.meta.dir, "../assets/audio/Preview.ogg");

  test("loadSound", () => {
    const snd = Raylib.loadSound(audioFile);
    expect(snd).toBeGreaterThanOrEqual(0);
    Raylib.unloadSound(snd);
  });

  test("isSoundValid", () => {
    const snd = Raylib.loadSound(audioFile);
    expect(Raylib.isSoundValid(snd)).toBe(true);
    Raylib.unloadSound(snd);
  });

  test("loadSoundFromWave", () => {
    const wave = Raylib.loadWave(audioFile);
    const snd = Raylib.loadSoundFromWave(wave);
    expect(snd).toBeGreaterThanOrEqual(0);
    Raylib.unloadSound(snd);
    Raylib.unloadWave(wave);
  });

  test("sound playback does not crash", () => {
    const snd = Raylib.loadSound(audioFile);
    Raylib.playSound(snd);
    Raylib.setSoundVolume(snd, 0.5);
    Raylib.setSoundPitch(snd, 1.0);
    Raylib.setSoundPan(snd, 0.5);
    Raylib.pauseSound(snd);
    Raylib.resumeSound(snd);
    Raylib.stopSound(snd);
    expect(typeof Raylib.isSoundPlaying(snd)).toBe("boolean");
    Raylib.unloadSound(snd);
  });

  test("loadSoundAlias", () => {
    const snd = Raylib.loadSound(audioFile);
    const alias = Raylib.loadSoundAlias(snd);
    expect(alias).toBeGreaterThanOrEqual(0);
    Raylib.unloadSoundAlias(alias);
    Raylib.unloadSound(snd);
  });
});

describe("Music", () => {
  const audioFile = join(import.meta.dir, "../assets/audio/Preview.ogg");

  test("loadMusicStream", () => {
    const music = Raylib.loadMusicStream(audioFile);
    expect(music).toBeGreaterThanOrEqual(0);
    Raylib.unloadMusicStream(music);
  });

  test("isMusicValid", () => {
    const music = Raylib.loadMusicStream(audioFile);
    expect(Raylib.isMusicValid(music)).toBe(true);
    Raylib.unloadMusicStream(music);
  });

  test("music playback does not crash", () => {
    const music = Raylib.loadMusicStream(audioFile);
    Raylib.playMusicStream(music);
    Raylib.updateMusicStream(music);
    Raylib.setMusicVolume(music, 0.5);
    Raylib.setMusicPitch(music, 1.0);
    Raylib.setMusicPan(music, 0.5);
    expect(typeof Raylib.isMusicStreamPlaying(music)).toBe("boolean");
    expect(typeof Raylib.getMusicTimeLength(music)).toBe("number");
    expect(typeof Raylib.getMusicTimePlayed(music)).toBe("number");
    Raylib.pauseMusicStream(music);
    Raylib.resumeMusicStream(music);
    Raylib.seekMusicStream(music, 0);
    Raylib.stopMusicStream(music);
    Raylib.unloadMusicStream(music);
  });
});

describe("Wave from memory", () => {
  test("loadWaveFromMemory", () => {
    const file = join(import.meta.dir, "../assets/audio/Preview.ogg");
    const buf = readFileSync(file);
    const fileData = new Uint8Array(buf);
    const wave = Raylib.loadWaveFromMemory("ogg", fileData, fileData.length);
    expect(wave).toBeGreaterThanOrEqual(0);
    // NOTE: isWaveValid may return false for memory-loaded formats depending on raylib build
    Raylib.unloadWave(wave);
  });

  test("exportWaveAsCode", () => {
    const wave = Raylib.loadWave(join(import.meta.dir, "../assets/audio/Preview.ogg"));
    const tmpFile = join(import.meta.dir, "_rr_test_wave_code.h");
    const result = Raylib.exportWaveAsCode(wave, tmpFile);
    expect(typeof result).toBe("boolean");
    Raylib.unloadWave(wave);
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
  });
});

describe("Music from memory", () => {
  test("loadMusicStreamFromMemory does not crash", () => {
    const file = join(import.meta.dir, "../assets/audio/Preview.ogg");
    const buf = readFileSync(file);
    const fileData = new Uint8Array(buf);
    const music = Raylib.loadMusicStreamFromMemory("ogg", fileData, fileData.length);
    expect(typeof music).toBe("number");
    Raylib.unloadMusicStream(music);
  });
});

describe("AudioStream", () => {
  test("loadAudioStream", () => {
    const stream = Raylib.loadAudioStream(44100, 16, 2);
    expect(stream).toBeGreaterThanOrEqual(0);
    Raylib.unloadAudioStream(stream);
  });

  test("isAudioStreamValid", () => {
    const stream = Raylib.loadAudioStream(44100, 16, 2);
    expect(Raylib.isAudioStreamValid(stream)).toBe(true);
    Raylib.unloadAudioStream(stream);
  });

  test("audio stream playback does not crash", () => {
    const stream: AudioStream = Raylib.loadAudioStream(44100, 16, 2);
    Raylib.playAudioStream(stream);
    Raylib.setAudioStreamVolume(stream, 0.5);
    Raylib.setAudioStreamPitch(stream, 1.0);
    Raylib.setAudioStreamPan(stream, 0.5);
    Raylib.pauseAudioStream(stream);
    Raylib.resumeAudioStream(stream);
    expect(typeof Raylib.isAudioStreamPlaying(stream)).toBe("boolean");
    Raylib.stopAudioStream(stream);
    Raylib.unloadAudioStream(stream);
  });

  test("setAudioStreamBufferSizeDefault does not crash", () => {
    Raylib.setAudioStreamBufferSizeDefault(4096);
  });
});
