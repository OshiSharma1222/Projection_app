# Projection Academy — React Native app

Expo (SDK 57) + expo-router + TypeScript. The app is a from-scratch build of the
Projection Academy redesign mockups.

## Working agreements

- **No AI attribution anywhere.** Do not add `Co-Authored-By`, `Generated with
  Claude Code`, or any similar trailer/footer to commits, PR bodies, code
  comments, or docs. Commits are authored solely by the repo owner.
- **One screen per change.** Build exactly one screen from the mockups, stop, and
  report it so the owner can review it on Expo Go and commit it themselves.
  Do not commit or push unless explicitly asked.
- `.claude/` is gitignored and stays local.

## Design source

The mockups live outside this repo at `D:\projection_redesign\`:

- `onboarding.html` — 8 screens: splash → 3 value slides → sign in → phone →
  OTP → goal selection
- `screens.html` — 12 app screens: home, batches, store, chats, profile, course
  detail, lecture player, secure PDF viewer, test/quiz, test report, order
  summary, order confirmed
- `index.html` — style sheet / swatch reference
- `logo.png`, `logo-seal.png` — official brand marks (copied into `assets/images/`)

Every screen is drawn at 390×844. Port them faithfully: same colors, type sizes,
radii, and spacing.

## Structure

```
app/                  expo-router routes (one file per screen)
  _layout.tsx         font loading + root Stack
  index.tsx           01 · Splash (hands off to /onboarding after 1.8 s)
  onboarding.tsx      02–04 · Value slides (horizontal pager)
src/theme/tokens.ts   colors, gradients, radii, fonts, shadows from the mocks
src/components/       icons.tsx (traced from the mock <symbol> defs),
                      PrimaryButton.tsx (the .btn gradient pill)
src/components/onboarding/
  Stage.tsx           the .stage wash + blobs + watermark + art box
  FloatingCard.tsx    the .fc pill card and the .g-* tile gradients
  SlideFooter.tsx     the .ob-foot headline / dots / CTA
  arts.tsx            the three slide illustrations
assets/images/        brand marks
```

Read tokens from `src/theme/tokens.ts` — never hardcode a hex that already has a
token. Headings use Poppins (`fonts.h500`/`h600`), body copy uses Inter
(`fonts.b400`/`b500`).

## Build order

1. ✅ 01 · Splash
2. ✅ 02–04 · Value slides (one paged flow in `app/onboarding.tsx`)
3. 05 · Sign in · 06 · Phone · 07 · OTP · 08 · Goal selection
4. Then the 12 app screens from `screens.html`

## Commands

```
npm start        # Expo dev server (scan the QR with Expo Go)
npm run android  # open on an Android emulator/device
npx tsc --noEmit # typecheck
```

### Android emulator

This machine has WSL/Hyper-V virtual adapters, so Expo auto-selects an
unreachable LAN IP (e.g. `172.26.192.1`) and Expo Go hangs on "Loading from…"
or fails with "Something went wrong". Pin the packager to the emulator'''s host
alias instead:

```
set REACT_NATIVE_PACKAGER_HOSTNAME=10.0.2.2 && npx expo start
adb shell am start -a android.intent.action.VIEW -d "exp://10.0.2.2:8081"
```

`--host localhost` is not a fix — Metro then binds IPv6-only, so `adb reverse`
has nothing to forward to. The Pixel_7 AVD is the review device.
