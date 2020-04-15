import { IMackDataItem } from './interface';

export const mockData: IMackDataItem[] = Array.from(new Array(10)).map((item, index) => ({
    title: `列表${index}`,
    desc: `这是第${index}个列表`,
}));
