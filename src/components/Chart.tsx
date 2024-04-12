import * as React from 'react';
import {BarChart} from '@mui/x-charts/BarChart';

interface Props {
    taskList: {
        id: number;
    name: string;
    description: string;
    duration: number;
    }[];
}

const Chart: React.FC<Props> = ({taskList}) => {
    // Extracting IDs from the taskList
    //const ids = taskList.map((task) => task.id);
    // Extracting durations from the taskList
    const durations = taskList.map((task) => task.duration);
    // Data for the chart
    //const series = [{data: ids}];

    const series = [{data: durations}];

    // X-axis data (task IDs)
    // const xAxis = [
    //     {data: ids.map((id) => id.toString()), scaleType: 'band' as const},
    // ];
    const xAxis = [
        {
            data: taskList.map((task) => task.id.toString()),
            scaleType: 'band' as const,
        },
    ];
    return (
        <BarChart
            series={series}
            height={290}
            xAxis={xAxis}
            margin={{top: 10, bottom: 30, left: 40, right: 10}}
        />
    );
};

export default Chart;
