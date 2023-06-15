export interface AmountMarkType {
  name: string;
  amount: number;
  type: 'AMOUNT';
  mark: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
  };
}

export interface RadarCircleMarkType {
  name: string;
  amount: number;
  type: 'RADAR' | 'CIRCLE';
  mark: number;
}

export interface GetTeacherMarksDTO {
  marks: (RadarCircleMarkType | AmountMarkType)[];
}
