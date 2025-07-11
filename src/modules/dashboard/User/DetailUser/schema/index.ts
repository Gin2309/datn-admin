import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .required("Phone is required"),
  role: Yup.string().oneOf(["USER", "EMPLOYEE", "ADMIN"], "Invalid role").required("Role is required"),
  avatar: Yup.string().url("Invalid URL format"),
});

export default schema;
