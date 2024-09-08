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

interface BillItem {
    type: string;
    name: string;
}

interface BillCategory {
    type: string;
    name: string;
    list: BillItem[];
}

interface BillData {
    [key: string]: BillCategory[];
    pay: BillCategory[];
    income: BillCategory[];
}
export type {
    Result,
    DailyBillProps,
    IconProps,
    BillItem,
    BillCategory,
    BillData
};

