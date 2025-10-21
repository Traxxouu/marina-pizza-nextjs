 
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'notification',
  title: 'Notifications',
  type: 'document',
  fields: [
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Avertissement', value: 'warning' },
          { title: 'Succès', value: 'success' },
          { title: 'Promo', value: 'promo' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'info',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'startDate',
      title: 'Date de début',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'Date de fin',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'message',
      active: 'active',
      type: 'type',
    },
    prepare({ title, active, type }) {
      return {
        title,
        subtitle: `${type.toUpperCase()} - ${active ? '✅ Active' : '❌ Inactive'}`,
      };
    },
  },
});