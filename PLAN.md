# PLAN.md — "The AI-Native Developer Quest" Interactive CV Roadmap (v3.1)

This document outlines the plan for building an interactive developer portfolio game based on Oleksandr Obramenko's CV using React 19, Next.js App Router, Zustand, and Tailwind CSS.

> **Status:** v1 (click-through CV) and v2 (technical decision quiz) shipped; v3 pivoted to a recruiter-first screening loop. **v3.1 locks the design decisions and adds the "forwardable pitch" payoff.** **No code is changed by this document.**

---

## 0. Where We Are & Why v2 Missed the Mark

### Evolution so far
- **v1** — a CV browser in game clothing. No gameplay, no clear goal, no ending.
- **v2** — added real "decision challenges" (MCP token budget, Angular→React migration, MapBox perf). Fixed *clarity*, but created a new problem: **it tests the player's engineering knowledge.**
- **v3** — pivoted to a recruiter-first screening loop; reframed missions as plain-language scenarios with no wrong answers.
- **v3.1** — locked the decisions below and added the payoff that matters most for a recruiter: **a forwardable pitch.**

### The v2 problem (why the pivot)
A right/wrong technical quiz **punishes the exact audience we want to delight.** Recruiters do not know what an MCP token budget or a Zustand slice is; when they cannot answer "correctly" they feel tested and excluded, then skip to the profile.

### What recruiters actually enjoy
- **Speed** — respects their time.
- **Relevance** — answers "is this person good, and a fit?"
- **Personality** — a sense of the human.
- **Their own process** — screening, probing, deciding.
- **Ammunition** — something they can repeat to a hiring manager.

**Conclusion:** reframe from *"pass a technical quiz"* to *"run a fast, delightful candidate screening that ends with a pitch the recruiter can forward."*

---

## 1. Product Goal (v3.1) & Audience

### New main goal
> **"The 90-Second Screening: You are the hiring manager. Review 3 real work scenarios, make your call, and see how Oleksandr answered — then walk away with a profile and a ready-to-forward pitch."**

The player's job is *the player's actual job* — evaluating a candidate. There are **no wrong answers**; every choice reveals something real. The win state is a full profile + contact + a shareable summary.

### Audience & rules of engagement
- **Primary:** Technical Recruiters, Hiring Managers, Engineering Managers. **Secondary:** Tech Leads (served by an inline "technical detail" expander).
- **Never require typing.**
- **Never require domain knowledge.** Plain business language everywhere.
- **Never punish a choice.** Every path yields a rewarding reveal.
- **≤ 90 seconds** to finish.
- Always show the next action; always end on the profile + contact.

---

## 2. Core Loop (Recruiter-Native, No Failure States)

```
┌─ 1. SCENARIO (plain language) ────────────────────────────┐
│ A real business situation from Oleksandr's career.         │
│ No jargon. Reads like a hiring-manager briefing.           │
└───────────────────────────────────────────────────────────┘
            │
            ▼
┌─ 2. YOUR CALL (no wrong answer) ──────────────────────────┐
│ "What would you prioritise here?" (3 options)              │
│ Every option is a reasonable instinct a manager might have │
└───────────────────────────────────────────────────────────┘
            │
            ▼
┌─ 3. CANDIDATE REVEAL ─────────────────────────────────────┐
│ "Here's how Oleksandr tackled it" + a QUANTIFIED outcome + │
│ a hiring signal (what it says about him) + CV proof.       │
│ [Optional] "See the technical detail" expander.            │
└───────────────────────────────────────────────────────────┘
            │
            ▼
┌─ 4. ADVANCE (momentum CTA) ───────────────────────────────┐
│ Single CTA: "Next scenario →" (or "See your profile").     │
└───────────────────────────────────────────────────────────┘
```

### Decisions locked (v3.1)
1. **No reaction/rating step.** Rating a real person is risky on a CV and adds friction. "Your call" already gives agency; each scenario ends with momentum.
2. **Technical mode deferred.** Keep only the inline **"See the technical detail"** expander now. Recruiters never see jargon; tech leads still get depth. A full mode toggle is a future enhancement.
3. **Positive, actionable ending.** The final step is *next steps* (Start the conversation / Download CV / Share profile), never a rejection.
4. **3 options per scenario.** One click, more texture, feels like a real judgment call.
5. **Terminology = "Scenario."** It reads like genuine screening; "Mission" sounds gamey to a hiring manager.

