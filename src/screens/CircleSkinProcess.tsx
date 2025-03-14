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
import { PointsOnBodyContext } from '../contexts/PointsOnBodyContext';

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
  const pointsOnHeadRef = useRef<number>(0);
  const pointsOnHandRef = useRef<number>(0);
  const pointsOnTrunkRef = useRef<number>(0);
  const pointsOnLegRef = useRef<number>(0);
  const { points, setPoints } = useContext(PointsOnBodyContext);


const handlePress = (event: GestureResponderEvent) => {

  if (count >= 51) {
    console.log("Đã đạt giới hạn số lần chọn hợp lệ.");
    return;
  }

  const { locationX, locationY } = event.nativeEvent;

  // Chuyển đổi tọa độ touch về tỷ lệ gốc của SVG
  const normalizedX = locationX / scaleX;
  const normalizedY = locationY / scaleY;

  console.log(`Tọa độ chuẩn hóa: x = ${normalizedX}, y = ${normalizedY}`);

  // Kiểm tra nếu điểm bấm thuộc vùng đầu
  const isHeadRegion =
    (normalizedX >= 106.43 && normalizedX <= 155 && normalizedY >= 23 && normalizedY <= 89.23) ||
    (normalizedX >= 116 && normalizedX <= 147 && normalizedY >= 93.8 && normalizedY <= 104.7);

  // Kiểm tra nếu điểm bấm thuộc vùng tay, bao gồm cả epsilon
  const isHandRegion =
    (normalizedX >= 71.64 && normalizedX <= 100.7 && normalizedY >= 115.21 && normalizedY <= 153.7) ||
    (normalizedX >= 63.5 && normalizedX <= 82.39 && normalizedY >= 154.17 && normalizedY <= 192.3) ||
    (normalizedX >= 58.6 && normalizedX <= 79.25 && normalizedY >= 197.3 && normalizedY <= 228.33) ||
    (normalizedX >= 55.07 && normalizedX <= 64.03 && normalizedY >= 228.58 && normalizedY <= 236.7) ||
    (normalizedX >= 54.6 && normalizedX <= 64.03 && normalizedY >= 229.58 && normalizedY <= 236.7) ||
    (normalizedX >= 42.98 && normalizedX <= 63.37 && normalizedY >= 250.53 && normalizedY <= 282.79) ||
    (normalizedX >= 61.79 && normalizedX <= 85.5 && normalizedY >= 185.17 && normalizedY <= 199) ||
    (normalizedX >= 44.7 && normalizedX <= 67 && normalizedY >= 242 && normalizedY <= 247) ||
    (normalizedX >= 156.7 && normalizedX <= 188.9 && normalizedY >= 116.4 && normalizedY <= 149.98) ||
    (normalizedX >= 179.5 && normalizedX <= 200.6 && normalizedY >= 164.64 && normalizedY <= 191.04) ||
    (normalizedX >= 180 && normalizedX <= 204.6 && normalizedY >= 203 && normalizedY <= 225.8) ||
    (normalizedX >= 190.3 && normalizedX <= 209 && normalizedY >= 230 && normalizedY <= 240.48) ||
    (normalizedX >= 197.3 && normalizedX <= 218.5 && normalizedY >= 251 && normalizedY <= 274) ||
    (normalizedX >= 182.6 && normalizedX <= 198 && normalizedY >= 152.5 && normalizedY <= 164.2) 

  const isTrunk = 
      (normalizedX >= 107 && normalizedX <= 159 && normalizedY >= 115 && normalizedY <= 144) ||
      (normalizedX >= 89 && normalizedX <= 167 && normalizedY >= 154.59 && normalizedY <= 253) 

  const isLeg = 
      (normalizedX >= 94.03 && normalizedX <= 120.5 && normalizedY >= 253.88 && normalizedY <= 459) ||
      (normalizedX >= 131.6 && normalizedX <= 158.5 && normalizedY >= 261 && normalizedY <= 459) 

  if (!isHeadRegion && !isHandRegion && !isTrunk && !isLeg) {
    console.log("Điểm bấm không nằm trong vùng hợp lệ, bỏ qua.");
    return;
  }

  let updatedPoints = { ...points };
  // Cập nhật danh sách điểm trong ref
  const newPosition = { x: normalizedX, y: normalizedY };
  circlePositionsRef.current = [...circlePositionsRef.current, newPosition];

  if (isHeadRegion) {
    updatedPoints.pointsOnHead += 1;
    pointsOnHeadRef.current += 1;
    console.log('Điểm mới thuộc vùng đầu:', pointsOnHeadRef.current);
  }

  if (isHandRegion) {
    updatedPoints.pointsOnHand += 1;
    pointsOnHandRef.current += 1;
    console.log('Điểm mới thuộc vùng tay:', pointsOnHandRef.current);
  }

  if(isTrunk){
    updatedPoints.pointsOnTrunk += 1;
    pointsOnTrunkRef.current += 1;
    console.log('Điểm mới thuộc vùng thân:', pointsOnTrunkRef.current);

  }

  if (isLeg){
    updatedPoints.pointsOnLeg += 1;
    pointsOnLegRef.current += 1;
    console.log('Điểm mới thuộc vùng chân:', pointsOnLegRef.current);

  }
  // Cập nhật state của Context
  setPoints(updatedPoints);

  // Cập nhật state để hiển thị trên UI
  setCirclePositions(circlePositionsRef.current);
  setCount((prevCount) => prevCount + 1);
};

const resetSelection = () => {
  circlePositionsRef.current = [];
  pointsOnHeadRef.current = 0;
  pointsOnHandRef.current = 0;
  pointsOnTrunkRef.current = 0;
  pointsOnLegRef.current = 0;
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
