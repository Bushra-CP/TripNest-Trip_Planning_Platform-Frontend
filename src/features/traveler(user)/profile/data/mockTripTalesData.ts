import type {
  HighlightItem,
  PostItem,
  ProfileData,
} from "../types/my-trip-tales.types";

export const MOCK_PROFILE: ProfileData = {
  fullName: "Ananya Iyer",
  username: "@ananya_travels",
  avatarUrl:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  bio: "Misty tea trails, monsoon road trips, eco-homestays & authentic South Indian culinary gems ☕🌿 Storytelling one village at a time.",
  location: "Bangalore & Kochi, India",
  postCount: 18,
  followers: 1420,
  following: 384,
};

export const INITIAL_HIGHLIGHTS: HighlightItem[] = [
  {
    id: "hl-1",
    title: "Wayanad",
    emoji: "🌧️",
    coverImage:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "hl-2",
    title: "Munnar Tea",
    emoji: "🍃",
    coverImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "hl-3",
    title: "Alleppey",
    emoji: "⛵",
    coverImage:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "hl-4",
    title: "Varkala",
    emoji: "🌊",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop",
  },
];

export const INITIAL_POSTS: PostItem[] = [
  {
    id: "WT-8941",
    title: "Monsoon Trek to Chembra Peak: Beyond the Heart Lake",
    destination: "Wayanad, Kerala",
    createdDate: "Oct 24, 2024",
    readTime: "5 min read",
    category: "Guide",
    coverImage:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop",
    media: [
      {
        id: "m1",
        type: "image",
        url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
        caption: "Chembra Peak ranges",
      },
      {
        id: "m2",
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
        caption: "Mountain stream",
      },
      {
        id: "m3",
        type: "image",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
        caption: "Forest trail",
      },
    ],
    excerpt:
      "The southwest monsoon transforms Wayanad’s tallest peak into an ethereal amphitheater.",
    richContent: {
      leadParagraph:
        "The southwest monsoon transforms Wayanad’s tallest peak into an ethereal amphitheater of emerald ferns, rushing mountain rivulets, and shifting clouds.",
      quote:
        "The mist split open for barely three minutes, revealing tea plantations across the Nilgiri slopes.",
      bodyParagraphs: [
        "Start early from the Meppadi check-post to enjoy the trail before the crowds arrive.",
        "Carry water, wear high-grip footwear, and check current trekking and permit rules before visiting.",
      ],
      trailNotes: {
        permits: "Check the Forest Department's current permit requirements.",
        gear: "High-grip waterproof shoes are recommended.",
        leechDefense: "Carry suitable leech protection during monsoon season.",
      },
    },
    tags: ["#Wayanad", "#KeralaMonsoon", "#TrekkingIndia"],
    stats: { likes: 482, comments: 38, saves: 84 },
  },
  {
    id: "WT-8942",
    title: "Secret Backwater Trails of Kumarakom & Alleppey",
    destination: "Alleppey, Kerala",
    createdDate: "Oct 22, 2024",
    readTime: "6 min read",
    category: "Guide",
    coverImage:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    media: [
      {
        id: "m4",
        type: "image",
        url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
        caption: "Kerala backwaters",
      },
    ],
    excerpt: "A quiet canoe journey through narrow canals and coconut groves.",
    richContent: {
      leadParagraph:
        "Ditching the noisy houseboats for a silent wooden canoe was the best decision of our Kerala journey.",
      bodyParagraphs: [
        "We drifted through narrow canals under coconut groves and watched village life unfold along the waterfront.",
      ],
    },
    tags: ["#Backwaters", "#KeralaCulture", "#SlowTravel"],
    stats: { likes: 890, comments: 54, saves: 62 },
  },
  {
    id: "WT-8943",
    title: "Golden Hour at North Cliff: Varkala Sunset Chronicles",
    destination: "Varkala, Kerala",
    createdDate: "Oct 19, 2024",
    readTime: "01:40 Reel",
    category: "Reel",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    media: [
      {
        id: "m5",
        type: "video",
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        duration: "01:40",
        caption: "Coastal sunset",
      },
    ],
    excerpt: "A peaceful walk along Varkala's dramatic coastal cliffs.",
    richContent: {
      leadParagraph:
        "Walking north of the busy cafe strip leads to quieter coastal views and peaceful sunset spots.",
      bodyParagraphs: [
        "The waves crash against the laterite cliffs as the sun sets over the Arabian Sea.",
      ],
    },
    tags: ["#Varkala", "#CoastalIndia", "#Sunset"],
    stats: { likes: 1240, comments: 92, saves: 140 },
  },
  {
    id: "WT-8944",
    title: "Unmapped Waterfalls near Kolukkumalai",
    destination: "Munnar, Kerala",
    createdDate: "Oct 15, 2024",
    readTime: "4 min read",
    category: "Story",
    coverImage:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    media: [
      {
        id: "m6",
        type: "image",
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
        caption: "Misty mountain landscape",
      },
    ],
    excerpt: "A quiet mountain escape surrounded by dense foliage.",
    richContent: {
      leadParagraph:
        "Tucked away in the high ranges, this landscape rewards visitors with peaceful mountain scenery.",
      bodyParagraphs: [
        "Plan responsibly and obtain permission before entering private estates or restricted areas.",
      ],
    },
    tags: ["#HiddenGems", "#Munnar", "#Waterfalls"],
    stats: { likes: 670, comments: 41, saves: 50 },
  },
  {
    id: "WT-8945",
    title: "Monsoon in a Heritage Tharavadu Courtyard",
    destination: "Palakkad, Kerala",
    createdDate: "Oct 10, 2024",
    readTime: "7 min read",
    category: "Guide",
    coverImage:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    media: [
      {
        id: "m7",
        type: "image",
        url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
        caption: "Traditional Kerala courtyard",
      },
    ],
    excerpt: "A look at traditional Kerala architecture during the monsoon.",
    richContent: {
      leadParagraph:
        "The central open courtyard catches monsoon downpours while wooden pillars and clay-tiled roofs create a distinctive atmosphere.",
      bodyParagraphs: [
        "Traditional tharavadu homes are an important part of Kerala's architectural heritage.",
      ],
    },
    tags: ["#HeritageStay", "#KeralaArchitecture", "#Monsoon"],
    stats: { likes: 950, comments: 76, saves: 110 },
  },
  {
    id: "WT-8946",
    title: "Valparai 40 Hairpin Bends: Field Notes",
    destination: "Valparai, Tamil Nadu",
    createdDate: "Saved 2 hours ago",
    readTime: "Draft Memoir",
    category: "Draft",
    coverImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    media: [],
    excerpt:
      "Draft notes on road conditions, fuel stops, and wildlife sightings.",
    richContent: {
      leadParagraph:
        "Draft notes on road conditions, fuel stops, and wildlife sightings along the route.",
      bodyParagraphs: [],
    },
    tags: ["#Draft", "#RoadTripNotes"],
    stats: { likes: 0, comments: 0, saves: 0 },
    isDraft: true,
  },
];
