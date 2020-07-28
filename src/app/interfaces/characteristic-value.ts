import {Characteristic} from './characteristic';

export interface CharacteristicValue {
  id: number;
  value: string;
  characteristic: Characteristic;
}

export interface CharacteristicValueAdding {
  value: string;
  characteristicId: number;
}
