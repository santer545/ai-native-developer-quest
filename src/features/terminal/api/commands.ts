import { CAREER_MILESTONES, PROFILE } from "@/lib/content/profile";
import { QUESTS, findQuestByInput, getQuestById } from "@/lib/content/quests";
import { QUEST_SCORE } from "@/store/use-game-store";
import type {
  CommandSnapshot,
  QuestId,
  TerminalEntryDraft,
  TerminalTone,
} from "@/types/game";

export interface CommandContext {
  setActiveLevel: (questId: QuestId) => void;
  completeQuest: (questId: QuestId) => void;
  openHireDialog: () => void;
  clearTerminal: () => void;
  activateFastPass: () => void;
  getSnapshot: () => CommandSnapshot;
}

export interface CommandResult {
  entries: readonly TerminalEntryDraft[];
}

export interface CommandDefinition {
  name: string;
  aliases: readonly string[];
  usage: string;
  description: string;
  run: (args: readonly string[], context: CommandContext) => CommandResult;
}

function line(
  tone: TerminalTone,
  text: string,
  extra?: Pick<TerminalEntryDraft, "badges" | "questIds">,
): TerminalEntryDraft {
  return { tone, text, ...extra };
}

function formatBulletList(items: readonly string[]): string {
  return items.map((item) => `  - ${item}`).join("\n");
}

function formatQuestDirectory(): string {
  return QUESTS.map(
    (quest) =>
      `  ${String(quest.level).padStart(2, "0")}  ${quest.title} — ${quest.company} (${quest.period})`,
  ).join("\n");
}

const helpCommand: CommandDefinition = {
  name: "help",
  aliases: ["?"],
  usage: "help [command]",
  description: "List every command, or inspect one command in detail.",
  run: (args) => {
    const requested = args[0]?.toLowerCase();

    if (requested) {
      const command = COMMANDS.find(
        (candidate) =>
          candidate.name === requested ||
          candidate.aliases.includes(requested),
      );

      if (!command) {
        return {
          entries: [
            line(
              "error",
              `No command named "${requested}". Run "help" to see the full list.`,
            ),
          ],
        };
      }

      return {
        entries: [
          line("output", `${command.usage}\n\n${command.description}`),
        ],
      };
    }

    const commandLines = COMMANDS.map(
      (command) => `  ${command.usage.padEnd(28)}${command.description}`,
    ).join("\n");

    return {
      entries: [
        line("output", `AVAILABLE COMMANDS\n\n${commandLines}`),
        line(
          "system",
          'Tip: use the ↑ and ↓ arrow keys to replay command history. Long outputs scroll inside this panel.',
        ),
      ],
    };
  },
};

const inspectCommand: CommandDefinition = {
  name: "inspect",
  aliases: ["profile", "cv"],
  usage: "inspect [alex | --experience | --quests]",
  description: "Summarise the CV, career timeline, or quest directory.",
  run: (args) => {
    const scope = args[0]?.toLowerCase();
    const mostRecent = CAREER_MILESTONES.at(0);

    if (scope === "--experience" || scope === "-e" || scope === "--exp") {
      const timeline = CAREER_MILESTONES.map((milestone, index) => {
        const order = String(index + 1).padStart(2, "0");
        return [
          `${order}  ${milestone.period}`,
          `    ${milestone.company} — ${milestone.role}`,
          `    ${milestone.summary}`,
          formatBulletList(milestone.highlights),
        ].join("\n");
      }).join("\n\n");

      return {
        entries: [
          line(
            "output",
            `CAREER TIMELINE\n8+ years of production frontend engineering\n\n${timeline}`,
          ),
        ],
      };
    }

    if (scope === "--quests" || scope === "-q") {
      return {
        entries: [
          line(
            "output",
            "QUEST DIRECTORY\nEach mission maps to a real enterprise milestone.",
          ),
          line("output", formatQuestDirectory(), {
            questIds: QUESTS.map((quest) => quest.id),
          }),
        ],
      };
    }

    const summaryScopes = new Set([
      "alex",
      "oleksandr",
      "--profile",
      "-p",
    ]);

    if (scope && !summaryScopes.has(scope)) {
      return {
        entries: [
          line(
            "error",
            `Unknown inspect scope "${scope}". Try "inspect alex", "inspect --experience", or "inspect --quests".`,
          ),
        ],
      };
    }

    const recentLine = mostRecent
      ? `Most recent: ${mostRecent.company} — ${mostRecent.role} (${mostRecent.period})`
      : "Most recent: profile data unavailable.";

    return {
      entries: [
        line(
          "output",
          [
            `${PROFILE.name} — ${PROFILE.role}`,
            PROFILE.summary,
            "",
            recentLine,
            "",
            'Run "inspect --experience" for the full timeline.',
            'Run "inspect --quests" to list the playable missions.',
          ].join("\n"),
        ),
      ],
    };
  },
};

