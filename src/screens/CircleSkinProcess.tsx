import React, { useState, useContext, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Circle from '../../assets/circle.svg';
import ColorOutline from '../../assets/colorHumanBody.svg';
import TransParentOutline from '../../assets/transparentHumanBody.svg';
import FrontShown from '../components/frontShown';
import BackShown from '../components/backShown';
import HorizontalWhiteBar from '../components/HorizontalWhiteBar';
import LinkText from '../components/LinkText';
import Zoom from '../../assets/zoom.svg';
import { NavigationProps } from '../navigation/navigation';
import { CircleContext } from '../contexts/CircleContext';

const { width, height } = Dimensions.get('window');

// Kích thước gốc của hình SVG từ Inkscape
const SVG_WIDTH = 241;
const SVG_HEIGHT = 488;

// Tính tỷ lệ chuẩn hóa
const scaleX = (width * 0.65) / SVG_WIDTH;
const scaleY = (height * 0.65) / SVG_HEIGHT;

type Position = {
  x: number;
  y: number;
};

export default function CircleSkinProcess() {
  const navigation = useNavigation<NavigationProps>();
  const { count, setCount } = useContext(CircleContext);
  const [circlePositions, setCirclePositions] = useState<Position[]>([]);
  const circlePositionsRef = useRef<Position[]>([]);

  const handlePress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;

    // Chuyển đổi tọa độ touch về tỷ lệ gốc của SVG
    const normalizedX = locationX / scaleX;
    const normalizedY = locationY / scaleY;

    console.log(`Tọa độ chuẩn hóa: x = ${normalizedX}, y = ${normalizedY}`);

    // Cập nhật danh sách điểm trong ref
    const newPosition = { x: normalizedX, y: normalizedY };
    circlePositionsRef.current = [...circlePositionsRef.current, newPosition];

    // Cập nhật state để hiển thị trên UI
    setCirclePositions(circlePositionsRef.current);
    setCount((prevCount) => prevCount + 1);
  };

  const resetSelection = () => {
    circlePositionsRef.current = [];
    setCirclePositions([]);
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.svgContainer}
        onStartShouldSetResponder={() => true}
        onResponderRelease={handlePress}
      >
        <ColorOutline width={width * 0.65} height={height * 0.65} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} style={[styles.svg, styles.colorOutline]} />
        <TransParentOutline width={width * 0.65} height={height * 0.65} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} style={[styles.svg, styles.transParentOutline]} />
        {circlePositions.map((position, index) => (
          <Circle
            key={index}
            width={30}
            height={30}
            style={{
              position: 'absolute',
              top: position.y * scaleY - 15, // Chuyển lại thành tọa độ màn hình
              left: position.x * scaleX - 15,
            }}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <FrontShown title={`Trước (${count})`} onPress={() => navigation.navigate('CreateAccount', { name: 'CreateAccount' })} />
        <BackShown title="Sau (0)" onPress={() => navigation.navigate('CreateAccount', { name: 'CreateAccount' })} />
      </View>

      <HorizontalWhiteBar style={styles.layout}>
        <Text style={styles.footerText}>Phóng to để dễ dàng chọn </Text>
        <Zoom width={width * 0.055} height={height * 0.02} />
        <LinkText text=" Chọn lại. " style={styles.boldUnderlineText} onPress={resetSelection} />
        <LinkText text="Hoàn tất" style={styles.boldUnderlineText} onPress={() => navigation.navigate('LogInAccount', { name: 'LogInAccount' })} />
      </HorizontalWhiteBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF9ED',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  svgContainer: {
    position: 'relative',
    width: width * 0.7,
    height: height * 0.65,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  colorOutline: {
    zIndex: 2,
    opacity: 0,
  },
  transParentOutline: {
    zIndex: 1,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  footerText: {
    color: '#248A50',
    fontSize: width * 0.04,
  },
  boldUnderlineText: {
    color: '#248A50',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});
