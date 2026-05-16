#ifndef COMMON_H
#define COMMON_H

#include <string.h>
#include <raylib.h>

static inline float i2f(int i) { float f; memcpy(&f, &i, sizeof(float)); return f; }

#ifndef CONFIG_H
#define MAX_MODELS 64
#define MAX_FONTS 32
#define MAX_IMAGES 128
#define MAX_MESHES 64
#define MAX_MATERIALS 32
#define MAX_ANIMATIONS 32
#define MAX_SHADERS 32
#define MAX_WAVES 32
#define MAX_SOUNDS 32
#define MAX_MUSIC 16
#define MAX_AUDIOSTREAMS 16
#endif

extern Model modelRegistry[MAX_MODELS];
extern bool modelUsed[MAX_MODELS];
int modelAlloc(void);

extern Font fontRegistry[MAX_FONTS];
extern bool fontUsed[MAX_FONTS];
int fontAlloc(void);

extern Image imageRegistry[MAX_IMAGES];
extern bool imageUsed[MAX_IMAGES];
int imageAlloc(void);

extern Mesh meshRegistry[MAX_MESHES];
extern bool meshUsed[MAX_MESHES];
int meshAlloc(void);

extern Material materialRegistry[MAX_MATERIALS];
extern bool materialUsed[MAX_MATERIALS];
int materialAlloc(void);

extern ModelAnimation animRegistry[MAX_ANIMATIONS];
extern bool animUsed[MAX_ANIMATIONS];
int animAlloc(void);

extern Shader shaderRegistry[MAX_SHADERS];
extern bool shaderUsed[MAX_SHADERS];
int shaderAlloc(void);

extern Wave waveRegistry[MAX_WAVES];
extern bool waveUsed[MAX_WAVES];
int waveAlloc(void);

extern Sound soundRegistry[MAX_SOUNDS];
extern bool soundUsed[MAX_SOUNDS];
int soundAlloc(void);

extern Music musicRegistry[MAX_MUSIC];
extern bool musicUsed[MAX_MUSIC];
int musicAlloc(void);

extern AudioStream audioStreamRegistry[MAX_AUDIOSTREAMS];
extern bool audioStreamUsed[MAX_AUDIOSTREAMS];
int audioStreamAlloc(void);

#endif
