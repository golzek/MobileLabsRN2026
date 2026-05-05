import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: ${p => p.theme.bg};
`;

export const SafeScreen = styled.SafeAreaView`
  flex: 1;
  background-color: ${p => p.theme.bg};
`;

export const Card = styled.View`
  background-color: ${p => p.theme.bgCard};
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 12px;
  shadow-color: ${p => p.theme.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 1;
  shadow-radius: 12px;
  elevation: 5;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: ${p => p.theme.text};
  letter-spacing: -0.5px;
`;

export const Heading = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.text};
`;

export const Body = styled.Text`
  font-size: 15px;
  color: ${p => p.theme.textSecondary};
  line-height: 22px;
`;

export const Caption = styled.Text`
  font-size: 12px;
  color: ${p => p.theme.textMuted};
  font-weight: 500;
`;

export const ScoreText = styled.Text`
  font-size: 72px;
  font-weight: 900;
  color: ${p => p.theme.accent};
  text-align: center;
  letter-spacing: -2px;
`;

export const ActionLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${p => p.theme.accent};
  text-align: center;
  min-height: 24px;
`;

// ─── Buttons ──────────────────────────────────────────────────────────────────

export const PrimaryButton = styled.TouchableOpacity`
  background-color: ${p => p.theme.accent};
  border-radius: 14px;
  padding: 14px 24px;
  align-items: center;
  justify-content: center;
`;

export const PrimaryButtonText = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #FFFFFF;
`;

export const GhostButton = styled.TouchableOpacity`
  border-width: 1.5px;
  border-color: ${p => p.theme.accent};
  border-radius: 14px;
  padding: 12px 20px;
  align-items: center;
`;

export const GhostButtonText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${p => p.theme.accent};
`;

// ─── Quest item ───────────────────────────────────────────────────────────────

export const QuestRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${p => p.done ? p.theme.successLight : p.theme.bgCard};
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 8px;
  border-width: 1.5px;
  border-color: ${p => p.done ? p.theme.success : p.theme.border};
`;

export const QuestIcon = styled.Text`
  font-size: 24px;
  margin-right: 12px;
`;

export const QuestTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${p => p.done ? p.theme.success : p.theme.text};
`;

export const QuestDesc = styled.Text`
  font-size: 12px;
  color: ${p => p.theme.textMuted};
  margin-top: 2px;
`;

export const CheckBadge = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${p => p.done ? p.theme.success : p.theme.border};
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

// ─── Settings ────────────────────────────────────────────────────────────────

export const SettingRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${p => p.theme.bgCard};
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 8px;
`;

export const SettingLabel = styled.Text`
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: ${p => p.theme.text};
  margin-left: 12px;
`;

export const SettingIcon = styled.Text`
  font-size: 22px;
`;

// ─── Score chip ───────────────────────────────────────────────────────────────

export const Chip = styled.View`
  background-color: ${p => p.theme.accentLight};
  border-radius: 10px;
  padding: 4px 12px;
  align-self: center;
`;

export const ChipText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${p => p.theme.accent};
`;