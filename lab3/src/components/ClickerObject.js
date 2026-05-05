import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import {
    GestureDetector,
    Gesture,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';

const EMOJIS = ['🚀', '⚡', '🎯', '💎', '🌟', '🔥', '🎲', '🎮'];

export default function ClickerObject() {
    const { tap, doubleTap, longPress, flingRight, flingLeft, pinch, pan } = useGame();
    const { theme } = useTheme();

    const [emojiIdx, setEmojiIdx] = useState(0);

    // ── Animated values ──────────────────────────────────────────────────────
    const scale      = useSharedValue(1);
    const rotation   = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const pinchBase  = useSharedValue(1);
    const opacity    = useSharedValue(1);

    // ── Tap (single) ─────────────────────────────────────────────────────────
    const singleTap = Gesture.Tap()
        .numberOfTaps(1)
        .onEnd(() => {
            scale.value = withSequence(
                withSpring(1.25, { damping: 3 }),
                withSpring(1, { damping: 8 })
            );
            runOnJS(tap)();
        });

    // ── Double tap ────────────────────────────────────────────────────────────
    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            scale.value = withSequence(
                withSpring(1.45, { damping: 3 }),
                withSpring(1, { damping: 8 })
            );
            rotation.value = withSequence(
                withTiming(20, { duration: 80 }),
                withTiming(-20, { duration: 80 }),
                withTiming(0, { duration: 80 })
            );
            runOnJS(doubleTap)();
        });

    // ── Long press ────────────────────────────────────────────────────────────
    const longPressGesture = Gesture.LongPress()
        .minDuration(800)
        .onStart(() => {
            scale.value = withSpring(1.5, { damping: 5 });
            opacity.value = withTiming(0.6, { duration: 300 });
        })
        .onEnd(() => {
            scale.value = withSpring(1, { damping: 8 });
            opacity.value = withTiming(1, { duration: 200 });
            runOnJS(longPress)();
            runOnJS(Vibration.vibrate)(100);
        });

    // ── Pan ───────────────────────────────────────────────────────────────────
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const panGesture = Gesture.Pan()
        .onBegin(() => {
            startX.value = translateX.value;
            startY.value = translateY.value;
        })
        .onUpdate(e => {
            translateX.value = startX.value + e.translationX;
            translateY.value = startY.value + e.translationY;
        })
        .onEnd(() => {
            translateX.value = withSpring(0, { damping: 12 });
            translateY.value = withSpring(0, { damping: 12 });
            runOnJS(pan)();
        });

    // ── Fling right ───────────────────────────────────────────────────────────
    const flingRightGesture = Gesture.Fling()
        .direction(1) // RIGHT
        .onEnd(() => {
            translateX.value = withSequence(
                withTiming(80, { duration: 120 }),
                withSpring(0, { damping: 10 })
            );
            runOnJS(flingRight)();
            runOnJS(setEmojiIdx)(Math.floor(Math.random() * EMOJIS.length));
        });

    // ── Fling left ────────────────────────────────────────────────────────────
    const flingLeftGesture = Gesture.Fling()
        .direction(2) // LEFT
        .onEnd(() => {
            translateX.value = withSequence(
                withTiming(-80, { duration: 120 }),
                withSpring(0, { damping: 10 })
            );
            runOnJS(flingLeft)();
            runOnJS(setEmojiIdx)(Math.floor(Math.random() * EMOJIS.length));
        });

    // ── Pinch ─────────────────────────────────────────────────────────────────
    const pinchGesture = Gesture.Pinch()
        .onUpdate(e => {
            scale.value = Math.max(0.5, Math.min(2.5, pinchBase.value * e.scale));
        })
        .onEnd(() => {
            pinchBase.value = scale.value;
            scale.value = withSpring(1, { damping: 8 });
            pinchBase.value = 1;
            runOnJS(pinch)();
        });

    // ── Compose gestures ──────────────────────────────────────────────────────
    // double tap takes priority over single tap
    const tapComposed = Gesture.Exclusive(doubleTapGesture, singleTap);
    const composed = Gesture.Simultaneous(
        tapComposed,
        longPressGesture,
        panGesture,
        Gesture.Race(flingRightGesture, flingLeftGesture),
        pinchGesture
    );

    const animStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
            { rotate: `${rotation.value}deg` },
        ],
        opacity: opacity.value,
    }));

    return (
        <GestureDetector gesture={composed}>
            <Animated.View style={[styles.object, animStyle, { backgroundColor: theme.accentLight, borderColor: theme.accent }]}>
                <Text style={styles.emoji}>{EMOJIS[emojiIdx]}</Text>
                <Text style={[styles.hint, { color: theme.accent }]}>Натисни!</Text>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    object: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    emoji: { fontSize: 60 },
    hint:  { fontSize: 13, fontWeight: '700', marginTop: 4 },
});