import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { ApiState, gaurdianAPI } from '../redux/apiSlice';
import { placeholderImage } from '../constants';
import NewsCardItem from '../components/NewsCardItem';
import { extractKeys, filterData, formatDate } from '../utility';
import SelectOption from '../components/SelectOption';
import Search from '../components/Search';
import EmptyPage from '../components/EmptyPage';
interface NewsItem {
    [key: string]: string | object;
    webTitle: string;
    webPublicationDate: string;
    urlToImage: string;
    webUrl: string;
}

const GuardianPage: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [filterdData, setFilterData] = useState<NewsItem[]>([]);

    const dispatch: AppDispatch = useDispatch();
    const newsAPIData = useAppSelector((state: RootState) => (state.data as ApiState).gaurdianAPI
    ) || [];


    let news: NewsItem[] = [];
    if (newsAPIData && typeof newsAPIData === 'object' && "guardian" in newsAPIData) {
        news = newsAPIData.guardian as NewsItem[];
    }

    useEffect(() => {
        // Dispatch thunks to fetch data
        dispatch(gaurdianAPI());
        document.querySelectorAll('.select-filters').forEach((select) => {
            (select as HTMLSelectElement).value = (select.children[0] as HTMLOptionElement).value;

        })
    }, [dispatch])

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

    const selectOptions = extractKeys(news as { [key: string]: string }[], ['type', 'webPublicationDate']);

    const newsSelectOptions = [
        { id: 1, isDate: false, value: 'type', label: 'Type', options: [...new Set(selectOptions.map(({ type }) => type as string))] },
        { id: 2, isDate: true, value: 'webPublicationDate', label: 'Published At', options: [... new Set(selectOptions.map((option) => option.webPublicationDate as string))] },
    ]

    return (
        <div className='flex flex-wrap justify-center items-center sm:gap-8 mt-10 '>
            <div className='w-full  flex-col sm:flex-col lg:flex-row flex flex-wrap justify-between items-center gap-8 sm:mx-16'>
                <div className='flex  flex-col lg:flex-row  justify-evenly items-center gap-8'>

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
                        title={newsItem.webTitle}
                        description={formatDate(newsItem.webPublicationDate)}
                        imageUrl={placeholderImage}
                        articleUrl={newsItem.webUrl}
                    />))
            }

        </div>
    );
};

export default GuardianPage;