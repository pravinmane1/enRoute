import { DayBlock } from "./day-block.interface";

export interface RenderMonth {
  monthName: string;
  year: number;
  days: number;
  dayBlocks: DayBlock[];
  monthIndex:number;
}

