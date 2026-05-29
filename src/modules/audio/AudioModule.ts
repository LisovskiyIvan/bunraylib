import { getSymbols } from '../../symbols';
import { cstr, f, i } from '../../utils';
import type { Wave, Sound, Music, AudioStream } from '../../types';
const r = () => getSymbols();

export class AudioModule {
  static initAudioDevice(): void {
    r().symbols.InitAudioDevice();
  }
  static closeAudioDevice(): void {
    r().symbols.CloseAudioDevice();
  }
  static isAudioDeviceReady(): boolean {
    return r().symbols.IsAudioDeviceReady();
  }
  static setMasterVolume(volume: number): void {
    r().symbols.SetMasterVolume(f(volume));
  }
  static getMasterVolume(): number {
    return r().symbols.GetMasterVolume();
  }
  static loadWave(fileName: string): Wave {
    return r().symbols.LoadWaveW(cstr(fileName));
  }
  static loadWaveFromMemory(fileType: string, fileData: Uint8Array, dataSize: number): Wave {
    return r().symbols.LoadWaveFromMemoryW(cstr(fileType), fileData, i(dataSize));
  }
  static isWaveValid(wave: Wave): boolean {
    return r().symbols.IsWaveValidW(i(wave));
  }
  static unloadWave(wave: Wave): void {
    r().symbols.UnloadWaveW(i(wave));
  }
  static exportWave(wave: Wave, fileName: string): boolean {
    return r().symbols.ExportWaveW(i(wave), cstr(fileName));
  }
  static exportWaveAsCode(wave: Wave, fileName: string): boolean {
    return r().symbols.ExportWaveAsCodeW(i(wave), cstr(fileName));
  }
  static waveCopy(wave: Wave): Wave {
    return r().symbols.WaveCopyW(i(wave));
  }
  static waveCrop(wave: Wave, initFrame: number, finalFrame: number): void {
    r().symbols.WaveCropW(i(wave), i(initFrame), i(finalFrame));
  }
  static waveFormat(wave: Wave, sampleRate: number, sampleSize: number, channels: number): void {
    r().symbols.WaveFormatW(i(wave), i(sampleRate), i(sampleSize), i(channels));
  }
  static loadSound(fileName: string): Sound {
    return r().symbols.LoadSoundW(cstr(fileName));
  }
  static loadSoundFromWave(wave: Wave): Sound {
    return r().symbols.LoadSoundFromWaveW(i(wave));
  }
  static loadSoundAlias(source: Sound): Sound {
    return r().symbols.LoadSoundAliasW(i(source));
  }
  static isSoundValid(sound: Sound): boolean {
    return r().symbols.IsSoundValidW(i(sound));
  }
  static unloadSound(sound: Sound): void {
    r().symbols.UnloadSoundW(i(sound));
  }
  static unloadSoundAlias(alias: Sound): void {
    r().symbols.UnloadSoundAliasW(i(alias));
  }
  static playSound(sound: Sound): void {
    r().symbols.PlaySoundW(i(sound));
  }
  static stopSound(sound: Sound): void {
    r().symbols.StopSoundW(i(sound));
  }
  static pauseSound(sound: Sound): void {
    r().symbols.PauseSoundW(i(sound));
  }
  static resumeSound(sound: Sound): void {
    r().symbols.ResumeSoundW(i(sound));
  }
  static isSoundPlaying(sound: Sound): boolean {
    return r().symbols.IsSoundPlayingW(i(sound));
  }
  static setSoundVolume(sound: Sound, volume: number): void {
    r().symbols.SetSoundVolumeW(i(sound), f(volume));
  }
  static setSoundPitch(sound: Sound, pitch: number): void {
    r().symbols.SetSoundPitchW(i(sound), f(pitch));
  }
  static setSoundPan(sound: Sound, pan: number): void {
    r().symbols.SetSoundPanW(i(sound), f(pan));
  }
  static loadMusicStream(fileName: string): Music {
    return r().symbols.LoadMusicStreamW(cstr(fileName));
  }
  static loadMusicStreamFromMemory(fileType: string, data: Uint8Array, dataSize: number): Music {
    return r().symbols.LoadMusicStreamFromMemoryW(cstr(fileType), data, i(dataSize));
  }
  static isMusicValid(music: Music): boolean {
    return r().symbols.IsMusicValidW(i(music));
  }
  static unloadMusicStream(music: Music): void {
    r().symbols.UnloadMusicStreamW(i(music));
  }
  static playMusicStream(music: Music): void {
    r().symbols.PlayMusicStreamW(i(music));
  }
  static isMusicStreamPlaying(music: Music): boolean {
    return r().symbols.IsMusicStreamPlayingW(i(music));
  }
  static updateMusicStream(music: Music): void {
    r().symbols.UpdateMusicStreamW(i(music));
  }
  static stopMusicStream(music: Music): void {
    r().symbols.StopMusicStreamW(i(music));
  }
  static pauseMusicStream(music: Music): void {
    r().symbols.PauseMusicStreamW(i(music));
  }
  static resumeMusicStream(music: Music): void {
    r().symbols.ResumeMusicStreamW(i(music));
  }
  static seekMusicStream(music: Music, position: number): void {
    r().symbols.SeekMusicStreamW(i(music), f(position));
  }
  static setMusicVolume(music: Music, volume: number): void {
    r().symbols.SetMusicVolumeW(i(music), f(volume));
  }
  static setMusicPitch(music: Music, pitch: number): void {
    r().symbols.SetMusicPitchW(i(music), f(pitch));
  }
  static setMusicPan(music: Music, pan: number): void {
    r().symbols.SetMusicPanW(i(music), f(pan));
  }
  static getMusicTimeLength(music: Music): number {
    return r().symbols.GetMusicTimeLengthW(i(music));
  }
  static getMusicTimePlayed(music: Music): number {
    return r().symbols.GetMusicTimePlayedW(i(music));
  }
  static loadAudioStream(sampleRate: number, sampleSize: number, channels: number): AudioStream {
    return r().symbols.LoadAudioStreamW(i(sampleRate), i(sampleSize), i(channels));
  }
  static isAudioStreamValid(stream: AudioStream): boolean {
    return r().symbols.IsAudioStreamValidW(i(stream));
  }
  static unloadAudioStream(stream: AudioStream): void {
    r().symbols.UnloadAudioStreamW(i(stream));
  }
  static isAudioStreamProcessed(stream: AudioStream): boolean {
    return r().symbols.IsAudioStreamProcessedW(i(stream));
  }
  static playAudioStream(stream: AudioStream): void {
    r().symbols.PlayAudioStreamW(i(stream));
  }
  static pauseAudioStream(stream: AudioStream): void {
    r().symbols.PauseAudioStreamW(i(stream));
  }
  static resumeAudioStream(stream: AudioStream): void {
    r().symbols.ResumeAudioStreamW(i(stream));
  }
  static isAudioStreamPlaying(stream: AudioStream): boolean {
    return r().symbols.IsAudioStreamPlayingW(i(stream));
  }
  static stopAudioStream(stream: AudioStream): void {
    r().symbols.StopAudioStreamW(i(stream));
  }
  static setAudioStreamVolume(stream: AudioStream, volume: number): void {
    r().symbols.SetAudioStreamVolumeW(i(stream), f(volume));
  }
  static setAudioStreamPitch(stream: AudioStream, pitch: number): void {
    r().symbols.SetAudioStreamPitchW(i(stream), f(pitch));
  }
  static setAudioStreamPan(stream: AudioStream, pan: number): void {
    r().symbols.SetAudioStreamPanW(i(stream), f(pan));
  }
  static setAudioStreamBufferSizeDefault(size: number): void {
    r().symbols.SetAudioStreamBufferSizeDefault(i(size));
  }
  static loadWaveSamples(wave: Wave): number {
    return r().symbols.LoadWaveSamplesW(wave) as unknown as number;
  }
  static unloadWaveSamples(ptr: number): void {
    r().symbols.UnloadWaveSamplesW(ptr as unknown as Buffer);
  }
  static updateSound(sound: Sound, data: Buffer | Uint8Array, frameCount: number): void {
    r().symbols.UpdateSoundW(i(sound), data, i(frameCount));
  }
  static updateAudioStream(
    stream: AudioStream,
    data: Buffer | Uint8Array,
    frameCount: number,
  ): void {
    r().symbols.UpdateAudioStreamW(i(stream), data, i(frameCount));
  }
  static setAudioStreamCallback(stream: AudioStream, callback: number): void {
    r().symbols.SetAudioStreamCallbackW(i(stream), callback as unknown as Buffer);
  }
}
