import Button from './ui/Button';
import pluralize from '../lib/pluralize';

function Subject({ title, rating, reviewCount, recommended }) {
  const noReviews = !rating || !reviewCount;

  return (
    <div className="block subject">
      <div className="info">
        <span className="font-medium">{title}</span>
        <p className="secondary">
          {
            noReviews 
              ? <><span className="secondary">На жаль, відгуки про цей курс відсутні</span></>
              : <>
                  Написано <span className="primary">{reviewCount}</span> {pluralize(reviewCount, 'відгук', 'відгуки', 'відгуків')} на цей курс, 
                  має середню оцінку <span className="primary">{rating}</span>
                </>
          }
        </p>
        {
          recommended &&
          <p className="golden">Рекомендовано редакцією</p>
        }
      </div>
      <div className="action">
        <Button>Дізнатись більше</Button>
      </div>
    </div>
  );
};

export function SubjectBlock() {
  return (
    <div>
      <div className="subject-group">
        <Subject title="Системне програмування" rating={4.8} reviewCount={12} recommended={true} />
        <Subject title="Системне програмування - 2" rating={4.3} reviewCount={4} recommended={false} />
        <Subject title="Інтеграція ІТ-систем" rating={0} reviewCount={0} recommended={false} />
      </div>
      <Button className="full-width">Завантажити ще</Button>
    </div>
  );
};

SubjectBlock.Subject = Subject;