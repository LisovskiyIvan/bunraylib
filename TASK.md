# TASK.md — План исправлений rraylib

Анализ от 2026-05-23. Содержит два раздела: функции на удаление (PROGRESS.md) и баги конверсии float для FFI (f2i/i2f).

---

## Часть 1: Функции для удаления из PROGRESS.md

### Общая статистика
- Всего функций: 548
- Реализовано: 500 (91.2%)
- Отсутствует: 48 (8.8%)

### 🔴 TIER 1 — Убрать навсегда (24 функции)

| # | Группа (кол-во) | Функции | Причина |
|---|-----------------|---------|---------|
| 1 | VR Stereo Mode (4) | `BeginVrStereoMode`, `EndVrStereoMode`, `LoadVrStereoConfig`, `UnloadVrStereoConfig` | Требует Oculus Rift, нишевое |
| 2 | Automation Events (8) | `LoadAutomationEventList`, `UnloadAutomationEventList`, `ExportAutomationEventList`, `SetAutomationEventList`, `SetAutomationEventBaseFrame`, `StartAutomationEventRecording`, `StopAutomationEventRecording`, `PlayAutomationEvent` | Только для тестирования, не для runtime |
| 3 | File Callbacks (5) | `SetTraceLogCallback`, `SetLoadFileDataCallback`, `SetSaveFileDataCallback`, `SetLoadFileTextCallback`, `SetSaveFileTextCallback` | В JS/TS file I/O делается на уровне приложения |
| 4 | File Drag-Drop (3) | `IsFileDropped`, `LoadDroppedFiles`, `UnloadDroppedFiles` | Desktop-only |
| 5 | Audio Processors (4) | `AttachAudioStreamProcessor`, `DetachAudioStreamProcessor`, `AttachAudioMixedProcessor`, `DetachAudioMixedProcessor` | Нишевый audio pipeline, коллбэки через FFI |

### 🟡 TIER 2 — Отложить (19 функций)

| # | Группа (кол-во) | Причина |
|---|-----------------|---------|
| 6 | Filesystem Utils (11) | `FileRename`, `FileRemove`, `FileCopy`, `FileMove`, `FileTextReplace`, `FileTextFindIndex`, `LoadDirectoryFiles`, `LoadDirectoryFilesEx`, `UnloadDirectoryFiles`, `GetDirectoryFileCount`, `GetDirectoryFileCountEx` — в Bun/Node есть `fs.*` |
| 7 | Shader Value (2) | `SetShaderValue`, `SetShaderValueV` — полезны, но `void*` параметры сложны для FFI |
| 8 | Audio Callbacks (3) | `UpdateSound`, `UpdateAudioStream`, `SetAudioStreamCallback` |
| 9 | Font/Text Utils (3) | `GenImageFontAtlas`, `MeasureTextCodepoints`, `UnloadTextLines` |

### 🟢 TIER 3 — Реализовать (5 функций)

| # | Группа (кол-во) | Функции |
|---|-----------------|---------|
| 10 | Drawing Shapes (3) | `DrawLineDashed`, `DrawEllipseV`, `DrawEllipseLinesV` |
| 11 | 3D Mesh (2) | `DrawMesh`, `DrawMeshInstanced` |

### Эффект от удаления TIER 1
Core модуль: 114/147 (77.6%) → **145/147 (98.6%)**
Общий прогресс: 500/548 (91.2%) → **524/548 (95.6%)**

---

## Часть 2: Баги конверсии float для FFI (f2i/i2f)

### Как работает правильная конверсия

```c
// common.h — C сторона
static inline float i2f(int i) { float f; memcpy(&f, &i, sizeof(float)); return f; }
```

```ts
// utils.ts — TS сторона
f2i(val): Float32Array[0]=val → Uint32Array[0] (float→int битово)
i2f(val): Uint32Array[0]=val → Float32Array[0] (int→float битово)
```

### Эталонный паттерн (audio модуль — правильный)

| Уровень | Код |
|---------|------|
| C (параметр) | `void SetMasterVolumeW(int volume) { float f; memcpy(&f, &volume, sizeof(float)); SetMasterVolume(f); }` |
| C (возврат) | `int GetMasterVolumeW() { float f = GetMasterVolume(); int i; memcpy(&i, &f, sizeof(float)); return i; }` |
| Symbols (параметр) | `SetMasterVolumeW: { args: [i32], returns: void }` |
| Symbols (возврат) | `GetMasterVolumeW: { args: [], returns: i32 }` |
| TS (параметр) | `setMasterVolume(volume)` → `f2i(volume)` |
| TS (возврат) | `getMasterVolume()` → `i2f(r().symbols.GetMasterVolumeW())` |

### 🐛 Проблема 1: `f32` в symbols (14 вхождений, 4 файла)

**`f32` НЕ ДОЛЖЕН использоваться в FFI-определениях.** Все float-значения идут через `i32` + битовую конверсию.

