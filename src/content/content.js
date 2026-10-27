export const scenario = {
  title: "Innocent Until You Sign",
  interrogator: "Inspector Rao",
  setup:
    "A shop on your street was broken into on Tuesday night. A camera caught someone walking past at 11:40 pm. You were out for a walk, alone. You did nothing wrong. Your only goal: leave without signing a confession.",
  note: "This is a simulation. You can exit at any time.",
};

export const stages = [
  {
    id: 1,
    tactic: "Friendly opening, then a sudden accusation",
    line: "Thanks for coming in. We have some questions to ask you. We know it was you outside the shop on Tuesday night. Let's not waste time.",
    options: [
      { text: "I was just out for a walk. I haven't done anything.", leadsTo: "next" },
      { text: "Fine. Tell me what to write. I just want to leave.", leadsTo: "confession" },
    ],
    rightsNote:
      "You can ask whether you are being arrested. If you are, police must tell you the grounds.",
    source: "Constitution of India, Article 22(1)",
  },
  {
    id: 2,
    tactic: "Every denial is brushed aside",
    line: "Everyone says that. Innocent people don't sweat like this. And nobody can vouch for you, can they? Think about how that looks.",
    options: [
      { text: "Being nervous isn't proof. I was alone, that's all.", leadsTo: "next" },
      { text: "I'll say whatever you want. Please let me go home.", leadsTo: "confession" },
    ],
    rightsNote:
      "You can decline to answer questions that could incriminate you. Being nervous is not evidence.",
    source: "Constitution of India, Article 20(3)",
  },
  {
    id: 3,
    tactic: "Offering a softer version of events",
    line: "Listen, you seem decent. Maybe it wasn't planned. Maybe it just got out of hand. That happens. Say so, and we finish tonight.",
    options: [
      { text: "Nothing got out of hand. I wasn't even there.", leadsTo: "next" },
      { text: "If it ends tonight, fine. Write it down.", leadsTo: "confession" },
    ],
    rightsNote:
      "\"Say this and it ends tonight\" is a pressure tactic. Ask for a lawyer before you say or sign anything.",
    source: "Constitution of India, Article 22(1)",
  },
  {
    id: 4,
    tactic: "Claiming proof that may not exist",
    line: "Your neighbour already named you, and we have the footage. It's over. Don't make this harder on yourself.",
    evidence: "Neighbour's statement + CCTV still",
    options: [
      { text: "Then show me. I know I didn't do this.", leadsTo: "next" },
      { text: "If everyone says so, maybe I'm wrong. I'll sign.", leadsTo: "confession" },
    ],
    rightsNote:
      "A claim about evidence is not proof. You don't have to respond to it, and you can ask for a lawyer.",
    source: "Constitution of India, Articles 20(3) and 22(1)",
  },
  {
    id: 5,
    tactic: "Two choices, both assuming you're guilty",
    line: "Last question. Was this planned, or did it just happen in the moment? Either way, I need an answer now.",
    options: [
      { text: "It was planned.", leadsTo: "confession" },
      { text: "It just happened. I didn't mean it.", leadsTo: "confession" },
      { text: "Neither. I didn't do this, and I want a lawyer.", leadsTo: "next" },
    ],
    rightsNote:
      "Both answers admit guilt. \"Neither\" is a complete answer, and you can stop and ask for a lawyer.",
    source: "Constitution of India, Articles 20(3) and 22(1)",
  },
];

export const endings = {
  confession: {
    title: "You signed.",
    body: "You gave in at stage {stage} of 5. Nothing about that makes you weak. These tactics are built to work on innocent people too.",
  },
  holdout: {
    title: "You held.",
    body: "You made it through all five stages. In a real room there is no exit button, and it can go on for hours.",
  },
};

export const casesIntro =
  "In India, a confession made to the police generally cannot be used as evidence in court. But nothing in that rule stops the pressure inside the room. These are real cases.";


