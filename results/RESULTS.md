# Test results

Generated 2026-11-15 with Node 24.15.0, `bla-agents` 3.3.2, bla-deobfuscator 0.1.1, seed `corpus-1`.

**36 of 36** protected files, once cleaned, return exactly the same results as the original library.
Cleaning its own output again changed nothing in **36 of 36** cases.

| Library | BLA mode | Original | After BLA | Cleaned | Time | Same behaviour | Idempotent |
|---|---|---:|---:|---:|---:|:-:|:-:|
| `is-number` | stealth | 411 B | 52 877 B | 332 B | 0.5 s | yes | yes |
| `is-number` | balanced | 411 B | 81 906 B | 356 B | 0.6 s | yes | yes |
| `is-number` | maximum | 411 B | 117 226 B | 260 B | 0.7 s | yes | yes |
| `is-number` | bankrupt | 411 B | 149 723 B | 260 B | 0.9 s | yes | yes |
| `is-number` | full | 411 B | 122 622 B | 260 B | 0.8 s | yes | yes |
| `escape-html` | stealth | 1 362 B | 54 486 B | 1 459 B | 0.5 s | yes | yes |
| `escape-html` | balanced | 1 362 B | 83 498 B | 1 471 B | 0.7 s | yes | yes |
| `escape-html` | maximum | 1 362 B | 125 326 B | 821 B | 0.8 s | yes | yes |
| `escape-html` | bankrupt | 1 362 B | 157 608 B | 821 B | 0.9 s | yes | yes |
| `escape-html` | full | 1 362 B | 130 718 B | 821 B | 0.9 s | yes | yes |
| `fast-deep-equal` | stealth | 1 177 B | 54 692 B | 1 876 B | 0.6 s | yes | yes |
| `fast-deep-equal` | balanced | 1 177 B | 83 716 B | 1 907 B | 0.6 s | yes | yes |
| `fast-deep-equal` | maximum | 1 177 B | 119 219 B | 1 145 B | 0.9 s | yes | yes |
| `fast-deep-equal` | bankrupt | 1 177 B | 151 624 B | 1 145 B | 0.9 s | yes | yes |
| `fast-deep-equal` | full | 1 177 B | 124 587 B | 1 145 B | 0.8 s | yes | yes |
| `bytes` | stealth | 3 613 B | 57 880 B | 3 497 B | 0.6 s | yes | yes |
| `bytes` | balanced | 3 613 B | 86 894 B | 3 462 B | 0.7 s | yes | yes |
| `bytes` | maximum | 3 613 B | 126 792 B | 2 071 B | 0.8 s | yes | yes |
| `bytes` | bankrupt | 3 613 B | 159 002 B | 2 071 B | 0.9 s | yes | yes |
| `bytes` | full | 3 613 B | 132 192 B | 2 071 B | 0.8 s | yes | yes |
| `ms` | stealth | 3 024 B | 58 555 B | 3 802 B | 0.6 s | yes | yes |
| `ms` | balanced | 3 024 B | 87 564 B | 3 771 B | 0.7 s | yes | yes |
| `ms` | maximum | 3 024 B | 175 359 B | 2 431 B | 0.9 s | yes | yes |
| `ms` | bankrupt | 3 024 B | 205 485 B | 2 431 B | 0.9 s | yes | yes |
| `ms` | full | 3 024 B | 180 758 B | 2 431 B | 0.9 s | yes | yes |
| `camelcase` | stealth | 3 272 B | 59 754 B | 5 272 B | 0.5 s | yes | yes |
| `camelcase` | balanced | 3 272 B | 88 602 B | 5 066 B | 0.7 s | yes | yes |
| `camelcase` | maximum | 3 272 B | 125 436 B | 2 555 B | 0.8 s | yes | yes |
| `camelcase` | bankrupt | 3 272 B | 157 934 B | 2 555 B | 1.0 s | yes | yes |
| `camelcase` | full | 3 272 B | 130 811 B | 2 555 B | 0.9 s | yes | yes |
| `dayjs` | stealth | 7 160 B | 92 138 B | 20 727 B | 0.8 s | yes | yes |
| `dayjs` | balanced | 7 160 B | 121 561 B | 20 643 B | 0.9 s | yes | yes |
| `dayjs` | maximum | 7 160 B | 242 775 B | 15 400 B | 1.2 s | yes | yes |
| `dayjs` | bankrupt | 7 160 B | 271 213 B | 15 369 B | 1.4 s | yes | yes |
| `dayjs` | full | 7 160 B | 248 155 B | 15 400 B | 1.3 s | yes | yes |
| `acorn` | maximum | 233 938 B | 1 732 467 B | 195 226 B | 12.4 s | yes | yes |

Cleaned files are in [`cleaned/`](cleaned). The BLA-protected inputs are not stored (up to 1.7 MB each); the fixed seed regenerates them.
`stealth` and `balanced` add less scaffolding, so the cleaned file can be larger than a small or minified original (the tool pretty-prints).
`acorn` needs `--allow-lane-independent`, because `bla-agents` refuses to protect it otherwise; only one mode is run because it takes ~30 s.

Full test-suite output: [`test-output.txt`](test-output.txt). Regenerate everything with `npm run results`.
