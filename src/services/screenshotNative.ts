import { NativeModules } from 'react-native';

const { ScreenshotToggler } = NativeModules;

//Anjal Comments: Wrapper for enabling/disabling screenshot
export const toggleScreenshotNative = async (enabled: boolean): Promise<boolean> => {
  try {
    await ScreenshotToggler.setScreenshotEnabled(enabled); //Anjal Comments: calls native module
    return true;
  } catch (error) {
    console.error('Native toggle error:', error);
    return false;
  }
};
