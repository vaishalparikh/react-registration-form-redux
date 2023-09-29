import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Please enter email id"),
  date: Yup.date()
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
    .required("Please select your date"),
  phone: Yup.string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter mobile number"),
  country: Yup.string().required("Please select your country"),
  hobbie: Yup.array().min(1, "Select atleast one hobbies"),
  profile: Yup.string().required("Paste your profile link is required"),
  gender: Yup.string().required("Select your gender is required"),
});

export default schema;