| Файл | Строка | Символ | Исправить на |
|------|--------|--------|-------------|
| `src/symbols/window.ts` | 12 | `GetFrameTimeW: { args: [], returns: f32 }` | `returns: i32` |
| `src/symbols/window.ts` | 35 | `SetWindowOpacityW: { args: [f32] }` | `args: [i32]` |
| `src/symbols/camera.ts` | 14 | `UpdateCameraProW: { args: [..., f32, f32, f32, f32, f32, f32, f32] }` | все 7 `f32` → `i32` |
| `src/symbols/font.ts` | 33 | `TextToFloatW: { args: [cstring], returns: f32 }` | `returns: i32` |
| `src/symbols/input.ts` | 21 | `GetGamepadAxisMovementW: { ..., returns: f32 }` | `returns: i32` |
| `src/symbols/input.ts` | 23 | `SetGamepadVibrationW: { args: [i32, f32, f32, f32] }` | 3 `f32` → `i32` |
| `src/symbols/input.ts` | 35 | `GetMouseWheelMoveW: { args: [], returns: f32 }` | `returns: i32` |
| `src/symbols/input.ts` | 46 | `GetGestureHoldDurationW: { args: [], returns: f32 }` | `returns: i32` |
| `src/symbols/input.ts` | 48 | `GetGestureDragAngleW: { args: [], returns: f32 }` | `returns: i32` |
| `src/symbols/input.ts` | 50 | `GetGesturePinchAngleW: { args: [], returns: f32 }` | `returns: i32` |

Также нужно убрать `f32` из destructuring в этих файлах:
- `window.ts:2` — убрать `f32` из `const { i32, cstring, bool, f32, ptr }`
- `camera.ts:2` — убрать `f32` из `const { i32, ptr, f32 }`
- `font.ts:2` — убрать `f32` из `const { i32, cstring, bool, f32, ptr }`
- `input.ts:2` — убрать `f32` из `const { i32, cstring, bool, f32, ptr }`

### 🐛 Проблема 2: C-обёртки принимают `float` вместо `int` (3 функции)

| Файл | Строка | Текущий код | Исправить на |
|------|--------|-------------|-------------|
| `src/c/window.c` | 58 | `void SetWindowOpacityW(float opacity) { SetWindowOpacity(i2f(opacity)); }` | `void SetWindowOpacityW(int opacity) { float f; memcpy(&f, &opacity, sizeof(float)); SetWindowOpacity(f); }` |
| `src/c/input.c` | 23 | `void SetGamepadVibrationW(int gp, float l, float r, float d) { SetGamepadVibration(gp, l, r, d); }` | Все 3 `float` → `int` + `memcpy` → `float` + вызов raylib |
| `src/c/camera.c` | 37-38 | `void UpdateCameraProW(..., float mx, ..., float zoom)` | Все 7 `float` → `int` + `memcpy` → `float` для каждого |

### 🐛 Проблема 3: C-обёртки возвращают `float` вместо `int` (7 функций)

Нужно возвращать `int` через `memcpy` (по образцу `GetMasterVolumeW` в `audio.c`):

| Файл | Строка | Функция | Исправить на |
|------|--------|---------|-------------|
| `src/c/window.c` | 31 | `float GetFrameTimeW()` | `int GetFrameTimeW() { float f = GetFrameTime(); int i; memcpy(&i, &f, sizeof(float)); return i; }` |
| `src/c/input.c` | 20 | `float GetGamepadAxisMovementW()` | Аналогично `GetMasterVolumeW` паттерну |
| `src/c/input.c` | 48 | `float GetMouseWheelMoveW()` | Аналогично |
| `src/c/input.c` | 71 | `float GetGestureHoldDurationW()` | Аналогично |
| `src/c/input.c` | 78 | `float GetGestureDragAngleW()` | Аналогично |
| `src/c/input.c` | 85 | `float GetGesturePinchAngleW()` | Аналогично |
| `src/c/font.c` | 144 | `float TextToFloatW()` | Аналогично |

### 🐛 Проблема 4: TS — отсутствует `i2f()` на возвращаемых float-значениях (7 функций)

После исправления symbols с `f32` на `i32`, эти функции сломаются:

| `src/Raylib.ts` | Строка | Текущий код | Исправить на |
|-----------------|--------|-------------|-------------|
| 130 | `getFrameTime()` | `r().symbols.GetFrameTimeW()` | `i2f(r().symbols.GetFrameTimeW())` |
| 1610 | `getGamepadAxisMovement()` | `r().symbols.GetGamepadAxisMovementW(gp, ax)` | `i2f(r().symbols.GetGamepadAxisMovementW(gp, ax))` |
| 1657 | `getMouseWheelMove()` | `r().symbols.GetMouseWheelMoveW()` | `i2f(r().symbols.GetMouseWheelMoveW())` |
| 1702 | `getGestureHoldDuration()` | `r().symbols.GetGestureHoldDurationW()` | `i2f(r().symbols.GetGestureHoldDurationW())` |
| 1711 | `getGestureDragAngle()` | `r().symbols.GetGestureDragAngleW()` | `i2f(r().symbols.GetGestureDragAngleW())` |
| 1720 | `getGesturePinchAngle()` | `r().symbols.GetGesturePinchAngleW()` | `i2f(r().symbols.GetGesturePinchAngleW())` |
| 3642 | `textToFloat()` | `r().symbols.TextToFloatW(cstr(text))` | `i2f(r().symbols.TextToFloatW(cstr(text)))` |

