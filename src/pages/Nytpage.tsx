import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { ApiState, nytAPI } from '../redux/apiSlice';
import NewsCardItem from '../components/NewsCardItem';
import { extractKeys, filterData } from '../utility';
import SelectOption from '../components/SelectOption';
import Search from '../components/Search';
import EmptyPage from '../components/EmptyPage';
interface NewsItem {
    [key: string]: string | object;
    abstract: string;
    headline: { main: string };
    multimedia: [{ url: string }];
    web_url: string;
}
const NytPage: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [filterdData, setFilterData] = useState<NewsItem[]>([]);

    const dispatch: AppDispatch = useDispatch();
    const newsAPIData = useAppSelector((state: RootState) => (state.data as ApiState).nytAPI) || [];

    let news: NewsItem[] = [];
    if (newsAPIData && typeof newsAPIData === 'object' && "nyt" in newsAPIData) {
        news = (newsAPIData.nyt as NewsItem[]);
    }
    useEffect(() => {
        document.querySelectorAll('.select-filters').forEach((select) => {
            (select as HTMLSelectElement).value = (select.children[0] as HTMLOptionElement).value;

        })
    }, [])


    useEffect(() => {
        // Dispatch thunks to fetch data
        dispatch(nytAPI());

    }, [dispatch])

    const handleSelectChange = (e: { name: string, value: string },) => {

        setSelectedOptions((prevSelectedOptions: { [key: string]: string }) => {
            const newSelectedOptions = {
                ...prevSelectedOptions,
                [e.name]: e.value,
            };
            const filteredData: NewsItem[] = filterData(news, newSelectedOptions, searchQuery) as NewsItem[];
            setFilterData(filteredData)
            return newSelectedOptions;
        });
    };

    const selectOptions = extractKeys(news as { [key: string]: string }[], ['news_desk', 'pub_date']);

    const newsSelectOptions = [
        { id: 1, isDate: false, value: 'news_desk', label: 'Category', options: [...new Set(selectOptions.map(({ news_desk }) => news_desk as string, 30))] },
        { id: 2, isDate: true, value: 'pub_date', label: 'Published At', options: [... new Set(selectOptions.map((option) => option.pub_date as string))] },
    ]

    return (
        <div className='flex flex-wrap justify-around items-center gap-8 mt-10 '>
            <div className='w-full flex flex-col sm:flex-col lg:flex-row flex-wrap justify-between items-center gap-8 mx-6 '>
                <div className='flex flex-col lg:flex-row  justify-evenly items-center gap-8'>
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
                        setQuery("")
                    }} />
            </div>

            {(news.length === 0 || (searchQuery || Object.keys(selectedOptions).length > 0) && filterdData.length === 0) && (
                <EmptyPage />
            )}
            {
                (news.length > 0) && Array.isArray(news) && ((searchQuery || Object.keys(selectedOptions).length > 0 ? filterdData : news)).map((newsItem, index) => (
                    <NewsCardItem
                        key={index}
                        title={newsItem.headline.main}
                        description={newsItem.abstract}
                        imageUrl={`https://static01.nyt.com/${newsItem.multimedia[0]?.url}`}
                        articleUrl={newsItem.web_url}
                    />))
            }

        </div>
    );
};

export default NytPage;