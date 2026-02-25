import {
  AddCircle,
  CloseCircle,
  Magnifier,
  Widget,
  TrashBinMinimalistic,
  PenNewSquare,
} from "@solar-icons/react-perf/category/style/Broken";
import type { IconProps } from "@solar-icons/react-perf/lib/types";

export const Icons = {
  Grid: (props: IconProps) => <Widget size={20} {...props} />,
  Search: (props: IconProps) => <Magnifier size={20} {...props} />,
  Close: (props: IconProps) => <CloseCircle size={20} {...props} />,
  Plus: (props: IconProps) => <AddCircle size={20} {...props} />,
  Trash: (props: IconProps) => <TrashBinMinimalistic size={20} {...props} />,
  Edit: (props: IconProps) => <PenNewSquare size={20} {...props} />,
};