### Design principles
1. **One primary path, one obvious next action.**
2. **Plain language only** in the primary flow; technical depth is opt-in.
3. **Reward every choice** — reveal, don't judge.
4. **Numbers-forward** — every reveal carries a quantified outcome.
5. **Progressive disclosure** — one scenario at a time, sequential.
6. **End with ammunition** — a forwardable pitch + contact.

---

## 3. The Scenario Pool (Plain-Language Rewrite)

Each mission keeps the real CV content (`src/lib/content/quests.ts`) but is reframed as a **screening scenario**. Fields (replaces `challenge`/`successCriteria`):

```ts
readonly scenario: string;        // plain-language business situation
readonly ask: string;             // "What would you prioritise?"
readonly options: ScreeningOption[]; // 3 reasonable instincts (no wrong answer)
readonly reveal: {
  readonly approach: string;      // how Oleksandr handled it
  readonly outcome: string;       // the QUANTIFIED result
  readonly signal: string;        // the hiring signal ("cost-aware", etc.)
};
readonly technicalDetail: string; // shown only in the optional expander
readonly proof: string;           // CV achievement collected
```

### Scenario 1 — "The runaway AI bill" · *Insilico*
- **Scenario:** A biopharma dashboard used an AI agent to build biological maps. The AI bill kept climbing and the pages got slow. The team was stuck.
- **Your call:** What would you ask a senior engineer to focus on first?
  - "Cut the cost without losing the feature."
  - "Rethink whether AI is even the right tool."
  - "Ship what works now, optimise later."
- **Reveal — approach:** He chose lighter models, capped tool calls, and cached repeated diagrams.
- **Outcome (quantified):** Kept the live maps while **cutting agent execution costs**.
- **Signal:** Cost-aware AI engineering.
- **Technical detail (opt-in):** MCP tool-calling, model selection, token budgeting, Nx + Angular/React dashboards, ECharts/Escher/GoJS.
- **Proof:** "Cut agent execution costs through model selection and token-budget strategy."

### Scenario 2 — "Modernise without breaking payroll" · *Strada*
- **Scenario:** A global payroll product ran on aging Angular screens. The business wanted modern React pages — but payroll and logins could not break.
- **Your call:** What is the priority for a migration like this?
  - "Zero disruption to payroll."
  - "Modernise as fast as possible."
  - "Protect speed and search ranking."
- **Reveal — approach:** He migrated screens incrementally into React 19 SSR islands behind a clean state layer, without touching the auth boundary.
- **Outcome (quantified):** Modernised the product with **zero payroll downtime** and **no performance regressions**.
- **Signal:** Safe, incremental modernisation.
- **Technical detail (opt-in):** React 19, Next.js SSR, Zustand, Angular Signals, micro-frontends, JWT, Azure DevOps.
- **Proof:** "Migrated a payroll micro-frontend to React 19 SSR + Zustand with zero regressions."

### Scenario 3 — "The map that gets slower every minute" · *Swiss Re*
- **Scenario:** An insurance disaster map got slower the longer analysts used it. Lag and crashes were hurting real risk decisions.
- **Your call:** Where would you point the engineer?
  - "Make it fast and stable."
  - "Add more features."
  - "Rebuild it from scratch."
- **Reveal — approach:** He found and fixed memory leaks, tuned the render path, and trimmed wasted work.
- **Outcome (quantified):** **More than doubled UI speed**; analysts worked on live risk data without waiting.
- **Signal:** Performance rescue under pressure.
- **Technical detail (opt-in):** MapBox, Angular/NgRx/Nx, render-path tuning, **2× speedup**.
- **Proof:** "Achieved 2× UI speedup through architecture tuning."

> **Reuse note:** Every scenario ships from **one reusable `ScreeningScenario` component** (scenario → options → reveal → advance). No custom widgets required.

### Range & human signal (why these domains)

Deliberately different domains — **AI/biopharma, global enterprise payroll, insurance performance, benefits, delivery, fintech admin, AI-native practice, security** — prove seniority across contexts. Each reveal's one-line **signal** gives the personality read recruiters hire on.

### Scenario pool & randomisation (v3.2)

- The pool lives in `QUEST_IDS` (`src/types/game.ts`) and currently holds **8 scenarios** (the 3 original + 5 added: `benefits-ssr`, `release-pipeline`, `admin-refactor`, `ai-standards`, `security-lockdown`).
- Each session randomly selects **`SESSION_SIZE = 3`** via `pickSessionQuestIds()` (Fisher–Yates) in `lib/content/quests.ts`.
- The chosen ids are stored as `sessionQuestIds` in the store; every list, banner, proof collection, scorecard, pitch, and terminal command renders **that session set**, numbered by session position (1–3) rather than pool order.
- Randomisation happens **on client mount** (`GameDashboard` effect → `shuffleSession`) so the statically-exported HTML stays deterministic and hydration never mismatches. **Reset** and **Skip to profile** reuse the same session; **Reset** re-rolls a fresh set.

