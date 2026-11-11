import { CAREER_MILESTONES, PROFILE } from "@/lib/content/profile";
import { findQuestByInput, getQuestById } from "@/lib/content/quests";
import type {
  CommandSnapshot,
  QuestId,
  TerminalEntryDraft,
  TerminalTone,
} from "@/types/game";

export interface CommandContext {
  startQuest: (questId: QuestId) => void;
  openHireDialog: () => void;
  clearTerminal: () => void;
  skipToOffer: () => void;
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

function formatQuestDirectory(ids: readonly QuestId[]): string {
  return ids
    .map((id, index) => {
      const quest = getQuestById(id);
      return `  ${String(index + 1).padStart(2, "0")}  ${quest.title} — ${quest.company} (${quest.period})`;
    })
    .join("\n");
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
  description: "Summarise the CV, career timeline, or scenario directory.",
  run: (args, context) => {
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
      const session = context.getSnapshot().sessionQuestIds;

      return {
        entries: [
          line(
            "output",
            "SCENARIO DIRECTORY\nEach scenario maps to a real enterprise milestone.",
          ),
          line("output", formatQuestDirectory(session), {
            questIds: session,
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
            'Run "inspect --quests" to list the playable scenarios.',
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
  description: "Launch a scenario briefing in Mission Control.",
  run: (args, context) => {
    const session = context.getSnapshot().sessionQuestIds;
    const target = args[0];

    if (!target) {
      return {
        entries: [
          line(
            "output",
            `SCENARIO DIRECTORY\nSelect a scenario below, or run "start-quest 1" through "start-quest ${session.length}".`,
          ),
          line("output", formatQuestDirectory(session), {
            questIds: session,
          }),
        ],
      };
    }

    const asIndex = Number.parseInt(target, 10);
    let questId: QuestId | undefined;

    if (Number.isInteger(asIndex) && asIndex >= 1 && asIndex <= session.length) {
      questId = session[asIndex - 1];
    } else {
      const found = findQuestByInput(target);
      questId = found && session.includes(found.id) ? found.id : undefined;
    }

    if (!questId) {
      return {
        entries: [
          line(
            "error",
            `No scenario matches "${target}". Run "start-quest" to list this session's scenarios.`,
          ),
        ],
      };
    }

    const quest = getQuestById(questId);
    const sessionIndex = session.indexOf(questId);
    const position = sessionIndex >= 0 ? sessionIndex + 1 : quest.level;

    context.startQuest(questId);

    return {
      entries: [
        line(
          "success",
          `Scenario ${position} online — ${quest.title}. Mission Control updated.`,
        ),
        line(
          "output",
          [
            `${quest.company} · ${quest.period}`,
            `${quest.role} · ${quest.domain}`,
            "",
            "SITUATION",
            quest.scenario.scenario,
            "",
            "YOUR CALL",
            quest.scenario.ask,
            "",
            "OUTCOME",
            quest.scenario.reveal.outcome,
            "",
            "PROOF",
            quest.proof,
          ].join("\n"),
        ),
        line("output", "MISSION STACK", { badges: quest.stack }),
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
  description: "Show score, scenario progress, and view state.",
  run: (_args, context) => {
    const snapshot = context.getSnapshot();
    const session = snapshot.sessionQuestIds;
    const completedCount = session.filter(
      (questId) => snapshot.completedQuests[questId],
    ).length;
    const activeQuest = snapshot.activeLevel
      ? getQuestById(snapshot.activeLevel)
      : null;
    const activeLine = activeQuest
      ? activeQuest.title
      : 'none (run "start-quest")';
    const checklist = session
      .map((questId, index) => {
        const quest = getQuestById(questId);
        return `  ${snapshot.completedQuests[questId] ? "[x]" : "[ ]"} ${index + 1}. ${quest.title}`;
      })
      .join("\n");

    return {
      entries: [
        line(
          "output",
          [
            "RUN STATUS",
            `Score:      ${snapshot.score} XP`,
            `Scenarios:  ${completedCount}/${session.length} reviewed`,
            `Active:     ${activeLine}`,
            `View:       ${snapshot.view === "offer" ? "profile / pitch" : "screening"}`,
          ].join("\n"),
        ),
        line("output", checklist),
      ],
    };
  },
};

const skipCommand: CommandDefinition = {
  name: "skip",
  aliases: ["fast-pass", "fastpass", "offer"],
  usage: "skip",
  description: "Skip straight to the profile and hiring contact (recruiter shortcut).",
  run: (_args, context) => {
    context.skipToOffer();

    return {
      entries: [
        line(
          "warning",
          "Recruiter shortcut engaged. Jumping straight to the profile and offer screen.",
        ),
        line(
          "success",
          "Full profile and hiring contact unlocked. Run \"hire\" for direct channels.",
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
  hireCommand,
  statusCommand,
  skipCommand,
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
