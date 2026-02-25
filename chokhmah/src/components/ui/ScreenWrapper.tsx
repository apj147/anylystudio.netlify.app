import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, TEXTURE, GRADIENTS, SPACING } from '../../constants/theme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  showConstellation?: boolean;
  personaColor?: string;
}

/**
 * Base screen wrapper with parchment texture overlay + optional constellation pattern.
 * Every screen in Chokhmah wraps content in this component.
 */
export function ScreenWrapper({
  children,
  showConstellation = true,
  personaColor,
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Layer 1: Parchment texture simulation via subtle gradient noise */}
      <View style={[styles.textureLayer, { opacity: TEXTURE.parchment.opacity }]}>
        <LinearGradient
          colors={['rgba(139,115,85,0.3)', 'rgba(139,115,85,0.05)', 'rgba(139,115,85,0.2)']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Layer 2: Constellation pattern (top portion) */}
      {showConstellation && (
        <View
          style={[
            styles.constellationLayer,
            {
              height: `${TEXTURE.constellation.coveragePercent}%`,
              opacity: TEXTURE.constellation.opacity,
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(107,78,230,0.15)', 'rgba(38,198,218,0.08)', 'transparent']}
            locations={[0, 0.4, 1]}
            style={StyleSheet.absoluteFill}
          />
        </View>
      )}

      {/* Layer 3: Persona-colored gradient (if active) */}
      {personaColor && (
        <LinearGradient
          colors={[`${personaColor}12`, 'transparent']}
          style={styles.personaGradient}
        />
      )}

      {/* Content */}
      <View style={[styles.content, { paddingTop: insets.top }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  textureLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  constellationLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  personaGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '25%',
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: SPACING.md,
  },
});
