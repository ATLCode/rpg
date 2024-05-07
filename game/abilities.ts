export type Ability = {
  id: number;
  name: string;
  effects: number[];
  skillId: number;
  levelReq: number;
};

/*
Should we do this with all skills? Like chopping X wood would be ability and so on?
Abilities could have follwing keys:
isAutomatic (You get this ability as you level up)
isCombat (Shows up during combat)
*/

export const abilities: Ability[] = [];
