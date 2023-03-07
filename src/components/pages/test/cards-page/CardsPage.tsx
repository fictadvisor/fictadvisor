import {
  HeaderCard, //
  LecturerHeaderCard, //
  LecturerPollCard,
  PollCard, //
  RatingCard,
  SimpleCard,
} from '../../../common/composite/cards';

function Cards() {
  return (
    <div className="test-page-wrap">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: '8px',
        }}
      >
        <LecturerHeaderCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
        />
        <LecturerHeaderCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
        />
      </div>
      <br />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '8px',
        }}
      >
        <LecturerHeaderCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
        />
        <LecturerHeaderCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
        />
        <LecturerHeaderCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '8px',
        }}
      >
        <LecturerHeaderCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
        />
        <LecturerHeaderCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
        />
        <LecturerHeaderCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
        />
        <LecturerHeaderCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: '8px',
        }}
      >
        <RatingCard name="Васильченко-Деружко Катерина Анатоліївна" />
        <RatingCard name="Васильченко-Деружко Катерина Анатоліївна" />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '8px',
        }}
      >
        <RatingCard name="Васильченко-Деружко Катерина Анатоліївна" />
        <RatingCard name="Васильченко-Деружко Катерина Анатоліївна" />
        <RatingCard name="Васильченко-Деружко Катерина Анатоліївна" />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '8px',
        }}
      >
        <RatingCard name="Васильченко-Деружко Катерина Анатоліївна" />
        <RatingCard name="Васильченко-Деружко Катерина Анатоліївна" />
        <RatingCard name="Васильченко-Деружко Катерина Анатоліївна" />
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          disabled={true}
        />
      </div>

      <br />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: '8px',
        }}
      >
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '8px',
        }}
      >
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '8px',
        }}
      >
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />{' '}
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />{' '}
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />{' '}
        <RatingCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
          disabled={true}
        />
      </div>

      <br />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: '8px',
        }}
      >
        <RatingCard
          rating={3}
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
        <RatingCard
          rating={3}
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '8px',
        }}
      >
        <RatingCard
          rating={3}
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
        <RatingCard
          rating={3}
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
        <RatingCard
          rating={3}
          name="Васильченко-Деружко Катерина Анатоліївна"
          roles={['лектор', 'практик', 'лаборант']}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '8px',
        }}
      >
        <RatingCard
          rating={3}
          name="Васильченко-Деружко Катерина Анатоліївна"
        />
        <RatingCard
          rating={3}
          name="Васильченко-Деружко Катерина Анатоліївна"
        />
        <RatingCard
          rating={3}
          name="Васильченко-Деружко Катерина Анатоліївна"
        />
        <RatingCard
          rating={3}
          name="Васильченко-Деружко Катерина Анатоліївна"
          disabled={true}
        />
      </div>

      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: '8px',
        }}
      >
        <HeaderCard
          name="Ярмоленко Єлизавета Миколаївна"
          groupName="ІК-23"
          position="Зам. староста"
        />{' '}
        <HeaderCard
          name="Ярмоленко Єлизавета Миколаївна"
          groupName="ІК-23"
          position="Зам. староста"
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '8px',
        }}
      >
        <HeaderCard
          name="Ярмоленко Єлизавета Миколаївна"
          groupName="ІК-23"
          position="Зам. староста"
        />{' '}
        <HeaderCard
          name="Ярмоленко Єлизавета Миколаївна"
          groupName="ІК-23"
          position="Зам. староста"
        />{' '}
        <HeaderCard
          name="Ярмоленко Єлизавета Миколаївна"
          groupName="ІК-23"
          position="Зам. староста"
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '8px',
        }}
      >
        <HeaderCard
          name="Ярмоленко Єлизавета Миколаївна"
          groupName="ІК-23"
          position="Зам. староста"
        />{' '}
        <HeaderCard
          name="Ярмоленко Єлизавета Миколаївна"
          groupName="ІК-23"
          position="Зам. староста"
        />{' '}
        <HeaderCard
          name="Ярмоленко Єлизавета Миколаївна"
          groupName="ІК-23"
          position="Зам. староста"
        />{' '}
        <HeaderCard
          name="Ярмоленко Єлизавета Миколаївна"
          groupName="ІК-23"
          position="Зам. староста"
        />
      </div>

      <br />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: '8px',
        }}
      >
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          details="3 викладачі"
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          details="3 викладачі"
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '8px',
        }}
      >
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          details="3 викладачі"
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          details="3 викладачі"
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          details="3 викладачі"
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '8px',
        }}
      >
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          details="3 викладачі"
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          details="3 викладачі"
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          details="3 викладачі"
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          details="3 викладачі"
          disabled={true}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: '8px',
        }}
      >
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          rating={4.1}
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          rating={4.1}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '8px',
        }}
      >
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          rating={4.1}
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          rating={4.1}
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          rating={4.1}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '8px',
        }}
      >
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          rating={4.1}
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          rating={4.1}
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          rating={4.1}
        />{' '}
        <SimpleCard
          name="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          rating={4.1}
          disabled={true}
        />
      </div>
      <br />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)',
          gap: '8px',
        }}
      >
        <LecturerPollCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          roles={['лектор', 'практик', 'лаборант']}
        />
        <LecturerPollCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          roles={['лектор', 'практик', 'лаборант']}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '8px',
        }}
      >
        <LecturerPollCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          roles={['лектор', 'практик', 'лаборант']}
        />
        <LecturerPollCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          roles={['лектор', 'практик', 'лаборант']}
        />
        <LecturerPollCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          roles={['лектор', 'практик', 'лаборант']}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '8px',
        }}
      >
        <LecturerPollCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          roles={['лектор', 'практик', 'лаборант']}
        />{' '}
        <LecturerPollCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          roles={['лектор', 'практик', 'лаборант']}
        />{' '}
        <LecturerPollCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          roles={['лектор', 'практик', 'лаборант']}
        />{' '}
        <LecturerPollCard
          name="Васильченко-Деружко Катерина Анатоліївна"
          description="Вища математика. Частина 1. Лінійна алгебра та аналітична геометрія. Диференціальне та інтегральне числення функцій однієї змінної"
          roles={['лектор', 'практик', 'лаборант']}
          disabled={true}
        />
      </div>

      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1,1fr)',
          // gap: "8px",
        }}
      >
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={0}
          isActive={false}
        />
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={1}
          isActive={false}
        />
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={2}
          isActive={false}
        />
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={3}
          isActive={false}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '8px',
        }}
      >
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={1}
          isActive={false}
        />
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={2}
          isActive={false}
        />
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={3}
          disabled={true}
          isActive={false}
        />
      </div>
      <br />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '8px',
        }}
      >
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={0}
          isActive={false}
        />
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={1}
          isActive={false}
        />
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={2}
          isActive={false}
        />
        <PollCard
          numberOfQuestions={3}
          questionNumber={2}
          question="I am a simple question"
          numberOfAnswered={3}
          isActive={false}
        />
      </div>
    </div>
  );
}

export default Cards;
