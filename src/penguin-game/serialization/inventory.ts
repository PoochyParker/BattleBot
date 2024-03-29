// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { CollectablesInLevel } from '../../penguin-game/serialization/collectables-in-level';
import { DeathCountInLevel } from '../../penguin-game/serialization/death-count-in-level';


export class Inventory {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):Inventory {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsInventory(bb:flatbuffers.ByteBuffer, obj?:Inventory):Inventory {
  return (obj || new Inventory()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsInventory(bb:flatbuffers.ByteBuffer, obj?:Inventory):Inventory {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Inventory()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

collectables(index: number, obj?:CollectablesInLevel):CollectablesInLevel|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new CollectablesInLevel()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

collectablesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

deathCounts(index: number, obj?:DeathCountInLevel):DeathCountInLevel|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new DeathCountInLevel()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

deathCountsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startInventory(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addCollectables(builder:flatbuffers.Builder, collectablesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, collectablesOffset, 0);
}

static createCollectablesVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startCollectablesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addDeathCounts(builder:flatbuffers.Builder, deathCountsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, deathCountsOffset, 0);
}

static createDeathCountsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startDeathCountsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endInventory(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createInventory(builder:flatbuffers.Builder, collectablesOffset:flatbuffers.Offset, deathCountsOffset:flatbuffers.Offset):flatbuffers.Offset {
  Inventory.startInventory(builder);
  Inventory.addCollectables(builder, collectablesOffset);
  Inventory.addDeathCounts(builder, deathCountsOffset);
  return Inventory.endInventory(builder);
}
}
