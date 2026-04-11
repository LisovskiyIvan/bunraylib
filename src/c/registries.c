#include "common.h"

Model modelRegistry[MAX_MODELS] = {0};
bool modelUsed[MAX_MODELS] = {0};

int modelAlloc(void) {
    for (int i = 0; i < MAX_MODELS; i++) {
        if (!modelUsed[i]) { modelUsed[i] = true; return i; }
    }
    return -1;
}

Font fontRegistry[MAX_FONTS] = {0};
bool fontUsed[MAX_FONTS] = {0};

int fontAlloc(void) {
    for (int i = 0; i < MAX_FONTS; i++) {
        if (!fontUsed[i]) { fontUsed[i] = true; return i; }
    }
    return -1;
}

Image imageRegistry[MAX_IMAGES];
bool imageUsed[MAX_IMAGES] = {0};

int imageAlloc(void) {
    for (int i = 0; i < MAX_IMAGES; i++) {
        if (!imageUsed[i]) { imageUsed[i] = true; return i; }
    }
    return -1;
}

Mesh meshRegistry[MAX_MESHES];
bool meshUsed[MAX_MESHES] = {0};

int meshAlloc(void) {
    for (int i = 0; i < MAX_MESHES; i++) {
        if (!meshUsed[i]) { meshUsed[i] = true; return i; }
    }
    return -1;
}

Material materialRegistry[MAX_MATERIALS];
bool materialUsed[MAX_MATERIALS] = {0};

int materialAlloc(void) {
    for (int i = 0; i < MAX_MATERIALS; i++) {
        if (!materialUsed[i]) { materialUsed[i] = true; return i; }
    }
    return -1;
}

ModelAnimation animRegistry[MAX_ANIMATIONS];
bool animUsed[MAX_ANIMATIONS] = {0};

int animAlloc(void) {
    for (int i = 0; i < MAX_ANIMATIONS; i++) {
        if (!animUsed[i]) { animUsed[i] = true; return i; }
    }
    return -1;
}

Shader shaderRegistry[MAX_SHADERS];
bool shaderUsed[MAX_SHADERS] = {0};

int shaderAlloc(void) {
    for (int i = 0; i < MAX_SHADERS; i++) {
        if (!shaderUsed[i]) { shaderUsed[i] = true; return i; }
    }
    return -1;
}

Wave waveRegistry[MAX_WAVES] = {0};
bool waveUsed[MAX_WAVES] = {0};

int waveAlloc(void) {
    for (int i = 0; i < MAX_WAVES; i++) {
        if (!waveUsed[i]) { waveUsed[i] = true; return i; }
    }
    return -1;
}

Sound soundRegistry[MAX_SOUNDS] = {0};
bool soundUsed[MAX_SOUNDS] = {0};

int soundAlloc(void) {
    for (int i = 0; i < MAX_SOUNDS; i++) {
        if (!soundUsed[i]) { soundUsed[i] = true; return i; }
    }
    return -1;
}

Music musicRegistry[MAX_MUSIC] = {0};
bool musicUsed[MAX_MUSIC] = {0};

int musicAlloc(void) {
    for (int i = 0; i < MAX_MUSIC; i++) {
        if (!musicUsed[i]) { musicUsed[i] = true; return i; }
    }
    return -1;
}

AudioStream audioStreamRegistry[MAX_AUDIOSTREAMS] = {0};
bool audioStreamUsed[MAX_AUDIOSTREAMS] = {0};

int audioStreamAlloc(void) {
    for (int i = 0; i < MAX_AUDIOSTREAMS; i++) {
        if (!audioStreamUsed[i]) { audioStreamUsed[i] = true; return i; }
    }
    return -1;
}
