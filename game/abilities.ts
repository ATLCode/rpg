export type Ability = {
  id: number;
  name: string;
  effects: number[];
  skillId: number;
  levelReq: number;
};

export const abilities: Ability[] = [];
