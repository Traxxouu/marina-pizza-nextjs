 
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Ville',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zipCode',
      title: 'Code postal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openingHours',
      title: 'Horaires d\'ouverture',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Jour',
              type: 'string',
            },
            {
              name: 'hours',
              title: 'Horaires',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'deliveryZones',
      title: 'Zones de livraison',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Liste des villes/quartiers livrés',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
      ],
    }),
  ],
});