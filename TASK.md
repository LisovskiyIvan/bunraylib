# TASK.md — План исправлений rraylib

Анализ от 2026-05-23. Содержит два раздела: функции на удаление (PROGRESS.md) и архитектура float-конверсии для FFI.

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

## Часть 2: Архитектура float-конверсии для FFI

### ✅ Новая архитектура (реализована 2026-05-23)

Старый подход (f2i/i2f с битовой конверсией через typed arrays и int) полностью заменён на прямое использование
float/double типов с принудительной heap-аллокацией числа на стороне TypeScript.

### Три слоя

| Уровень | Паттерн |
|---------|---------|
| **C wrapper** | Принимает и возвращает настоящие `float` / `double`. Никаких `memcpy`, никаких `int`. |
| **Symbols (FFI defs)** | Использует `f32` / `f64` из `FFIType` для float/double параметров и возвратов. |
| **TypeScript** | `F(n: number): number { return n + 1e-300 - 1e-300; }` — принудительная heap-аллокация double, убивает SMI-encoding в V8 без изменения значения. |

### Эталонный паттерн

| Уровень | Код |
|---------|------|
| C (параметр) | `void SetMasterVolumeW(float volume) { SetMasterVolume(volume); }` |
| C (возврат) | `float GetMasterVolumeW() { return GetMasterVolume(); }` |
| Symbols (параметр) | `SetMasterVolumeW: { args: [f32], returns: void }` |
| Symbols (возврат) | `GetMasterVolumeW: { args: [], returns: f32 }` |
| TS (параметр) | `setMasterVolume(volume)` → `F(volume)` |
| TS (возврат) | `getMasterVolume()` → `r().symbols.GetMasterVolumeW()` (без обёрток) |

### Почему F() работает

```ts
function F(n: number): number { return n + 1e-300 - 1e-300; }
```

V8 хранит small integers (SMI) как 31-битное целое в указателе, без heap-аллокации.
Операция `+ 1e-300` принуждает V8 создать heap-аллоцированный double, даже для целых чисел.
Вычитание `- 1e-300` возвращает исходное значение. Результат: число остаётся тем же,
но гарантированно имеет 64-битное IEEE 754 представление в куче, которое bun:ffi
корректно читает при маршалинге в `f32`/`f64`.

### Какие типы используются

| Тип C | Symbol type | TS side |
|-------|-------------|---------|
| `int` / `unsigned int` | `i32` | передаётся как есть (integer) |
| `float` | `f32` | `F(value)` |
| `double` | `f64` | `F(value)` (или напрямую, F универсален) |
| `bool` | `bool` | передаётся как есть |
| `const char*` | `cstring` | `cstr(value)` |
| `float*` / `void*` | `ptr` | `Float32Array` / `Uint8Array` buffer |

### Что было изменено

| Компонент | Что сделано |
|-----------|-------------|
| `src/utils.ts` | Удалены `f2i`/`i2f` (typed-array битовая конверсия). Добавлен `F(n)`. |
| `src/c/common.h` | Удалён `static inline float i2f(int i)`. |
| `src/c/*.c` (все 14 файлов) | Все `int` параметры для float значений заменены на `float`/`double`. Удалены все `memcpy`/`i2f()` вызовы. Возвращаемые типы `int` заменены на `float`/`double`. |
| `src/symbols/*.ts` (все 12 файлов) | Все `i32` для float параметров/возвратов заменены на `f32`/`f64`. Добавлены импорты `f32`/`f64` из `FFIType`. |
| `src/Raylib.ts` | ~698 вызовов `f2i(x)` заменены на `F(x)`. 3 вызова `i2f(...)` (getMasterVolume, getMusicTimeLength, getMusicTimePlayed) удалены. Импорт изменён с `f2i, i2f` на `F`. |
