import { defineField, defineType } from "sanity";

export default defineType({
  name: "products",
  type: "document",
  title: "Products",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 50,
      },
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Mens", value: "mens" },
          { title: "Womens", value: "womens" },
          { title: "Kids", value: "kids" },
        ],
      },
    }),
  ],
});
