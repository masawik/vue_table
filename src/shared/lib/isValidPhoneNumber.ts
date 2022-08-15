const PHONE_REGEXP = new RegExp(/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g)

export const isValidPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.match(PHONE_REGEXP)
}
