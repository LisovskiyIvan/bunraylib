#include "../../c/common.h"

int LoadModelW(const char* fileName) {
    int slot = modelAlloc();
    if (slot < 0) return -1;
    modelRegistry[slot] = LoadModel(fileName);
    return slot;
}

void UnloadModelW(int id) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return;
    UnloadModel(modelRegistry[id]);
    modelUsed[id] = false;
}

bool IsModelValidW(int id) {
    if (id < 0 || id >= MAX_MODELS || !modelUsed[id]) return false;
    return IsModelValid(modelRegistry[id]);
}

void GetModelBoundingBoxW(float* outMin, float* outMax, int id) {
    BoundingBox bb = {0};
    if (id >= 0 && id < MAX_MODELS && modelUsed[id]) {
        bb = GetModelBoundingBox(modelRegistry[id]);
    }
    outMin[0] = bb.min.x; outMin[1] = bb.min.y; outMin[2] = bb.min.z;
    outMax[0] = bb.max.x; outMax[1] = bb.max.y; outMax[2] = bb.max.z;
}

int LoadModelFromMeshW(int meshId) {
    if (meshId < 0 || meshId >= MAX_MESHES || !meshUsed[meshId]) return -1;
    int slot = modelAlloc();
    if (slot < 0) return -1;
    modelRegistry[slot] = LoadModelFromMesh(meshRegistry[meshId]);
    return slot;
}

void UnloadMeshW(int id) {
    if (id < 0 || id >= MAX_MESHES || !meshUsed[id]) return;
    UnloadMesh(meshRegistry[id]);
    meshUsed[id] = false;
}

void UploadMeshW(int id, bool dynamic) {
    if (id < 0 || id >= MAX_MESHES || !meshUsed[id]) return;
    UploadMesh(&meshRegistry[id], dynamic);
}

void GetMeshBoundingBoxW(float* outMin, float* outMax, int id) {
    BoundingBox bb = {0};
    if (id >= 0 && id < MAX_MESHES && meshUsed[id]) {
        bb = GetMeshBoundingBox(meshRegistry[id]);
    }
    outMin[0] = bb.min.x; outMin[1] = bb.min.y; outMin[2] = bb.min.z;
    outMax[0] = bb.max.x; outMax[1] = bb.max.y; outMax[2] = bb.max.z;
}

void GenMeshTangentsW(int id) {
    if (id < 0 || id >= MAX_MESHES || !meshUsed[id]) return;
    GenMeshTangents(&meshRegistry[id]);
}

bool ExportMeshW(int id, const char* fileName) {
    if (id < 0 || id >= MAX_MESHES || !meshUsed[id]) return false;
    return ExportMesh(meshRegistry[id], fileName);
}

bool ExportMeshAsCodeW(int id, const char* fileName) {
    if (id < 0 || id >= MAX_MESHES || !meshUsed[id]) return false;
    return ExportMeshAsCode(meshRegistry[id], fileName);
}

int GenMeshPolyW(int sides, float radius) {
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshPoly(sides, radius);
    return slot;
}

int GenMeshPlaneW(float width, float length, int resX, int resZ) {
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshPlane(width, length, resX, resZ);
    return slot;
}

int GenMeshCubeW(float width, float height, float length) {
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshCube(width, height, length);
    return slot;
}

int GenMeshSphereW(float radius, int rings, int slices) {
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshSphere(radius, rings, slices);
    return slot;
}

int GenMeshHemiSphereW(float radius, int rings, int slices) {
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshHemiSphere(radius, rings, slices);
    return slot;
}

int GenMeshCylinderW(float radius, float height, int slices) {
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshCylinder(radius, height, slices);
    return slot;
}

int GenMeshConeW(float radius, float height, int slices) {
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshCone(radius, height, slices);
    return slot;
}

int GenMeshTorusW(float radius, float size, int radSeg, int sides) {
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshTorus(radius, size, radSeg, sides);
    return slot;
}

int GenMeshKnotW(float radius, float size, int radSeg, int sides) {
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshKnot(radius, size, radSeg, sides);
    return slot;
}

int GenMeshHeightmapW(int imageId, float sizeX, float sizeY, float sizeZ) {
    if (imageId < 0 || imageId >= MAX_IMAGES || !imageUsed[imageId]) return -1;
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshHeightmap(imageRegistry[imageId],
        (Vector3){sizeX, sizeY, sizeZ});
    return slot;
}

