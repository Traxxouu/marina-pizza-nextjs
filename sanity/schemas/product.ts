 
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Produits',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du produit',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Prix (€)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'allergenes',
      title: 'Allergènes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Gluten', value: 'gluten' },
          { title: 'Lait', value: 'lait' },
          { title: 'Œufs', value: 'oeufs' },
          { title: 'Fruits à coque', value: 'fruits_coque' },
          { title: 'Poisson', value: 'poisson' },
          { title: 'Crustacés', value: 'crustaces' },
          { title: 'Soja', value: 'soja' },
          { title: 'Céleri', value: 'celeri' },
          { title: 'Moutarde', value: 'moutarde' },
          { title: 'Sésame', value: 'sesame' },
        ],
      },
    }),
    defineField({
      name: 'available',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Produit vedette (Affiché sur la page d\'accueil)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'image',
      price: 'price',
    },
    prepare({ title, subtitle, media, price }) {
      return {
        title,
        subtitle: `${subtitle} - ${price}€`,
        media,
      };
    },
  },
});