/* @flow */
import {forEach, compact, assign} from 'lodash';
//intervals
export const IMMEDIATE:number = 30;
export const THIRTY_SEC:number = 30;
export const ONE_MINUTE:number = 60;
export const FIVE_MINUTE:number = ONE_MINUTE * 5;
export const TEN_MINUTE:number = ONE_MINUTE * 10;
export const HALF_HOUR:number = ONE_MINUTE * 30;
export const ONE_HOUR:number = HALF_HOUR * 2;
export const TWO_HOURS:number = ONE_HOUR * 2;
export const THREE_HOURS:number = ONE_HOUR * 3;
export const ONE_DAY:number = ONE_HOUR * 24;

type interval = 0 | 30 | 60 | 300 | 600 | 1800 | 3600 | 7200 | 9000 | 86400;

type newJob = {
    interval: interval,
    jobFn: () => void,
    runOnce: boolean,
};

type job = {
    id: number,
    interval: interval,
    jobFn: () => void,
    runOnce: boolean,
};

type maybejob = job | null | false | '' | 0;

let jobQueue: maybejob[] = [];
let currentTime: number = 0;
let nextJobId: number = 1;
let runJobs, compactQueue;

export const startScheduler = () => {
    setInterval(() => {
        currentTime = currentTime + 30;
        runJobs();
        if (currentTime > ONE_DAY) {
            currentTime = currentTime % ONE_DAY;
        }
    }, 30);
};

export const addJob = (j: newJob) => {
    let newJ: job = assign({
        id: nextJobId,
    }, j);
    jobQueue.push(newJ);
};

runJobs = () => {
    forEach(jobQueue, (j: job, idx: number) => {
        if (currentTime % j.interval === 0) {
            //call without a this context
            j.jobFn.bind(undefined)();
            if (j.runOnce) {
                jobQueue[idx] = null;
            }
        }
    });
    compactQueue();
};

compactQueue = () => {
    jobQueue = compact(jobQueue);
};
