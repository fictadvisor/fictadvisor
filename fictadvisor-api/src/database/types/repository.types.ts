export type TypeMap = {
  meta: {
    modelProps: string;
  };
  model: {
    [K: string]: {
      operations: {
        findFirst: { args: { where?: any; orderBy?: any; include?: any } };
        create: { args: { data: any; include?: any } };
        update: { args: { data: any; where: any; include?: any } };
        findUnique: { args: { where: any } };
        updateMany: { where?: any; result?: any };
      };
    };
  };
};

export type PrismaClientWithModels = {
  [K: string]: any;
};


export type TModels<TTypeMap extends TypeMap> = TTypeMap['meta']['modelProps'];

export type TWhere<TTypeMap extends TypeMap, Model extends TModels<TTypeMap>> =
  TTypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['where'];

export type TSort<TTypeMap extends TypeMap, Model extends TModels<TTypeMap>> =
  TTypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['orderBy'];

export type TInclude<TTypeMap extends TypeMap, Model extends TModels<TTypeMap>> =
  TTypeMap['model'][Capitalize<Model>]['operations']['findFirst']['args']['include'];

export type TCreate<TTypeMap extends TypeMap, Model extends TModels<TTypeMap>> =
  TTypeMap['model'][Capitalize<Model>]['operations']['create']['args']['data'];

export type TUpdate<TTypeMap extends TypeMap, Model extends TModels<TTypeMap>> =
  TTypeMap['model'][Capitalize<Model>]['operations']['update']['args']['data'];

export type TWhereUnique<TTypeMap extends TypeMap, Model extends TModels<TTypeMap>> =
  TTypeMap['model'][Capitalize<Model>]['operations']['findUnique']['args']['where'];

export type TBatchPayload<TTypeMap extends TypeMap, Model extends TModels<TTypeMap>> =
  TTypeMap['model'][Capitalize<Model>]['operations']['updateMany']['result'];
