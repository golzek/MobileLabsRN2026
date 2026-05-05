import React, { useState, useCallback, useLayoutEffect } from 'react';
import {
    View, Text, FlatList, TouchableOpacity,
    StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
    listDirectory, createFolder, createFile, deleteItem,
    ROOT_DIR, isTextFile,
} from '../utils/filesystem';
import {
    useTheme, Screen, Loader, Empty, InlineAlert,
    ConfirmModal, InputModal, StyledInput, ActionBtn,
} from '../components/ui';
import FileItem    from '../components/FileItem';
import Breadcrumb  from '../components/Breadcrumb';
import ContextMenu from '../components/ContextMenu';

export default function ExplorerScreen({ route, navigation }) {
    const theme = useTheme();
    const currentPath = route.params?.path ?? ROOT_DIR;

    const [items,    setItems]    = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [error,    setError]    = useState('');

    // Modals
    const [showNewFolder,  setShowNewFolder]  = useState(false);
    const [showNewFile,    setShowNewFile]    = useState(false);
    const [showDelete,     setShowDelete]     = useState(false);
    const [showContext,    setShowContext]     = useState(false);
    const [selectedItem,   setSelectedItem]   = useState(null);

    // Input state
    const [folderName, setFolderName] = useState('');
    const [fileName,   setFileName]   = useState('');
    const [fileContent,setFileContent]= useState('');
    const [inputError, setInputError] = useState('');

    // ── Load directory ────────────────────────────────────────────────────────
    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const result = await listDirectory(currentPath);
            setItems(result);
        } catch (e) {
            setError('Не вдалося завантажити вміст директорії');
        } finally {
            setLoading(false);
        }
    }, [currentPath]);

    useFocusEffect(useCallback(() => { load(); }, [load]));

    // ── Header title ──────────────────────────────────────────────────────────
    useLayoutEffect(() => {
        const name = currentPath === ROOT_DIR ? 'Файли' : currentPath.split('/').filter(Boolean).pop();
        navigation.setOptions({
            title: name,
            headerRight: () => (
                <View style={{ flexDirection: 'row', gap: 8, marginRight: 4 }}>
                    <TouchableOpacity onPress={() => { setFolderName(''); setInputError(''); setShowNewFolder(true); }}
                                      style={[hdr.btn, { backgroundColor: theme.accentBg }]}>
                        <Text style={[hdr.btnTxt, { color: theme.accent }]}>📁+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setFileName(''); setFileContent(''); setInputError(''); setShowNewFile(true); }}
                                      style={[hdr.btn, { backgroundColor: theme.accentBg }]}>
                        <Text style={[hdr.btnTxt, { color: theme.accent }]}>📄+</Text>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [currentPath, theme, navigation]);

    // ── Navigate into folder ─────────────────────────────────────────────────
    const openItem = (item) => {
        if (item.isDirectory) {
            navigation.push('Explorer', { path: item.path + '/' });
        } else if (isTextFile(item.name)) {
            navigation.navigate('Viewer', { path: item.path, name: item.name });
        } else {
            Alert.alert('Файл', `Перегляд файлу "${item.name}" недоступний для цього типу.`);
        }
    };

    const openContext = (item) => { setSelectedItem(item); setShowContext(true); };

    // ── Create folder ─────────────────────────────────────────────────────────
    const handleCreateFolder = async () => {
        try {
            setInputError('');
            await createFolder(currentPath, folderName);
            setShowNewFolder(false);
            load();
        } catch (e) { setInputError(e.message); }
    };

    // ── Create file ───────────────────────────────────────────────────────────
    const handleCreateFile = async () => {
        try {
            setInputError('');
            await createFile(currentPath, fileName, fileContent);
            setShowNewFile(false);
            load();
        } catch (e) { setInputError(e.message); }
    };

    // ── Delete ────────────────────────────────────────────────────────────────
    const confirmDelete = async () => {
        if (!selectedItem) return;
        try {
            await deleteItem(selectedItem.path, selectedItem.isDirectory);
            setShowDelete(false);
            setSelectedItem(null);
            load();
        } catch {
            Alert.alert('Помилка', 'Не вдалося видалити елемент');
        }
    };

    const isAtRoot = currentPath === ROOT_DIR;

    return (
        <Screen theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* Breadcrumb */}
                <View style={[bc.wrap, { backgroundColor: theme.bgCard, borderBottomColor: theme.border }]}>
                    <Breadcrumb
                        currentPath={currentPath}
                        theme={theme}
                        onNavigate={path => navigation.push('Explorer', { path })}
                    />
                </View>

                {/* Back button (if not root) */}
                {!isAtRoot && (
                    <TouchableOpacity
                        style={[bc.upBtn, { backgroundColor: theme.bgCard, borderColor: theme.border }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[bc.upTxt, { color: theme.accent }]}>‹ Вгору</Text>
                    </TouchableOpacity>
                )}

                {error ? <InlineAlert theme={theme} type="error" message={error} /> : null}

                {loading ? (
                    <Loader theme={theme} />
                ) : (
                    <FlatList
                        data={items}
                        keyExtractor={i => i.path}
                        renderItem={({ item }) => (
                            <FileItem
                                item={item}
                                theme={theme}
                                onPress={openItem}
                                onLongPress={openContext}
                            />
                        )}
                        ListEmptyComponent={<Empty theme={theme} />}
                        contentContainerStyle={s.list}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            items.length > 0
                                ? <Text style={[s.count, { color: theme.textMuted }]}>{items.length} елементів</Text>
                                : null
                        }
                    />
                )}

                {/* Context menu (long press) */}
                <ContextMenu
                    visible={showContext}
                    item={selectedItem}
                    theme={theme}
                    onClose={() => setShowContext(false)}
                    onOpen={() => navigation.navigate('Viewer', { path: selectedItem.path, name: selectedItem.name })}
                    onEdit={() => navigation.navigate('Editor', { path: selectedItem.path, name: selectedItem.name })}
                    onInfo={() => navigation.navigate('FileInfo', { path: selectedItem.path, name: selectedItem.name, isDirectory: selectedItem.isDirectory })}
                    onDelete={() => setShowDelete(true)}
                />

                {/* Delete confirm */}
                <ConfirmModal
                    visible={showDelete}
                    theme={theme}
                    title={`Видалити "${selectedItem?.name}"?`}
                    message={selectedItem?.isDirectory
                        ? 'Папку та весь її вміст буде видалено назавжди.'
                        : 'Файл буде видалено назавжди.'}
                    onConfirm={confirmDelete}
                    onCancel={() => setShowDelete(false)}
                />

                {/* New folder modal */}
                <InputModal
                    visible={showNewFolder}
                    theme={theme}
                    title="📁 Нова папка"
                    confirmLabel="Створити"
                    onConfirm={handleCreateFolder}
                    onCancel={() => setShowNewFolder(false)}
                    fields={
                        <>
                            <StyledInput
                                theme={theme}
                                placeholder="Назва папки"
                                value={folderName}
                                onChangeText={setFolderName}
                                autoFocus
                            />
                            <InlineAlert theme={theme} type="error" message={inputError} />
                        </>
                    }
                />

                {/* New file modal */}
                <InputModal
                    visible={showNewFile}
                    theme={theme}
                    title="📄 Новий файл"
                    confirmLabel="Створити"
                    onConfirm={handleCreateFile}
                    onCancel={() => setShowNewFile(false)}
                    fields={
                        <>
                            <StyledInput
                                theme={theme}
                                placeholder="Назва файлу (напр. notes.txt)"
                                value={fileName}
                                onChangeText={setFileName}
                                autoFocus
                            />
                            <StyledInput
                                theme={theme}
                                placeholder="Початковий вміст (необов'язково)"
                                value={fileContent}
                                onChangeText={setFileContent}
                                multiline
                                numberOfLines={3}
                                style={{ minHeight: 80, textAlignVertical: 'top' }}
                            />
                            <InlineAlert theme={theme} type="error" message={inputError} />
                        </>
                    }
                />
            </SafeAreaView>
        </Screen>
    );
}

const s = StyleSheet.create({
    list:  { paddingHorizontal: 14, paddingBottom: 24 },
    count: { textAlign: 'center', fontSize: 12, fontWeight: '500', paddingVertical: 8 },
});

const bc = StyleSheet.create({
    wrap:  { borderBottomWidth: 1 },
    upBtn: {
        marginHorizontal: 14, marginVertical: 6,
        borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8,
        alignSelf: 'flex-start',
    },
    upTxt: { fontSize: 14, fontWeight: '700' },
});

const hdr = StyleSheet.create({
    btn:    { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5 },
    btnTxt: { fontSize: 14, fontWeight: '700' },
});