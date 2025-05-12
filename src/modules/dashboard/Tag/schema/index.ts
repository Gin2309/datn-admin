import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Tag name is required."),
  slug: Yup.string().required("Slug is required."),
});

export default schema;
