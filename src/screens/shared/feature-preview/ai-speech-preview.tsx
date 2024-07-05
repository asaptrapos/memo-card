import { observer } from "mobx-react-lite";
import { BottomSheet } from "../../../ui/bottom-sheet/bottom-sheet.tsx";
import { BottomSheetTitle } from "../../../ui/bottom-sheet/bottom-sheet-title.tsx";
import { css } from "@emotion/css";
import { Flex } from "../../../ui/flex.tsx";
import { t } from "../../../translations/t.ts";
import React, { useState } from "react";
import { createVoicePlayer } from "../../deck-review/voice-player/create-voice-player.ts";
import { SpeakLanguageEnum } from "../../../lib/voice-playback/speak.ts";
import { PreviewSpeaker } from "./preview-speaker.tsx";
import { UpgradeProBlock } from "./upgrade-pro-block.tsx";

const roboticText = "Life is beautiful";
const aiSpeechUrl =
  "https://fzmgcxtfktdfwvimqcvy.supabase.co/storage/v1/object/public/ai_speech/694b5b30-1b27-4590-842e-028cab8372c1.mp3";

type Props = {
  onClose: () => void;
  showUpgrade?: boolean;
  isOpen: boolean;
};

export const AiSpeechPreview = observer((props: Props) => {
  const { onClose, isOpen, showUpgrade } = props;
  const [playerRobotic] = useState(() =>
    createVoicePlayer(
      { front: roboticText, back: "", voice: null },
      {
        speakingCardsLocale: SpeakLanguageEnum.USEnglish,
        speakingCardsField: "front",
      },
    ),
  );
  const [playerAiSpeech] = useState(() =>
    createVoicePlayer(
      { front: "", back: "", voice: aiSpeechUrl },
      { speakingCardsLocale: null, speakingCardsField: null },
    ),
  );

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <Flex direction={"column"} alignItems={"center"} pb={24}>
        <BottomSheetTitle title={t("ai_speech_title")} onClose={onClose} />
        <div
          className={css({
            maxWidth: 300,
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          })}
        >
          <Flex gap={8} alignItems={"center"} justifyContent={"center"}>
            <span>{t("ai_speech_preview_instead")}</span>
            <PreviewSpeaker player={playerRobotic} />
          </Flex>
          <Flex gap={8} alignItems={"center"} justifyContent={"center"}>
            <span>{t("ai_speech_preview_get")}</span>
            <PreviewSpeaker player={playerAiSpeech} />
          </Flex>
          <div className={css({ marginTop: 12 })}>
            {t("ai_speech_supports")}
          </div>
        </div>

        {showUpgrade && <UpgradeProBlock />}
      </Flex>
    </BottomSheet>
  );
});
