import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required."),
  slug: Yup.string().required("Slug is required."),
  content: Yup.string().required("Content is required."),
  img: Yup.string()
    .transform((value) => (value === "" ? null : value))
    .nullable(),
  shortDesc: Yup.string()
    .max(50, "Short description cannot exceed 50 characters.")
    .required("Short description is required."),
  tags: Yup.string().required("Tags are required."),
});

export default schema;
