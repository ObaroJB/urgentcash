export function TimestampToDate (stamp){
    const t = new Date(stamp);
    return t.toLocaleDateString();
}