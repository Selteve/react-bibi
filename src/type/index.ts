interface Result {
    type: string,
    money: number,
    date: string,
    useFor: string,
    id: number
}
interface DailyBillProps {
    date: string;
    billList: Result[];
}

export type {
    Result,
    DailyBillProps
};

