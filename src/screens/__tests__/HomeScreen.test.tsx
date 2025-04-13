import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import HomeScreen from '../HomeScreen';
import { store } from '../../redux/store';
import * as screenshotService from '../../services/screenshotNative';
import * as deviceUtils from '../../utils/deviceUtils';
import * as apiService from '../../services/apiService';

// Mock all async functions
jest.mock('../../services/screenshotNative');
jest.mock('../../utils/deviceUtils');
jest.mock('../../services/apiService');

describe('HomeScreen', () => {
  it('should render logo and button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(getByText('Activate')).toBeTruthy();
  });

  it('should call native plugin and API on toggle', async () => {
    (screenshotService.toggleScreenshotNative as jest.Mock).mockResolvedValue(true);
    (deviceUtils.getDeviceDetails as jest.Mock).mockResolvedValue({ test: 'data' });
    (apiService.submitDeviceInfo as jest.Mock).mockResolvedValue({ success: true });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    const button = getByText('Activate');
    fireEvent.press(button);

    await waitFor(() => {
      expect(screenshotService.toggleScreenshotNative).toHaveBeenCalled();
      expect(apiService.submitDeviceInfo).toHaveBeenCalled();
    });
  });

  it('should show loader when loading', async () => {
    const mockStore = {
      ...store,
      getState: () => ({
        screenshot: {
          isEnabled: false,
          isLoading: true,
        }
      }),
      subscribe: jest.fn(),
      dispatch: jest.fn(),
    };

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <HomeScreen />
      </Provider>
    );

    expect(getByTestId('loader')).toBeTruthy();
  });
});
