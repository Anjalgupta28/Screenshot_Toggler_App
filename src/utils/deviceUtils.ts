import DeviceInfo from 'react-native-device-info';
import { Strings } from '../assets/strings/strings';
import Geolocation from '@react-native-community/geolocation';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

// Wrap location fetching in a Promise so we can await it
const getCurrentLocation = (): Promise<string> => {
  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const loc = `${Strings.LATITUDE} ${latitude}, ${Strings.LONGITUDE} ${longitude}`;
        console.log(loc);
        resolve(loc);
      },
      (error) => {
        console.log(`${Strings.LOCATIONERR}`, error);
        Alert.alert(`${Strings.LOCATIONERR}`, error.message);
        resolve(Strings.LOCATION_NOT_IMPLEMENTED);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );
  });
};

export const getDeviceDetails = async (screenshotStatus: boolean) => {
  const os = DeviceInfo.getSystemName();
  const deviceName = await DeviceInfo.getDeviceName();
  const imei = await DeviceInfo.getUniqueId();
  // const mac = await DeviceInfo.getMacAddress();
  const permissionGranted = await requestLocationPermission();
  let location = Strings.LOCATION_NOT_IMPLEMENTED;

  if (permissionGranted) {
    location = await getCurrentLocation();
  }

  const publicIP = await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(json => json.ip)
    .catch(() => 'Unavailable');

  return {
    os,
    deviceName,
    imei,
    // mac,
    location,
    publicIP,
    screenshotStatus,
  };
};
