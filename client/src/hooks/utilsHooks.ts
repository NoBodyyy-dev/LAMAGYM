export const useFormatedTime = (date: string): string => {
    const dateArr = date.split("T");
    const time: string = dateArr[1].split(".")[0].slice(0, 5);

    return `${time}`;
}

export const useFillZero = (number: number): string => {
    return number.toString().padStart(2, '0')
}

export const useFormatedSubscribers = (count: number | undefined) => {
    const newSub: string = count!.toString()
    if (newSub.length > 3 && newSub.length < 7) return `${newSub.slice(0, -3)},${newSub.slice(-4, -3)}K`
}

export const useFormaterDate = (str: string): string => {
    const replaceObject: Record<string, string> = {
        "01": "Января",
        "02": "Февраля",
        "03": "Марта",
        "04": "Апреля",
        "05": "Мая",
        "06": "Июня",
        "07": "Июля",
        "08": "Августа",
        "09": "Сентября",
        "10": "Октября",
        "11": "Ноября",
        "12": "Декабря"
    }

    const dateArr: string[] = str.split("T")

    const date: string[] = dateArr[0].split("-");
    const day: string = date[2][0] === "0" ? date[2][1] : date[2];
    const month: string = replaceObject[date[1]]
    const year: string = date[0]

    const time: string = dateArr[1].split(".")[0].slice(0, 5);

    return `${day} ${month}, ${year}г в ${time}`
}