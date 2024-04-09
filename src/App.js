import {useEffect, useRef, useState} from "react";
import axios from 'axios';
import Card from "./components/Card";

function App() {
    const [data, setData] = useState([]);
    const [currPage, setCurrPage] = useState(1);

    const [max, setMax] = useState();

    const [pages, setPages] = useState([1, 2, 3]);

    const [search, setSearch] = useState("");
    useEffect(() => {
            const fetchNews = async () => {
                try {
                    const url = `https://tengri-news.onrender.com/api/v1/search?search_query=${search}&page=${currPage}&page_size=12`;
                    const response = await axios.get(url, {
                        headers: {
                            accept: 'application/json', // Заголовок, указывающий ожидаемый тип ответа
                        },
                    });

                    setData(response.data)
                    setMax(response.data.total_pages)
                } catch (error) {
                    console.error('Ошибка при получении новостей:', error);
                }
            };

            fetchNews();
        }
        , [currPage, search]
    )

    const handleClick = (page) => {
        if (page === -1) {
            if (currPage !== 1) {
                if (pages[0] !== 1) {
                    const arr = [currPage - 2, currPage - 1, currPage];
                    setPages(arr);
                }
                setCurrPage(currPage - 1);

            }
        } else if (page === 0) {
            if (currPage !== max) {
                if (pages[2] !== max) {
                    const arr = [currPage, currPage + 1, currPage + 2];
                    setPages(arr);
                }
                setCurrPage(currPage + 1);

            }
        } else {
            setCurrPage(page);
            let arr = [];
            if (page === 1) {
                arr = [1, 2, 3];
            } else if (page === max) {
                arr = [max - 2, max - 1, max - 3];
            } else {
                arr = [page - 1, page, page + 1];
            }
            setPages(arr);
        }
    }


    const inputRef = useRef(null);
    const handleSearch = () => {
        setSearch(inputRef.current.value);
    }

    return (
        <div className="w-[100%] bg-[#f8f8f8] flex flex-col items-center font-Roboto">
            <div className={"w-full flex gap-[10%] text-4xl pt-[1%] pb-[1%] bg-[#303133] text-white px-[10%]"}>
                <div className={"cursor-pointer"}>
                    DimashNews
                </div>

            </div>
            <div className={"bg-white w-[80%] py-[3%] flex flex-col gap-[50px]"}>
                <div className={"w-full flex justify-center"}>
                    <input ref={inputRef} type="text"
                           className={"bg-gray-200 w-[80%] h-[8vh] rounded-l-[10px] px-[2%] text-3xl"}
                           placeholder={"Искать"}/>
                    <button className={"w-[10%] h-[8vh] bg-[#03ab02] rounded-r-[10px] text-3xl text-white font-medium"}
                            onClick={handleSearch}>Поиск
                    </button>
                </div>
                <div className={"flex flex-wrap gap-x-[5%] gap-y-[50px] px-[5%] w-full "}>
                    {
                        data && data.news ? data?.news?.map((item, index) => (
                            <div key={index} className={"w-[30%] rounded-[20px]"}>
                                <Card item={item}/>
                            </div>
                        )) : <div></div>
                    }
                </div>
                <div className={"w-full flex justify-center gap-[30px]"}>
                    <div className={"cursor-pointer text-2xl"} onClick={() => handleClick(-1)}>
                        {`<`}
                    </div>
                    {
                        pages[0] > 1 && <div className={"text-2xl"}>...</div>
                    }
                    {
                        pages.map((item) =>
                            <div key={item} className={"cursor-pointer text-2xl"}
                                 style={{fontWeight: item === currPage ? "700" : "400"}}
                                 onClick={() => handleClick(item)}>
                                {item}
                            </div>)
                    }
                    {
                        pages[2] < max && <div className={"text-2xl"}>...</div>
                    }
                    <div className={"cursor-pointer text-2xl"} onClick={() => handleClick(0)}>
                        {`>`}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;