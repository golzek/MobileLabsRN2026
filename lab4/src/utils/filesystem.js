import * as FileSystem from 'expo-file-system';

// ─── Root of our sandbox ─────────────────────────────────────────────────────
export const ROOT_DIR = FileSystem.documentDirectory + 'files/';

// ─── Ensure root exists on first launch ──────────────────────────────────────
export async function ensureRoot() {
    const info = await FileSystem.getInfoAsync(ROOT_DIR);
    if (!info.exists) {
        await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
        // Seed some demo content
        await FileSystem.makeDirectoryAsync(ROOT_DIR + 'Documents/', { intermediates: true });
        await FileSystem.makeDirectoryAsync(ROOT_DIR + 'Photos/', { intermediates: true });
        await FileSystem.makeDirectoryAsync(ROOT_DIR + 'Projects/', { intermediates: true });
        await FileSystem.writeAsStringAsync(
            ROOT_DIR + 'README.txt',
            'Вітаємо у файловому менеджері!\n\nЦей застосунок дозволяє:\n- Переглядати файли та папки\n- Створювати нові файли та директорії\n- Редагувати текстові файли\n- Видаляти об\'єкти файлової системи\n\nЛабораторна робота №4, ПЗ-22, ЗТУ'
        );
        await FileSystem.writeAsStringAsync(
            ROOT_DIR + 'Documents/notes.txt',
            'Мої нотатки\n\nТут можна зберігати важливу інформацію.'
        );
        await FileSystem.writeAsStringAsync(
            ROOT_DIR + 'Projects/lab1.txt',
            'Лабораторна робота №1\nТема: React Native + Expo\nСтатус: Виконано ✓'
        );
        await FileSystem.writeAsStringAsync(
            ROOT_DIR + 'Projects/lab2.txt',
            'Лабораторна робота №2\nТема: Навігація та списки\nСтатус: Виконано ✓'
        );
        await FileSystem.writeAsStringAsync(
            ROOT_DIR + 'Projects/lab3.txt',
            'Лабораторна робота №3\nТема: Жести та стилізація\nСтатус: Виконано ✓'
        );
    }
}

// ─── List directory contents ──────────────────────────────────────────────────
export async function listDirectory(dirPath) {
    try {
        const names = await FileSystem.readDirectoryAsync(dirPath);
        const items = await Promise.all(
            names.map(async name => {
                const fullPath = dirPath + name;
                const info = await FileSystem.getInfoAsync(fullPath, { size: true });
                return {
                    name,
                    path: fullPath,
                    isDirectory: info.isDirectory,
                    size: info.size ?? 0,
                    modificationTime: info.modificationTime ?? null,
                    uri: info.uri,
                };
            })
        );
        // Directories first, then files, both alphabetically
        return items.sort((a, b) => {
            if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
            return a.name.localeCompare(b.name, 'uk');
        });
    } catch {
        return [];
    }
}

// ─── Create folder ────────────────────────────────────────────────────────────
export async function createFolder(parentPath, name) {
    const trimmed = name.trim();
    if (!trimmed) throw new Error('Назва не може бути порожньою');
    const target = parentPath + trimmed + '/';
    const info = await FileSystem.getInfoAsync(target);
    if (info.exists) throw new Error('Папка з такою назвою вже існує');
    await FileSystem.makeDirectoryAsync(target, { intermediates: true });
    return target;
}

// ─── Create text file ─────────────────────────────────────────────────────────
export async function createFile(parentPath, name, content = '') {
    let trimmed = name.trim();
    if (!trimmed) throw new Error('Назва не може бути порожньою');
    if (!trimmed.endsWith('.txt')) trimmed += '.txt';
    const target = parentPath + trimmed;
    const info = await FileSystem.getInfoAsync(target);
    if (info.exists) throw new Error('Файл з такою назвою вже існує');
    await FileSystem.writeAsStringAsync(target, content);
    return target;
}

// ─── Read file ────────────────────────────────────────────────────────────────
export async function readFile(filePath) {
    return await FileSystem.readAsStringAsync(filePath);
}

// ─── Write / save file ────────────────────────────────────────────────────────
export async function saveFile(filePath, content) {
    await FileSystem.writeAsStringAsync(filePath, content);
}

// ─── Delete file or folder ────────────────────────────────────────────────────
export async function deleteItem(itemPath, isDirectory) {
    if (isDirectory) {
        await FileSystem.deleteAsync(itemPath, { idempotent: true });
    } else {
        await FileSystem.deleteAsync(itemPath, { idempotent: true });
    }
}

// ─── Get detailed info ────────────────────────────────────────────────────────
export async function getItemInfo(itemPath) {
    return await FileSystem.getInfoAsync(itemPath, { size: true, md5: false });
}

// ─── Storage stats ────────────────────────────────────────────────────────────
export async function getStorageInfo() {
    try {
        const free  = await FileSystem.getFreeDiskStorageAsync();
        const total = await FileSystem.getTotalDiskCapacityAsync();
        return { free, total, used: total - free };
    } catch {
        return { free: 0, total: 0, used: 0 };
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function formatSize(bytes) {
    if (bytes === 0 || bytes == null) return '0 Б';
    if (bytes < 1024)       return `${bytes} Б`;
    if (bytes < 1024 ** 2)  return `${(bytes / 1024).toFixed(1)} КБ`;
    if (bytes < 1024 ** 3)  return `${(bytes / 1024 ** 2).toFixed(1)} МБ`;
    return `${(bytes / 1024 ** 3).toFixed(2)} ГБ`;
}

export function formatDate(timestamp) {
    if (!timestamp) return '—';
    const d = new Date(timestamp * 1000);
    return d.toLocaleString('uk-UA', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

export function getFileIcon(name, isDirectory) {
    if (isDirectory) return '📁';
    const ext = name.split('.').pop().toLowerCase();
    const MAP = {
        txt: '📄', md: '📝', js: '📜', ts: '📜', json: '🔧',
        jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', svg: '🖼️',
        mp4: '🎬', mov: '🎬', mp3: '🎵', wav: '🎵',
        pdf: '📕', zip: '🗜️', tar: '🗜️',
    };
    return MAP[ext] ?? '📄';
}

export function getFileType(name, isDirectory) {
    if (isDirectory) return 'Папка';
    const ext = name.split('.').pop().toLowerCase();
    const MAP = {
        txt: 'Текстовий файл', md: 'Markdown', js: 'JavaScript',
        ts: 'TypeScript', json: 'JSON', jpg: 'JPEG-зображення',
        jpeg: 'JPEG-зображення', png: 'PNG-зображення', gif: 'GIF-анімація',
        svg: 'SVG-вектор', mp4: 'Відеофайл', mp3: 'Аудіофайл',
        pdf: 'PDF-документ', zip: 'ZIP-архів',
    };
    return MAP[ext] ?? `Файл .${ext}`;
}

export function isTextFile(name) {
    const ext = name.split('.').pop().toLowerCase();
    return ['txt', 'md', 'js', 'ts', 'json', 'csv', 'log', 'xml', 'html', 'css'].includes(ext);
}

export function getRelativePath(fullPath, rootPath) {
    return fullPath.replace(rootPath, '') || '/';
}

export function buildBreadcrumbs(currentPath, rootPath) {
    const rel = getRelativePath(currentPath, rootPath);
    const parts = rel.split('/').filter(Boolean);
    const crumbs = [{ name: '🏠', path: rootPath }];
    let acc = rootPath;
    for (const part of parts) {
        acc += part + '/';
        crumbs.push({ name: part, path: acc });
    }
    return crumbs;
}