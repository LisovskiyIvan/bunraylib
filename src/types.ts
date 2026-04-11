export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };
export type Vec4 = { x: number; y: number; z: number; w: number };
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

export type Model = number;

export type Font = number;

export type Image = number;
export type Shader = number;
export type Wave = number;
export type Sound = number;
export type Music = number;
export type AudioStream = number;
export type Material = number;
export type Mesh = number;
export type ModelAnimation = number;

export type BoundingBox = {
  min: Vec3;
  max: Vec3;
};

export type RayCollision = {
  hit: boolean;
  distance: number;
  point: Vec3;
  normal: Vec3;
};

export type GlyphInfo = {
  value: number;
  offsetX: number;
  offsetY: number;
  advanceX: number;
  image: Image;
};
