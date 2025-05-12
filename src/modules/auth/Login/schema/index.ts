import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 32 characters")
    .required("Password is required!")
    .matches(/^[^\s]+$/, "Password must not contain spaces")
    .test("no-whitespace", "Password must not contain spaces", (value) => {
      return value === value?.trim();
    }),
});

export default schema;
