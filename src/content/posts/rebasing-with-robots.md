---
title: Rebasing With Robots
description: When agents rebase, dropped commits and reverted hunks look identical to a clean run. The fix is to verify against something the agent can't quietly modify.
publishDate: 2026-05-04
keywords:
  - git
  - rebasing
  - coding agents
  - conflict resolution
  - code review
  - AI tooling
tags:
  - Tooling
  - AI
---

Worktrees and agents are a great match. One worktree on the auth refactor, another on the API client, a third migrating a package to the new design system. I went from supervising one stream of work to running three or four.

That changes a lot. Including the parts that quietly break.

> [!TLDR]
> Agents fail at rebasing in a way that looks successful. Commits get dropped, hunks get reverted, conflicts get resolved by picking the wrong side. The rebase reports clean. Tests pass. You find out three days later when a feature you shipped last sprint is mysteriously gone.

## The friction shows up at sync time

Each branch drifts from `main` while the others ship. To land any of them, I rebase. And rebasing is where things quietly break.

I've always preferred rebasing over merging. Linear history is easier to read, easier to bisect, easier to revert. Merge commits feel like clutter. So when agents started landing branches at the rate worktrees enable, my first instinct was to keep doing what I'd always done: rebase, force push, move on.

That instinct turned out to have teeth.

## A rebase is not a mechanical operation

It's a reinterpretation of intent.

Git replays each commit on top of a new base. When the patch doesn't apply cleanly, something has to decide what the commit was actually trying to do. A human reads both sides, remembers what they were working on, and writes the merge by hand.

The agent has only a thin slice of that. A diff, two versions of a file, maybe a commit message, and a strong incentive to make the conflict markers go away.

## What actually breaks

The agent runs into a conflict in a function that was renamed upstream. It picks the upstream side, because the local side no longer matches what's around it. The local change is silently discarded.

A conflict where both sides modified the same block. The agent produces a merge that compiles but accidentally reverts a bug fix from three commits ago. The fix happened to share lines with the upstream change.

A commit that no longer applies because its target file was deleted upstream. The conflict is loud until someone decides what to do with it. The silent part is what comes next: the agent accepts the deletion, skips the commit, or recreates only the shape of the change without the behavior.

Or a rebase run with `-X theirs` to make the prompts go away.

Either way, the work is gone. `git status` is clean. `git log` looks plausible to anyone who doesn't already know what should be there.

> [!NOTE]
> The failure is silent by construction. There is no error to surface.

## Why this fails differently

Most agent failures are loud.

A test breaks. A type doesn't check. An import is wrong. You see it, you fix it, you move on. The cost is the time spent diagnosing.

Silent rebases are different. The cost is that you don't know the failure happened.

Conflict resolution is one of the few git operations where there is no objective right answer. Everything else has a check. Did the commit apply? Yes or no. Did the test pass? Yes or no.

Conflict resolution asks something else: what were the two authors trying to do, and how do you reconcile their goals? The agent has no access to the goals. It has access to text.

## What does not work

**Telling the agent to be careful.** Carefulness is not a strategy. The agent is already trying to be careful. The information needed to be careful is not in the diff.

**Asking the agent to summarize what it did.** The agent will produce a coherent summary. The summary will not mention the dropped commit, because the agent doesn't know it dropped a commit.

**Reviewing the rebased commits one by one.** This helps, but it starts from the wrong artifact. You're reviewing the agent's rewritten history, not comparing it against the branch's original intent. Review the range-diff instead: old patch series on one side, rebased patch series on the other.

**Running the test suite at the end.** This is the right answer in the limit. If every behavior has a test and every fix has a regression test, dropped commits fail CI loudly and the whole problem evaporates. That's the world to build toward. Most code doesn't live there yet, and silent rebases exploit exactly the gaps. Treat what follows as defense in depth while the fence has holes.

## Stop trusting the rebase. Verify it

The verification has to compare the rebased branch against an external reference the agent cannot quietly modify.

### Diff the patch series

Pin the old base and old head before starting. Names like `main` move; commit hashes don't.

