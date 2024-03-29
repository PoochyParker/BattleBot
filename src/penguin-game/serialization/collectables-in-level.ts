// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { CollectablesOfType } from '../../penguin-game/serialization/collectables-of-type';


export class CollectablesInLevel {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):CollectablesInLevel {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsCollectablesInLevel(bb:flatbuffers.ByteBuffer, obj?:CollectablesInLevel):CollectablesInLevel {
  return (obj || new CollectablesInLevel()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsCollectablesInLevel(bb:flatbuffers.ByteBuffer, obj?:CollectablesInLevel):CollectablesInLevel {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new CollectablesInLevel()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

levelGuid():string|null
levelGuid(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
levelGuid(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

collectables(index: number, obj?:CollectablesOfType):CollectablesOfType|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new CollectablesOfType()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

collectablesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startCollectablesInLevel(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addLevelGuid(builder:flatbuffers.Builder, levelGuidOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, levelGuidOffset, 0);
}

static addCollectables(builder:flatbuffers.Builder, collectablesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, collectablesOffset, 0);
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

static endCollectablesInLevel(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // level_guid
  return offset;
}

static createCollectablesInLevel(builder:flatbuffers.Builder, levelGuidOffset:flatbuffers.Offset, collectablesOffset:flatbuffers.Offset):flatbuffers.Offset {
  CollectablesInLevel.startCollectablesInLevel(builder);
  CollectablesInLevel.addLevelGuid(builder, levelGuidOffset);
  CollectablesInLevel.addCollectables(builder, collectablesOffset);
  return CollectablesInLevel.endCollectablesInLevel(builder);
}
}
