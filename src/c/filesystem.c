#include "common.h"

bool FileExistsW(const char* fileName) { return FileExists(fileName); }
bool DirectoryExistsW(const char* dirPath) { return DirectoryExists(dirPath); }
bool IsFileExtensionW(const char* fileName, const char* ext) { return IsFileExtension(fileName, ext); }
int GetFileLengthW(const char* fileName) { return GetFileLength(fileName); }
const char* GetFileExtensionW(const char* fileName) { return GetFileExtension(fileName); }
const char* GetFileNameW(const char* filePath) { return GetFileName(filePath); }
const char* GetFileNameWithoutExtW(const char* filePath) { return GetFileNameWithoutExt(filePath); }
const char* GetDirectoryPathW(const char* filePath) { return GetDirectoryPath(filePath); }
const char* GetPrevDirectoryPathW(const char* dirPath) { return GetPrevDirectoryPath(dirPath); }
const char* GetWorkingDirectoryW() { return GetWorkingDirectory(); }
const char* GetApplicationDirectoryW() { return GetApplicationDirectory(); }
int MakeDirectoryW(const char* dirPath) { return MakeDirectory(dirPath); }
bool ChangeDirectoryW(const char* dir) { return ChangeDirectory(dir); }
bool IsPathFileW(const char* path) { return IsPathFile(path); }
bool IsFileNameValidW(const char* fileName) { return IsFileNameValid(fileName); }
long GetFileModTimeW(const char* fileName) { return GetFileModTime(fileName); }

const char* LoadFileTextW(const char* fileName) { return LoadFileText(fileName); }
void UnloadFileTextW(const char* text) { UnloadFileText((char*)text); }
bool SaveFileTextW(const char* fileName, const char* text) { return SaveFileText((char*)fileName, (char*)text); }

unsigned int ComputeCRC32W(const unsigned char* data, int dataSize) { return ComputeCRC32((unsigned char*)data, dataSize); }

void UnloadRandomSequenceW(int* sequence) { UnloadRandomSequence(sequence); }
void MemFreeW(void* ptr) { MemFree(ptr); }
void UnloadFileDataW(unsigned char* data) { UnloadFileData(data); }

bool SaveFileDataW(const char* fileName, const void* data, int dataSize) {
    return SaveFileData(fileName, (void*)data, dataSize);
}

bool ExportDataAsCodeW(const unsigned char* data, int dataSize, const char* fileName) {
    return ExportDataAsCode(data, dataSize, fileName);
}
