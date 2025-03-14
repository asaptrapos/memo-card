import { CardNumber } from "../../ui/card-number.tsx";
import { reset } from "../../ui/reset.ts";
import { List } from "../../ui/list.tsx";
import { ProIcon } from "../../ui/pro-icon.tsx";
import { cn } from "../../ui/cn.ts";
import { observer } from "mobx-react-lite";

export const ListStory = observer(() => {
  const items = Array(3)
    .fill(null)
    .map((card, i) => ({
      text: (
        <div>
          <div>
            <CardNumber number={i + 1} />
            Test title
          </div>
          <div className="text-hint text-sm">
            Test description Test description Test description Test description
            Test description
          </div>
        </div>
      ),
      right: (
        <button className={cn(reset.button, "text-base")} onClick={() => {}}>
          <i className={cn("mdi mdi-delete-circle mdi-24px", "text-danger")} />
        </button>
      ),
    }));

  items.push({
    text: <>Test</>,
    right: <ProIcon />,
  });

  return (
    <>
      <List animateTap={false} items={items} />
    </>
  );
});
