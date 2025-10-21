import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export const queries = {
  getProductsByCategory: (categorySlug: string) => `
    *[_type == "product" && references(*[_type == "category" && slug.current == "${categorySlug}"]._id)] | order(name asc) {
      _id,
      name,
      description,
      price,
      image,
      allergenes,
      available,
      featured
    }
  `,

  getAllCategories: () => `
    *[_type == "category"] | order(order asc) {
      _id,
      name,
      slug,
      description,
      order,
      icon
    }
  `,

  getFeaturedProducts: () => `
    *[_type == "product" && featured == true] | order(name asc) [0...6] {
      _id,
      name,
      description,
      price,
      image,
      category->{name, slug}
    }
  `,

  getActiveNotifications: () => `
    *[_type == "notification" && active == true] {
      _id,
      message,
      type,
      startDate,
      endDate
    }
  `,

  getSettings: () => `
    *[_type == "settings"][0] {
      siteName,
      phone,
      email,
      address,
      city,
      zipCode,
      openingHours,
      deliveryZones,
      socialMedia
    }
  `,
};