---
title: Ten weeks at the Overclock Accelerator
shortTitle: Overclock Accelerator fellowship
publishDate: 2026-06-01
description: A personal recap of my AI engineering fellowship at the Overclock Accelerator. What the ten weeks covered, what I built, and how it changed the way I think about building with LLMs.
keywords:
  - ai engineering
  - overclock accelerator
  - ai fellowship
  - llms
  - agents
  - multi-agent systems
  - tool calling
  - prompt engineering
tags: ["AI"]
---

Earlier this year I joined the [Overclock Accelerator](https://www.overclockaccelerator.com/aie/program) as an AI Engineering Fellow. Ten weeks, weekly builds, one capstone.

I came in with miles on the clock already. Letting agents write code, putting models inside apps, reading the field. Fluent enough most days. No structure underneath any of it.

## What Overclock is

Overclock calls itself an accelerator, not a class. There were no lectures. Every week was built around shipping something. Concepts, a live demo, then a build.

The mental model that stuck from day one was the "Fickle Wizard." An LLM is a wizard. You hand it inputs and it hands back either magic or chaos. It's fickle because every answer is a roll of the dice. The program is about reining that in, so the magic side wins more often than the chaos side.

The curriculum was a stack. Each week added a layer:

- Using AI to write code faster
- Building AI into applications
- Extending what models can do with tools
- Handing control to agents
- Coordinating whole teams of agents

You start by writing code faster. You end by building systems that reason and act.

Weeks one through five were less new ground than they were vocabulary. The program took what I'd been doing by feel and gave it a shape I could point at. The new territory started at week six.

## When the model writes the code

Week one was the fast lane. Describe what you want, let the model build it, move fast.

It's fun. There's more to it.

Week two dug in. Using AI to ship production software is a real engineering craft, not a prompt and a prayer. Speed is easy. The last ten percent is the work.

First build: [eot.chat](https://eot.chat), an ephemeral chat app that dissolves when everyone leaves the room ([repo](https://github.com/jimmy-guzman/eot.chat)). I went all the way with the no-human approach. Repo creation, domain purchase, deploy, all of it. I never wrote a line of code. Just the prompts.

## When the LLM goes inside the product

Weeks three and four moved from using AI to write code to putting AI inside the product.

An AI app is a stack. On top, the user's inputs. In the middle, the application layer: the system prompt that sets the rules, custom functions, and whatever you do to manage context. At the bottom, the underlying model.

Every piece of text in that stack becomes tokens, and tokens cost money. You learn to budget like it's real, because it is.

Then prompt and context engineering. Tiny wording changes swing the outputs.

"Explain gravity to a 1st grader."

"Explain gravity to a 10th grader."

One word apart. Different answers.

The techniques to control it are the obvious ones once you see them named: few-shot examples, role prompting, chain of thought, giving the model an explicit "out" when it doesn't know.

Context engineering is the harder half: what files, memory, and data you feed the model, and how you keep it all inside the context window. Two patterns kept coming up:

- When something won't fit, chunk it, fan the pieces across parallel calls, then synthesize.
- The model forgets, so have it write notes about the user that you re-import next session.

For the sprint I added experimental AI to [gitzy](https://github.com/jimmy-guzman/gitzy), my commit-message CLI. The most fun was peeling back against evals to the cheapest model that still produced messages I'd ship. I cut the AI in the end. The new version I shipped is built for AI coding agents to use, not to call them.

## When the model needs help

Week five was where the program gave a name to something I had been hand-rolling.

A raw LLM can't tell you the current price of gold. It has no live data, and it will do the math wrong with total confidence. The infamous "how many R's in strawberry" question is the same problem in a different costume. Without a tool, the model is guessing.

The fix is tool calling. Instead of answering, the model interprets and routes. It reads your messy request, picks the right tool, and lets real, deterministic code do the work it's good at.

Under the hood it's a loop:

![Sequence diagram: user sends a message to the app, which loops between the LLM picking tools and the app running them, before the LLM writes the final reply](@/assets/images/overclock-agent-loop.png)

The model never executes anything. It picks and formats. Your code does the running.

Then MCP, the [Model Context Protocol](https://modelcontextprotocol.io). Tool calling pulled out into a shared standard, so a tool you build once can be used everywhere.

This was the week things clicked. With tool calling named, I understood what Opencode was doing under the hood. I read its source to confirm.

At work I tried an MCP server on a Nextra docs site. It worked, but I dropped it for the lighter approach I [wrote about for Astro](/blog/making-astro-site-agent-friendly), ported to Nextra. Same result, no server.

## When the model decides

Weeks six and seven were where I stopped calling the model and started letting one decide.

The definition that stuck with me, from Harrison Chase at LangChain: an agent is a system where the LLM controls the flow of the program. In a workflow, your code decides what happens next. In an agent, the model does. Give it tools, a goal, and a loop.

That loop has a name: **ReACT**, for reason, act, observe, repeat.

![Flowchart: the ReACT loop cycles through Reason, Act, and Observe until done, then sends a reply](@/assets/images/overclock-react-loop.png)

Every framework I've used wraps that loop the same way.

A lot of what I had been building already counted. Tool calling is the agentic superpower. I'd been hand-rolling an agent the whole time, no one had given it the name. Frameworks like [LangChain](https://langchain.com) and [Agno](https://agno.com) collapse the plumbing into a single Agent abstraction. You still write each tool. The wiring stops being the work.

Coordinators that delegate to specialists, each with their own tools, are powerful. The chaos compounds fast too. Agents start talking in loops, state drifts, traceability gets hard. Week eight hit harder because of that.

My capstone started accidentally here. The week six and seven sprints lined up too cleanly with something I'd been wanting to build, so I started building it instead. A chat playground with one twist: users could spin up their own agents, give them tools, stack sub-agents under them. By the end of week seven I was building forward. That project became comal.dev.

## When it gets real

Week eight was a cold shower.

The topic was hardening. Treating AI apps as production systems, with the failure modes that follow across security, cost, and performance. Prompt injection that leaks your system prompt. Users who paste a hundred thousand tokens to run up your bill. Agents whose memory gets poisoned over time, one innocuous email at a time.

The fixes sit outside the model. Input limits and classifiers that screen requests before they reach the LLM. Human approval on any memory write. Tool-call scopes narrow enough that even a hijacked prompt can't reach the wrong row.

The program had a name for the next rung up: **deep agents**. Long-lived, plan-and-execute systems like [Claude Code](https://claude.com/claude-code) or Manus that can spin up their own subagents on the fly. Powerful, and a much bigger surface to harden.

Getting an agent to do the thing was never the hard part. The hard part is everyone who shows up wanting it to do something else.

This is where I tried to break my own capstone. I found enough cracks to rebuild on top of an existing platform instead of holding everything together myself.

## What I built

My capstone is [comal.dev](https://comal.dev), the project I'd been circling since week six. It's an open source playground for composing your own AI agents from a shared toolbox. Pick a model, write a system prompt, attach tools, start chatting. Anonymous by default, sign in with GitHub if you want history.

The parts that make agents feel like a product instead of a demo: evals, sub-agents three tiers deep with collapsible traces, version history with diff and revert, a cost dashboard. And **Comal**, a system agent that builds and iterates on your other agents through chat.

Halfway through building it, I realized I had reinvented min-maxing a Demonology Warlock. Pick a model. Slot your tools. Summon your sub-agents. Read the parses.

The platform underneath is [boring](https://www.jimmy.codes/uses) on purpose. Next.js, Drizzle on Postgres, Better Auth, Effect, the Vercel AI SDK on top of OpenRouter so the model picker spans frontier and low-cost models, each tagged with a relative cost label. I wired the week eight lessons into the seams: approval gates on tools, sandboxed eval runs, hourly spend caps.

I went deeper on how it's built in [its own post](/blog/how-i-built-an-ai-agent-playground).

---

Agents were the new ground. I came in dabbling, I left architecting.

The Fickle Wizard doesn't get less fickle. You get better at building the rails around it.

Next up: I'm building a curriculum and teaching how to build with AI to high school students.

Thank you, [Jay Reddy](https://www.linkedin.com/in/jay-reddy-69538b240/).
