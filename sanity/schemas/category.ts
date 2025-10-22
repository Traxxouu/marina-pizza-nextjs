 
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Catégories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la catégorie',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'icon',
      title: 'Icône (emoji)',
      type: 'string',
      description: 'Ex: 🍕 🥗 🍔 🥤',
    }),
    defineField({
      name: 'image',
      title: 'Image de catégorie',
      type: 'image',
      options: { hotspot: true },
      description: 'Image representant la catégorie (utilisée sur la page d\'accueil)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      order: 'order',
      icon: 'icon',
    },
    prepare({ title, order, icon }) {
      return {
        title: `${icon || '📁'} ${title}`,
        subtitle: `Ordre: ${order}`,
      };
    },
  },
});