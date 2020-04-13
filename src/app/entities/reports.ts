export interface Reports {
  data: [
    {
      timestamp: Date;
      data: [
        {
          values: {
            cases: number;
            deaths: number;
            hospitalized: number;
            icu: number;
            recovered: number;
          };
          autonomousCommunity: string;
        }
      ];
    }
  ];
}
