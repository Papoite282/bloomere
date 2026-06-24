import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const products = [
  // BOTANICAL PRINTS
  { slug: "eucalyptus-watercolor-print", name: "Eucalyptus Watercolor Print", description: "A soft, minimalist eucalyptus watercolor print in gentle greens. Perfect for neutral and Scandinavian-inspired interiors. Digital download, ready to print.", price: 4.75, category: "Botanical Prints", featured: true, etsy_url: "https://www.etsy.com/listing/4514688236" },
  { slug: "blue-eucalyptus-print", name: "Blue Eucalyptus Printable Wall Art", description: "Watercolor botanical print featuring delicate blue eucalyptus branches. Cottagecore decor with a nature wall art feel. Digital download.", price: 5.94, category: "Botanical Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4515242929" },
  { slug: "green-eucalyptus-print", name: "Green Eucalyptus Print", description: "Botanical wall art with watercolor eucalyptus leaves in rich green tones. Cottagecore printable for nature lovers.", price: 5.94, category: "Botanical Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4515431059" },
  { slug: "monstera-wall-art-print", name: "Monstera Wall Art Print", description: "Tropical botanical decor with a lush watercolor monstera leaf. Printable plant poster for modern and boho interiors.", price: 5.94, category: "Botanical Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4516443596" },
  { slug: "botanical-green-leaf-print", name: "Botanical Watercolor Print", description: "Green leaf wall art with tropical plant decor vibes. A printable botanical artwork ideal for any room.", price: 5.94, category: "Botanical Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4516464273" },
  { slug: "bird-of-paradise-print", name: "Bird of Paradise Print", description: "Tropical botanical wall art featuring a watercolor Strelitzia in full bloom. Bold and elegant.", price: 5.94, category: "Botanical Prints", featured: true, etsy_url: "https://www.etsy.com/listing/4516464584" },
  { slug: "protea-flower-print", name: "Protea Flower Print", description: "Botanical watercolor artwork featuring the exotic protea flower. Floral wall decor with a soft, painterly quality.", price: 5.94, category: "Botanical Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4516473635" },
  { slug: "pink-floral-wall-art", name: "Pink Floral Wall Art", description: "Watercolor botanical print with delicate pink florals. Feminine home decor with a soft, romantic feel.", price: 4.75, category: "Botanical Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4516476447" },
  { slug: "pink-floral-bougainvillea-print", name: "Pink Floral Watercolor Print", description: "Bougainvillea wall art in cottagecore botanical style. Romantic flower printable in vibrant pink tones.", price: 5.94, category: "Botanical Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4516486110" },
  { slug: "blue-flower-watercolor-print", name: "Blue Flower Watercolor Print", description: "Soft blue floral decor in cottagecore printable style. Botanical wall art with a gentle, dreamy quality.", price: 4.75, category: "Botanical Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4516488648" },
  // FRUIT PRINTS
  { slug: "olive-branch-watercolor-print", name: "Olive Branch Watercolor Print", description: "Botanical wall art with a Mediterranean olive branch in soft watercolor. Kitchen decor with timeless elegance.", price: 5.94, category: "Fruit Prints", featured: true, etsy_url: "https://www.etsy.com/listing/4512977325" },
  { slug: "blueberry-watercolor-print", name: "Blueberry Watercolor Print", description: "A charming watercolor print of fresh blueberries. Cottagecore kitchen wall art with a sweet, rustic feel.", price: 5.94, category: "Fruit Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4513403113" },
  { slug: "orange-branch-watercolor-print", name: "Orange Branch Watercolor Print", description: "Mediterranean citrus art with a soft watercolor orange branch. Warm kitchen or dining room decor.", price: 5.94, category: "Fruit Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4513422326" },
  { slug: "lemon-branch-watercolor-print", name: "Lemon Branch Watercolor Print", description: "A fresh lemon branch in soft watercolor tones. Perfect for Mediterranean-style kitchen decor.", price: 5.94, category: "Fruit Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4513425991" },
  { slug: "grapes-watercolor-print", name: "Grapes Watercolor Print", description: "Lush watercolor grapes perfect for kitchen or wine cellar walls. Mediterranean aesthetic.", price: 5.94, category: "Fruit Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4513440313" },
  { slug: "lemon-portuguese-tile-print", name: "Lemon Watercolor Print", description: "Portuguese tile-inspired kitchen wall art with Mediterranean citrus. A unique lemon printable poster.", price: 5.94, category: "Fruit Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4514672444" },
  { slug: "tomato-watercolor-print", name: "Tomato Watercolor Print", description: "Bright and cheerful kitchen wall art with a Mediterranean watercolor tomato. Rustic printable poster.", price: 4.75, category: "Fruit Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4514676184" },
  { slug: "pear-watercolor-print", name: "Pear Watercolor Print", description: "Rustic kitchen wall art with a cottagecore pear in soft watercolor. Mediterranean printable poster.", price: 5.94, category: "Fruit Prints", featured: false, etsy_url: "https://www.etsy.com/listing/4514680225" },
  // SOFT LANDSCAPES
  { slug: "coastal-landscape-print", name: "Coastal Landscape Print", description: "Pastel beach wall art with a minimalist seascape in soft ocean watercolor. Neutral coastal decor.", price: 4.75, category: "Soft Landscapes", featured: true, etsy_url: "https://www.etsy.com/listing/4525321725" },
  { slug: "lavender-field-print", name: "Lavender Field Print", description: "Watercolor wall art of a purple flower meadow at pastel sunset. Cottagecore landscape printable.", price: 4.75, category: "Soft Landscapes", featured: true, etsy_url: "https://www.etsy.com/listing/4525316475" },
  { slug: "wildflower-meadow-print", name: "Wildflower Meadow Print", description: "Minimalist landscape wall art with cottagecore countryside decor. Soft watercolor printable.", price: 4.75, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525316056" },
  { slug: "lavender-field-landscape-print", name: "Lavender Field Landscape Print", description: "Cottagecore wall art with a pastel countryside lavender field. Soft meadow painting in rustic farmhouse style.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525313346" },
  { slug: "pink-countryside-landscape-print", name: "Pink Countryside Landscape Print", description: "Cottagecore wall art with a pastel meadow and soft mountain landscape. Spring decor printable.", price: 4.75, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525303921" },
  { slug: "countryside-path-landscape-print", name: "Countryside Path Landscape Print", description: "Cottagecore wall art with a rural road through a green meadow. Soft country decor in watercolor.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525309816" },
  { slug: "pastel-countryside-landscape-print", name: "Pastel Countryside Landscape Print", description: "Soft field wall art in cottagecore style. Rustic watercolor printable with a country meadow.", price: 4.75, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525307870" },
  { slug: "pink-sunset-landscape-print", name: "Pink Sunset Landscape Print", description: "Coastal cottagecore wall art with a soft pastel seascape and warm sunset. Watercolor nature printable.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525297491" },
  { slug: "wildflower-meadow-landscape-print", name: "Wildflower Meadow Landscape Print", description: "Cottagecore wall art with soft countryside wildflowers. A pastel landscape printable.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525295969" },
  { slug: "minimalist-landscape-print-neutral", name: "Minimalist Landscape Print", description: "Neutral wall art with soft countryside decor in Scandinavian watercolor style.", price: 4.75, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525293281" },
  { slug: "minimalist-landscape-print-soft", name: "Minimalist Landscape Print — Soft", description: "Soft countryside wall art in neutral cottagecore style. Rustic watercolor printable.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525298036" },
  { slug: "countryside-landscape-cottagecore-print", name: "Countryside Landscape Print", description: "English countryside decor with a rustic farmhouse feel. Soft green landscape printable.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4525296086" },
  { slug: "autumn-meadow-landscape-print", name: "Autumn Meadow Landscape Print", description: "Cottagecore countryside wall art in warm autumn tones. A rustic printable capturing the golden season.", price: 5.94, category: "Soft Landscapes", featured: true, etsy_url: "https://www.etsy.com/listing/4521520880" },
  { slug: "soft-pastel-landscape-print", name: "Soft Pastel Landscape Print", description: "Minimalist countryside wall art in neutral pastel tones. Gentle and timeless decor.", price: 4.75, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4521518430" },
  { slug: "soft-hills-landscape-print", name: "Soft Hills Landscape Print", description: "Quiet countryside wall art with rolling soft hills in cottagecore style. A peaceful digital download.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4521511557" },
  { slug: "green-landscape-print", name: "Green Landscape Print", description: "Soft countryside wall art with a cottagecore meadow in lush greens. Calming printable.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4521513626" },
  { slug: "meadow-landscape-print", name: "Meadow Landscape Print", description: "Cottagecore countryside wall art with a soft country path through a lush meadow.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4521506027" },
  { slug: "countryside-landscape-country-road-print", name: "Countryside Landscape — Country Road", description: "Soft watercolor country road printable with a cottagecore countryside feel. Quiet and nostalgic.", price: 5.94, category: "Soft Landscapes", featured: false, etsy_url: "https://www.etsy.com/listing/4521508560" },
];

async function main() {
  console.log("🌸 Seeding Bloomere database...");
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: { ...p, active: true },
    });
  }
  const count = await prisma.product.count();
  console.log(`✅ ${count} products seeded.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