// Each entry: name, summary (1-2 plain sentences), sourceLabel, source (link)
export const cases = [
  {
    name: "Mohammad Nasiruddin",
    summary:
      "Nineteen years old when he was convicted under TADA for bombings in 1993. He confessed under police torture and spent 23 years in jail, including time on death row. In 2016 the Supreme Court acquitted him and ruled the confession inadmissible.",
    source: "https://indianexpress.com/article/india/india-news-india/babri-masjid-demolition-train-blast-tada-supreme-court-acquitted-in-babri-anniversary-train-blasts-case-nisar-2824883/?utm_source=chatgpt.com",
    sourceLabel: "REPLACE with publication and headline",
  },
  {
    name: "Akshardham Temple attack, 2002",
    summary:
      "Six men were convicted of an attack that killed 33 people. They spent about a decade in prison before the Supreme Court acquitted all of them for lack of evidence.",
    source: "https://cjp.org.in/wp-content/uploads/2017/06/SC-order-16May2014-Akshar-Dham-Terror-Case-DONE.pdf?utm_source=chatgpt.com",
    sourceLabel: "REPLACE with publication and headline",
  },
  {
    name: "Hussain alias Julfikar Ali",
    summary:
      "Convicted over a 2005 bus blast in Delhi that killed four people. He spent 15 years in prison, seven of them on death row, and was finally acquitted in 2013 after a retrial.",
    source: "https://indiankanoon.org/doc/147661398/?utm_source=chatgpt.com",
    sourceLabel: "REPLACE with publication and headline",
  },
  {
    name: "Vishnu Tiwari",
    summary:
      "Arrested in 2001 on a false rape charge. He spent 20 years in jail before the Allahabad High Court acquitted him in 2021.",
    source: "https://indiankanoon.org/doc/33067099/?utm_source=chatgpt.com",
    sourceLabel: "REPLACE with publication and headline",
  },
];

export const casesOutro =
  "None of these people were ever given back the years they lost. Knowing your rights in the room is the first line of defence.";

export const reveal = {
  confession: {
    eyebrow: "What just happened",
    title: "You just lived a small version of what happens to real people.",
    body: "Every step you saw is a documented pressure technique. None of them needs you to be guilty to work.",
  },
  holdout: {
    eyebrow: "What just happened",
    title: "You held. Now look at what you were up against.",
    body: "You had an exit button, only five stages, and a script you could read. A real room has none of that, and it can go on for hours.",
  },
  whyTitle: "Why this works even on innocent people",
  why: [
    {
      head: "A softer story feels like relief",
      text: "Offering a gentler version of events gives a way out that feels like mercy, even though it is still an admission.",
    },
    {
      head: "Claimed proof makes denial feel pointless",
      text: "If you believe the evidence already exists, arguing starts to seem like a waste of effort. A claim is not proof, but under pressure it can feel like one.",
    },
    {
      head: "Time and pressure wear judgment down",
      text: "Being tired, scared, and alone makes the short-term goal of ending the pressure feel more important than the long-term cost.",
    },
  ],
  disclaimer:
    "This is general information, not legal advice. If you are ever questioned by police, you can ask for a lawyer.",
  };
  export const rightsCard = {
  reviewed: true,
  title: "Know your rights in the room",
  lines: [
    {
      head: "Ask first",
      text: "\"Am I being arrested, or am I free to go?\" If you are arrested, you must be told the grounds.",
      source: "Constitution of India, Article 22(1)",
    },
    {
      head: "Ask for a lawyer",
      text: "You can ask to consult a lawyer of your choice, and you can ask before answering anything.",
      source: "Constitution of India, Article 22(1)",
    },
    {
      head: "You can stay silent",
      text: "You cannot be forced to answer questions that could make you a witness against yourself.",
      source: "Constitution of India, Article 20(3)",
    },
    {
      head: "Don't sign what you haven't read",
      text: "Never sign a statement you don't understand, whatever you're told about how quickly it ends things.",
      source: "General safety advice",
    },
    {
      head: "Pressure is not proof",
      text: "\"We already have proof\" and \"say this and it ends tonight\" are tactics, not rules.",
      source: "See the stage breakdown",
    },
    {
      head: "Court within 24 hours",
      text: "If you are arrested, you must be produced before a magistrate within 24 hours, not counting travel time.",
      source: "Constitution of India, Article 22(2)",
    },
  ],
  help: {
    label: "Free legal aid helpline (NALSA)",
    number: "15100",
  },
  disclaimer:
    "General information, not legal advice. Laws and procedures can change, so check with a lawyer or your local legal services authority.",
};