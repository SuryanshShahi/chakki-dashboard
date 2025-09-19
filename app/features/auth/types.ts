export interface IRequestOtp {
  mode: string;
  identifier: string;
  registeredDeviceId: string;
  type: string;
}
export interface IVerifyOtp {
  otpId: string;
  otp: string;
  mode: string;
}
