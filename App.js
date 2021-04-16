import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Vibration, KeyboardAvoidingView, Image } from 'react-native';

const App = props => {

	//Minutes
	const [currentTimeMinuteInput, setTimeMinuteInput] = useState('25')
	const [currentTimeMinuteInputHolder, setTimeMinuteInputHolder] = useState('25')
	const [currentBreakMinuteInput, setBreakMinuteInput] = useState('05')
	const [currentBreakMinuteInputHolder, setBreakMinuteInputHolder] = useState('05')

	//Seconds
	const [currentTimeSecondInput, setTimeSecondInput] = useState('00');
	const [currentTimeSecondInputHolder, setTimeSecondInputHolder] = useState('00')
	const [currentBreakSecondInput, setBreakSecondInput] = useState('00')
	const [currentBreakSecondInputHolder, setBreakSecondInputHolder] = useState('00')

	//Is time stopped or not
	const [stop, setStop] = useState(false)
	//State = work countdown, !State = break countdown
	const [state, setState] = useState(true)


	const setTimerMinute = (time) => {
		setTimeMinuteInputHolder(time)
		setTimeMinuteInput(time)
	}

	const setTimerSecond = (time) => {
		setTimeSecondInput(time)
		setTimeSecondInputHolder(time)
	}

	const setBreakMinute = (time) => {
		setBreakMinuteInputHolder(time)
		setBreakMinuteInput(time)
	}

	const setBreakSecond = (time) => {
		setBreakSecondInput(time)
		setBreakSecondInputHolder(time)
	}

	const countDown = () => {
		if (!stop && state) {
			if (currentTimeSecondInput == '00' || currentTimeSecondInput == '0') {
				if (currentTimeMinuteInput != '00' && currentTimeMinuteInput != '0') {
					setTimeMinuteInput(currentTimeMinuteInput - 1)
					setTimeSecondInput('59')
				}
				else {
					setState(false);
					Vibration.vibrate([0, 500, 100, 200]);
					setTimeMinuteInput(currentTimeMinuteInputHolder)
					setTimeSecondInput(currentTimeSecondInputHolder)
				}
			}
			else {
				setTimeSecondInput(currentTimeSecondInput - 1)
			}
		}
		else if (!stop && !state) {
			if (currentBreakSecondInput == '00' || currentBreakSecondInput == '0') {
				if (currentBreakMinuteInput != '00' && currentBreakMinuteInput != '0') {
					setBreakMinuteInput(currentBreakMinuteInput - 1)
					setBreakSecondInput('59')
				}
				else {
					setState(true)
					Vibration.vibrate([0, 500, 100, 200]);
					setBreakMinuteInput(currentBreakMinuteInputHolder)
					setBreakSecondInput(currentBreakSecondInputHolder)
				}
			}
			else {
				setBreakSecondInput(currentBreakSecondInput - 1)
			}
		}
	}

	const reset = () => {
		// setTimeMinuteInput(currentTimeMinuteInputHolder)
		// setTimeSecondInput(currentTimeSecondInputHolder)
		// setBreakMinuteInput(currentBreakMinuteInputHolder)
		// setBreakSecondInput(currentBreakSecondInputHolder)

		setTimeMinuteInput('25')
		setTimeSecondInput('00')
		setBreakMinuteInput('05')
		setBreakSecondInput('00')

		setTimerMinute('25')
		setTimerSecond('00')
		setBreakMinute('05')
		setBreakSecond('00')

		setState(true)
		setStop(true)
	}

	useEffect(() => {
		const interval = setTimeout(() => {
			countDown();
		}, 1000);
		return () => clearTimeout(interval);
	});

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>

			<SafeAreaView style={styles.safeAreaView}>

				<View style={styles.titleContainer}>

					<Text style={{ fontWeight: 'bold', fontSize: 40 }}>Tomato.io </Text>

					<Image source={require('./images/tomato.png')} style={{ width: 50, height: 50 }} />

				</View>

				<View style={styles.timerContainer}>

					<Text style={{ fontWeight: 'bold', fontSize: 100 }}>
						{
							state ?
								currentTimeMinuteInput + ':' + currentTimeSecondInput
								:
								currentBreakMinuteInput + ':' + currentBreakSecondInput
						}
					</Text>

				</View>

				<View style={styles.inputHeaderContainer}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
						<Text style={{ fontSize: 15, fontWeight: 'bold' }}>Work Time</Text>
					</View>

					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
						<Text style={{ fontSize: 15, fontWeight: 'bold' }}>Break Time</Text>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<View style={{ flex: 2 }}></View>

					<View style={styles.timerMinuteInput}>

						<TextInput placeholder="Minute" value={currentTimeMinuteInputHolder} onChangeText={(text) => setTimerMinute(text)} />

					</View>

					<View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>:</Text>
					</View>

					<View style={styles.timerSecondsInput}>

						<TextInput placeholder="Second" value={currentTimeSecondInputHolder} onChangeText={(text) => setTimerSecond(text)} />

					</View>

					<View style={{ flex: 4 }}></View>

					<View style={styles.breakMinuteInput}>

						<TextInput placeholder="Minute" value={currentBreakMinuteInputHolder} onChangeText={(text) => setBreakMinute(text)} />

					</View>

					<View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>:</Text>
					</View>

					<View style={styles.breakSecondsInput}>

						<TextInput placeholder="Second" value={currentBreakSecondInputHolder} onChangeText={(text) => setBreakSecond(text)} />

					</View>

					<View style={{ flex: 2 }}></View>
				</View>

				<View style={styles.buttonContainer}>

					<TouchableOpacity style={styles.startButton} onPress={() => setStop(false)}>
						<Text style={{ fontSize: 40, fontWeight: 'bold' }}>Start</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.stopButton} onPress={() => setStop(true)}>
						<Text style={{ fontSize: 40, fontWeight: 'bold' }}>Stop</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.resetButton} onPress={reset}>
						<Text style={{ fontSize: 40, fontWeight: 'bold' }}>Reset</Text>
					</TouchableOpacity>

				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: '#eb2f06'
	},

	container: {
		flex: 1
	},

	titleContainer: {
		flex: 2,
		//backgroundColor: '#9b59b6',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},

	timerContainer: {
		flex: 5,
		//backgroundColor: 'pink',
		alignItems: 'center',
		justifyContent: 'center'
	},

	inputHeaderContainer: {
		flex: .5,
		//backgroundColor: 'yellow',
		flexDirection: 'row'
	},

	inputContainer: {
		flex: 1,
		//backgroundColor: 'orange',
		flexDirection: 'row'
	},

	timerMinuteInput: {
		flex: 3,
		backgroundColor: '#e55039',
		justifyContent: 'center',
		alignItems: 'center'
	},

	timerSecondsInput: {
		flex: 3,
		backgroundColor: '#e55039',
		justifyContent: 'center',
		alignItems: 'center'
	},

	breakMinuteInput: {
		flex: 3,
		backgroundColor: '#e55039',
		justifyContent: 'center',
		alignItems: 'center'
	},

	breakSecondsInput: {
		flex: 3,
		backgroundColor: '#e55039',
		justifyContent: 'center',
		alignItems: 'center'
	},

	buttonContainer: {
		flex: 1.5,
		//backgroundColor: 'gold',
		flexDirection: 'row'
	},

	startButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	stopButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	resetButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default App;
