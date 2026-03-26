"use client";
import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
import { useState, useEffect } from "react";


const games = [
  {
    title: "Split The Room",
    description: "Take a position you believe will divide the table.",
    howItWorks: `
Everyone gets a chance to declare a hot take.

Everyone else responds: Agree or Disagree.

If the room splits roughly in half (close counts), congrats, you split the room!

Tone note: Encourage playful controversy, not personal attacks.

Examples:
• “Vanilla ice cream is better than chocolate.”
• “California is better than Florida.”
• “Brunch is overrated.”
• “Texting is better than calling.”
    `,
    energy: 70,
  },
  {
    title: "Drink Dispenser Fingers",
    description: "If each finger dispensed a drink, what are your five?",
    howItWorks: `
Go around the table.

Each person declares their 5 drinks.

Mixed drinks count as one.

No judging. (Okay, light judging allowed.)

Optional variation:
The group votes the most chaotic hand.

Examples:
• “Water, coffee, tea, Diet Coke, margarita.”
• “Lemonade, dirty martini, lime La Croix, oat milk latte, mezcal.”
• “Chocolate milk five times.”
    `,
    energy: 40,
  },
  {
    title: "Would You Rather",
    description: "Classic fork-in-the-road scenarios.",
    howItWorks: `
Everyone gets a turn to ask: “Would you rather ___ or ___?”

Everyone answers and explains.

Go deep or stay ridiculous.

Examples:
• “Be 8 feet tall or 4 feet tall?”
• “Wear no shirt or no pants forever?”
• “Lose taste or lose sleep?”
    `,
    energy: 50,
  },
  {
    title: "$50,000,000",
    description: "You just came into some cash. Now what?",
    howItWorks: `
Prompt the table:
“You come into $50M. What are you doing?”

Everyone walks through their plan.

No vague answers — be specific.

Optional twist:
The table votes who would blow it fastest.
    `,
    energy: 30,
  },
  {
    title: "The Finger Game",
    description: "Don't be the last one standing.",
    howItWorks: `
Everyone starts with one finger in.

Caller counts down: “3-2-1.”

On “1” players either keep finger down or lift it.

Caller guesses total fingers remaining.

If correct, caller removes their finger permanently.

Continue rotating caller.

Last person with a finger loses.

Optional: Place fingers on a central cup. Loser drinks.
    `,
    energy: 90,
  },
  {
    title: "Mount Rushmore",
    description: "Your definitive top four.",
    howItWorks: `
Everyone gets to declare a category.

Go around sharing your “Mount Rushmore” (top 4) of that topic.

Debate allowed.

Optional twist:
The table votes best list.

Examples:
• TV shows
• NBA players
• Vacation cities
• Fast food items
    `,
    energy: 60,
  },
];

function shuffleArray(array: any[]) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function Home() {
  const [shuffledGames, setShuffledGames] = useState(games);
const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showRules, setShowRules] = useState(false);
const [fade, setFade] = useState(true);
const [flip, setFlip] = useState(false);
  useEffect(() => {
  const shuffled = shuffleArray(games);

  setShuffledGames(shuffled);

  const startIndex = Math.floor(Math.random() * shuffled.length);
  setCurrentGameIndex(startIndex);
}, []);

  const nextGame = () => {
  setFade(false);

  setTimeout(() => {
    setCurrentGameIndex((prevIndex) => {
      if (prevIndex + 1 >= shuffledGames.length) {
        return 0;
      }
      return prevIndex + 1;
    });

    setShowRules(false);
    setFade(true);
  }, 200);
};

  const game = shuffledGames[currentGameIndex]

  return (
  
  <main className="relative min-h-screen flex items-center justify-center p-6 bg-[#f5efe6] overflow-hidden">

    {/* Paper texture */}
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
      }}
    />

<div className="absolute top-8 text-center space-y-2">
  <h1
    className={`${playfair.className} text-3xl font-semibold tracking-tight text-[#5a1f2b]`}
  >
    Sobremesa
  </h1>

  <div className="flex justify-center">
    <div className="h-2 w-2 rounded-full bg-[#7a1e2c]" />
  </div>

  <p className="text-sm text-[#7a6a5c]">
    Games that celebrate the art of lingering at the table
  </p>
</div>

    {/* Card */}
    <div className="relative z-10 max-w-xl w-full bg-[#fffaf4] rounded-3xl shadow-2xl p-10 space-y-8 border border-[#e8dccf]">


      <div
        className={`space-y-4 text-center transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2
          className={`${playfair.className} text-3xl md:text-4xl font-semibold tracking-tight text-[#b48a2c]`}
        >
          {game.title}
        </h2>

        <p className="text-[#5f4e42]">{game.description}</p>

        <button
          onClick={() => setShowRules(!showRules)}
          className="text-sm underline text-[#5a1f2b] hover:opacity-70 transition"
        >
          {showRules ? "Hide Rules" : "How It Works"}
        </button>

        {showRules && (
          <div className="text-sm text-[#5f4e42] mt-4 whitespace-pre-line text-left">
            {game.howItWorks}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="h-2 w-full bg-[#e8dccf] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#a33a4a] to-[#5a1f2b] transition-all duration-500"
            style={{ width: `${game.energy}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#8c7a6d]">
          <span>Conversational</span>
          <span>Competitive</span>
        </div>
      </div>

      <button
        onClick={nextGame}
        className="w-full bg-[#5a1f2b] text-white py-3 rounded-2xl hover:bg-[#4a1722] transition"
      >
        Next Game
      </button>

    </div>
  </main>
);
}