int GenMeshCubicmapW(int imageId, float sizeX, float sizeY, float sizeZ) {
    if (imageId < 0 || imageId >= MAX_IMAGES || !imageUsed[imageId]) return -1;
    int slot = meshAlloc();
    if (slot < 0) return -1;
    meshRegistry[slot] = GenMeshCubicmap(imageRegistry[imageId],
        (Vector3){sizeX, sizeY, sizeZ});
    return slot;
}

void UpdateMeshBufferW(int meshId, int index, const void* data, int dataSize, int offset) {
    if (meshId < 0 || meshId >= MAX_MESHES || !meshUsed[meshId]) return;
    UpdateMeshBuffer(meshRegistry[meshId], index, data, dataSize, offset);
}

int LoadMaterialDefaultW() {
    int slot = materialAlloc();
    if (slot < 0) return -1;
    materialRegistry[slot] = LoadMaterialDefault();
    return slot;
}

bool IsMaterialValidW(int id) {
    if (id < 0 || id >= MAX_MATERIALS || !materialUsed[id]) return false;
    return IsMaterialValid(materialRegistry[id]);
}

void UnloadMaterialW(int id) {
    if (id < 0 || id >= MAX_MATERIALS || !materialUsed[id]) return;
    UnloadMaterial(materialRegistry[id]);
    materialUsed[id] = false;
}

void SetMaterialTextureW(int id, int mapType, unsigned int texId, int texW, int texH) {
    if (id < 0 || id >= MAX_MATERIALS || !materialUsed[id]) return;
    Texture2D tex = {texId, texW, texH, 1, 7};
    SetMaterialTexture(&materialRegistry[id], mapType, tex);
}

void SetModelMeshMaterialW(int modelId, int meshId, int materialId) {
    if (modelId < 0 || modelId >= MAX_MODELS || !modelUsed[modelId]) return;
    if (materialId < 0 || materialId >= MAX_MATERIALS || !materialUsed[materialId]) return;
    SetModelMeshMaterial(&modelRegistry[modelId], meshId, materialId);
}

void LoadModelAnimationsW(int* outSlotStart, int* outAnimCount, const char* fileName) {
    int count = 0;
    ModelAnimation* anims = LoadModelAnimations(fileName, &count);
    int startSlot = -1;
    int allocated = 0;
    for (int i = 0; i < count; i++) {
        int slot = animAlloc();
        if (slot < 0) break;
        if (startSlot < 0) startSlot = slot;
        animRegistry[slot] = anims[i];
        allocated++;
    }
    if (allocated < count && startSlot >= 0) {
        for (int i = 0; i < allocated; i++) {
            animUsed[startSlot + i] = false;
        }
        startSlot = -1;
        allocated = 0;
    }
    *outSlotStart = startSlot;
    *outAnimCount = allocated;
    if (anims && count > 0) UnloadModelAnimations(anims, count);
}

void UpdateModelAnimationW(int modelId, int animId, float frame) {
    if (modelId < 0 || modelId >= MAX_MODELS || !modelUsed[modelId]) return;
    if (animId < 0 || animId >= MAX_ANIMATIONS || !animUsed[animId]) return;
    UpdateModelAnimation(modelRegistry[modelId], animRegistry[animId], frame);
}

void UpdateModelAnimationExW(int modelId, int animAId, float frameA, int animBId, float frameB, float blend) {
    if (modelId < 0 || modelId >= MAX_MODELS || !modelUsed[modelId]) return;
    if (animAId < 0 || animAId >= MAX_ANIMATIONS || !animUsed[animAId]) return;
    if (animBId < 0 || animBId >= MAX_ANIMATIONS || !animUsed[animBId]) return;
    UpdateModelAnimationEx(
        modelRegistry[modelId],
        animRegistry[animAId], frameA,
        animRegistry[animBId], frameB,
        blend);
}

void UnloadModelAnimationsW(int startSlot, int count) {
    for (int i = 0; i < count; i++) {
        int id = startSlot + i;
        if (id < 0 || id >= MAX_ANIMATIONS || !animUsed[id]) continue;
        UnloadModelAnimations(&animRegistry[id], 1);
        animUsed[id] = false;
    }
}

bool IsModelAnimationValidW(int modelId, int animId) {
    if (modelId < 0 || modelId >= MAX_MODELS || !modelUsed[modelId]) return false;
    if (animId < 0 || animId >= MAX_ANIMATIONS || !animUsed[animId]) return false;
    return IsModelAnimationValid(modelRegistry[modelId], animRegistry[animId]);
}
