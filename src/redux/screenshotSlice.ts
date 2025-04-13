import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScreenshotState {
  isEnabled: boolean; //Anjal Comments: true if screenshot capturing is allowed
  isLoading: boolean; //Anjal Comments: true during plugin/API call
}

const initialState: ScreenshotState = {
  isEnabled: false, //Anjal Comments: default to disabled
  isLoading: false,
};

const screenshotSlice = createSlice({
  name: 'screenshot',
  initialState,
  reducers: {
    toggleScreenshot(state) {
      state.isEnabled = !state.isEnabled; //Anjal Comments: toggle the screenshot state
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload; //Anjal Comments: set loading during API/plugin call
    },
    setScreenshotState(state, action: PayloadAction<boolean>) {
      state.isEnabled = action.payload; //Anjal Comments: set directly from plugin response
    },
  },
});

export const { toggleScreenshot, setLoading, setScreenshotState } = screenshotSlice.actions;
export default screenshotSlice.reducer;
