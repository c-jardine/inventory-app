import { type GroupBase, type OptionBase } from 'chakra-react-select';

export interface SelectOption extends OptionBase {
  __isNew__?: boolean;
  readonly label: string;
  readonly value: string;
}

export interface SelectGroupOption extends GroupBase<OptionBase> {
  readonly label: string;
  readonly options: readonly SelectOption[];
}
