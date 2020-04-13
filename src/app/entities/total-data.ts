export interface TotalData {
  data: {
    cases: {
      total: number;
      diffWithYesterday: number;
    };
    deaths: {
      total: number;
      diffWithYesterday: number;
    };
    hospitalized: {
      total: number;
      diffWithYesterday: number;
    };
    icu: {
      total: number;
      diffWithYesterday: number;
    };
    recovered: {
      total: number;
      diffWithYesterday: number;
    };
  };
}
