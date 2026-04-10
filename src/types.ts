export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };
export type Rectangle = { x: number; y: number; width: number; height: number };

export type Camera2D = {
  offset: Vec2;
  target: Vec2;
  rotation: number;
  zoom: number;
};

export type CameraProjection = 0 | 1 | 2;

export type Camera3D = {
  position: Vec3;
  target: Vec3;
  up: Vec3;
  fovy: number;
  projection: CameraProjection;
};

export type Ray = {
  position: Vec3;
  direction: Vec3;
};

export type Color = number;

export type Texture2D = {
  id: number;
  width: number;
  height: number;
};

export type RenderTexture2D = {
  id: number;
  texture: Texture2D;
};