const skillsCommand: CommandDefinition = {
  name: "skills",
  aliases: ["skill-tree"],
  usage: "skills",
  description: "Render the skill matrix as grouped terminal badges.",
  run: () => {
    const entries: TerminalEntryDraft[] = [
      line("output", "SKILL MATRIX — grouped by domain"),
      ...PROFILE.skillGroups.map((group) =>
        line("output", group.label, { badges: group.skills }),
      ),
    ];

    return { entries };
  },
};

const startQuestCommand: CommandDefinition = {
  name: "start-quest",
  aliases: ["quest"],
  usage: "start-quest [1 | 2 | 3]",
  description: "Launch a quest briefing in Mission Control.",
  run: (args, context) => {
    const target = args[0];

    if (!target) {
      return {
        entries: [
          line(
            "output",
            'QUEST DIRECTORY\nSelect a mission below, or run "start-quest 1" through "start-quest 3".',
          ),
          line("output", formatQuestDirectory(), {
            questIds: QUESTS.map((quest) => quest.id),
          }),
        ],
      };
    }

    const quest = findQuestByInput(target);

    if (!quest) {
      return {
        entries: [
          line(
            "error",
            `No quest matches "${target}". Run "start-quest" to list the available missions.`,
          ),
        ],
      };
    }

    context.setActiveLevel(quest.id);

    return {
      entries: [
        line(
          "success",
          `Level ${quest.level} online — ${quest.title}. Mission Control updated.`,
        ),
        line(
          "output",
          [
            `${quest.company} · ${quest.period}`,
            `${quest.role} · ${quest.domain}`,
            "",
            "CHALLENGE",
            quest.challenge,
            "",
            "UNLOCK",
            formatBulletList(quest.achievements),
          ].join("\n"),
        ),
        line("output", "MISSION STACK", { badges: quest.stack }),
      ],
    };
  },
};

const completeQuestCommand: CommandDefinition = {
  name: "complete-quest",
  aliases: ["complete", "finish"],
  usage: "complete-quest [1 | 2 | 3]",
  description: "Resolve a quest briefing and claim its XP.",
  run: (args, context) => {
    const snapshot = context.getSnapshot();
    const target = args[0];
    const quest = target
      ? findQuestByInput(target)
      : snapshot.activeLevel
        ? getQuestById(snapshot.activeLevel)
        : null;

    if (!quest) {
      if (target) {
        return {
          entries: [
            line(
              "error",
              `No quest matches "${target}". Run "start-quest" to list the available missions.`,
            ),
          ],
        };
      }

      return {
        entries: [
          line(
            "error",
            'No active quest. Run "start-quest 1" first, or pass a level: "complete-quest 1".',
          ),
        ],
      };
    }

    if (snapshot.completedQuests[quest.id]) {
      return {
        entries: [
          line(
            "warning",
            `Level ${quest.level} — ${quest.title} is already complete.`,
          ),
        ],
      };
    }

    context.completeQuest(quest.id);

    const remainingQuests = QUESTS.filter(
      (candidate) =>
        candidate.id !== quest.id && !snapshot.completedQuests[candidate.id],
    );
    const nextQuest = remainingQuests.at(0);
    const nextHint = nextQuest
      ? `Run "start-quest ${nextQuest.level}" for the next mission, or "status" to check progress.`
      : 'All missions cleared. Run "hire" to open the recruiter contact card.';

    return {
      entries: [
        line(
          "success",
          `+${QUEST_SCORE} XP — Level ${quest.level} ${quest.title} complete.`,
        ),
        line("output", nextHint),
      ],
    };
  },
};

