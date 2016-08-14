/* @flow */
import {compact, assign, remove, map} from 'lodash';
//intervals
export const IMMEDIATE:number = 0;
export const THIRTY_SEC:number = 30;
export const ONE_MINUTE:number = THIRTY_SEC * 2;
export const FIVE_MINUTE:number = ONE_MINUTE * 5;
export const TEN_MINUTE:number = ONE_MINUTE * 10;
export const HALF_HOUR:number = ONE_MINUTE * 30;
export const ONE_HOUR:number = HALF_HOUR * 2;
export const TWO_HOURS:number = ONE_HOUR * 2;
export const THREE_HOURS:number = ONE_HOUR * 3;
export const ONE_DAY:number = ONE_HOUR * 24;


type newJob = {
    interval: number,
    name: string,
    jobFn: () => void,
    runOnce: boolean,
};

type job = {
    id: number,
    name: string,
    interval: number,
    jobFn: () => void,
    runOnce: boolean,
};

type maybejob = ?job;

let jobQueue: job[] = [];
let currentTime: number = 0;
let nextJobId: number = 1;
let runJobs;

export const startScheduler = () => {
    setInterval(() => {
        currentTime = currentTime + 30;
        runJobs();
        if (currentTime > ONE_DAY) {
            currentTime = currentTime % ONE_DAY;
        }
    }, 30000);
};

export const addJob = (j: newJob) => {
    let id = nextJobId;
    let newJ: job = assign({
        id,
    }, j);
    jobQueue.push(newJ);
    nextJobId++;
    return id;
};

export const cancelJob = (jobId: number) => {
    remove(jobQueue, (j:job): boolean => j.id === jobId);
};

runJobs = () => {
    let updatedQueue: maybejob[] = map(jobQueue, (j: job, idx: number) => {

        if (currentTime % j.interval === 0) {
            //call without a this context
            let {jobFn} = j;
            jobFn();
            return j.runOnce ? null : j;
        }
        return j;
    });
    jobQueue = compact(updatedQueue);
};
