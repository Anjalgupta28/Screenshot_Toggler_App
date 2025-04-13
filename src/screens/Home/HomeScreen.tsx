import React from 'react';
import { View, Image, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setLoading, toggleScreenshot } from '../../redux/screenshotSlice';
import { toggleScreenshotNative } from '../../services/screenshotNative';
import { getDeviceDetails } from '../../utils/deviceUtils';
import { submitDeviceInfo } from '../../services/apiService';
import { styles } from './HomeScreenStyles';
import { Strings } from '../../assets/strings/strings';
import { icLogo, icUpload } from '../../assets/icon';
import Button from '../../components/Button/Button';

const HomeScreen = () => {
    const dispatch = useAppDispatch();
    const { isEnabled, isLoading } = useAppSelector(state => state.screenshot);

    const handleToggle = async () => {
        try {
            dispatch(setLoading(true));
            const nativeResult = await toggleScreenshotNative(!isEnabled);
            if (!nativeResult) {
                dispatch(setLoading(false));
                Alert.alert(Strings.ERROR_UPDATING_STATUS);
                return;
            }
            dispatch(toggleScreenshot());
            const deviceInfo = await getDeviceDetails(!isEnabled);
            await submitDeviceInfo(deviceInfo);
            dispatch(setLoading(false));
            Alert.alert(Strings.SCREENSHOT_STATUS_UPDATED);
        } catch (error) {
            dispatch(setLoading(false));
            console.log(`${Strings.ERROR} ${error}`);
            Alert.alert(Strings.ERROR_UPDATING_STATUS);
        }
    };
    return (
        <View style={styles.container}>
            <Image source={icLogo} style={styles.logo} />
            <Button
             isLoading={isLoading}
             onPress={handleToggle}
             text={isEnabled ? Strings.BUTTON_TEXT_ACTIVATED : Strings.BUTTON_TEXT_ACTIVATE}
             icon={icUpload}
            />
        </View>
    );
};

export default HomeScreen;
