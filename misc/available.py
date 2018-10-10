#input: ordered array of non overlapping ordered pairs of start/end times,...
#ordered pair denoting earliest and latest possible work times
#output: ordered array of free time
def availableTimes(events, workingPeriod):
    answer = []
    for i in range(len(events)-1):
        start, end = max(events[i][1], workingPeriod[0]), min(events[i+1][0], workingPeriod[1])
        if end <= workingPeriod or start >= workingPeriod[1]:
            continue
        elif workingPeriod[0] <= answer[i][0] < answer[i][1] <= workingPeriod[1]:
            answer.append([start,end])
    return answer


def merge(intervals):
        intervals.sort(key=lambda x: x.start)

        merged = []
        for interval in intervals:
            # if the list of merged intervals is empty or if the current
            # interval does not overlap with the previous, simply append it.
            if not merged or merged[-1].end < interval.start:
                merged.append(interval)
            else:
            # otherwise, there is overlap, so we merge the current and previous
            # intervals.
                merged[-1].end = max(merged[-1].end, interval.end)

        return merged

def scheduleGroup(intervals):
    # modified merge tracking people who can make
