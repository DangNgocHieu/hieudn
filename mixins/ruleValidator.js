export const checkStatusClass = (validation) => {
  return validation.$error;
};

const patt = /^[ァ-ンー]+$/;
const formattedEmail = (str) => {
  if (!str) return false;
  const strSplit = str.split("@");
  const value = strSplit[0];
  if (value.length > 64 || strSplit.length >= 3) {
    return false;
  }
  if (!/^[a-zA-Z0-9@\.\-\+_]+$/g.test(value)) {
    return false;
  }
  const patt =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return patt.test(str);
};
const validEmail = (value) => formattedEmail(value);
export const WAEmail = (value) => {
  const before_email = String(value).split("@")[0];
  const regex = /^[a-zA-Z\-0-9_+.-]+$/;
  if (!value) return true;
  return (
    validEmail(value) && before_email?.length <= 64 && regex.test(before_email)
  );
};
