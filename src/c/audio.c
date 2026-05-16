#include "common.h"

void InitAudioDeviceW() {
    InitAudioDevice();
}

void CloseAudioDeviceW() {
    CloseAudioDevice();
}

bool IsAudioDeviceReadyW() {
    return IsAudioDeviceReady();
}

void SetMasterVolumeW(int volume) {
    float f;
    memcpy(&f, &volume, sizeof(float));
    SetMasterVolume(f);
}

int GetMasterVolumeW() {
    float f = GetMasterVolume();
    int i;
    memcpy(&i, &f, sizeof(float));
    return i;
}

int LoadWaveW(const char* fileName) {
    int slot = waveAlloc();
    if (slot < 0) return -1;
    waveRegistry[slot] = LoadWave(fileName);
    return slot;
}

int LoadWaveFromMemoryW(const char* fileType, const unsigned char* fileData, int dataSize) {
    int slot = waveAlloc();
    if (slot < 0) return -1;
    waveRegistry[slot] = LoadWaveFromMemory(fileType, fileData, dataSize);
    return slot;
}

bool IsWaveValidW(int id) {
    if (id < 0 || id >= MAX_WAVES || !waveUsed[id]) return false;
    return IsWaveValid(waveRegistry[id]);
}

void UnloadWaveW(int id) {
    if (id < 0 || id >= MAX_WAVES || !waveUsed[id]) return;
    UnloadWave(waveRegistry[id]);
    waveUsed[id] = false;
}

bool ExportWaveW(int id, const char* fileName) {
    if (id < 0 || id >= MAX_WAVES || !waveUsed[id]) return false;
    return ExportWave(waveRegistry[id], fileName);
}

bool ExportWaveAsCodeW(int id, const char* fileName) {
    if (id < 0 || id >= MAX_WAVES || !waveUsed[id]) return false;
    return ExportWaveAsCode(waveRegistry[id], fileName);
}

int WaveCopyW(int id) {
    if (id < 0 || id >= MAX_WAVES || !waveUsed[id]) return -1;
    int slot = waveAlloc();
    if (slot < 0) return -1;
    waveRegistry[slot] = WaveCopy(waveRegistry[id]);
    return slot;
}

void WaveCropW(int id, int initFrame, int finalFrame) {
    if (id < 0 || id >= MAX_WAVES || !waveUsed[id]) return;
    WaveCrop(&waveRegistry[id], initFrame, finalFrame);
}

void WaveFormatW(int id, int sampleRate, int sampleSize, int channels) {
    if (id < 0 || id >= MAX_WAVES || !waveUsed[id]) return;
    WaveFormat(&waveRegistry[id], sampleRate, sampleSize, channels);
}

int LoadSoundW(const char* fileName) {
    int slot = soundAlloc();
    if (slot < 0) return -1;
    soundRegistry[slot] = LoadSound(fileName);
    return slot;
}

int LoadSoundFromWaveW(int waveId) {
    if (waveId < 0 || waveId >= MAX_WAVES || !waveUsed[waveId]) return -1;
    int slot = soundAlloc();
    if (slot < 0) return -1;
    soundRegistry[slot] = LoadSoundFromWave(waveRegistry[waveId]);
    return slot;
}

int LoadSoundAliasW(int sourceId) {
    if (sourceId < 0 || sourceId >= MAX_SOUNDS || !soundUsed[sourceId]) return -1;
    int slot = soundAlloc();
    if (slot < 0) return -1;
    soundRegistry[slot] = LoadSoundAlias(soundRegistry[sourceId]);
    return slot;
}

bool IsSoundValidW(int id) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return false;
    return IsSoundValid(soundRegistry[id]);
}

void UnloadSoundW(int id) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return;
    UnloadSound(soundRegistry[id]);
    soundUsed[id] = false;
}

void UnloadSoundAliasW(int id) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return;
    UnloadSoundAlias(soundRegistry[id]);
    soundUsed[id] = false;
}

void PlaySoundW(int id) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return;
    PlaySound(soundRegistry[id]);
}

void StopSoundW(int id) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return;
    StopSound(soundRegistry[id]);
}

void PauseSoundW(int id) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return;
    PauseSound(soundRegistry[id]);
}

void ResumeSoundW(int id) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return;
    ResumeSound(soundRegistry[id]);
}

bool IsSoundPlayingW(int id) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return false;
    return IsSoundPlaying(soundRegistry[id]);
}

void SetSoundVolumeW(int id, int volume) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return;
    float f;
    memcpy(&f, &volume, sizeof(float));
    SetSoundVolume(soundRegistry[id], f);
}

void SetSoundPitchW(int id, int pitch) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return;
    float f;
    memcpy(&f, &pitch, sizeof(float));
    SetSoundPitch(soundRegistry[id], f);
}

void SetSoundPanW(int id, int pan) {
    if (id < 0 || id >= MAX_SOUNDS || !soundUsed[id]) return;
    float f;
    memcpy(&f, &pan, sizeof(float));
    SetSoundPan(soundRegistry[id], f);
}

