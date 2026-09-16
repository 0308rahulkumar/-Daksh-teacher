"use client";

import React from "react";
import {
  PlasmaButton,
  IgnitionButton,
  InductionButton,
  TactileButton,
  ThinkingButton,
  LaunchButton,
  DotBorderButton,
  SpinningBorderButton,
  GenerateButton,
  GradientPillButton,
  type NeuformIsolatedEffectProps,
} from "./neuform-isolated/NeuformIsolatedEffects";

export type ShaderButtonVariant =
  | "plasma-button"
  | "plasma"
  | "ignition-button"
  | "ignition"
  | "induction-button"
  | "induction"
  | "tactile-button"
  | "tactile"
  | "thinking-button"
  | "thinking"
  | "launch-button"
  | "launch"
  | "dot-border-button"
  | "dot-border"
  | "spinning-border-button"
  | "spinning-border"
  | "generate-button"
  | "generate"
  | "gradient-pill-button"
  | "gradient-pill";

export interface ShaderButtonsProps extends NeuformIsolatedEffectProps {
  variant?: ShaderButtonVariant | string;
}

const BUTTON_COMPONENTS: Record<string, React.ComponentType<NeuformIsolatedEffectProps>> = {
  "plasma-button": PlasmaButton,
  "plasma": PlasmaButton,
  "ignition-button": IgnitionButton,
  "ignition": IgnitionButton,
  "induction-button": InductionButton,
  "induction": InductionButton,
  "tactile-button": TactileButton,
  "tactile": TactileButton,
  "thinking-button": ThinkingButton,
  "thinking": ThinkingButton,
  "launch-button": LaunchButton,
  "launch": LaunchButton,
  "dot-border-button": DotBorderButton,
  "dot-border": DotBorderButton,
  "spinning-border-button": SpinningBorderButton,
  "spinning-border": SpinningBorderButton,
  "generate-button": GenerateButton,
  "generate": GenerateButton,
  "gradient-pill-button": GradientPillButton,
  "gradient-pill": GradientPillButton,
};

export function ShaderButtons({
  variant = "plasma-button",
  ...props
}: ShaderButtonsProps) {
  const Component = BUTTON_COMPONENTS[variant] || PlasmaButton;
  return <Component {...props} />;
}

export * from "./neuform-isolated/NeuformIsolatedEffects";
