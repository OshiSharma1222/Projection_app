# Projection Academy — mobile app

React Native (Expo SDK 57) rebuild of the Projection Academy redesign mockups.

---

## Running it

Requires Node 22+, and for native builds a JDK 17 and the Android SDK.

```bash
npm install
npm start          # Metro dev server
npm run android    # build + install on a connected device/emulator
npx tsc --noEmit   # typecheck
```

### Expo Go vs a native build

`npm start` and scanning with Expo Go is the fastest loop, but Expo Go shows its
own branded loading screen before the app starts — that is Expo Go's UI, not
ours, and no app-side change removes it. To see the real launch experience
(navy splash straight into the app), use `npm run android`, which builds and
installs the app itself.

### Android emulator note

This project has been developed on a machine with WSL/Hyper-V virtual network
adapters, where Expo auto-selects an unreachable LAN IP and Expo Go hangs on
"Loading from…". Pin the packager to the emulator's host alias:

```bash
set REACT_NATIVE_PACKAGER_HOSTNAME=10.0.2.2 && npx expo start
adb shell am start -a android.intent.action.VIEW -d "exp://10.0.2.2:8081"
```

`--host localhost` is **not** a fix — Metro then binds IPv6-only and `adb
reverse` has nothing to forward to.

---

## Design source

The mockups are static HTML, drawn at 390×844, and live outside this repo at
`D:\projection_redesign\`:

| File | Contents |
| --- | --- |
| `onboarding.html` | 8 screens — splash, 3 value slides, sign in, phone, OTP, goal |
| `screens.html` | 12 app screens — home, batches, store, chats, profile, course detail, lecture player, secure PDF viewer, test/quiz, test report, order summary, order confirmed |
| `index.html` | style and swatch reference |
| `logo.png`, `logo-seal.png` | brand marks (copied into `assets/images/`) |

Screens are ported faithfully: same colours, type sizes, radii and spacing.

---

## Structure

```
app/                    expo-router routes, one file per screen
  _layout.tsx           font loading + root Stack
  index.tsx             01 · Splash
  onboarding.tsx        02–04 · Value slides (horizontal pager)
  signin.tsx            05 · Sign in
  phone.tsx             06 · Phone number
  otp.tsx               07 · OTP verification
  goal.tsx              08 · Goal selection

src/theme/tokens.ts     colours, gradients, radii, fonts, shadows
src/components/
  PrimaryButton.tsx     the .btn pill (cta / navy variants, disabled state)
  icons.tsx             icons traced from the mock's <symbol> defs
  onboarding/
    Stage.tsx           the .stage wash, blobs and watermark
    FloatingCard.tsx    the .fc pill card + .g-* tile gradients
    SlideFooter.tsx     headline, progress dots, CTA
    arts.tsx            the three slide illustrations
  auth/
    AuthChrome.tsx      AuthHeader / TrustNote / LegalNote
    Keypad.tsx          the .kpwrap numeric pad
assets/images/          brand marks
```

## Conventions

- **Read colours from `src/theme/tokens.ts`.** Never hardcode a hex that already
  has a token. Values that are genuinely local to one illustration (chart bar
  tints, gradient stops, YouTube's brand red) stay local and named.
- Headings use Poppins (`fonts.h500`/`h600`/`h700`); body copy uses Inter
  (`fonts.b400`/`b500`/`b600`).
- A gated CTA must pass `disabled` to `PrimaryButton` so it dims. A
  full-brightness button that ignores taps reads as broken.
- SVG gradient ids are global within a document — components rendered more than
  once per screen take an `idPrefix` so their `<Defs>` don't collide.
- The mocks hang floating cards off the edges of a 290px art box using negative
  offsets. Android clips children that overflow their parent, so art boxes here
  are full-bleed with offsets pre-resolved against the 390px frame.

---

## Stubs

Until a backend exists:

- **OTP is `123456`** (`DEV_OTP` in `app/otp.tsx`). Any other code shows the
  mock's error state.
- The phone screen requires 10 digits before *Send OTP* enables.
- Nothing persists — onboarding replays on every launch.
- Google sign-in, the guest path, "Get a call instead" and the country picker
  are visual only.

## Not built yet

- The 12 app screens from `screens.html`
- State management, API client, auth/session persistence
- Loading, empty and error states beyond the OTP mismatch
- Automated tests, ESLint/Prettier
- Accessibility labels

## Roadmap

1. ✅ 01 · Splash
2. ✅ 02–04 · Value slides
3. ✅ 05–08 · Sign in, phone, OTP, goal selection
4. ⬜ Home and the remaining app screens
5. ⬜ Backend integration
