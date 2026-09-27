# Local Review — ClaimPilot AI

**Date:** 2026-05-16  
**Deploy:** Not run (`vercel --prod` forbidden for this pass)

## Start

```bash
cd /Users/joshuadavis/startups/claimpilot-ai
pnpm install
pnpm build
pnpm dev
```

Open: http://localhost:3000

## Route checklist

- [ ] `/` — commercial insurance cockpit positioning
- [ ] `/demo` — coverage gap analyzer (input → gap report)
- [ ] `/dashboard` — saved runs or empty state
- [ ] `/intake` — interactive intake form

## Acceptance criteria

- [ ] `pnpm build` exits 0
- [ ] Gap analyzer: business profile in → gaps + quote cards out
- [ ] Demo shows insurance-education disclaimer (not a binder/quote)
- [ ] Mobile `SiteNav` drawer works on `/demo`
- [ ] No fake carrier partnerships or bound-policy claims

## Known limitations

- Quote comparison uses demo/mock pricing — confirm with licensed broker
- Not a claims filing or underwriting system

## After review

- Update `startupjourney.md` §15
- Initialize git remote if missing before push
