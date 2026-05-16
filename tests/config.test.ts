import { describe, test, expect } from "bun:test";
import { spawn } from "child_process";

const runBun = (code: string): Promise<{ exitCode: number; stdout: string; stderr: string }> => {
  return new Promise((resolve) => {
    const proc = spawn("bun", ["-e", code], { cwd: import.meta.dir + "/.." });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (d: Buffer) => { stdout += d.toString(); });
    proc.stderr.on("data", (d: Buffer) => { stderr += d.toString(); });
    proc.on("close", (code) => resolve({ exitCode: code ?? 1, stdout, stderr }));
  });
};

describe("configure (isolated)", () => {
  test("custom capacities via configure", async () => {
    const { exitCode, stderr } = await runBun(`
      import { configure, Raylib } from "./src";
      configure({ maxModels: 128, maxSounds: 64, maxShaders: 64 });
      Raylib.initWindow(100, 100, "Custom Capacity");
      console.log("OK:" + Raylib.isWindowReady());
      Raylib.closeWindow();
    `);
    expect(exitCode).toBe(0);
    expect(stderr).not.toContain("error");
  });

  test("custom raylib library name via configure", async () => {
    const { exitCode, stderr } = await runBun(`
      import { configure, Raylib } from "./src";
      configure({ raylibPath: "libraylib.so.600" });
      Raylib.initWindow(100, 100, "Custom Path");
      console.log("OK:" + Raylib.isWindowReady());
      Raylib.closeWindow();
    `);
    expect(exitCode).toBe(0);
    expect(stderr).not.toContain("error");
  });

  test("invalid raylib path throws", async () => {
    const { stdout } = await runBun(`
      import { configure, getSymbols } from "./src";
      configure({ raylibPath: "/nonexistent/libraylib.so" });
      try {
        getSymbols();
        console.log("CAUGHT:NO");
      } catch (e) {
        console.log("CAUGHT:YES");
      }
    `);
    expect(stdout).toContain("CAUGHT:YES");
  });

  test("configure with all options", async () => {
    const { exitCode, stderr } = await runBun(`
      import { configure, Raylib } from "./src";
      configure({
        maxModels: 256,
        maxFonts: 64,
        maxImages: 512,
        maxMeshes: 128,
        maxMaterials: 64,
        maxAnimations: 64,
        maxShaders: 128,
        maxWaves: 64,
        maxSounds: 128,
        maxMusic: 32,
        maxAudioStreams: 32,
        raylibPath: "raylib",
      });
      Raylib.initWindow(100, 100, "Full Config");
      console.log("OK:" + Raylib.isWindowReady());
      Raylib.closeWindow();
    `);
    expect(exitCode).toBe(0);
    expect(stderr).not.toContain("error");
  });

  test("configure after init throws", async () => {
    const { stdout } = await runBun(`
      import { configure, Raylib } from "./src";
      Raylib.initWindow(100, 100, "Throw Test");
      try {
        configure({ maxModels: 128 });
        console.log("THROW:NO");
      } catch (e) {
        console.log("THROW:YES");
      }
      Raylib.closeWindow();
    `);
    expect(stdout).toContain("THROW:YES");
  });
});
