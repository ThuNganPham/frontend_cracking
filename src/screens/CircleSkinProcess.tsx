import React, { useState, useContext , useRef} from 'react';
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
  const [circlePositions, setCirclePositions] = useState<Position[]>([]); 
  // useRef không bị ảnh hưởng bởi render => cập nhật ngay lập tức
  const circlePositionsRef = useRef<Position[]>([]);
  const pointsOnHeadRef = useRef<number>(0);

  const handlePress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const newPosition = { x: locationX, y: locationY };

    // Cập nhật danh sách điểm trong ref
    circlePositionsRef.current = [...circlePositionsRef.current, newPosition];

      if (
    newPosition.x >= 97.39 &&
    newPosition.x <= 180 &&
    newPosition.y >= 6.72 &&
    newPosition.y <= 125
  ) {
    pointsOnHeadRef.current += 1; 
    console.log('Điểm mới thuộc vùng đầu:', pointsOnHeadRef.current);
  }
    setCirclePositions(circlePositionsRef.current);
    setCount((prevCount) => prevCount + 1);
  };

  const resetSelection = () => {
    // Reset biến tạm
    circlePositionsRef.current = [];
    pointsOnHeadRef.current =0;
    // Reset state
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
        {circlePositions.map((position, index) => (
          <Circle
            key={index} 
            width={30}
            height={30}
            style={{
              position: 'absolute',
              top: position.y - 15, 
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

      <HorizontalWhiteBar style={styles.layout}>
        <Text style={styles.footerText}>
          Phóng to để dễ dàng chọn 
        </Text>
        <Zoom width={width * 0.055} height={height * 0.02} />
        <LinkText
          text=" Chọn lại. "
          style={styles.boldUnderlineText}
          onPress={resetSelection} 
        />
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


  // const pointsOnHead = circlePositionsRef.current.filter((position) => {
  //   return position.x >= 95.98 && position.x <= 161.43 && position.y >= 2.18 && position.y <= 80.71;
  // });
  // const headPointsCount = countPointsOnHead();  // Tính tổng số chấm trên đầu
  // sendHeadPointsCount(headPointsCount);  // Gửi qua axios
  //sẽ gửi dạng : await axios.post('/your-api-endpoint', { headPoints: headPointsCount });
