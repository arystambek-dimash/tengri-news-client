const Card = ({item}) => {

    return(
        <a href={item.details_url}>
            <div className={"flex w-[100%] flex-col gap-[20px]  rounded-[20px] cursor-pointer pb-[10px]"}>
                <img src={item.img} alt="" className={"w-full rounded-t-[20px]"}/>
                <div className={"flex flex-col gap-[20px] px-[20px]"}>
                    <div className={"text-4xl font-bold"}>
                        {item.announce}
                    </div>
                    <div className={"text-3xl "}>{item.publish_date}</div>
                </div>

            </div>
        </a>

    );
}

export default Card;