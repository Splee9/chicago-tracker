# The Road to Chicago — marathon training tracker

An interactive web app that visualizes the **2026 Chicago Marathon training block**
week by week: the 23-week phase plan, weekly load and workout-type composition, easy
aerobic efficiency, and a head-to-head against every prior marathon build. Built with
Vite + React + TypeScript, sharing the design language and cursor-reactive polish of the
lifetime [running-tracker](../running-tracker).

## About the data

The app ships **aggregate weekly figures only**:

- per-week mileage, run count, and longest run
- the 4-week rolling average
- easy **aerobic efficiency** (EF = meters per heartbeat over Z2 runs — a unitless
  fitness ratio, _not_ raw heart rate)
- workout-**type** composition per week (Quality / Long / Med-long / Easy / Commute /
  Other) — the plan's session vocabulary, no per-run detail
- the four-phase plan and a cross-build comparison (finish times + avg/peak mileage + EF)

There is **no** location, GPS, route, pace, per-run heart rate, sleep, or health data of
any kind. Nothing on the page identifies an individual beyond the author's own byline.

All numbers live in `src/data.json`, regenerated from a private training pipeline by
`scripts/build_chicago_tracker.py` (reads `raw/metrics.db`; the source data never ships
here — only the aggregate JSON does).

## Regenerate the data

```bash
# from the repo root
python3 scripts/build_chicago_tracker.py            # writes src/data.json
python3 scripts/build_chicago_tracker.py --date 2026-07-01   # test a future "today"
```

The framing (block start, race date, phase windows, volume arcs, goal) is defined at the
top of the script and mirrors `wiki/training/chicago-2026-macrocycle.md` (v3). The
cross-build comparison reads `dashboards/cross-build.json`.

## Develop

```bash
npm install
npm run dev      # local dev server with hot reload
npm run build    # type-check + production bundle to dist/
npm run preview  # serve the production build locally
```

## Project layout

```
src/
  App.tsx                 section composition
  data.json               aggregate stats (generated; do not hand-edit)
  components/
    Hero                   countdown, goal, current phase/week, block miles
    PhaseTimeline          23-week volume arc across the four mesocycles
    WeeklyLoad             stacked weekly mileage by type + rolling avg + EF trend
    CrossBuild             EF-vs-volume scatter + head-to-head + build table
    CursorSpotlight, AnimatedNumber, Magnetic, Colophon, Footer
  hooks/usePointer.ts     spring-smoothed cursor tracking
  lib/                    data types + formatting helpers
  styles/global.css       design tokens (shared palette + phase/type colors)
```

## Deploy

Same model as running-tracker: a separate **public GitHub repo**
([Splee9/chicago-tracker](https://github.com/Splee9/chicago-tracker) →
[chicagomarathon2026.netlify.app](https://chicagomarathon2026.netlify.app)), with
`web/chicago-tracker/` mirrored out via `git subtree` and **Netlify building from source** on
each push (see `netlify.toml`: `npm run build`, publish `dist/`).

`scripts/publish_tracker.sh` publishes **both** trackers, each Sunday-pinned with its own
throttle so Netlify builds stay inside the free tier: **this one weekly** (`MIN_DAYS` 6), the
lifetime running-tracker **every 3 weeks** (`MIN_DAYS` 20). data.json is regenerated from
`metrics.db` at push time, so each deploy ships current data — no separate refresh step. The
cadence watermark is `wiki/meta/chicago-last-publish.txt`. See the repo-root `CLAUDE.md`
evening-sync step 6 for the full wiring (remotes, unattended PAT auth, watermarks).

## Notes

- Workout types are bucketed from the Strava activity name by a small classifier in the
  build script — adjust the keyword map there if a session is miscategorized.
- The current (in-progress) week is flagged "so far" and excluded from looking like a
  finished week; its rolling average reflects partial mileage.
- All motion respects `prefers-reduced-motion`: animations are replaced by their finished
  state, and the content is fully readable without scrolling.
```
