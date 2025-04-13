@objc(ScreenshotToggler)
class ScreenshotToggler: NSObject {
  @objc
  func setScreenshotEnabled(_ enabled: Bool, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      if let window = UIApplication.shared.keyWindow {
        if enabled {
          window.layer.contents = nil
          resolve("Success")
        } else {
          window.layer.contents = UIImage().cgImage
          resolve("Success")
        }
      } else {
        reject("NO_WINDOW", "Could not find key window", nil)
      }
    }
  }
}
