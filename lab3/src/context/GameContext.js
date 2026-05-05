import React, { createContext, useContext, useState, useCallback } from 'react';


const INITIAL_QUESTS = [
    { id: 'q1',  title: '10 кліків',            desc: 'Натиснути на об\'єкт 10 разів',              icon: '👆', target: 10,  type: 'taps',       done: false },
    { id: 'q2',  title: '5 подвійних кліків',   desc: 'Зробити 5 подвійних кліків',                icon: '✌️', target: 5,   type: 'doubleTaps', done: false },
    { id: 'q3',  title: 'Утримати 3 секунди',   desc: 'Довге натискання на об\'єкт',               icon: '⏳', target: 1,   type: 'longPress',  done: false },
    { id: 'q4',  title: 'Перетягнути об\'єкт',  desc: 'Переміщення об\'єкта по екрану',            icon: '↔️', target: 1,   type: 'pan',        done: false },
    { id: 'q5',  title: 'Свайп вправо',         desc: 'Швидкий свайп вправо',                      icon: '👉', target: 1,   type: 'flingRight', done: false },
    { id: 'q6',  title: 'Свайп вліво',          desc: 'Швидкий свайп вліво',                       icon: '👈', target: 1,   type: 'flingLeft',  done: false },
    { id: 'q7',  title: 'Масштабувати об\'єкт', desc: 'Збільшити або зменшити за допомогою пінча', icon: '🔍', target: 1,   type: 'pinch',      done: false },
    { id: 'q8',  title: '100 очок',             desc: 'Набрати 100 очок загалом',                  icon: '💯', target: 100, type: 'score',      done: false },
    { id: 'q9',  title: 'Гравець дня',          desc: 'Зіграти більш як 50 кліків за одну сесію',  icon: '🏆', target: 50,  type: 'session',    done: false },
];

const GameContext = createContext(null);

export function GameProvider({ children }) {
    const [score, setScore]           = useState(0);
    const [sessionTaps, setSessionTaps] = useState(0);
    const [quests, setQuests]         = useState(INITIAL_QUESTS);
    const [questCounters, setQuestCounters] = useState({
        taps: 0, doubleTaps: 0, longPress: 0,
        pan: 0, flingRight: 0, flingLeft: 0, pinch: 0, session: 0,
    });
    const [lastAction, setLastAction] = useState('');

    // ── Helper: complete quest if threshold reached ──────────────────────────
    const checkQuest = useCallback((type, newCounters, newScore) => {
        setQuests(prev => prev.map(q => {
            if (q.done) return q;
            if (q.type === 'score' && newScore >= q.target) return { ...q, done: true };
            if (q.type === type && (newCounters[type] ?? 0) >= q.target) return { ...q, done: true };
            return q;
        }));
    }, []);

    const addScore = useCallback((pts, type, msg) => {
        setScore(prev => {
            const next = prev + pts;
            setQuestCounters(c => {
                const updated = { ...c, [type]: (c[type] ?? 0) + 1 };
                checkQuest(type, updated, next);
                return updated;
            });
            checkQuest('score', {}, next);
            return next;
        });
        setLastAction(msg);
    }, [checkQuest]);

    const tap = useCallback(() => {
        setSessionTaps(s => {
            const next = s + 1;
            setQuestCounters(c => {
                const updated = { ...c, taps: c.taps + 1, session: next };
                checkQuest('taps', updated, 0);
                checkQuest('session', updated, 0);
                return updated;
            });
            return next;
        });
        addScore(1, 'taps', '+1 очко');
    }, [addScore, checkQuest]);

    const doubleTap = useCallback(() => addScore(2, 'doubleTaps', '+2 подвійний клік!'), [addScore]);
    const longPress = useCallback(() => addScore(5, 'longPress', '+5 утримання!'),       [addScore]);
    const flingRight= useCallback(() => addScore(Math.floor(Math.random() * 8) + 3, 'flingRight', '🎲 свайп вправо!'), [addScore]);
    const flingLeft = useCallback(() => addScore(Math.floor(Math.random() * 8) + 3, 'flingLeft',  '🎲 свайп вліво!'), [addScore]);
    const pinch     = useCallback(() => addScore(3, 'pinch', '+3 пінч!'),                [addScore]);
    const pan       = useCallback(() => {
        setQuestCounters(c => {
            const updated = { ...c, pan: c.pan + 1 };
            checkQuest('pan', updated, 0);
            return updated;
        });
        setLastAction('↔️ перетягнуто');
    }, [checkQuest]);

    const resetGame = useCallback(() => {
        setScore(0);
        setSessionTaps(0);
        setQuests(INITIAL_QUESTS);
        setQuestCounters({ taps: 0, doubleTaps: 0, longPress: 0, pan: 0, flingRight: 0, flingLeft: 0, pinch: 0, session: 0 });
        setLastAction('🔄 гру скинуто');
    }, []);

    return (
        <GameContext.Provider value={{
            score, sessionTaps, quests, questCounters, lastAction,
            tap, doubleTap, longPress, flingRight, flingLeft, pinch, pan, resetGame,
        }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);