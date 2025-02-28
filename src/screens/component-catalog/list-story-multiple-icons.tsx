import { CardNumber } from "../../ui/card-number.tsx";
import { reset } from "../../ui/reset.ts";
import { List } from "../../ui/list.tsx";
import { Flex } from "../../ui/flex.tsx";
import { cn } from "../../ui/cn.ts";
import { observer } from "mobx-react-lite";

export const ListStoryMultipleIcons = observer(() => {
  return (
    <List
      animateTap={false}
      items={Array(3)
        .fill(null)
        .map((card, i) => ({
          text: (
            <div>
              <div>
                <CardNumber number={i + 1} />
                Test title
              </div>
              <div
                className="text-hint text-sm"
              >
                Test description Test description Test description Test
                description Test description
              </div>
            </div>
          ),
          right: (
            <Flex gap={8}>
              <button
                className={cn(reset.button, "text-base")}
                onClick={() => {}}
              >
                <i
                  className={cn(
                    "mdi mdi-eye-check-outline mdi-24px",
                    "text-button"
                  )}
                />
              </button>
              <button
                className={cn(reset.button, "text-base")}
                onClick={() => {}}
              >
                <i
                  className={cn(
                    "mdi mdi-delete-circle mdi-24px",
                    "text-danger"
                  )}
                />
              </button>
            </Flex>
          ),
        }))}
    />
  );
});
