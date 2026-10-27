// Where the detective's head sits in the scene (50% across, 46% down)
export const HEAD_ORIGIN = "50% 46%";

export const WIDE_SCALE = 1;
export const CLOSE_SCALE = 3.4;
export const CLOSE_Y = "-6%"; // lifts the face so the dialogue box has room

// Stage 5 ends up about 16% tighter than stage 1
export const closeScaleFor = (stage) => CLOSE_SCALE * (1 + 0.04 * (stage - 1));

// One value per stage (index 0 = stage 1)
export const STAGE_FX = {
  vignette: [0.35, 0.45, 0.55, 0.65, 0.8],
  tint: [0, 0, 0.12, 0.07, 0.04],
  flickerDark: [0, 0.25, 0.3, 0.45, 0.6],
  flickerEvery: [0, 7, 5, 3.5, 2.5], // seconds per cycle, 0 = no flicker
  eyeShadow: [0, 0.05, 0.1, 0.2, 0.55],
};