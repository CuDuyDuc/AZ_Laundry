import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import IMAGES from '../../assets/images/Images';

interface Step {
  title: string;
  completed: boolean;
}

const steps: Step[] = [
  { title: 'Chờ xác nhận', completed: true },
  { title: 'Chờ lấy hàng', completed: true },
  { title: 'Đã xong', completed: true },
  { title: 'Đánh giá', completed: false },
];

const StepProgress = () => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <View style={styles.stepContainer}>
            <View
              style={[
                styles.circle,
                step.completed ? styles.completedCircle : styles.incompleteCircle,
              ]}
            >
              {step.completed && (
                <Image source={IMAGES.check} />
              )}
            </View>
            <Text style={styles.stepText}>{step.title}</Text>
          </View>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                steps[index + 1].completed ? styles.completedLine : styles.incompleteLine,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  stepContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedCircle: {
    backgroundColor: '#00ADEF',
  },
  incompleteCircle: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  stepText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  line: {
    flex: 1,
    height: 2,
  },
  completedLine: {
    backgroundColor: '#00ADEF',
  },
  incompleteLine: {
    backgroundColor: '#F5F5F5',
  },
});

export default StepProgress;
