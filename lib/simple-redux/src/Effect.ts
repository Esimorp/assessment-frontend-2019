import {ActionCreator} from "./Action";

type Effect = (payload: unknown, actionWrapper: Record<string, ActionCreator>) => void;

type EffectCreator = (payload: unknown) => Effect;

export {Effect, EffectCreator};
