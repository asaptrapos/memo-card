import { VoicePlayer } from "../../deck-review/voice-player/create-voice-player.ts";
import { throttle } from "../../../lib/throttle/throttle.ts";
import { css, cx } from "@emotion/css";
import { theme } from "../../../ui/theme.tsx";
import React from "react";

type PreviewSpeakerParams = {
  player: VoicePlayer | null;
};

export const PreviewSpeaker = (props: PreviewSpeakerParams) => {
  const { player } = props;

  return (
    <i
      onClick={throttle(() => player?.play(), 500)}
      className={cx(
        "mdi mdi-play-circle mdi-36px",
        css({
          cursor: "pointer",
          color: theme.buttonColor,
        }),
      )}
    />
  );
};
