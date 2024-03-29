// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { Collectable } from '../../penguin-game/serialization/collectable';


export class CollectablesOfType {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):CollectablesOfType {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsCollectablesOfType(bb:flatbuffers.ByteBuffer, obj?:CollectablesOfType):CollectablesOfType {
  return (obj || new CollectablesOfType()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsCollectablesOfType(bb:flatbuffers.ByteBuffer, obj?:CollectablesOfType):CollectablesOfType {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new CollectablesOfType()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

collectableGuid():string|null
collectableGuid(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
collectableGuid(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

collectables(index: number, obj?:Collectable):Collectable|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new Collectable()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

collectablesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startCollectablesOfType(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addCollectableGuid(builder:flatbuffers.Builder, collectableGuidOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, collectableGuidOffset, 0);
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

static endCollectablesOfType(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // collectable_guid
  return offset;
}

static createCollectablesOfType(builder:flatbuffers.Builder, collectableGuidOffset:flatbuffers.Offset, collectablesOffset:flatbuffers.Offset):flatbuffers.Offset {
  CollectablesOfType.startCollectablesOfType(builder);
  CollectablesOfType.addCollectableGuid(builder, collectableGuidOffset);
  CollectablesOfType.addCollectables(builder, collectablesOffset);
  return CollectablesOfType.endCollectablesOfType(builder);
}
}
