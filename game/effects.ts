export enum DamageType {
  Blunt = "Blunt",
  Slashing = "Slashing",
  Piercing = "Piercing",
}
export enum EffectType {
  Damage = "Damage",
  Heal = "Heal",
}

export type Effect = {
  effectType: EffectType;
  value: number;
  damageType?: DamageType;
};

export enum EffectId {}

export const effects: Record<EffectId, Effect> = {};
