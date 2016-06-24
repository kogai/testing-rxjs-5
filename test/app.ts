import { Observable, TestScheduler } from "rxjs";
import * as assert from "assert";

import { createIncrementalSearch } from "../app";

describe("非同期処理のテスト", () => {
  let testScheduler, hot, cold;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => assert.deepEqual(actual, expected));
    cold = testScheduler.createColdObservable.bind(testScheduler);
  });

  it("100ms毎に検索を実行する", () => {
    const input$  = cold("---a---b---c---d---e-", { a: "R", b: "x", c: "J", d: "S", e: "5" });
    const expect$ =      "----------f---------g";

    const test$ = createIncrementalSearch(input$, testScheduler);
    testScheduler.expectObservable(test$).toBe(expect$, { f: ["Rx"], g: ["RxJS5"] });
    testScheduler.flush();
  });

  it("スペースで単語を区切られる", () => {
    const input$  = cold("---a---b---c---d---e-", { a: "r", b: "x", c: " ", d: "j", e: "s" });
    const expect$ =      "----------f---------g";

    const test$ = createIncrementalSearch(input$, testScheduler);
    testScheduler.expectObservable(test$).toBe(expect$, { f: ["rx"], g: ["rx", "js"] });
    testScheduler.flush();
  });
});
