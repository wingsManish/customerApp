import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { loadSvgFromAsset } from '@/utils/svgLoader';
import { Image as ExpoImage } from 'expo-image';

const companySvg = require('@/assets/screen-asset/company.svg');
const locationTripSvg = require('@/assets/screen-asset/locationTrip.svg');
const dottedCenterSvg = require('@/assets/screen-asset/dotted-center.svg');
const line1Svg = require('@/assets/screen-asset/line-1.svg');
const line2Svg = require('@/assets/screen-asset/line-2.svg');
type TimelinePoint = {
  title: string;
  address: string;
  type: 'pickup' | 'drop';
};

type Props = {
  pickup: TimelinePoint;
  drop: TimelinePoint;
  eta?: string;
};

export const LocationTimeline: React.FC<Props> = ({ pickup, drop, eta }) => {
  const [companyXml, setCompanyXml] = React.useState<string>('');
  const [locationXml, setLocationXml] = React.useState<string>('');
  const [dottedXml, setDottedXml] = React.useState<string>('');
  const [line1Xml, setLine1Xml] = React.useState<string>('');
  const [line2Xml, setLine2Xml] = React.useState<string>('');

  React.useEffect(() => {
    const loadIcons = async () => {
      if (Platform.OS === 'web') {
        return;
      }
      const [company, location, dotted, l1, l2] = await Promise.all([
        loadSvgFromAsset(companySvg),
        loadSvgFromAsset(locationTripSvg),
        loadSvgFromAsset(dottedCenterSvg),
        loadSvgFromAsset(line1Svg),
        loadSvgFromAsset(line2Svg),
      ]);

      if (company) {
        // Make the building white for contrast on red circle.
        setCompanyXml(company.replace(/fill="#C8202F"/g, 'fill="#FFFFFF"'));
      }
      if (location) setLocationXml(location);
      if (dotted) setDottedXml(dotted);
      if (l1) setLine1Xml(l1);
      if (l2) setLine2Xml(l2);
    };
    loadIcons();
  }, []);

  const renderCompany = () => (
    <View style={styles.companyCircle}>
      {Platform.OS === 'web' ? (
        <ExpoImage source={companySvg} style={styles.companyIconWeb} contentFit="contain" />
      ) : companyXml ? (
        <SvgXml xml={companyXml} width={16} height={16} />
      ) : null}
    </View>
  );

  const renderLocation = () => {
    if (Platform.OS === 'web') {
      return <ExpoImage source={locationTripSvg} style={styles.locationIconWeb} contentFit="contain" />;
    }
    if (!locationXml) return null;
    return <SvgXml xml={locationXml} width={35} height={35} />;
  };

  const renderLine = (xml: string, key: string) =>
    Platform.OS === 'web' ? (
      <ExpoImage key={key} source={key === 'line1' ? line1Svg : line2Svg} style={styles.lineSvg} contentFit="contain" />
    ) : xml ? (
      <SvgXml key={key} xml={xml} width={1} height={42} />
    ) : null;

  const renderDotted = () =>
    Platform.OS === 'web' ? (
      <ExpoImage source={dottedCenterSvg} style={styles.dottedSvg} contentFit="contain" />
    ) : dottedXml ? (
      <SvgXml xml={dottedXml} width={20} height={20} />
    ) : null;

  return (
    <View style={styles.timelineCard}>
      <View style={styles.timelineRow}>
        <View style={styles.timelineColumn}>
          {renderCompany()}
          <View style={styles.gap8} />
          {renderLine(line1Xml, 'line1')}
          <View style={styles.gap4} />
          {renderDotted()}
          <View style={styles.gap4} />
          {renderLine(line2Xml, 'line2')}
          <View style={styles.gap8} />
          {renderLocation()}
        </View>

        <View style={styles.timelineContent}>
          <View style={[styles.pointBlock, styles.topPointBlock]}>
            <Text style={[styles.pointTitle, styles.fontSemi]}>{pickup.title}</Text>
            <Text style={[styles.pointSubtitle, styles.fontRegular]}>{pickup.address}</Text>
          </View>

          {eta ? (
            <View style={styles.etaPill}>
              <Text style={[styles.etaText, styles.fontSemi]}>{eta}</Text>
            </View>
          ) : null}

          <View style={[styles.pointBlock, styles.bottomPointBlock]}>
            <Text style={[styles.pointTitle, styles.fontSemi]}>{drop.title}</Text>
            <Text style={[styles.pointSubtitle, styles.fontRegular]}>{drop.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 6px rgba(0,0,0,0.08)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 4,
        }),
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineColumn: {
    alignItems: 'center',
  },
  companyCircle: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: '#C8202F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIconWeb: {
    width: 68,
    height: 68,
  },
  companyIconWeb: {
    width: 24,
    height: 24,
  },
  lineSvg: {
    width: 1,
    height: 42,
  },
  dottedSvg: {
    width: 18,
    height: 18,
  },
  gap8: {
    height: 8,
  },
  gap4: {
    height: 4,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'flex-start',
    gap: 8,
  },
  pointBlock: {
    gap: 4,
  },
  topPointBlock: {
    marginBottom: 30,
    marginTop: 10,
  },
  bottomPointBlock: {
    marginTop: 30,
  },
  pointTitle: {
    fontSize: 16,
    color: '#111',
  },
  pointSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  etaPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FDE6E6',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    marginLeft: -8,
    marginBottom: 10,
  },
  etaText: {
    color: '#C8202F',
    fontSize: 13,
  },
  fontSemi: {
    fontFamily: Platform.select({
      ios: 'Figtree-SemiBold',
      android: 'Figtree-SemiBold',
      web: 'Figtree',
      default: 'Figtree',
    }),
  },
  fontRegular: {
    fontFamily: Platform.select({
      ios: 'Figtree-Regular',
      android: 'Figtree-Regular',
      web: 'Figtree',
      default: 'Figtree',
    }),
  },
});