```bash
old_base=$(git merge-base origin/main HEAD)
old_head=$(git rev-parse HEAD)

git diff --binary "$old_base..$old_head" > /path/outside/agent/before.diff
git log --oneline --reverse "$old_base..$old_head" > /path/outside/agent/before.commits
```

After the rebase, compare the old patch series to the new one:

```bash
new_head=$(git rev-parse HEAD)

git range-diff "$old_base..$old_head" "origin/main..$new_head"
git diff --binary origin/main...HEAD > /path/outside/agent/after.diff
diff -u /path/outside/agent/before.diff /path/outside/agent/after.diff
```

`range-diff` is the human-readable check: did the patch series still express the same intent? The raw diff comparison is the blunt one: did any hunks disappear or mutate unexpectedly?

Run this verification from a wrapper, CI job, or terminal the agent cannot write to. If the agent can rewrite the evidence, the evidence is not external.

The agent cannot explain away a comparison it cannot modify.

### Forbid the escape hatches

The two flags that produce silent rebase failures faster than anything else are `-X ours` and `-X theirs`. They tell git to auto-resolve conflicting hunks by preferring one side. Agents reach for them because they make the rebase complete. They are also exactly how you replace half a branch with whichever side won the flag.

> [!WARNING]
> During a rebase, `-X ours` prefers the side being rebased onto. `-X theirs` prefers the commits being replayed. This is the opposite of what most people expect coming from `git merge`. The same inversion applies to `git checkout --ours <file>` and `git checkout --theirs <file>` mid-rebase.

Ban these in agent workflows. Every conflict gets resolved by reading both sides and writing the merge.

### Use --exec for per-commit verification

`git rebase --exec` runs a command after each commit is replayed. Plug in your type checker and your fastest test suite:

```bash
git rebase --exec "pnpm typecheck && pnpm test" main
```

If the exec fails, the rebase pauses on that commit so you can fix it before continuing. This catches the bad commit at the moment it lands, instead of letting bad code compound across ten more commits before anyone notices.

### Plan before executing

Have the agent write a rebase plan first:

> I am going to rebase these seven commits onto main. Commits A and B touch the same files as upstream commit X. I expect conflicts in `auth.ts` and `session.ts`. I will resolve by taking the upstream signature change and applying our logic on top. Commits C through G should apply cleanly.

If the agent can't articulate that plan, it's going to flail in conflict resolution. Refusing to start until the plan exists prevents an entire class of failures.

This pairs naturally with rebasing in small batches. The agent's mental model of what each commit was trying to do stays intact across three commits in a way it doesn't across thirty.

### Merge is a valid tool

Rebasing has costs that aren't always worth paying.

A merge produces a different shape: conflicts get resolved once, in a single commit, instead of N times across N replayed commits. The history is uglier. The history is also a single, reviewable decision point.

Reach for merge when the conflict surface is large, when intermediate commits are throwaway, or when the branch is mostly catching up to someone else's work. Merging collapses the resolution problem to one decision the human can audit, instead of N chances for the agent to get one wrong.

## The deeper pattern

Silent rebases are a special case of a general failure mode.

Agents fail badly at tasks where success and completion look identical. Anywhere the agent can make a change that compiles, passes tests, and does the wrong thing, you have the same risk. Conflict resolution is one of those places. So is editing a config file the agent doesn't fully understand. So is "fixing" a flaky test by deleting it.

The defense is the same in every case: verify against something the agent cannot modify.

This is the same shape as [Default Values Are Silent Failures](/blog/default-values-are-silent-failures). A passing test isn't proof. A clean `git status` isn't proof. They're just the absence of complaint.

Proof comes from comparing what you have against what you should have.

## What I tell the robots to do now

When an agent rebases:

- Pin the old base and old head first
- Store the before snapshot outside the agent's reach
- Compare the old and new patch series with `range-diff`
- Run per-commit checks with `--exec`
- Never use `-X` flags as a shortcut
- Reach for merge when it's the better tool

The workflow is slower than letting the agent run unsupervised.

It also stops eating my work.
