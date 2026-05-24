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

