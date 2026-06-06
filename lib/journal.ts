export interface Post {
  slug: string
  title: string
  date: string
  formattedDate: string
  excerpt: string
  category: string
  readTime: string
  sections: Array<{ heading?: string; body: string }>
}

export const posts: Post[] = [
  {
    slug: 'how-to-take-reference-photos-for-a-pet-portrait',
    title: 'How to Take Reference Photos for a Pet Portrait Commission',
    date: '2026-05-20',
    formattedDate: 'May 20, 2026',
    excerpt:
      'The difference between a good pet portrait and an extraordinary one almost always comes down to the reference photo. Here\'s exactly what to capture.',
    category: 'Commission Guide',
    readTime: '5 min read',
    sections: [
      {
        body: 'The difference between a good pet portrait and an extraordinary one almost always comes down to the reference photo. Paint is only as truthful as the image it works from. After 18 years of commissions, these are the things I look for every time a client sends reference materials — and the most common mistakes I see.',
      },
      {
        heading: 'Use natural light whenever possible',
        body: 'Flash photography flattens form and washes out the texture of fur, feathers, or skin. Soft natural light — a north-facing window, an overcast afternoon — creates gentle shadows that reveal the three-dimensionality of your pet\'s face. If you\'re indoors, place your pet near a window with indirect light and turn off any overhead lights. The result will be richer than anything a camera flash produces.',
      },
      {
        heading: 'Get down to eye level',
        body: 'Most people photograph their pets from a standing position, which gives a top-down perspective that\'s neither flattering nor natural. Kneel, sit on the floor, or lie flat. You want the camera at the same height as your pet\'s eyes. This perspective reads as intimate and respectful — and it\'s the angle that makes a portrait feel like a portrait rather than a record shot.',
      },
      {
        heading: 'Capture the eyes sharp and in focus',
        body: 'If only one thing is sharp in the photo, make it the eyes. Eyes carry personality, and in a painted portrait they carry the entire emotional weight of the piece. A slightly blurry background is acceptable and often desirable. A blurry eye is not. On most phones, tap the eye directly on the screen to lock focus before shooting.',
      },
      {
        heading: 'Send multiple angles',
        body: 'Even if you love one photo, send five to ten. I use additional reference images for the fur direction on the ears, the shape of the muzzle in profile, the particular way your dog holds their head when they\'re curious. The painting is assembled from many observations — the reference photos are the source material for all of them.',
      },
      {
        heading: 'Include a photo that shows personality',
        body: 'Is your cat always sitting in that one slant of afternoon light? Does your dog tilt their head like that when you say certain words? Send the photo that makes you smile — the candid, unposed one. I don\'t always paint directly from it, but it tells me who this animal is. The best portraits capture character, not just likeness.',
      },
      {
        heading: 'What format to send',
        body: 'Full-resolution JPGs from your phone camera are perfect. Do not resize or compress them. Cloud links (Google Photos, iCloud) work well for multiple images. Email attachments compress automatically, so for more than three images, a shared folder link is preferable. Include a few sentences about your pet\'s personality — what I know about them informs every decision I make while painting.',
      },
    ],
  },
  {
    slug: 'choosing-the-right-size-for-your-commission',
    title: 'Choosing the Right Size for Your Wall Commission',
    date: '2026-06-01',
    formattedDate: 'June 1, 2026',
    excerpt:
      'Size is one of the most common sources of regret in art commissions. Here\'s a practical framework for getting it right the first time.',
    category: 'Commission Guide',
    readTime: '4 min read',
    sections: [
      {
        body: 'Size is one of the most common sources of regret in art commissions — either the piece arrives and feels too small for the wall, or it overwhelms a space that needed something quieter. The decision is simpler than it seems when you work through it methodically.',
      },
      {
        heading: 'Measure the wall first',
        body: 'Before you think about subject matter or medium, measure the wall or area you have in mind. Write down the width and height in inches. A painting should typically occupy 57–75% of the available wall width for a piece hung alone, and slightly less if it\'s part of a gallery arrangement. A 48-inch wide wall, for example, calls for a piece roughly 27–36 inches wide.',
      },
      {
        heading: 'Consider viewing distance',
        body: 'How far away do you stand when you\'re in that room? Across a dining table or living room, you\'ll naturally view the piece from 8–12 feet. At that distance, a 16×20 reads as a medium accent piece; a 24×36 commands the room. In a hallway or above a desk, viewing distance drops to 3–5 feet — smaller pieces work beautifully there because the viewer gets close enough to see the detail.',
      },
      {
        heading: 'Common sizes and where they work',
        body: '8×10 and 11×14 are intimate — ideal for desk displays, bedside tables, or small gallery walls. 16×20 is the most versatile size: substantial enough to anchor a wall without overwhelming a room. 18×24 and 24×30 are living room scale — they hold their own above a sofa or over a fireplace. 36×48 and larger are statement pieces that need wall space proportional to their presence — high ceilings, open floor plans, commercial spaces.',
      },
      {
        heading: 'The tape test',
        body: 'Cut a piece of kraft paper or newspaper to your target dimensions, tape it to the wall, and live with it for a day. Stand where you normally stand in the room. Sit where you normally sit. Does it feel right? Too small? Too large? This takes ten minutes and eliminates guesswork. It\'s the most reliable sizing tool available.',
      },
      {
        heading: 'When in doubt, go larger',
        body: 'In fifteen years of hearing client feedback post-delivery, I\'ve heard "I wish I had gone bigger" dozens of times. I\'ve heard "I wish I had gone smaller" twice. A confident painting in a space feels intentional. An undersized piece in a large room looks like it wandered in by accident. If you\'re between two sizes, choose the larger one.',
      },
      {
        heading: 'Custom sizes are always an option',
        body: 'Standard canvas sizes are common because they\'re convenient, but commissions are by definition custom work. If your wall calls for a 20×28 or a square 30×30, that\'s a perfectly valid brief. Just include the exact dimensions when you submit your inquiry and I\'ll quote accordingly.',
      },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug)
}
