import reducer, { setLoading, setScreenshotState } from "../screenshotSlice";

describe('screenshotSlice', () => {
  const initialState = {
    isEnabled: false,
    isLoading: false,
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setScreenshotState', () => {
    const newState = reducer(initialState, setScreenshotState(true));
    expect(newState.isEnabled).toBe(true);
  });

  it('should handle setLoading', () => {
    const newState = reducer(initialState, setLoading(true));
    expect(newState.isLoading).toBe(true);
  });
});
