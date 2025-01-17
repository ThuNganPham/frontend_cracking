import React, { useState, useContext } from 'react';
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
import { CircleContext } from '../contexts/CircleContext'

const { width, height } = Dimensions.get('window');

type Position = {
  x: number;
  y: number;
};

export default function CircleSkinProcess() {
  const navigation = useNavigation<NavigationProps>();
  const { count, setCount } = useContext(CircleContext); 
  const [circlePositions, setCirclePositions] = useState<Position[]>([]); // Lưu danh sách các vị trí
  const [circleCounts, setCircleCounts] = useState({
    head: 0,
    upperLimb: 0,
    lowerLimb: 0,
    trunk: 0,
  });

const handlePress = (event: GestureResponderEvent) => {
  const { locationX, locationY } = event.nativeEvent;
  const newPosition = { x: locationX, y: locationY };

  setCirclePositions((prev) => {
    const updated = [...prev, newPosition];
    return updated; // Chỉ cập nhật state ở đây
  });

  setCount((prevCount: number) => prevCount + 1); // Cập nhật state Context ở đây
  };
    const resetSelection = () => {
    setCirclePositions([]); // Reset danh sách vị trí
    setCount(0); // Reset bộ đếm
  };

  return (
    <View style={styles.container}>
      {/* SVG Container */}
      <View
        style={styles.svgContainer}
        onStartShouldSetResponder={() => true}
        onResponderRelease={handlePress} // Xử lý khi nhấn
      >
        <ColorOutline
          width={width * 0.65}
          height={height * 0.65}
          style={[styles.svg, styles.colorOutline]}
        />
        <TransParentOutline
          width={width * 0.65}
          height={height * 0.65}
          style={[styles.svg, styles.transParentOutline]}
        />
        {/* Lặp qua danh sách vị trí để hiển thị các vòng tròn */}
        {circlePositions.map((position, index) => (
          <Circle
            key={index} // Sử dụng chỉ số làm khóa duy nhất
            width={30}
            height={30}
            style={{
              position: 'absolute',
              top: position.y - 15, // Điều chỉnh để vòng tròn nằm chính giữa
              left: position.x - 15,
            }}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <FrontShown
          title={`Trước (${count})`} 
          onPress={() => navigation.navigate('CreateAccount', { name: 'CreateAccount' })}
        />
        <BackShown
          title="Sau (0)"
          onPress={() => navigation.navigate('CreateAccount', { name: 'CreateAccount' })}
        />
      </View>

      {/* Footer */}
      <HorizontalWhiteBar style={styles.layout}>
        <Text style={styles.footerText}>
          Phóng to để dễ dàng chọn. 
        </Text>
        <LinkText
          text=" Chọn lại"
          style={styles.boldUnderlineText}
          onPress={resetSelection} 
        />
        <Zoom width={width * 0.055} height={height * 0.02} />
        <LinkText
          text="Hoàn tất"
          style={styles.boldUnderlineText}
          onPress={() => navigation.navigate('LogInAccount', { name: 'LogInAccount' })}
        />
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

