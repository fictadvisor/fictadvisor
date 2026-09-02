import {
  getAdmissionYearFromCode,
  getStudyYears,
  isGraduatedCode,
  parseGroupCode,
  toGraduatedCode,
} from '../../src/common/utils/group-code.util';

// `groups.admission_year` used to be filled by its column default — the year the
// group was first parsed — so cohorts imported together all claimed the same
// admission year. The code is the reliable source.
describe('getAdmissionYearFromCode', () => {
  const in2026 = new Date('2026-09-02');

  it('reads the cohort digit of a plain code', () => {
    expect(getAdmissionYearFromCode('ІА-11', in2026)).toBe(2021);
    expect(getAdmissionYearFromCode('ІА-31', in2026)).toBe(2023);
    expect(getAdmissionYearFromCode('ІА-61', in2026)).toBe(2026);
  });

  it('ignores form-of-study and programme letters', () => {
    expect(getAdmissionYearFromCode('ІА-з61', in2026)).toBe(2026);
    expect(getAdmissionYearFromCode('ІА-в31ф', in2026)).toBe(2023);
    expect(getAdmissionYearFromCode('ІА-51мп', in2026)).toBe(2025);
    expect(getAdmissionYearFromCode('ІА-зп61', in2026)).toBe(2026);
  });

  it('never places a cohort in the future', () => {
    // A 7 in 2026 cannot mean 2027, so it belongs to the previous decade.
    expect(getAdmissionYearFromCode('ІА-71', in2026)).toBe(2017);
    expect(getAdmissionYearFromCode('ІА-01', in2026)).toBe(2020);
  });

  it('rolls into the new decade with the calendar', () => {
    const in2031 = new Date('2031-09-02');
    expect(getAdmissionYearFromCode('ІА-11', in2031)).toBe(2031);
    expect(getAdmissionYearFromCode('ІА-91', in2031)).toBe(2029);
  });

  it('gives up on a code with no digits', () => {
    expect(getAdmissionYearFromCode('ІА-')).toBeUndefined();
  });

  // Without this the cohort digit of a graduated code would be read against the
  // wrong decade the moment that code comes round again.
  it('trusts the year a graduated code states outright', () => {
    expect(getAdmissionYearFromCode('ІМ-31-2023', new Date('2033-09-02'))).toBe(2023);
    expect(getAdmissionYearFromCode('ІА-з61-2026', new Date('2036-09-02'))).toBe(2026);
  });
});

describe('graduated group codes', () => {
  it('appends the admission year', () => {
    expect(toGraduatedCode('ІМ-31', 2023)).toBe('ІМ-31-2023');
    expect(toGraduatedCode('ІА-з61мп', 2026)).toBe('ІА-з61мп-2026');
  });

  it('never suffixes twice', () => {
    expect(toGraduatedCode('ІМ-31-2023', 2023)).toBe('ІМ-31-2023');
    expect(isGraduatedCode('ІМ-31-2023')).toBe(true);
  });

  it('does not mistake a plain code for a graduated one', () => {
    expect(isGraduatedCode('ІМ-31')).toBe(false);
    expect(isGraduatedCode('ІА-з61ф')).toBe(false);
  });
});

// The grammar below was validated against every code in the database (388) and
// every live ФІОТ group in the campus API (213) — no code fell outside it.
describe('parseGroupCode', () => {
  it('splits speciality, form, cohort digit, group number and level', () => {
    expect(parseGroupCode('ІП-31')).toMatchObject({
      speciality: 'ІП', form: '', year: '3', number: '1', level: '',
    });
    expect(parseGroupCode('ІА-з51мп')).toMatchObject({
      speciality: 'ІА', form: 'з', year: '5', number: '1', level: 'мп',
    });
    expect(parseGroupCode('ІТ-в61ф')).toMatchObject({ form: 'в', level: 'ф' });
    expect(parseGroupCode('ІІ-зп61')).toMatchObject({ speciality: 'ІІ', form: 'зп', level: '' });
    expect(parseGroupCode('ІМ-45і')).toMatchObject({ number: '5', level: 'і' });
  });

  it('reads a graduated code as the group it still is', () => {
    expect(parseGroupCode('ІА-з51мп-2025')).toMatchObject({ form: 'з', level: 'мп' });
  });

  it('gives up on anything else', () => {
    expect(parseGroupCode('дивнийкод')).toBeUndefined();
    expect(parseGroupCode('ІП-3')).toBeUndefined();
  });
});

describe('getStudyYears', () => {
  it('gives bachelors four academic years, whatever the form', () => {
    expect(getStudyYears('ІП-31')).toBe(4);
    expect(getStudyYears('ІС-з41')).toBe(4);
    expect(getStudyYears('ІІ-о51')).toBe(4);
    expect(getStudyYears('ІА-зп61')).toBe(4);
    expect(getStudyYears('ІМ-45і')).toBe(4);
  });

  it('gives both master levels two', () => {
    expect(getStudyYears('ІА-51мп')).toBe(2);
    expect(getStudyYears('ІВ-61мн')).toBe(2);
    expect(getStudyYears('ІК-з51мп')).toBe(2);
  });

  // Both callers read undefined as "not graduated", so аспіранти are never
  // renamed and an unrecognised code is never acted on.
  it('excludes аспіранти and unrecognised codes', () => {
    expect(getStudyYears('ІП-51ф')).toBeUndefined();
    expect(getStudyYears('ІТ-в61ф')).toBeUndefined();
    expect(getStudyYears('дивнийкод')).toBeUndefined();
  });
});
