import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { Raylib } from "../src";
import { join } from "path";
import { writeFileSync, unlinkSync, existsSync, mkdirSync, rmSync } from "fs";

beforeAll(() => {
  Raylib.initWindow(100, 100, "Filesystem Test");
  Raylib.setTargetFPS(60);
});

afterAll(() => {
  Raylib.closeWindow();
});

describe("File info", () => {
  test("fileExists returns true for existing file", () => {
    expect(Raylib.fileExists(join(import.meta.dir, "../assets/fonts/test.ttf"))).toBe(true);
  });

  test("fileExists returns false for missing file", () => {
    expect(Raylib.fileExists("/nonexistent/file.txt")).toBe(false);
  });

  test("directoryExists returns true for existing dir", () => {
    expect(Raylib.directoryExists(join(import.meta.dir, "../assets"))).toBe(true);
  });

  test("directoryExists returns false for missing dir", () => {
    expect(Raylib.directoryExists("/nonexistent/dir")).toBe(false);
  });

  test("isFileExtension", () => {
    expect(Raylib.isFileExtension("test.png", ".png")).toBe(true);
    expect(Raylib.isFileExtension("test.txt", ".png")).toBe(false);
  });

  test("getFileLength", () => {
    const len = Raylib.getFileLength(join(import.meta.dir, "../assets/fonts/test.ttf"));
    expect(len).toBeGreaterThan(0);
  });

  test("isPathFile", () => {
    expect(Raylib.isPathFile(join(import.meta.dir, "../assets/fonts/test.ttf"))).toBe(true);
  });

  test("isFileNameValid", () => {
    expect(Raylib.isFileNameValid("test.txt")).toBe(true);
  });
});

describe("File path utils", () => {
  test("getFileExtension", () => {
    expect(Raylib.getFileExtension("image.png")).toBe(".png");
    expect(Raylib.getFileExtension("archive.tar.gz")).toBe(".gz");
    expect(Raylib.getFileExtension("noext")).toBe("");
  });

  test("getFileName", () => {
    expect(Raylib.getFileName("/path/to/file.txt")).toBe("file.txt");
  });

  test("getFileNameWithoutExt", () => {
    expect(Raylib.getFileNameWithoutExt("/path/to/file.txt")).toBe("file");
  });

  test("getDirectoryPath", () => {
    expect(Raylib.getDirectoryPath("/path/to/file.txt")).toBe("/path/to");
  });

  test("getWorkingDirectory", () => {
    const cwd = Raylib.getWorkingDirectory();
    expect(typeof cwd).toBe("string");
    expect(cwd.length).toBeGreaterThan(0);
  });

  test("getApplicationDirectory", () => {
    const appDir = Raylib.getApplicationDirectory();
    expect(typeof appDir).toBe("string");
  });
});

describe("File text I/O", () => {
  const tmpFile = join(import.meta.dir, "_rr_test_file.txt");

  afterAll(() => {
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
  });

  test("saveFileText + loadFileText roundtrip", () => {
    const content = "Hello from rraylib test!";
    const saved = Raylib.saveFileText(tmpFile, content);
    expect(saved).toBe(true);
    const loaded = Raylib.loadFileText(tmpFile);
    expect(loaded).toBe(content);
  });

  test("loadFileText returns empty for missing file", () => {
    const text = Raylib.loadFileText("/nonexistent/file.txt");
    expect(text).toBe("");
  });
});

describe("File binary I/O", () => {
  const tmpFile = join(import.meta.dir, "_rr_test_binary.bin");

  afterAll(() => {
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
  });

  test("saveFileData + binary roundtrip", () => {
    const data = new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF, 0x42]);
    const saved = Raylib.saveFileData(tmpFile, data);
    expect(saved).toBe(true);
    expect(existsSync(tmpFile)).toBe(true);
  });
});

describe("Directory operations", () => {
  const tmpDir = join(import.meta.dir, "_rr_test_dir");

  afterAll(() => {
    if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true });
  });

  test("makeDirectory", () => {
    const result = Raylib.makeDirectory(tmpDir);
    expect(result).toBe(0);
    expect(existsSync(tmpDir)).toBe(true);
  });
});

describe("computeCRC32", () => {
  test("CRC32 of known data", () => {
    const data = new Uint8Array([1, 2, 3, 4, 5]);
    const crc = Raylib.computeCRC32(data, data.length);
    expect(typeof crc).toBe("number");
    expect(crc).not.toBe(0);
  });
});

describe("exportDataAsCode", () => {
  const tmpFile = join(import.meta.dir, "_rr_test_export.h");

  afterAll(() => {
    if (existsSync(tmpFile)) unlinkSync(tmpFile);
  });

  test("exports binary data as C header", () => {
    const data = new Uint8Array([0x00, 0x01, 0x02, 0x03]);
    const result = Raylib.exportDataAsCode(data, tmpFile);
    expect(result).toBe(true);
    expect(existsSync(tmpFile)).toBe(true);
  });
});

describe("getFileModTime", () => {
  test("returns positive timestamp for existing file", () => {
    const t = Raylib.getFileModTime(join(import.meta.dir, "../assets/fonts/test.ttf"));
    expect(t).toBeGreaterThan(0);
  });
});
