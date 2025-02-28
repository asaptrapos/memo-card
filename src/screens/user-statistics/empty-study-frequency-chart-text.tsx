import { t } from "../../translations/t.ts";

export const EmptyStudyFrequencyChartText = () => {
  return (
    <div
      className="bg-bg text-text p-3 shadow rounded-[12px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm w-[250px] text-center"
    >
      {t("user_stats_empty_text")}
    </div>
  );
};