const hireCommand: CommandDefinition = {
  name: "hire",
  aliases: ["contact"],
  usage: "hire",
  description: "Open the recruiter contact card.",
  run: (_args, context) => {
    context.openHireDialog();

    return {
      entries: [
        line(
          "success",
          "Recruiter channel open. Contact card mounted on screen.",
        ),
        line(
          "output",
          [
            `${PROFILE.name} — ${PROFILE.role}`,
            `Email:    ${PROFILE.contact.email}`,
            `Phone:    ${PROFILE.contact.phone}`,
            `LinkedIn: ${PROFILE.contact.linkedin}`,
          ].join("\n"),
        ),
      ],
    };
  },
};

const statusCommand: CommandDefinition = {
  name: "status",
  aliases: ["whoami"],
  usage: "status",
  description: "Show score, quest progress, and fast-pass state.",
  run: (_args, context) => {
    const snapshot = context.getSnapshot();
    const completedCount = QUESTS.filter(
      (quest) => snapshot.completedQuests[quest.id],
    ).length;
    const activeQuest = snapshot.activeLevel
      ? getQuestById(snapshot.activeLevel)
      : null;
    const activeLine = activeQuest
      ? `Level ${activeQuest.level} — ${activeQuest.title}`
      : 'none (run "start-quest")';
    const checklist = QUESTS.map(
      (quest) =>
        `  ${snapshot.completedQuests[quest.id] ? "[x]" : "[ ]"} ${quest.level}. ${quest.title}`,
    ).join("\n");

    return {
      entries: [
        line(
          "output",
          [
            "RUN STATUS",
            `Score:      ${snapshot.score} XP`,
            `Quests:     ${completedCount}/${QUESTS.length} complete`,
            `Active:     ${activeLine}`,
            `Fast-pass:  ${snapshot.fastPassEnabled ? "ACTIVE" : "STANDBY"}`,
          ].join("\n"),
        ),
        line("output", checklist),
      ],
    };
  },
};

const fastPassCommand: CommandDefinition = {
  name: "fast-pass",
  aliases: ["fastpass"],
  usage: "fast-pass",
  description: "Resolve every quest at full XP (recruiter shortcut).",
  run: (_args, context) => {
    context.activateFastPass();

    return {
      entries: [
        line(
          "warning",
          "RECRUITER FAST-PASS engaged. All quest briefings resolved at full XP.",
        ),
        line(
          "success",
          "Portfolio summary unlocked. Run \"hire\" to open the contact card.",
        ),
      ],
    };
  },
};

const clearCommand: CommandDefinition = {
  name: "clear",
  aliases: ["cls"],
  usage: "clear",
  description: "Clear the terminal output.",
  run: (_args, context) => {
    context.clearTerminal();

    return {
      entries: [
        line("system", 'Terminal cleared. Type "help" to continue.'),
      ],
    };
  },
};

export const COMMANDS: readonly CommandDefinition[] = [
  helpCommand,
  inspectCommand,
  skillsCommand,
  startQuestCommand,
  completeQuestCommand,
  hireCommand,
  statusCommand,
  fastPassCommand,
  clearCommand,
];

export function executeCommand(
  input: string,
  context: CommandContext,
): CommandResult | null {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return null;
  }

  const [rawName, ...args] = trimmedInput.split(/\s+/);
  const commandName = rawName?.toLowerCase() ?? "";
  const command = COMMANDS.find(
    (candidate) =>
      candidate.name === commandName ||
      candidate.aliases.includes(commandName),
  );

  if (!command) {
    return {
      entries: [
        line(
          "error",
          `Command not found: "${commandName}". Type "help" for the command list.`,
        ),
      ],
    };
  }

  return command.run(args, context);
}