int LoadMusicStreamW(const char* fileName) {
    int slot = musicAlloc();
    if (slot < 0) return -1;
    musicRegistry[slot] = LoadMusicStream(fileName);
    return slot;
}

int LoadMusicStreamFromMemoryW(const char* fileType, const unsigned char* data, int dataSize) {
    int slot = musicAlloc();
    if (slot < 0) return -1;
    musicRegistry[slot] = LoadMusicStreamFromMemory(fileType, data, dataSize);
    return slot;
}

bool IsMusicValidW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return false;
    return IsMusicValid(musicRegistry[id]);
}

void UnloadMusicStreamW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    UnloadMusicStream(musicRegistry[id]);
    musicUsed[id] = false;
}

void PlayMusicStreamW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    PlayMusicStream(musicRegistry[id]);
}

bool IsMusicStreamPlayingW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return false;
    return IsMusicStreamPlaying(musicRegistry[id]);
}

void UpdateMusicStreamW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    UpdateMusicStream(musicRegistry[id]);
}

void StopMusicStreamW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    StopMusicStream(musicRegistry[id]);
}

void PauseMusicStreamW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    PauseMusicStream(musicRegistry[id]);
}

void ResumeMusicStreamW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    ResumeMusicStream(musicRegistry[id]);
}

void SeekMusicStreamW(int id, int position) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    float f;
    memcpy(&f, &position, sizeof(float));
    SeekMusicStream(musicRegistry[id], f);
}

void SetMusicVolumeW(int id, int volume) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    float f;
    memcpy(&f, &volume, sizeof(float));
    SetMusicVolume(musicRegistry[id], f);
}

void SetMusicPitchW(int id, int pitch) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    float f;
    memcpy(&f, &pitch, sizeof(float));
    SetMusicPitch(musicRegistry[id], f);
}

void SetMusicPanW(int id, int pan) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return;
    float f;
    memcpy(&f, &pan, sizeof(float));
    SetMusicPan(musicRegistry[id], f);
}

int GetMusicTimeLengthW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return 0;
    float f = GetMusicTimeLength(musicRegistry[id]);
    int i;
    memcpy(&i, &f, sizeof(float));
    return i;
}

int GetMusicTimePlayedW(int id) {
    if (id < 0 || id >= MAX_MUSIC || !musicUsed[id]) return 0;
    float f = GetMusicTimePlayed(musicRegistry[id]);
    int i;
    memcpy(&i, &f, sizeof(float));
    return i;
}

int LoadAudioStreamW(unsigned int sampleRate, unsigned int sampleSize, unsigned int channels) {
    int slot = audioStreamAlloc();
    if (slot < 0) return -1;
    audioStreamRegistry[slot] = LoadAudioStream(sampleRate, sampleSize, channels);
    return slot;
}

bool IsAudioStreamValidW(int id) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return false;
    return IsAudioStreamValid(audioStreamRegistry[id]);
}

void UnloadAudioStreamW(int id) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return;
    UnloadAudioStream(audioStreamRegistry[id]);
    audioStreamUsed[id] = false;
}

bool IsAudioStreamProcessedW(int id) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return false;
    return IsAudioStreamProcessed(audioStreamRegistry[id]);
}

void PlayAudioStreamW(int id) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return;
    PlayAudioStream(audioStreamRegistry[id]);
}

void PauseAudioStreamW(int id) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return;
    PauseAudioStream(audioStreamRegistry[id]);
}

void ResumeAudioStreamW(int id) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return;
    ResumeAudioStream(audioStreamRegistry[id]);
}

bool IsAudioStreamPlayingW(int id) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return false;
    return IsAudioStreamPlaying(audioStreamRegistry[id]);
}

void StopAudioStreamW(int id) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return;
    StopAudioStream(audioStreamRegistry[id]);
}

void SetAudioStreamVolumeW(int id, int volume) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return;
    float f;
    memcpy(&f, &volume, sizeof(float));
    SetAudioStreamVolume(audioStreamRegistry[id], f);
}

void SetAudioStreamPitchW(int id, int pitch) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return;
    float f;
    memcpy(&f, &pitch, sizeof(float));
    SetAudioStreamPitch(audioStreamRegistry[id], f);
}

void SetAudioStreamPanW(int id, int pan) {
    if (id < 0 || id >= MAX_AUDIOSTREAMS || !audioStreamUsed[id]) return;
    float f;
    memcpy(&f, &pan, sizeof(float));
    SetAudioStreamPan(audioStreamRegistry[id], f);
}

void SetAudioStreamBufferSizeDefaultW(int size) {
    SetAudioStreamBufferSizeDefault(size);
}

float* LoadWaveSamplesW(int waveId) {
    if (waveId < 0 || waveId >= MAX_WAVES || !waveUsed[waveId]) return NULL;
    return LoadWaveSamples(waveRegistry[waveId]);
}

void UnloadWaveSamplesW(float* samples) { UnloadWaveSamples(samples); }
