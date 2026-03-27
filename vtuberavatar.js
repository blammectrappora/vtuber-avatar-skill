#!/usr/bin/env node

// --- Argument parsing ---
const args = process.argv.slice(2);
let prompt = null;
let size = "portrait";
let token = null;
let ref = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--size" && args[i + 1]) {
    size = args[++i];
  } else if (args[i] === "--token" && args[i + 1]) {
    token = args[++i];
  } else if (args[i] === "--ref" && args[i + 1]) {
    ref = args[++i];
  } else if (!args[i].startsWith("--") && prompt === null) {
    prompt = args[i];
  }
}

if (!prompt) {
  prompt =
    "vtuber avatar, anime style, expressive face, colorful hair, streaming overlay ready, clean background, chibi proportions optional, high detail eyes, virtual YouTuber aesthetic";
}

// --- Token resolution ---
if (!token) {
  console.error('\n✗ Token required. Pass via: --token YOUR_TOKEN');
console.error('  Get yours at: https://www.neta.art/open/'); {
  body.inherit_params = { collection_uuid: ref, picture_uuid: ref };
}

// --- Submit job ---
async function submitJob() {
  const res = await fetch(`https://api.talesofai.com/v3/make_image`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to submit job (${res.status}): ${text}`);
  }

  const data = await res.json();

  if (typeof data === "string") return data;
  if (data.task_uuid) return data.task_uuid;
  throw new Error(`Unexpected response: ${JSON.stringify(data)}`);
}

// --- Poll for result ---
async function pollTask(taskUuid) {
  const url = `https://api.talesofai.com/v1/artifact/task/${taskUuid}`;
  const maxAttempts = 90;
  const delayMs = 2000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(url, { headers });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Poll failed (${res.status}): ${text}`);
    }

    const data = await res.json();
    const status = data.task_status;

    if (status === "PENDING" || status === "MODERATION") {
      await new Promise((r) => setTimeout(r, delayMs));
      continue;
    }

    // Done
    const imageUrl =
      data.artifacts?.[0]?.url ?? data.result_image_url ?? null;

    if (!imageUrl) {
      throw new Error(`Task done but no image URL found: ${JSON.stringify(data)}`);
    }

    return imageUrl;
  }

  throw new Error(`Timed out after ${maxAttempts} attempts waiting for task ${taskUuid}`);
}

// --- Main ---
(async () => {
  try {
    const taskUuid = await submitJob();
    const imageUrl = await pollTask(taskUuid);
    console.log(imageUrl);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();