**Session scenarios:**

| # | Title | Company | Signal |
|---|-------|---------|--------|
| 1 | The runaway AI bill | Insilico | Cost-aware AI engineering |
| 2 | Modernise without breaking payroll | Strada | Safe, incremental modernisation |
| 3 | The map that gets slower every minute | Swiss Re | Performance rescue under pressure |
| 4 | The page search engines never saw | Alight | Performance & discoverability |
| 5 | The release everyone dreaded | NGA HR | Reliable delivery |
| 6 | The admin tool only one person dared to change | MyCredit | Maintainable architecture & mentorship |
| 7 | Every developer used AI differently | Insilico | AI-native engineering practices |
| 8 | The feature that failed security review | Strada | Security-first delivery |

---

## 4. UX / UI Changes (v2 → v3.1)

**Keep (unchanged):**
- Persistent Objective banner + progress + `Scenario X of 3`.
- Sequential flow with a single obvious CTA.
- Proof collection + Offer screen with profile, timeline, skills, contact, **Download CV**.
- No blocking onboarding modal; optional *How to play*.
- Terminal demoted to an optional Console; **Skip to profile** in the overflow menu.
- `prefers-reduced-motion` support and keyboard-accessible controls.

**Change:**
1. **Stage steps:** `brief → challenge → result` becomes `scenario → call → reveal`.
2. **Copy tone:** plain business English; no acronyms outside the opt-in expander.
3. **No "correct/incorrect."** Remove right/wrong styling and "Try again." Replace with a neutral reveal.
4. **Remove the reaction/rating step** (decision #1).
5. **Add "See the technical detail"** — a collapsible expander on the reveal.
6. **Add the forwardable pitch** to the final screen (see §6).
7. **Header label:** "Scenarios reviewed."
8. **Terminology:** "Scenario", "Your call", "See the technical detail", "Next scenario", "Your profile".

---

## 5. Optional Technical Depth (for Tech Leads)

Keep engineers engaged **without burdening recruiters** via the **inline "See the technical detail" expander** on each reveal. No global mode toggle in v3.1.

- The expander shows the real stack and approach for that scenario.
- It is collapsed by default and **never required**.
- A full **Technical mode** (reusing the v2 challenge content: token budget, migration order, perf tuning, with right/wrong feedback) is a **future enhancement** — the recruiter path alone always reaches the profile.

The Console (optional command line) remains an easter egg for engineers.

---

## 6. Win Condition, Verdict & the Forwardable Pitch

Triggered after the third reveal:

1. **Profile moment** — light celebration (respect reduced motion), framed as the player's outcome, not a game score.
2. **Hiring scorecard** — the 3 signals + quantified outcomes, summarized as screening notes.
3. **The forwardable pitch (key addition).** A short, copy-ready **"Why Oleksandr"** paragraph built from the collected signals + profile, with a **Copy summary** action. This is the recruiter's ammunition to send to a hiring manager.
4. **Next steps (positive, actionable):** **Start the conversation** (Email) · **Download CV** · **Share profile** (LinkedIn) · phone. All unlock the same full profile — never a rejection.
5. **Full profile reveal** — name, role, tagline, summary, career timeline, grouped skill matrix.
6. **Restart / Review scenarios** option.

**Pitch generation (locked):** a templated summary assembled from the 3 scenario `pitchLine`s + `PROFILE` data, rendered verbatim as:

```
Oleksandr Obramenko — Senior Frontend Engineer, 8+ years of production frontend experience.

Highlights from three real scenarios:
• Cost-aware AI engineering — kept live biopharma maps while cutting agent execution costs.
• Safe, incremental modernisation — migrated payroll to React 19 with zero downtime and no regressions.
• Performance rescue — more than doubled UI speed on an insurance risk map.

Stack: React 19 · Next.js · Angular Signals · MCP · Zustand
Contact: obram22@gmail.com · +380996647007 · linkedin.com/in/oleksandr-obramenko
```

---

## 7. State & Content Model Changes

### Game store (`src/store/use-game-store.ts`)
- `step: "scenario" | "call" | "reveal"` (drop `"reaction"`).
- Remove `outcome: "correct" | "incorrect"` (no failure states). Completion = scenario reviewed.
- Remove `reactions` and `mode` (deferred).
- Keep `questStatus`, `unlockedProofs`, `score`, `completedQuests`.
- Rename `submitChallenge` → `submitCall` (advances to reveal; never fails).
- Rename `nextMission` → `nextScenario`.
- Add `technicalDetailOpen` per active scenario (local UI state is fine).

### Content model (`src/types/game.ts`, `src/lib/content/quests.ts`)
- Replace `DecisionChallenge` with:
```ts
interface ScreeningOption { id: string; label: string; }
interface ScreeningReveal { approach: string; outcome: string; signal: string; }
interface ScreeningScenario {
  kind: "screening";
  scenario: string;
  ask: string;
  options: ScreeningOption[];
  reveal: ScreeningReveal;
  technicalDetail: string;
}
```
- Add `pitchLine: string` per scenario (a short phrase used to build the forwardable summary).

---

## 8. MVP vs Enhanced Scope

**MVP (recruiter-first — fixes the feedback):**
- Reframe all 3 missions as plain-language screening scenarios.
- Reusable `ScreeningScenario` component: scenario → your call → reveal → advance.
- Remove right/wrong logic and "Try again" from the default path.
- Add the "See the technical detail" expander.
- Hiring scorecard + **forwardable "Why Oleksandr" pitch (copy-ready)** on the final screen.
- Copy updated to scenario/your-call/profile language.

**Enhanced (after validation):**
- **Technical mode** toggle reusing the v2 challenges.
- Varied interaction types (this-or-that, red-flag spotting).
- Sound, richer motion, confetti on the profile screen.
- Console polish.

---

## 9. Execution Phases (Updated)

### Phase 0 — Design Decisions
- [x] Recruiter-first framing confirmed.
- [x] Reaction step dropped; 3 options; "Scenario" terminology; technical expander only.
- [x] Pitch template wording locked.

### Phase 1 — Content & Types Refactor
- [x] Replace `DecisionChallenge` with `ScreeningScenario` in `types/game.ts`.
- [x] Rewrite the 3 missions in `lib/content/quests.ts` as plain-language scenarios with quantified outcomes + `pitchLine`.
- [x] Move v2 technical content into `technicalDetail`.

### Phase 2 — Store Refactor
- [x] Update `step` values; remove `outcome`/`reactions`/`mode`; rename actions (`submitCall`, `nextScenario`).
- [x] Completion = reviewed; keep proofs + score.

### Phase 3 — Screening UI
- [x] Build reusable `ScreeningScenario` (scenario, options, reveal, technical expander, advance).
- [x] Update `MissionStage` step routing and copy.
- [x] Remove correct/incorrect + retry styling from the default path.

### Phase 4 — Scorecard, Pitch & Next Steps
- [x] Add hiring scorecard (signals + outcomes) to the profile screen.
- [x] Build the "Why Oleksandr" pitch + **Copy summary**.
- [x] Add positive next-steps CTAs (Email / Download CV / Share profile).

### Phase 5 — Polish & Accessibility
- [ ] Copy pass: remove remaining jargon from the default flow.
- [ ] Responsive/mobile pass; `aria-live` reveals; reduced-motion profile moment.
- [ ] Optional sound + confetti.

### Phase 6 — Optional Technical Mode (deferred)
- [ ] Add a mode toggle in the overflow menu; wire the v2 challenge component.

### Phase 7 — CI/CD & Deployment
- [x] Static export for GitHub Pages + Actions workflow.
- [ ] Update README/LinkedIn framing.

---

## 10. Decisions Locked

1. **Reaction vote:** removed — no rating of the candidate.
2. **Technical mode:** deferred; inline "See the technical detail" expander only.
3. **Ending:** positive next-steps (Start the conversation / Download CV / Share profile), never a rejection.
4. **Options per scenario:** 3.
5. **Terminology:** "Scenario".

---

## 11. Success Criteria

- A recruiter can finish all 3 scenarios **without domain knowledge and without typing**, in **≤ 90 seconds**.
- No scenario can make the player feel wrong or excluded.
- Every scenario teaches something real and **quantified** about Oleksandr (a signal + an outcome).
- The experience reads as *screening a candidate*, not *passing an engineering test*.
- The player leaves with a **copy-ready "Why Oleksandr" pitch** and direct contact — the CV becomes a tool that does part of the recruiter's job.
- Tech leads can opt into depth via the technical expander without blocking the recruiter path.