**Уже правильно сделано (для справки):**
- `getMasterVolume()` (3357) — `i2f(r().symbols.GetMasterVolumeW())` ✓
- `getMusicTimeLength()` (3480) — `i2f(r().symbols.GetMusicTimeLengthW(music))` ✓
- `getMusicTimePlayed()` (3483) — `i2f(r().symbols.GetMusicTimePlayedW(music))` ✓

### 🐛 Проблема 5: TS — отсутствует `f2i()` на float-параметрах (9 параметров в 2 функциях)

| `src/Raylib.ts` | Строка | Функция | Параметры без `f2i()` |
|-----------------|--------|---------|----------------------|
| 2247 | `setGamepadVibration()` | `leftMotor`, `rightMotor`, `duration` (3 параметра) |
| 1753-1758 | `updateCameraPro()` | `movement.x`, `movement.y`, `movement.z`, `rotation.x`, `rotation.y`, `rotation.z` (6 параметров) |

`updateCameraPro` использует `f2i(zoom)` но не для остальных 6 float-параметров — неконсистентно.

### 🐛 Проблема 6: Синтаксическая ошибка в `Raylib.ts`

**Строка 2319:**
```ts
// ОШИБКА (пропущен this.)
return { x: this._vec2Buf[0]!, y: _vec2Buf[1]! };
// ИСПРАВИТЬ
return { x: this._vec2Buf[0]!, y: this._vec2Buf[1]! };
```

### ⚠️ Проблема 7: Стилистические неконсистентности (~30+ мест)

Многие функции передают number-параметры без `| 0`. Это не баги (bun:ffi сам обрезает до i32), но неконсистентно с остальным кодом.

Примеры:
- `drawTexture()` (1913): `posX`, `posY` — без `| 0`
- `getWorldToScreen2D()` (1822-1827): `position.x`, `camera.offset.x` — без `| 0`
- `drawTexturePro()` (1962-1971): поля rect — без `| 0`
- `imageFromImage()` (2603): `rec.x/y/width/height` — без `| 0`

### Сводка по категориям багов

| Категория | Кол-во | Компоненты |
|-----------|:------:|------------|
| `f32` в symbols → `i32` | 14 | window.ts(2), camera.ts(1), font.ts(1), input.ts(7) + 4 импорта |
| C: `float` параметр → `int` + `memcpy` | 11 параметров | window.c(1), input.c(3), camera.c(7) |
| C: `float` возврат → `int` + `memcpy` | 7 функций | window.c(1), input.c(5), font.c(1) |
| TS: добавить `i2f()` на возврат | 7 функций | Raylib.ts |
| TS: добавить `f2i()` на параметры | 9 параметров | Raylib.ts(2 функции) |
| Синтаксическая ошибка | 1 | Raylib.ts:2319 |
| Стилистика (нет `\| 0`) | ~30+ | Raylib.ts |

---

## Порядок исправлений

### Этап A: C-обёртки (src/c/*.c)
1. `window.c:31,58` — `GetFrameTimeW` возврат, `SetWindowOpacityW` параметр
2. `input.c:20,23,48,71,78,85` — все float возвраты и параметры `SetGamepadVibration`
3. `camera.c:37-38` — все float параметры `UpdateCameraProW`
4. `font.c:144` — `TextToFloatW` возврат

### Этап B: Symbols (src/symbols/*.ts)
5. `window.ts` — заменить `f32` на `i32`, убрать из импорта
6. `camera.ts` — заменить `f32` на `i32`, убрать из импорта
7. `font.ts` — заменить `f32` на `i32`, убрать из импорта
8. `input.ts` — заменить `f32` на `i32`, убрать из импорта

### Этап C: Raylib.ts
9. Добавить `i2f()` на 7 возвратов (строки 130, 1610, 1657, 1702, 1711, 1720, 3642)
10. Добавить `f2i()` на 9 параметров (строки 2247, 1753-1758)
11. Исправить синтаксическую ошибку на строке 2319
12. (Опционально) Добавить `| 0` для консистентности в ~30+ местах

### Этап D: PROGRESS.md
13. Пометить 24 функции TIER 1 как "WONTFIX" или убрать из отслеживания
14. Приоритезировать 5 функций TIER 3 для реализации
