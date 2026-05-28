import { getSymbols } from '../../symbols';
import { bufs as b, cstr, f, i } from '../../utils';
import type {
  Vec3,
  Texture2D,
  Model,
  BoundingBox,
  Image,
  Material,
  Mesh,
  ModelAnimation,
  Color,
} from '../../types';

const r = () => getSymbols();

export class ModelModule {
  static loadModel(fileName: string): Model {
    return r().symbols.LoadModelW(cstr(fileName));
  }
  static unloadModel(model: Model): void {
    r().symbols.UnloadModelW(i(model));
  }
  static isModelValid(model: Model): boolean {
    return r().symbols.IsModelValidW(i(model));
  }
  static getModelBoundingBox(model: Model): BoundingBox {
    r().symbols.GetModelBoundingBoxW(b._bbMin, b._bbMax, i(model));
    return {
      min: { x: b._bbMin[0]!, y: b._bbMin[1]!, z: b._bbMin[2]! },
      max: { x: b._bbMax[0]!, y: b._bbMax[1]!, z: b._bbMax[2]! },
    };
  }
  static drawModel(model: Model, position: Vec3, scale: number, tint: Color): void {
    r().symbols.DrawModelW(
      i(model),
      f(position.x),
      f(position.y),
      f(position.z),
      f(scale),
      i(tint),
    );
  }
  static drawModelEx(
    model: Model,
    position: Vec3,
    rotationAxis: Vec3,
    rotationAngle: number,
    scale: Vec3,
    tint: Color,
  ): void {
    r().symbols.DrawModelExW(
      i(model),
      f(position.x),
      f(position.y),
      f(position.z),
      f(rotationAxis.x),
      f(rotationAxis.y),
      f(rotationAxis.z),
      f(rotationAngle),
      f(scale.x),
      f(scale.y),
      f(scale.z),
      i(tint),
    );
  }
  static drawModelWires(model: Model, position: Vec3, scale: number, tint: Color): void {
    r().symbols.DrawModelWiresW(
      i(model),
      f(position.x),
      f(position.y),
      f(position.z),
      f(scale),
      i(tint),
    );
  }
  static drawModelWiresEx(
    model: Model,
    position: Vec3,
    rotationAxis: Vec3,
    rotationAngle: number,
    scale: Vec3,
    tint: Color,
  ): void {
    r().symbols.DrawModelWiresExW(
      i(model),
      f(position.x),
      f(position.y),
      f(position.z),
      f(rotationAxis.x),
      f(rotationAxis.y),
      f(rotationAxis.z),
      f(rotationAngle),
      f(scale.x),
      f(scale.y),
      f(scale.z),
      i(tint),
    );
  }
  static drawMesh(mesh: Mesh, material: Material, transform: Float32Array): void {
    r().symbols.DrawMeshW(i(mesh), i(material), transform);
  }
  static drawMeshInstanced(
    mesh: Mesh,
    material: Material,
    transforms: Float32Array,
    instances: number,
  ): void {
    r().symbols.DrawMeshInstancedW(i(mesh), i(material), transforms, i(instances));
  }
  static loadModelFromMesh(mesh: Mesh): Model {
    return r().symbols.LoadModelFromMeshW(i(mesh));
  }
  static unloadMesh(mesh: Mesh): void {
    r().symbols.UnloadMeshW(i(mesh));
  }
  static uploadMesh(mesh: Mesh, dynamic: boolean): void {
    r().symbols.UploadMeshW(i(mesh), dynamic);
  }
  static getMeshBoundingBox(mesh: Mesh): BoundingBox {
    r().symbols.GetMeshBoundingBoxW(b._bbMin, b._bbMax, i(mesh));
    return {
      min: { x: b._bbMin[0]!, y: b._bbMin[1]!, z: b._bbMin[2]! },
      max: { x: b._bbMax[0]!, y: b._bbMax[1]!, z: b._bbMax[2]! },
    };
  }
  static genMeshTangents(mesh: Mesh): void {
    r().symbols.GenMeshTangentsW(i(mesh));
  }
  static exportMesh(mesh: Mesh, fileName: string): boolean {
    return r().symbols.ExportMeshW(i(mesh), cstr(fileName));
  }
  static exportMeshAsCode(mesh: Mesh, fileName: string): boolean {
    return r().symbols.ExportMeshAsCodeW(i(mesh), cstr(fileName));
  }
  static genMeshPoly(sides: number, radius: number): Mesh {
    return r().symbols.GenMeshPolyW(i(sides), f(radius));
  }
  static genMeshPlane(width: number, length: number, resX: number, resZ: number): Mesh {
    return r().symbols.GenMeshPlaneW(f(width), f(length), i(resX), i(resZ));
  }
  static genMeshCube(width: number, height: number, length: number): Mesh {
    return r().symbols.GenMeshCubeW(f(width), f(height), f(length));
  }
  static genMeshSphere(radius: number, rings: number, slices: number): Mesh {
    return r().symbols.GenMeshSphereW(f(radius), i(rings), i(slices));
  }
  static genMeshHemiSphere(radius: number, rings: number, slices: number): Mesh {
    return r().symbols.GenMeshHemiSphereW(f(radius), i(rings), i(slices));
  }
  static genMeshCylinder(radius: number, height: number, slices: number): Mesh {
    return r().symbols.GenMeshCylinderW(f(radius), f(height), i(slices));
  }
  static genMeshCone(radius: number, height: number, slices: number): Mesh {
    return r().symbols.GenMeshConeW(f(radius), f(height), i(slices));
  }
  static genMeshTorus(radius: number, size: number, radSeg: number, sides: number): Mesh {
    return r().symbols.GenMeshTorusW(f(radius), f(size), i(radSeg), i(sides));
  }
  static genMeshKnot(radius: number, size: number, radSeg: number, sides: number): Mesh {
    return r().symbols.GenMeshKnotW(f(radius), f(size), i(radSeg), i(sides));
  }
  static genMeshHeightmap(heightmap: Image, size: Vec3): Mesh {
    return r().symbols.GenMeshHeightmapW(i(heightmap), f(size.x), f(size.y), f(size.z));
  }
  static genMeshCubicmap(cubicmap: Image, cubeSize: Vec3): Mesh {
    return r().symbols.GenMeshCubicmapW(i(cubicmap), f(cubeSize.x), f(cubeSize.y), f(cubeSize.z));
  }
  static loadMaterialDefault(): Material {
    return r().symbols.LoadMaterialDefaultW();
  }
  static isMaterialValid(material: Material): boolean {
    return r().symbols.IsMaterialValidW(i(material));
  }
  static unloadMaterial(material: Material): void {
    r().symbols.UnloadMaterialW(i(material));
  }
  static setMaterialTexture(material: Material, mapType: number, texture: Texture2D): void {
    r().symbols.SetMaterialTextureW(
      i(material),
      i(mapType),
      i(texture.id),
      i(texture.width),
      i(texture.height),
    );
  }
  static setModelMeshMaterial(model: Model, meshId: number, materialId: number): void {
    r().symbols.SetModelMeshMaterialW(i(model), i(meshId), i(materialId));
  }
  static loadModelAnimations(fileName: string): { startSlot: number; count: number } {
    r().symbols.LoadModelAnimationsW(b._animSlotStart, b._animCount, cstr(fileName));
    return { startSlot: b._animSlotStart[0]!, count: b._animCount[0]! };
  }
  static updateModelAnimation(model: Model, anim: ModelAnimation, frame: number): void {
    r().symbols.UpdateModelAnimationW(i(model), i(anim), f(frame));
  }
  static updateModelAnimationEx(
    model: Model,
    animA: ModelAnimation,
    frameA: number,
    animB: ModelAnimation,
    frameB: number,
    blend: number,
  ): void {
    r().symbols.UpdateModelAnimationExW(
      i(model),
      i(animA),
      f(frameA),
      i(animB),
      f(frameB),
      f(blend),
    );
  }
  static unloadModelAnimations(startSlot: number, count: number): void {
    r().symbols.UnloadModelAnimationsW(i(startSlot), i(count));
  }
  static isModelAnimationValid(model: Model, anim: ModelAnimation): boolean {
    return r().symbols.IsModelAnimationValidW(i(model), i(anim));
  }
  static updateMeshBuffer(
    mesh: Mesh,
    index: number,
    data: Buffer | Uint8Array,
    offset: number,
  ): void {
    r().symbols.UpdateMeshBufferW(i(mesh), i(index), data, i(data.length), i(offset));
  }
}
