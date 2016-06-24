import { Observable } from "rxjs";

export const createIncrementalSearch = (input$: Observable<string>, testScheduler = null): Observable<string[]> => {
  return input$
    .bufferTime(100, null, testScheduler)
    .filter(c => c.length > 0)
    .map(c => c.join(""))
    .scan((acc, s) => (acc + s), "")
    .map(s => s.split(" "));
};