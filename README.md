# VTuber Avatar Creator

Generate stunning VTuber-style avatar images from a text description using AI. Get back a direct image URL instantly — perfect for virtual YouTubers, streamers, and anime-style character creation.

---

## Install

**Via npx skills:**
```bash
npx skills add blammectrappora/vtuber-avatar-skill
```

**Via ClawHub:**
```bash
clawhub install vtuber-avatar-skill
```

---

## Usage

```bash
# Use the default VTuber prompt
node vtuberavatar.js

# Custom description
node vtuberavatar.js "cat girl vtuber, blue twin tails, big expressive eyes, idol outfit"

# Portrait size (default), anime style
node vtuberavatar.js "fox ears vtuber, warm colors, streaming overlay background"

# Landscape layout
node vtuberavatar.js "bunny girl vtuber with microphone" --size landscape

# Tall format, great for phone wallpapers or full-body sheets
node vtuberavatar.js "dragon vtuber, silver hair, fantasy armor" --size tall

# Use a reference image UUID to inherit its style
node vtuberavatar.js "same vtuber, winter outfit" --ref <picture_uuid>
```

---

## Options

| Flag | Values | Default | Description |
|------|--------|---------|-------------|
| `--size` | `portrait`, `landscape`, `square`, `tall` | `portrait` | Output image dimensions |
| `--token` | string | — | Override API token (see Token Setup below) |
| `--ref` | picture_uuid | — | Reference image UUID to inherit style/params |

### Size dimensions

| Size | Width | Height |
|------|-------|--------|
| `square` | 1024 | 1024 |
| `portrait` | 832 | 1216 |
| `landscape` | 1216 | 832 |
| `tall` | 704 | 1408 |

---

## About Neta

[Neta](https://www.neta.art/) (by TalesofAI) is an AI image and video generation platform with a powerful open API. It uses a **credit-based system (AP — Action Points)** where each image generation costs a small number of credits. Subscriptions are available for heavier usage.

### Register

| Region | Sign up | Get token |
|--------|---------|-----------|
| Global | [neta.art](https://www.neta.art/) | [Open Portal → API Token](https://www.neta.art/open/) |
| China  | [nieta.art](https://app.nieta.art/) | [Security Settings](https://app.nieta.art/security) |

New accounts receive free credits to get started.

### Pricing

Neta uses a pay-per-generation credit model. View current plans and credit packages on the [pricing page](https://www.neta.art/pricing).

- Free tier: limited credits on signup
- Subscription: monthly AP allowance via Stripe
- One-time packs: top up credits as needed

### Get your API token

1. Sign in at [neta.art/open](https://www.neta.art/open/) (global) or [nieta.art/security](https://app.nieta.art/security) (China)
2. Generate a new API token
3. Set it as `NETA_TOKEN` in your environment or pass via `--token`

```bash
export NETA_TOKEN=your_token_here
node vtuberavatar.js "your prompt"

# or inline
node vtuberavatar.js "your prompt" --token your_token_here
```


---

## Output

The script prints a single image URL to stdout on success:

```
https://cdn.talesofai.cn/.../<image>.webp
```

Pipe it wherever you need:
```bash
node vtuberavatar.js "witch vtuber" | pbcopy       # copy to clipboard (macOS)
node vtuberavatar.js "witch vtuber" | xclip         # copy to clipboard (Linux)
```

---

## Default Prompt

When no description is provided, the skill uses:

> vtuber avatar, anime style, expressive face, colorful hair, streaming overlay ready, clean background, chibi proportions optional, high detail eyes, virtual YouTuber aesthetic

---

Built with [Claude Code](https://claude.ai/claude-code) · Powered by [Neta](https://www.neta.art/) · [API Docs](https://www.neta.art/open/)