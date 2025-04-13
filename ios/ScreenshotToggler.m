#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ScreenshotToggler, NSObject)
RCT_EXTERN_METHOD(setScreenshotEnabled:(BOOL)enabled
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end
