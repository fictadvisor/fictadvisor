import { useState } from "react";
import { useQuery } from "react-query";
import PageLayout from "../components/layout/PageLayout";
import SuperheroContact from "../components/SuperheroContact";
import SuperheroForm from "../components/forms/SuperheroForm";
import Button from "../components/ui/Button";
import Disclaimer from "../components/ui/Disclaimer";
import Dropdown from "../components/ui/Dropdown";
import Loader from "../components/ui/Loader";
import SearchInput from "../components/ui/SearchInput";
import config from "../config";
import api from "../lib/api";
import { useAuthentication } from "../lib/context/AuthenticationContext";
import { toInteger } from "../lib/number";
import { useQueryParams } from "../lib/query";

const PROPERTIES = {
  pageSize: 10,
  sortBy: [
    {
      text: 'Курсом',
      data: 'year' as const
    },
    {
      text: 'Гуртожитком',
      data: 'dorm' as const
    }
  ],
};

const superheroStateMessage = {
  hidden: 'На жаль, твою заявку на супергероя було відхилено',
  approved: 'Ти — супергерой',
  pending: 'Твоя заявка на супергероя розглядається',
};

const SuperheroesPage = () => {
  const [searchText, _setSearchText] = useState('');
  const [sortType, _setSortType] = useState(0);
  const [page, _setPage] = useState(0);
  const [formMode, setFormMode] = useState(false);
  const authentication = useAuthentication();

  const { queryReady, withQueryParam } = useQueryParams((query) => {
    _setSortType(toInteger(query.sb, sortType));
    _setPage(toInteger(query.p, page));
    _setSearchText(query.s ?? '');
  });

  const setSortType = withQueryParam('sb', _setSortType);
  const setPage =  withQueryParam('p', _setPage);
  const setSearchText = withQueryParam('s', _setSearchText);

  const { data, isLoading, isFetching, error } = useQuery(
    ['superheroes-search', page, searchText, sortType], 
    () => api.superheroes.getAll({ page: 0, page_size: PROPERTIES.pageSize * (page + 1), search: searchText, sort: PROPERTIES.sortBy[sortType].data }), 
    { keepPreviousData: true, enabled: queryReady }
  );

  const { data: superheroData } = useQuery(
    ['superheroes-me', authentication.getToken()],
    () => api.superheroes.getMe(authentication.getToken()),
    { enabled: !!authentication.user }
  );

  const searchActive = searchText.length > 0;

  return (
    <PageLayout
      title="Наші супергерої"
    >
      <p>
        Супергерой — це студент, який допомогає абітурієнтам та молодшим курсам з їхніми питаннями та проблемами.
        <br />
        Якщо ти потребуєш допомоги, не соромся їм писати.
      </p>
      <p>
        У разі некоректної поведінки супергероя, будь ласка, напишіть нам до бота зворотного зв'язку: <a href={`https://t.me/${config.contacts.feedbackBot}`} target="_blank">@{config.contacts.feedbackBot}</a>
      </p>
      {
        superheroData 
          ? <Disclaimer className={superheroData.state === 'hidden' ? 'alert' : null}>{superheroStateMessage[superheroData.state]}</Disclaimer>
          : 
            formMode 
              ? <SuperheroForm authentication={authentication} onBack={() => setFormMode(false)} />
              : <Button 
                  className="w-full" 
                  onClick={() => {
                    if (!authentication.user) {
                      authentication.login();
                      return;
                    }

                    setFormMode(true);
                  }}
                >
                  Я хочу бути супергероєм
                </Button>
      }
      <div className="adaptive-input-container d-flex m-b m-t">
        <SearchInput active={searchActive} className="d-flex-grow" placeholder="Пошук супергероїв" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <Dropdown text="Сортування за:" active={sortType} onChange={i => setSortType(i)} options={PROPERTIES.sortBy} />
      </div>
      <div className="block-container">
        {
          isLoading || error || !data
            ? <Loader.Catchable error={error} />
            : data.items.map(h => 
                <SuperheroContact
                  image={h.image}
                  name={h.name}
                  username={h.username}
                  year={h.year}
                  dorm={h.dorm}
                />
              )
        }
      </div>
      {
        (data && !error && data.count > (page + 1) * PROPERTIES.pageSize) &&
        <Button loading={isLoading || isFetching} className="w-full m-t" onClick={() => setPage(page + 1)}>Завантажити ще</Button>
      }
    </PageLayout>
  )
};

export default SuperheroesPage;
