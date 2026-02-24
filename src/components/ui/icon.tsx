import {
  Magnifier,
  Widget,
} from "@solar-icons/react-perf/category/style/Broken";
import type { IconProps } from "@solar-icons/react-perf/lib/types";

export const Icons = {
  Grid: (props: IconProps) => <Widget size={20} {...props} />,
  Search: (props: IconProps) => <Magnifier size={20} {...props} />,
};
