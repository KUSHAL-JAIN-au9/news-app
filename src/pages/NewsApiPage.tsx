import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { newsAPI, ApiState } from '../redux/apiSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import NewsCardItem from '../components/NewsCardItem';
import { extractKeys, filterData } from '../utility';
import SelectOption from '../components/SelectOption';
import Search from '../components/Search';
import EmptyPage from '../components/EmptyPage';

interface NewsItem {
  [key: string]: string | object;
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}
const NewsApiPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [filterdData, setFilterData] = useState<NewsItem[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const newsAPIData = useAppSelector((state: RootState) => (state.data as ApiState).newsAPI) || [];

  let news: NewsItem[] = [];
  if (newsAPIData && "news" in newsAPIData) {
    news = newsAPIData.news;
  }

  useEffect(() => {
    // Dispatch thunks to fetch data
    dispatch(newsAPI());
    document.querySelectorAll('.select-filters').forEach((select) => {
      (select as HTMLSelectElement).value = (select.children[0] as HTMLOptionElement).value;

    })
  }, [dispatch, searchQuery, selectedOptions])

  const handleSelectChange = (e: { name: string, value: string },) => {

    setSelectedOptions((prevSelectedOptions: { [key: string]: string }) => {
      const newSelectedOptions = {
        ...prevSelectedOptions,
        [e.name]: e.value,
      };
      const filteredData: NewsItem[] = filterData(news, newSelectedOptions, searchQuery) as NewsItem[];
      console.log("key selected", e.value, e.name, newSelectedOptions);
      console.log("filteredData", filteredData);
      setFilterData(filteredData)
      return newSelectedOptions;
    });
  };

  const selectOptions = extractKeys(news as { [key: string]: string }[], ['author', 'publishedAt', 'source']);

  const newsSelectOptions = [
    { id: 1, isDate: false, value: 'author', label: 'Author', options: [...new Set(selectOptions.map(({ author }) => author as string, 30).filter(author => author))] },
    { id: 2, isDate: true, value: 'publishedAt', label: 'Published At', options: [... new Set(selectOptions.map((option) => option.publishedAt as string))] },
    { id: 3, isDate: false, value: 'source', label: 'Source', options: [... new Set(selectOptions.map((option) => typeof option.source === 'object' ? (option.source as { name: string }).name : option.source as string))] }
  ]

  return (
    <div className='flex flex-wrap justify-center items-center gap-8 mt-10 '>
      <div className='w-full flex flex-col sm:flex-col lg:flex-row justify-evenly items-center gap-8 '>
        <div className='flex flex-col lg:flex-row justify-evenly items-center gap-8'>
          {newsSelectOptions.map((selectOption, index) => (
            <SelectOption
              key={index}
              id={selectOption.id}
              name={selectOption.value}
              options={selectOption.options}
              onChange={handleSelectChange}
              defaultValue={""}
              value={selectedOptions[selectOption.value]}
              isDate={selectOption?.isDate}
            />
          ))}
          <button className="btn btn-secondary w-full lg:w-auto" onClick={() => {
            document.querySelectorAll('.select-filters').forEach((select) => {
              (select as HTMLSelectElement).value = (select.children[0] as HTMLOptionElement).value;

            })
            const input = document.querySelector('#search')
            if (input) {
              (input as HTMLInputElement).value = "";
            }
            setSelectedOptions({});
            setSearchQuery("");
            dispatch(newsAPI());
            setQuery("");
          }}>Reset filters</button>
        </div>
        <Search
          query={query}
          setQuery={setQuery}
          onSearch={(value) => {
            setSearchQuery(value)
            const filterdData: NewsItem[] = filterData(news, selectedOptions, value) as NewsItem[];
            setFilterData(filterdData)
            console.log("filterdData", filterdData, value);
            setQuery("")
          }} />
      </div>

      {(news.length === 0 || (searchQuery || Object.keys(selectedOptions).length > 0) && filterdData.length === 0) && (
        <EmptyPage />
      )}
      {news.length > 0 && Array.isArray(news) && ((searchQuery || Object.keys(selectedOptions).length > 0 ? filterdData : news)).map((newsItem, index) => (
        <NewsCardItem
          key={index}
          title={newsItem.title}
          description={newsItem.description}
          imageUrl={newsItem.urlToImage}
          articleUrl={newsItem.url}
        />
      ))}

    </div>
  );
};

export default NewsApiPage;
