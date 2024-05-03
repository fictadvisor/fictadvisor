import React from 'react';
import { Box, Typography } from '@mui/material';
import { Metadata } from 'next';

import stylesCSS from '@/app/(main)/about/AboutPage.module.scss';
import * as styles from '@/app/(main)/about/AboutPage.styles';
import Eclipse from '@/app/(main)/about/components/eclipse/Eclipse';
import MobileStudActivityCard from '@/app/(main)/about/components/mobile-stud-activity-card/MobileStudActivityCard';
import { EclipseSize, EclipseType } from '@/app/(main)/about/types';
import aboutMetadata from '@/lib/metadata/about';
export const metadata: Metadata = aboutMetadata;
const About = () => (
  <>
    <Box sx={styles.container}>
      <Box
        sx={{
          height: { mobile: '460px', mobileMedium: '775px' },
          display: 'flex',
          width: '100%',
        }}
      >
        <Box sx={styles.vitrazhShadow} />
        <Eclipse
          size={EclipseSize.MEDIUM}
          type={EclipseType.RED}
          opacity={0.35}
          sx={{ zIndex: '1', left: '-5%', top: '5%' }}
        />

        <Box
          sx={{
            justifyContent: { mobile: 'center', tablet: 'flex-start' },
            display: 'flex',
            width: '100%',
          }}
        >
          <Box sx={styles.fictCard}>
            <Typography
              sx={{ typography: { mobile: 'h4Bold', tablet: 'h2Bold' } }}
            >
              ФІОТ
            </Typography>
            <Typography sx={{ typography: { mobile: 'body1', tablet: 'h6' } }}>
              <b>Факультет інформатики та обчислювальної техніки</b> — це ціла
              спільнота з <b>понад 3 тисяч студентів</b>, які розподілені на
              багатьох освітніх програмах та разом рухають галузь комп'ютерної
              науки нашої країни вперед.
            </Typography>
          </Box>
        </Box>
        <img
          src="/images/about-page/vitrazh-mobile.png"
          className={stylesCSS.vitrazhMobile}
          alt="Вітраж"
        />
        <img
          src="/images/about-page/vitrazh.png"
          className={stylesCSS.vitrazh}
          alt="Вітраж"
        />
      </Box>

      <Box sx={styles.history}>
        <Box sx={styles.historyText}>
          <Typography
            sx={{ typography: { mobile: 'h6Bold', desktop: 'h4Bold' } }}
          >
            Із чого все починалось?
          </Typography>
          <Typography
            sx={{
              typography: { mobile: 'body1', desktop: 'body2' },
              mt: { mobile: '6px', desktop: '18px' },
            }}
          >
            У 1918 році в КПІ заснували електротехнічний факультет, з якого
            беруть початок сучасні катедри ФІОТу.
            <br />
            <br />
            Протягом століття він зазнав багатьох оновлень та реорганізацій, і у
            1985 році світ побачив факультет інформатики та обчислювальної
            техніки, який очолила докторка технічних наук{' '}
            <b>Краснопрошіна Аїда Андріївна</b>.
            <br />
            <br />
            На цьому зміни не завершилися, і з моменту заснування ФІОТ постійно
            оновлюється, щоб відповідати стрімкому розвитку технологій.
          </Typography>
        </Box>
        <Box
          sx={{
            height: {
              desktop: '360px',
              mobile: '200px',
            },
            zIndex: 1,
          }}
        >
          <img
            src="/images/about-page/basic.png"
            className={stylesCSS.basic}
            alt="Basic"
          />
        </Box>

        <Eclipse
          size={EclipseSize.MEDIUM}
          type={EclipseType.BLUE}
          opacity={0.3}
          sx={{ zIndex: 0, right: 0 }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          gap: '18px',
          marginTop: '140px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{ typography: { mobile: 'h6Bold', desktop: 'h4Bold' } }}
          >
            Катедри факультету
          </Typography>

          <Typography
            sx={{
              mt: '9px',
              typography: { mobile: 'body1Medium', desktop: 'body2Medium' },
            }}
          >
            Після реструктуризації факультету у 2021 році катедр залишилося лише
            три:
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            position: 'relative',
            flexDirection: { desktop: 'row', mobile: 'column' },
            height: 'fit-content',
          }}
        >
          <Box sx={styles.cathedraCard}>
            <Typography variant="h4Bold">ОТ</Typography>
            <Eclipse
              size={EclipseSize.SMALL}
              type={EclipseType.RED}
              opacity={0.35}
              sx={{ zIndex: '-1', right: '65%', top: '60%' }}
            />
            <Typography variant="body2Medium" marginTop="52px" flexGrow={1}>
              Катедра <b>обчислювальної техніки</b> найстаріша на факультеті,
              заснована у 1960 році. Освітній план спрямований на підготовку
              фахівців у галузі розробки високопродуктивних систем реального
              часу, мережевого програмного забезпечення та штучного інтелекту.
            </Typography>
            <Typography variant="body1" marginTop="36px" flexGrow={1}>
              Надає освітні програми для 121 та 123 спеціальностей.
            </Typography>
          </Box>
          <Box sx={styles.cathedraCard}>
            <Typography variant="h4Bold">ІПІ</Typography>
            <Eclipse
              size={EclipseSize.SMALL}
              type={EclipseType.BLUE}
              opacity={0.7}
              sx={{ zIndex: '-1', left: '70%', bottom: '30%' }}
            />
            <Typography variant="body2Medium" marginTop="52px" flexGrow={1}>
              Катедра <b>інформатики та програмної інженерії</b> доволі молода
              на факультеті, заснована лише у 2021 році. Викладання орієнтоване
              на розвиток у студентів системного та алгоритмічного мислення в
              галузі розробки програмного забезпечення.
            </Typography>
            <Typography variant="body1" marginTop="36px" flexGrow={1}>
              Надає освітню програму для 121 спеціальності.
            </Typography>
          </Box>
          <Box sx={styles.cathedraCard}>
            <Typography variant="h4Bold">ІСТ</Typography>
            <Typography variant="body2Medium" marginTop="52px" flexGrow={1}>
              Катедра <b>інформаційних систем та технологій</b> також заснована
              у 2021 році. Головною особливістю освітньої програми є підготовка
              випускників з глибокими різногалузевими знаннями найсучасніших
              напрямів: інформаційних технологій, комп'ютеризованих систем
              управління, обчислювальної техніки та електроніки.
            </Typography>
            <Typography variant="body1" marginTop="36px" flexGrow={1}>
              Надає освітні програми для 126 спеціальності.
            </Typography>

            <Eclipse
              size={EclipseSize.LARGE}
              type={EclipseType.VIOLET}
              opacity={0.7}
              sx={{ zIndex: '-1', left: '-8%', top: '70%' }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={styles.specialtyContainer}>
        <Eclipse
          size={EclipseSize.SMALL}
          type={EclipseType.RED}
          opacity={0.35}
          sx={{ zIndex: '-1', left: '-8%', top: '18%' }}
        />
        <Eclipse
          size={EclipseSize.SMALL}
          type={EclipseType.VIOLET}
          opacity={0.35}
          sx={{ zIndex: '-1', left: '30%', top: '15%' }}
        />
        <Eclipse
          size={EclipseSize.MEDIUM}
          type={EclipseType.VIOLET}
          opacity={0.7}
          sx={{ zIndex: '-1', left: '70%', bottom: '15%' }}
        />
        <Box display="flex" flexDirection="column" gap="26px">
          <Box marginTop="30px">
            <Typography
              sx={{
                maxWidth: '370px',
                typography: { mobile: 'h6Bold', desktop: 'h4Bold' },
              }}
            >
              Спеціальності факультету
            </Typography>
            <Typography
              sx={{
                marginTop: '16px',
                maxWidth: { mobile: 'unset', desktop: '340px' },
                typography: { mobile: 'body1', desktop: 'body2' },
              }}
            >
              Факультет надає можливість обрати власну спеціалізацію та стати
              фахівцем у галузі ІТ-технологій. Наразі катедри пропонують освітні
              програми для трьох спеціальностей:
            </Typography>
          </Box>
          <Box sx={styles.specialtyTextCard}>
            <Typography
              sx={{ typography: { mobile: 'h6Bold', desktop: 'h4Bold' } }}
            >
              121
            </Typography>
            <Typography
              sx={{ typography: { mobile: 'body1', desktop: 'body2' } }}
            >
              Спеціальність «121 Інженерія програмного забезпечення» готує
              програмістів у класичному розумінні. Протягом навчання можна
              поглиблено опанувати розробку програмного забезпечення для різних
              операційних систем, мережеву інженерію та роботу зі штучним
              інтелектом.
              <br /> Факультет пропонує гнучкий освітній план із новітніми
              теоретичними матеріалами та застосуванням сучасних концепцій у
              світі інформаційних технологій.
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="20px">
          <Box sx={styles.specialtyTextCard}>
            <Typography
              sx={{ typography: { mobile: 'h6Bold', desktop: 'h4Bold' } }}
            >
              123
            </Typography>
            <Typography
              sx={{ typography: { mobile: 'body1', desktop: 'body2' } }}
            >
              Спеціальність «123 Комп'ютерна інженерія» зосереджена на
              низькорівневому програмуванні та фізичних аспектах комп'ютерів.
              Випускники мають глибокі знання в галузі проєктування процесорів,
              системного програмування та моделювання комп'ютерних мереж.
              <br />
              Матеріал курсу опановується без проблем завдяки чітким та
              зрозумілим освітнім ресурсам, досвідченим викладачам та достатній
              кількості необхідного обладнання на факультеті.
            </Typography>
          </Box>
          <Box sx={styles.specialtyTextCard}>
            <Typography
              sx={{ typography: { mobile: 'h6Bold', desktop: 'h4Bold' } }}
            >
              126
            </Typography>
            <Typography
              sx={{ typography: { mobile: 'body1', desktop: 'body2' } }}
            >
              Спеціальність «126 Інформаційні системи та технології» виникла в
              Україні саме за ініціативи ФІОТу в 2017 році. Студентам надають
              знання з усіх можливих галузей: бекенд, створення серверних
              застосунків, фізичні основи комп'ютерів та веброзробка.
              <br /> Також підготована велика кількість освітніх програм для
              різних напрямів, що ґрунтуються на сучасних технологіях та
              принципах програмування.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: { mobile: 'flex', desktopSemiMedium: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6Bold" mt="84px">
          Студентська активність
        </Typography>
        <Box sx={styles.studActivityContainerMobile}>
          <MobileStudActivityCard
            title="Студрада"
            description={
              <Typography variant="body2">
                Студентська рада ФІОТу одна з найбільш активних в університеті.
                Її члени проводять різноманітні тематичні заходи як для
                студентів, так і для вступників, ведуть новинні канали, а також
                розробляють власний вебсайт.
                <br />
                За певний напрям роботи відповідає окремий відділ. Кожен студент
                може долучитися до роботи та допомогти в розвитку факультету.
              </Typography>
            }
            imgSrc="/images/about-page/dayF-mobile.png"
          />
          <MobileStudActivityCard
            title="Заходи"
            description={
              <Typography variant="body2">
                Щорічно Студрада організовує День факультету, Абітфест, гітарні
                та літературні вечори, а також освітні лекції від спонсорів.
                <br />
                Музичні заходи проводяться у клубі «Барви». Зробивши благодійний
                внесок для ЗСУ, студенти мають змогу послухати авторські пісні
                андеграунд гуртів.
                <br /> Для освітніх ініціатив існує Хаб ФІОТ — унікальний проєкт
                співпраці з провідними ІТ-компаніями, де проводять безплатні
                лекції, літні школи та навчальні курси.
              </Typography>
            }
            imgSrc="/images/about-page/events-mobile.png"
          />
          <MobileStudActivityCard
            title="Благодійність"
            description={
              <Typography variant="body2">
                З початку повномасштабного вторгнення студентство факультету
                регулярно проводить збори на зброю та обладнання для наших
                захисників.
                <br /> Завдяки небайдужим, на фронт відправилися нові
                автомобілі, термінали зв’язку, прилади нічного бачення, аптечки,
                бронежилети та інші речі, які необхідні нашим студентам та
                випускникам на фронті.
              </Typography>
            }
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: { mobile: 'none', desktopSemiMedium: 'flex' },
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '140px',
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h4Bold">Студентська активність</Typography>
          <Box width="100%" display="flex" marginTop="16px" gap="16px">
            <Box>
              <img
                src="/images/about-page/events.png"
                style={{ borderRadius: '12px' }}
                alt="Івенти"
              />
            </Box>

            <Box sx={styles.studentTextCard}>
              <Typography variant="h4Bold">Студрада</Typography>
              <Typography variant="body2">
                Студентська рада ФІОТу одна з найбільш активних в університеті.
                Її члени проводять різноманітні тематичні заходи як для
                студентів, так і для вступників, ведуть новинні канали, а також
                розробляють власний вебсайт. <br />
                За певний напрям роботи відповідає окремий відділ. Кожен студент
                може долучитися до роботи та допомогти в розвитку факультету.
              </Typography>
            </Box>
          </Box>

          <Box display="flex" marginTop="16px" gap="16px">
            <Box>
              <img
                src="/images/about-page/dayF.png"
                style={{ borderRadius: '12px' }}
                alt="День Ф"
              />
            </Box>
            <Box sx={styles.studentTextCard}>
              <Typography variant="h4Bold">Заходи</Typography>
              <Typography variant="body2">
                Щорічно Студрада організовує День факультету, Абітфест, гітарні
                та літературні вечори, а також освітні лекції від спонсорів.
                <br /> Музичні заходи проводяться у клубі «Барви». Зробивши
                благодійний внесок для ЗСУ, студенти мають змогу послухати
                авторські пісні андеграунд гуртів.
                <br />
                Для освітніх ініціатив існує Хаб ФІОТ — унікальний проєкт
                співпраці з провідними ІТ-компаніями, де проводять безплатні
                лекції, літні школи та навчальні курси.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={styles.studentTextCard} maxWidth="300px" ml="16px">
          <Typography variant="h4Bold">Благодійність</Typography>
          <Typography variant="body2">
            З початку повномасштабного вторгнення студентство факультету
            регулярно проводить збори на зброю та обладнання для наших
            захисників.
            <br />
            Завдяки небайдужим, на фронт відправилися нові автомобілі, термінали
            зв’язку, прилади нічного бачення, аптечки, бронежилети та інші речі,
            які необхідні нашим студентам та випускникам на фронті.
          </Typography>
        </Box>
      </Box>

      <Box
        width="100%"
        justifyContent="center"
        alignItems="center"
        mb="48px"
        mt="80px"
      >
        <Box
          sx={{
            display: { mobile: 'block', desktop: 'none' },
            textAlign: 'center',
          }}
        >
          <Typography variant="body2Bold">
            Факультет інформатики та обчислювальної техніки — це не просто
            красивий корпус, а простір, де кожен може отримати знання та знайти
            себе.
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.ficeWallContainer}>
        <Box
          sx={{
            display: { mobile: 'block', desktop: 'none' },
          }}
        >
          <Eclipse
            size={EclipseSize.LARGE}
            type={EclipseType.RED}
            opacity={0.7}
            sx={{ zIndex: { mobile: 0, desktop: 1 } }}
          />
          <img
            src="/images/about-page/wallFICE.png"
            className={stylesCSS.wallFICE}
            alt="FICE composition"
          />
        </Box>
        <Box
          sx={{
            display: { mobile: 'none', desktop: 'block' },
          }}
        >
          <Eclipse
            size={EclipseSize.LARGE}
            type={EclipseType.RED}
            opacity={0.35}
            sx={{
              zIndex: { mobile: 0, desktop: 1 },
              left: '5%',
            }}
          />
          <img
            src="/images/about-page/wallFICE.png"
            style={{
              left: 0,
              position: 'absolute',
            }}
            alt="FICE composition"
          />
        </Box>

        <Box
          sx={{
            display: { mobile: 'none', desktop: 'block' },
          }}
        >
          <Eclipse
            size={EclipseSize.LARGE}
            type={EclipseType.VIOLET}
            opacity={0.7}
            sx={{ zIndex: 1, right: '5%' }}
          />
          <img
            src="/images/about-page/wallFICE.png"
            style={{
              right: 0,
              position: 'absolute',
            }}
            alt="FICE composition"
          />
        </Box>

        <Typography
          sx={{
            display: { mobile: 'none', desktop: 'block' },
            textAlign: 'center',
            maxWidth: '328px',
            mb: '48px',
          }}
          variant="body2Bold"
        >
          Факультет інформатики та обчислювальної техніки — це не просто красива
          назва, а простір, де кожен може отримати знання та знайти себе.
        </Typography>

        <Box sx={styles.ficeWallCard}>
          <Typography variant="h4Bold">
            Факультет інформатики та обчислювальної техніки — це не просто
            красива назва, а простір, де кожен може отримати знання та знайти
            себе.
          </Typography>
        </Box>

        <Box sx={styles.ficeWallShadow} />
      </Box>
    </Box>
  </>
);

export default About;
