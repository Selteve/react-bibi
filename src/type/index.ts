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

interface IconProps {
    type: string;
}
export type {
    Result,
    DailyBillProps,
    IconProps
};

