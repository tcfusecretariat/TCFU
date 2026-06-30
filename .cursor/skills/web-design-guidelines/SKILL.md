---
name: web-design-guidelines
description: >-
  Audit UI for Web Interface Guidelines compliance — accessibility, UX, typography,
  touch targets, and performance. Use when reviewing layout, checking accessibility,
  auditing design, fixing mobile typography, or validating pages against best practices.
metadata:
  source: vercel-labs/agent-skills
  version: "1.0.0"
paths:
  - src/**
  - src/styles/**
---

# Web Interface Guidelines

Review UI code for compliance with Vercel Web Interface Guidelines.

## How it works

1. Fetch fresh guidelines from:
   `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
2. Read the target files (CSS, Astro, components).
3. Check against all rules in the fetched guidelines.
4. Output findings in terse `file:line` format from the guidelines doc.

## When to use

- User asks to review UI, accessibility, UX, or mobile layout
- Before shipping typography or footer/header changes
- After fixing text overflow, clipping, or ragged lines on mobile

## TCF project notes

Combine with `.cursor/skills/web-typography/SKILL.md` and `.cursor/rules/word-wrapping.mdc`.
This site uses serif editorial typography (Baskerville + Adobe Kaiti on zh), not generic sans defaults.

## Usage

If no files are specified, inspect `src/styles/global.css` and the relevant page component.
